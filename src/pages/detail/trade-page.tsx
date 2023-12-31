/* eslint-disable react/no-unescaped-entities */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import { AccountLinesResponse, AccountLinesTrustline } from 'xrpl';

import { useBalance } from '~/api/xrpl/balance';
import { useDepositCBDC } from '~/api/xrpl/cbdc-deposit';
import { useWithdrawCBDC } from '~/api/xrpl/cbdc-withdraw';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { useDepositUSTB } from '~/api/xrpl/ustb-deposit';
import { useWithdrawUSTB } from '~/api/xrpl/ustb-withdraw';
import LogoUstb from '~/assets/images/logo-ustb.png';
import { ButtonPrimary } from '~/components/buttons/button-primary';
import { CardTertiary } from '~/components/card/card-tertiary';
import { Gnb } from '~/components/gnb';
import { IconArrowDown, IconLocked, IconPercentage, IconPrice } from '~/components/icons';
import { Popup } from '~/components/popups';
import Portfolio from '~/components/portfolio';
import { portfolioData } from '~/components/portfolio/data/portfolio-data';
import { TextFieldTrade } from '~/components/textfield/textfield-trade';
import { Toggle } from '~/components/toggle';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';
import { useSelectedTokenState, useTradeState } from '~/states/data/trade';
import { CBDC_TOKEN, TOKEN, TRADE_OPTIONS } from '~/types';
import { convertCBDCToCurrency, getCurrencyPriceUSD, getExchangeRate } from '~/utils/currency';
import { formatNumber, weightedAverage } from '~/utils/number';

import { ChangeCurrency } from './components/change-currency';
import { PopupSuccess } from '~/components/popups/confirm-popup';

const TradePage = () => {
  const { wallet } = useConnectWallet();
  const { selected, select } = useTradeState();
  const { selected: currencySelected } = useSelectedTokenState();
  const [cbdcAmount, setCbdcAmount] = useState(0);
  const [ustbAmount, setUstbAmount] = useState(0);
  const [ustbPrice, setUstbPrice] = useState(0);
  const [balances, setBalances] = useState<AccountLinesTrustline[]>([]);
  const [loading, setLoading] = useState(false);
  const [cbdcBalance, setCbdcBalance] = useState(0);

  const { depositCBDC } = useDepositCBDC();
  const { depositUSTB } = useDepositUSTB();

  const { withdrawCBDC } = useWithdrawCBDC();
  const { withdrawUSTB } = useWithdrawUSTB();

  const { getBalance, getCBDCBalanceForUstbWallet } = useBalance();

  useEffect(() => {
    getCBDCBalanceForUstbWallet().then(res => setCbdcBalance(res ?? 0));
    const price = getCurrencyPriceUSD('USTB');
    if (price) {
      setUstbPrice(price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, selected, currencySelected, loading]);

  useEffect(() => {
    setCbdcAmount(0);
    setUstbAmount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, selected, currencySelected]);

  const handleDeposit = async () => {
    if (cbdcAmount === 0) return;

    setLoading(true);
    await depositCBDC(currencySelected as TOKEN, cbdcAmount.toString());
    await depositUSTB(
      (
        cbdcAmount *
        getExchangeRate(
          { currency: convertCBDCToCurrency(currencySelected as TOKEN), amount: 1 },
          { currency: 'USTB', amount: 1 }
        )
      ).toFixed(4)
    );
    confirmOpen();
    setLoading(false);
  };

  const {
    open: currencyOpen,
    opened: currencyOpened,
    close: _currencyClose,
  } = usePopup(POPUP_ID.CURRENCY);

  const {
    open: confirmOpen,
    opened: confirmOpened,
    close: _confirmClose,
  } = usePopup(POPUP_ID.CONFIRM);

  const handleWithdraw = async () => {
    if (ustbAmount === 0) return;

    setLoading(true);
    await withdrawUSTB(ustbAmount.toString());
    await withdrawCBDC(
      currencySelected as CBDC_TOKEN,
      (
        ustbAmount *
        getExchangeRate(
          { currency: 'USTB', amount: 1 },
          { currency: convertCBDCToCurrency(currencySelected as CBDC_TOKEN), amount: 1 }
        )
      ).toFixed(4)
    );
    confirmOpen();
    setLoading(false);
  };

  useEffect(() => {
    if (wallet) {
      getBalance(wallet.address).then(res => {
        const lines = (res as AccountLinesResponse)?.result.lines;
        setBalances(lines);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, selected, currencySelected, loading]);

  return (
    <>
      <Gnb />
      <Wrapper>
        <ContainerWrapper>
          <LeftContainer>
            <TradeContents>
              <TradeImage src={LogoUstb} />
              <TradeText>
                <TradeTitle>U.S. Short-term Treasury Bill</TradeTitle>
                <TradeDesc>
                  The U.S. Short-term Treasury Bill ($UST) is a token underpinned by a prospectus
                  and backed by U.S. Treasury Bills. These are government bonds that don't carry
                  regular interest payments and are issued at a discounted rate, only to be redeemed
                  at their full value upon maturity. Given the backing of the U.S. government,
                  they're viewed as the "risk-free" standard and rank among the most secure
                  investments globally.
                </TradeDesc>
              </TradeText>
            </TradeContents>
            <TradeCardWrapper>
              <CardTertiary
                title="Total Value Locked"
                icon={<IconLocked />}
                contents={
                  cbdcBalance +
                  portfolioData.reduce(
                    (acc, cur) => acc + Number(cur.marketValue.replace(',', '')),
                    0
                  )
                }
                cardType="value"
              />
              <CardTertiary
                title="Price Per UST"
                icon={<IconPrice />}
                contents={ustbPrice}
                decimal={3}
                cardType="value"
              />
              <CardTertiary
                title="APY"
                icon={<IconPercentage />}
                contents={Number(
                  weightedAverage(
                    portfolioData.map(p => {
                      return {
                        weight: Number(p.principalAmount.replace(',', '')),
                        value: Number(p.ytm.replace('%', '')),
                      };
                    })
                  ).toFixed(3)
                )}
                cardType="percent"
              />
            </TradeCardWrapper>
          </LeftContainer>
          <RightContainer>
            <Toggle
              left={{
                id: TRADE_OPTIONS.DEPOSIT,
                text: <ToggleText>Deposit</ToggleText>,
                handler: id => select(id as TRADE_OPTIONS),
              }}
              right={{
                id: TRADE_OPTIONS.WITHDRAW,
                text: <ToggleText>Withdraw</ToggleText>,
                handler: id => select(id as TRADE_OPTIONS),
              }}
            />
            <InputWrapper>
              <TradeWrapper>
                {selected === TRADE_OPTIONS.DEPOSIT ? (
                  <>
                    <TextFieldTrade
                      amount={
                        balances.length === 0
                          ? '0'
                          : balances.find(b => b.currency === currencySelected)?.balance ?? '0'
                      }
                      placeholder="0.0"
                      currency={currencySelected}
                      selectable={true}
                      handleChange={e => setCbdcAmount(e.floatValue ?? 0)}
                      handleClick={currencyOpen}
                      value={cbdcAmount}
                    />
                    <TextFieldTrade
                      amount={
                        balances.length === 0
                          ? '0'
                          : balances.find(b => b.currency === 'UST')?.balance ?? '0'
                      }
                      placeholder={Number(
                        (
                          cbdcAmount *
                          getExchangeRate(
                            {
                              currency: convertCBDCToCurrency(currencySelected as TOKEN),
                              amount: 1,
                            },
                            { currency: 'USTB', amount: 1 }
                          )
                        ).toFixed(4)
                      ).toString()}
                      currency="UST"
                      disabled={true}
                    />
                  </>
                ) : (
                  <>
                    <TextFieldTrade
                      amount={
                        balances.length === 0
                          ? '0'
                          : balances.find(b => b.currency === 'UST')?.balance ?? '0'
                      }
                      placeholder="0.0"
                      currency="UST"
                      handleChange={e => setUstbAmount(e.floatValue ?? 0)}
                      value={ustbAmount}
                    />
                    <TextFieldTrade
                      amount={
                        balances.length === 0
                          ? '0'
                          : balances.find(b => b.currency === currencySelected)?.balance ?? '0'
                      }
                      placeholder={Number(
                        (
                          ustbAmount *
                          getExchangeRate(
                            { currency: 'USTB', amount: 1 },
                            {
                              currency: convertCBDCToCurrency(currencySelected as TOKEN),
                              amount: 1,
                            }
                          )
                        ).toFixed(4)
                      ).toString()}
                      currency={currencySelected}
                      selectable={true}
                      handleChange={e => console.log(e)}
                      handleClick={currencyOpen}
                      disabled={true}
                    />
                  </>
                )}
                <IconWrapper>
                  <IconArrowDown />
                </IconWrapper>
              </TradeWrapper>
              <RateWrapper>
                <RateText>Rate</RateText>
                <RateValue>
                  {selected === TRADE_OPTIONS.DEPOSIT
                    ? `1UST= ${formatNumber(
                        getExchangeRate(
                          { currency: 'USTB', amount: 1 },
                          { currency: convertCBDCToCurrency(currencySelected as TOKEN), amount: 1 }
                        ),
                        6
                      )}${currencySelected}`
                    : `1${currencySelected}= ${formatNumber(
                        getExchangeRate(
                          { currency: convertCBDCToCurrency(currencySelected as TOKEN), amount: 1 },
                          { currency: 'USTB', amount: 1 }
                        ),
                        6
                      )}UST`}
                </RateValue>
              </RateWrapper>
            </InputWrapper>
            {selected === TRADE_OPTIONS.DEPOSIT ? (
              <ButtonPrimary
                onClick={() => handleDeposit()}
                text="Deposit"
                isLoading={loading}
                buttonType="large"
                disabled={!cbdcAmount}
              />
            ) : (
              <ButtonPrimary
                onClick={() => handleWithdraw()}
                text="Withdraw"
                isLoading={loading}
                buttonType="large"
                disabled={!ustbAmount}
              />
            )}
          </RightContainer>
        </ContainerWrapper>
        <Portfolio />
      </Wrapper>
      {currencyOpened && (
        <Popup
          type={'normal'}
          title="Select a token"
          id={POPUP_ID.CURRENCY}
          contents={<ChangeCurrency />}
        />
      )}
      {confirmOpened && <PopupSuccess id={POPUP_ID.CONFIRM} />}
    </>
  );
};

const Wrapper = tw.div`
flex-center flex-col gap-120 pb-120
`;

const ContainerWrapper = tw.div`
  flex-center pt-60 gap-48
`;

const LeftContainer = tw.div`
  flex flex-col w-444 gap-40
`;

const TradeContents = tw.div`
  flex flex-col gap-16
`;

const TradeImage = styled.img(() => [
  tw`w-80 h-80 rounded-50`,
  css`
    box-shadow: 0px 8px 24px 0px #3358ff33;
  `,
]);

const TradeText = tw.div`
  flex flex-col gap-8
`;

const TradeTitle = tw.div`
  font-b-28 text-black
`;

const TradeDesc = tw.div`
  font-r-16 text-gray3
`;

const TradeCardWrapper = tw.div`
  grid grid-cols-2 gap-16
`;

const RightContainer = styled.div(() => [
  tw`flex flex-col gap-24 px-24 py-20 bg-white w-468 rounded-20 mt-96`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const ToggleText = tw.div`
  font-b-18 rounded-40
`;

const InputWrapper = tw.div`
  flex flex-col gap-12
`;

const TradeWrapper = tw.div`
  flex flex-col gap-12 relative
`;

const IconWrapper = tw.div`
  absolute absolute-center flex-center w-32 h-32 rounded-16 border-solid border-gray1 bg-white
`;

const RateWrapper = tw.div`
  flex gap-6 justify-end
`;

const RateText = tw.div`
  font-r-14 text-gray3
`;

const RateValue = tw.div`
  font-r-14 text-gray4
`;

export default TradePage;
