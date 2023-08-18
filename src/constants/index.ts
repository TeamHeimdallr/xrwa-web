import LogoBahama from '~/assets/images/logo-bahama.png';
import LogoKrw from '~/assets/images/logo-krw.png';
import LogoNigeria from '~/assets/images/logo-nigeria.png';
import LogoUstb from '~/assets/images/logo-ustb.png';
import { TOKEN } from '~/types/xrpl/cbdc';

/**
 * @description 서버 START ENV / MOCK 환경
 */
export const IS_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';
export const IS_LOCAL = import.meta.env.VITE_START_ENV === 'local';
export const IS_DEV = import.meta.env.VITE_START_ENV === 'dev';
export const IS_STAGING = import.meta.env.VITE_START_ENV === 'staging';
export const IS_PROD = import.meta.env.VITE_START_ENV === 'prod';

export const DEV_ENV = IS_MOCK || IS_LOCAL || IS_DEV;
export const PROD_ENV = IS_PROD || IS_STAGING;

/**
 * @description 블록체인 환경
 */
export const IS_MAINNET = import.meta.env.VITE_BLOCKCHAIN_ENV === 'mainnet';

/**
 * @description BE API ENDPOINT / FE BASE URL // ASSET URL
 */
export const API_URL = IS_PROD ? '' : IS_STAGING ? '' : IS_DEV ? '' : 'http://localhost:8080';
export const BASE_URL = IS_PROD ? '' : IS_STAGING ? '' : IS_DEV ? '' : 'http://localhost:3000';
export const ASSET_URL = '';

/**
 * @description RESPONSIVE BREAKPOINT
 */
export const BREAKPOINT = {
  SM: 0,
  MD: 848,
  LG: 1280,

  MEDIA_SM: '(min-width: 0px)',
  MEDIA_MD: '(min-width: 848px)',
  MEDIA_LG: '(min-width: 1280px)',

  MEDIA_ONLY_SM: '(min-width: 0px) and (max-width: 847px)',
  MEDIA_ONLY_MD: '(min-width: 848px) and (max-width: 1279px)',
  MEDIA_ONLY_LG: '(min-width: 1280px)',
};

/**
 * @description FORMAT NUMBER 를 진행할때 UNIT(K,M,B,T) 를 붙이는 기준
 */
export const FORMAT_NUMBER_THRESHOLD = 1000000000;

/**
 * @description XRPL NETWORK
 */
export const XRPL_JSON_RPC_TEST_NET = import.meta.env.VITE_XRPL_JSON_RPC_TEST_NET;
export const XRPL_WSS_TEST_NET = import.meta.env.VITE_XRPL_WSS_TEST_NET;

/**
 * @description XUMM api key, secret
 */
export const XUMM_API_KEY = import.meta.env.VITE_XUMM_API_KEY;
export const XUMM_API_SECRET = import.meta.env.VITE_XUMM_API_SECRET;

/**
 * @description wallet 관리 key
 */
export const XRPL_WALLET_KEY = 'xrpl-wallet';

export const POPUP_ID = {
  CONNECT: 'CONNECT',
  CURRENCY: 'CURRENCY',
};

/**
 * @description token image
 */
export const TOKEN_IMAGE: Record<TOKEN, { image: string; fullname: string }> = {
  BSD: {
    image: LogoBahama,
    fullname: 'Bahama CBDC Token',
  },
  ENA: {
    image: LogoNigeria,
    fullname: 'Nigeria CBDC Token',
  },
  KRW: {
    image: LogoKrw,
    fullname: 'South Korea CBDC Token',
  },
  USTB: {
    image: LogoUstb,
    fullname: 'South Korea CBDC Token',
  },
};

/**
 * @description wallet seeds
 */
export const BSD_WALLET_SEED = import.meta.env.VITE_BSD_WALLET_SEED;
export const ENA_WALLET_SEED = import.meta.env.VITE_ENA_WALLET_SEED;
export const KRW_WALLET_SEED = import.meta.env.VITE_KRW_WALLET_SEED;

export const USTB_MASTER_WALLET_SEED = import.meta.env.VITE_USTB_MASTER_WALLET_SEED;

export const TOKEN_LIST = ['BSD', 'ENA', 'KRW', 'USTB'];
