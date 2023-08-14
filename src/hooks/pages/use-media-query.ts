import { useMediaQuery as useResponsive } from 'react-responsive';

import { BREAKPOINT } from '~/constants';

export const useMediaQuery = () => {
  const sm = useResponsive({ query: `${BREAKPOINT.MEDIA_SM}` });
  const md = useResponsive({ query: `${BREAKPOINT.MEDIA_MD}` });
  const lg = useResponsive({ query: `${BREAKPOINT.MEDIA_LG}` });

  const onlySm = useResponsive({ query: `${BREAKPOINT.MEDIA_ONLY_SM}` });
  const onlyMd = useResponsive({ query: `${BREAKPOINT.MEDIA_ONLY_MD}` });
  const onlyLg = useResponsive({ query: `${BREAKPOINT.MEDIA_ONLY_LG}` });

  return {
    sm,
    md,
    lg,
    onlySm,
    onlyMd,
    onlyLg,
  };
};
