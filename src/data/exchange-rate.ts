export const getUstbPriceDiscountRate = (startDate: Date, ytm: number = 0.05285) => {
  const now = new Date();
  const daily = ytm / 365.0;
  const days = (now.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  if (days <= 0) return 1;
  return 1 / (1 + daily * days);
};

export const exchangeRate = {
  result: 'success',
  documentation: 'https://www.exchangerate-api.com/docs',
  terms_of_use: 'https://www.exchangerate-api.com/terms',
  time_last_update_unix: 1692230401,
  time_last_update_utc: 'Thu, 17 Aug 2023 00:00:01 +0000',
  time_next_update_unix: 1692316801,
  time_next_update_utc: 'Fri, 18 Aug 2023 00:00:01 +0000',
  base_code: 'USD',
  conversion_rates: {
    USD: 1,
    AED: 3.6725,
    AFN: 84.4672,
    ALL: 96.5487,
    AMD: 386.2634,
    ANG: 1.79,
    AOA: 834.1212,
    ARS: 350.0,
    AUD: 1.5538,
    AWG: 1.79,
    AZN: 1.7023,
    BAM: 1.7959,
    BBD: 2.0,
    BDT: 109.507,
    BGN: 1.7954,
    BHD: 0.376,
    BIF: 2828.3963,
    BMD: 1.0,
    BND: 1.359,
    BOB: 6.9425,
    BRL: 4.9831,
    BSD: 1.0,
    BTN: 83.216,
    BWP: 13.6303,
    BYN: 2.9729,
    BZD: 2.0,
    CAD: 1.3517,
    CDF: 2438.1765,
    CHF: 0.8798,
    CLP: 863.6693,
    CNY: 7.3139,
    COP: 4104.1798,
    CRC: 536.6795,
    CUP: 24.0,
    CVE: 101.2474,
    CZK: 22.0922,
    DJF: 177.721,
    DKK: 6.8502,
    DOP: 56.7777,
    DZD: 136.0524,
    EGP: 30.9052,
    ERN: 15.0,
    ETB: 55.2893,
    EUR: 0.9182,
    FJD: 2.2653,
    FKP: 0.7853,
    FOK: 6.8503,
    GBP: 0.7853,
    GEL: 2.6227,
    GGP: 0.7853,
    GHS: 11.302,
    GIP: 0.7853,
    GMD: 63.2137,
    GNF: 8592.572,
    GTQ: 7.8684,
    GYD: 209.5026,
    HKD: 7.8314,
    HNL: 24.6668,
    HRK: 6.9183,
    HTG: 136.2844,
    HUF: 354.4935,
    IDR: 15330.738,
    ILS: 3.7611,
    IMP: 0.7853,
    INR: 83.2161,
    IQD: 1311.4135,
    IRR: 42068.4623,
    ISK: 132.03,
    JEP: 0.7853,
    JMD: 155.0377,
    JOD: 0.709,
    JPY: 146.0063,
    KES: 144.2676,
    KGS: 88.2567,
    KHR: 4151.693,
    KID: 1.5537,
    KMF: 451.7339,
    KRW: 1340.2598,
    KWD: 0.3079,
    KYD: 0.8333,
    KZT: 458.6829,
    LAK: 19256.7042,
    LBP: 15000.0,
    LKR: 321.0708,
    LRD: 189.9543,
    LSL: 19.1554,
    LYD: 4.821,
    MAD: 9.8899,
    MDL: 17.6776,
    MGA: 4488.9746,
    MKD: 56.3393,
    MMK: 2106.4915,
    MNT: 3456.9042,
    MOP: 8.0664,
    MRU: 37.9402,
    MUR: 45.6186,
    MVR: 15.4707,
    MWK: 1087.6648,
    MXN: 17.1254,
    MYR: 4.6302,
    MZN: 63.959,
    NAD: 19.1554,
    NGN: 760.3941,
    NIO: 36.6375,
    NOK: 10.5718,
    NPR: 133.1455,
    NZD: 1.6822,
    OMR: 0.3845,
    PAB: 1.0,
    PEN: 3.7117,
    PGK: 3.6258,
    PHP: 56.6649,
    PKR: 295.624,
    PLN: 4.0957,
    PYG: 7287.0868,
    QAR: 3.64,
    RON: 4.5256,
    RSD: 107.4138,
    RUB: 96.3912,
    RWF: 1202.9863,
    SAR: 3.75,
    SBD: 8.5087,
    SCR: 13.6548,
    SDG: 553.6387,
    SEK: 10.8976,
    SGD: 1.359,
    SHP: 0.7853,
    SLE: 20.6456,
    SLL: 20645.6368,
    SOS: 570.4594,
    SRD: 38.1626,
    SSP: 1005.2417,
    STN: 22.4964,
    SYP: 13036.8076,
    SZL: 19.1554,
    THB: 35.4159,
    TJS: 10.952,
    TMT: 3.5041,
    TND: 3.0949,
    TOP: 2.3718,
    TRY: 27.0795,
    TTD: 6.7675,
    TVD: 1.5537,
    TWD: 31.9388,
    TZS: 2502.7348,
    UAH: 36.9276,
    UGX: 3725.671,
    UYU: 38.4611,
    UZS: 12082.3589,
    VES: 31.6117,
    VND: 23957.89,
    VUV: 120.972,
    WST: 2.7676,
    XAF: 602.3118,
    XCD: 2.7,
    XDR: 0.7505,
    XOF: 602.3118,
    XPF: 109.5728,
    YER: 250.5432,
    ZAR: 19.1605,
    ZMW: 19.5432,
    ZWL: 4569.4981,
    USTB: 0.984848 * getUstbPriceDiscountRate(new Date(2023, 8, 17)),
  },
};
