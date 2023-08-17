import { SVGProps } from 'react';

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  color?: string;
}

export const IconArrowDown = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6264 7.95923C13.0169 7.56872 13.6501 7.56873 14.0406 7.95926C14.4311 8.34979 14.4311 8.98295 14.0406 9.37347L8.70827 14.7056C8.70789 14.706 8.7075 14.7064 8.70712 14.7068C8.70711 14.7068 8.7071 14.7068 8.7071 14.7068C8.31657 15.0973 7.68343 15.0973 7.29291 14.7068C7.29291 14.7068 7.29291 14.7068 7.2929 14.7068L7.29288 14.7068L1.95941 9.37347C1.56888 8.98295 1.56887 8.34979 1.95939 7.95926C2.3499 7.56873 2.98307 7.56872 3.3736 7.95923L7.33317 11.9187L7.33317 1.99967C7.33317 1.63148 7.63165 1.333 7.99984 1.33301C8.36803 1.33301 8.66651 1.63149 8.66651 1.99968L8.66651 11.919L12.6264 7.95923Z"
      fill={color ?? '#3358FF'}
    />
  </svg>
);

export const IconCheck = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.1379 4.86225C13.3983 5.1226 13.3983 5.54471 13.1379 5.80506L7.13791 11.8051C6.87756 12.0654 6.45545 12.0654 6.1951 11.8051L2.86177 8.47173C2.60142 8.21138 2.60142 7.78927 2.86177 7.52892C3.12212 7.26857 3.54423 7.26857 3.80458 7.52892L6.6665 10.3909L12.1951 4.86225C12.4554 4.6019 12.8776 4.6019 13.1379 4.86225Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconDown = ({ color, ...rest }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.1878 17.9823C11.8735 18.0421 11.5359 17.9504 11.2926 17.7071C11.2904 17.7049 11.2882 17.7027 11.286 17.7004L4.2216 10.636C3.83108 10.2455 3.83108 9.61234 4.2216 9.22182C4.61213 8.83129 5.24529 8.83129 5.63582 9.22182L11.9998 15.5858L18.3637 9.22183C18.7542 8.8313 19.3874 8.8313 19.7779 9.22183C20.1684 9.61235 20.1684 10.2455 19.7779 10.636L12.7124 17.7016C12.7105 17.7034 12.7087 17.7053 12.7069 17.7071C12.5597 17.8543 12.378 17.946 12.1878 17.9823Z"
      fill={color ?? '#787C9C'}
    />
  </svg>
);

export const IconLogOut = ({ color, ...rest }: IconProps) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 5.00033C5.5 4.88527 5.52332 4.77565 5.56549 4.67595C5.62281 4.54043 5.71497 4.42322 5.83074 4.33556C5.94916 4.24588 6.0923 4.18712 6.24813 4.17129C6.27614 4.16845 6.30457 4.16699 6.33333 4.16699H11.3333C11.7936 4.16699 12.1667 4.54009 12.1667 5.00033C12.1667 5.46056 11.7936 5.83366 11.3333 5.83366H7.16667L7.16667 14.167H11.3333C11.7936 14.167 12.1667 14.5401 12.1667 15.0003C12.1667 15.4606 11.7936 15.8337 11.3333 15.8337H6.33333C6.30457 15.8337 6.27614 15.8322 6.24813 15.8294C5.82792 15.7867 5.5 15.4318 5.5 15.0003V5.00033ZM8.83333 10.0003C8.83333 9.54009 9.20643 9.16699 9.66667 9.16699H14.389L12.8616 7.63958C12.5362 7.31414 12.5362 6.78651 12.8616 6.46107C13.1871 6.13563 13.7147 6.13563 14.0401 6.46107L16.9872 9.40812C17.3126 9.73356 17.3126 10.2612 16.9872 10.5866L16.9724 10.601L14.0393 13.5342C13.7139 13.8596 13.1862 13.8596 12.8608 13.5342C12.5353 13.2087 12.5353 12.6811 12.8608 12.3557L14.3828 10.8337H9.66667C9.20643 10.8337 8.83333 10.4606 8.83333 10.0003Z"
      fill={color ?? '#B7B9CE'}
    />
  </svg>
);

export const IconNext = ({ color, ...rest }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.2929 4.7071C11.9024 4.31657 11.9024 3.6834 12.2929 3.29288C12.6834 2.90236 13.3166 2.90237 13.7071 3.2929L21.7071 11.2931C21.7071 11.2931 21.7071 11.2931 21.7071 11.2931C22.0976 11.6837 22.0976 12.3168 21.7071 12.7073C21.7071 12.7073 21.7071 12.7073 21.7071 12.7073L21.7071 12.7074L13.7071 20.7076C13.3166 21.0981 12.6835 21.0981 12.2929 20.7076C11.9024 20.3171 11.9024 19.6839 12.2929 19.2934L18.5856 13.0005L2.99999 13.0005C2.44771 13.0005 2 12.5528 2 12.0005C2 11.4482 2.44772 11.0005 3.00001 11.0005L18.5861 11.0005L12.2929 4.7071Z"
      fill={color ?? '#3358FF'}
    />
  </svg>
);

export const IconCancel = ({ color, ...rest }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.6357 16.9494C5.24517 17.3399 5.24517 17.9731 5.6357 18.3636C6.02622 18.7541 6.65939 18.7541 7.04991 18.3636L11.9996 13.4139L16.9494 18.3636C17.3399 18.7541 17.9731 18.7541 18.3636 18.3636C18.7541 17.9731 18.7541 17.3399 18.3636 16.9494L13.4138 11.9997L18.3636 7.04988C18.7541 6.65936 18.7541 6.02619 18.3636 5.63567C17.9731 5.24514 17.3399 5.24514 16.9494 5.63567L11.9996 10.5854L7.04988 5.63568C6.65936 5.24516 6.02619 5.24516 5.63567 5.63568C5.24514 6.02621 5.24514 6.65937 5.63567 7.0499L10.5854 11.9997L5.6357 16.9494Z"
      fill={color ?? '#787C9C'}
    />
  </svg>
);

export const IconActive = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.33333 8C3.33333 5.42267 5.42267 3.33333 8 3.33333C8.89837 3.33333 9.73557 3.58653 10.4465 4.02513C10.7598 4.21846 11.1705 4.12116 11.3639 3.80782C11.5572 3.49447 11.4599 3.08372 11.1466 2.89039C10.2313 2.32569 9.15266 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.188 14 13.7949 11.514 13.9885 8.37437C14.0111 8.00688 13.7316 7.69059 13.3641 7.66793C12.9966 7.64527 12.6803 7.92481 12.6577 8.2923C12.5072 10.7331 10.4791 12.6667 8 12.6667C5.42267 12.6667 3.33333 10.5773 3.33333 8ZM13.862 4.94281C14.1223 4.68246 14.1223 4.26035 13.862 4C13.6016 3.73965 13.1795 3.73965 12.9192 4L7.86189 9.05719L5.80474 7C5.54439 6.73965 5.12228 6.73965 4.86193 7C4.60158 7.26035 4.60158 7.68246 4.86193 7.94281L7.39049 10.4714C7.65084 10.7318 8.07295 10.7318 8.3333 10.4714L13.862 4.94281Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconLocked = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.99984 4.66634V5.99967H5.99984V4.66634C5.99984 3.56177 6.89527 2.66634 7.99984 2.66634C9.10441 2.66634 9.99984 3.56177 9.99984 4.66634ZM4.6665 5.99967V4.66634C4.6665 2.82539 6.15889 1.33301 7.99984 1.33301C9.84079 1.33301 11.3332 2.82539 11.3332 4.66634V5.99967H12.148C12.8025 5.99967 13.3332 6.55399 13.3332 7.23777V13.4282C13.3332 14.112 12.8025 14.6663 12.148 14.6663H3.85169C3.19713 14.6663 2.6665 14.112 2.6665 13.4282V7.23777C2.6665 6.55399 3.19713 5.99967 3.85169 5.99967H4.6665ZM11.3332 7.33301H4.6665H3.99984V13.333H11.9998V7.33301H11.3332ZM8.6665 10.4117C8.87109 10.2286 8.99984 9.96251 8.99984 9.66634C8.99984 9.11406 8.55212 8.66634 7.99984 8.66634C7.44755 8.66634 6.99984 9.11406 6.99984 9.66634C6.99984 9.96251 7.12859 10.2286 7.33317 10.4117V11.333C7.33317 11.7012 7.63165 11.9997 7.99984 11.9997C8.36803 11.9997 8.6665 11.7012 8.6665 11.333V10.4117Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconTotal = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3335 7.99967C13.3335 10.9452 10.9457 13.333 8.00016 13.333C5.05464 13.333 2.66683 10.9452 2.66683 7.99967C2.66683 5.05416 5.05464 2.66634 8.00016 2.66634C10.9457 2.66634 13.3335 5.05416 13.3335 7.99967ZM14.6668 7.99967C14.6668 11.6816 11.6821 14.6663 8.00016 14.6663C4.31826 14.6663 1.3335 11.6816 1.3335 7.99967C1.3335 4.31778 4.31826 1.33301 8.00016 1.33301C11.6821 1.33301 14.6668 4.31778 14.6668 7.99967ZM8.00016 3.99967C8.36835 3.99967 8.66683 4.29815 8.66683 4.66634V7.33301H11.3335C11.7017 7.33301 12.0002 7.63148 12.0002 7.99967C12.0002 8.36786 11.7017 8.66634 11.3335 8.66634H8.66683V11.333C8.66683 11.7012 8.36835 11.9997 8.00016 11.9997C7.63197 11.9997 7.3335 11.7012 7.3335 11.333V8.66634H4.66683C4.29864 8.66634 4.00016 8.36786 4.00016 7.99967C4.00016 7.63148 4.29864 7.33301 4.66683 7.33301H7.3335V4.66634C7.3335 4.29815 7.63197 3.99967 8.00016 3.99967Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconPercentage = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      d="M4.43771 8.24275C3.92144 8.24275 3.48148 8.12603 3.11785 7.89258C2.75421 7.65465 2.47811 7.32917 2.28956 6.91615C2.10101 6.49864 2.00449 6.01604 2 5.46834C2.00449 4.91615 2.10325 4.42906 2.2963 4.00706C2.48934 3.58506 2.76768 3.25734 3.13131 3.02389C3.49944 2.78596 3.9349 2.66699 4.43771 2.66699C4.95847 2.66699 5.40292 2.78596 5.77104 3.02389C6.14366 3.25734 6.422 3.58506 6.60606 4.00706C6.79012 4.42457 6.88215 4.91166 6.88215 5.46834C6.88215 6.02053 6.78788 6.50538 6.59933 6.92288C6.41077 7.34039 6.13019 7.66587 5.75758 7.89931C5.38945 8.12827 4.94949 8.24275 4.43771 8.24275ZM4.43771 6.78147C4.61279 6.78147 4.76094 6.7276 4.88215 6.61985C5.00337 6.51211 5.09315 6.36172 5.15152 6.16868C5.21437 5.97114 5.24804 5.7377 5.25253 5.46834C5.24804 5.19 5.21661 4.95206 5.15825 4.75453C5.10438 4.55251 5.01459 4.39763 4.88889 4.28989C4.76768 4.17765 4.61728 4.12154 4.43771 4.12154C4.26712 4.12154 4.12346 4.1799 4.00673 4.29662C3.8945 4.40886 3.80471 4.56598 3.73737 4.768C3.67452 4.97002 3.6431 5.20347 3.6431 5.46834C3.6431 5.73321 3.67452 5.96441 3.73737 6.16194C3.80471 6.35947 3.89675 6.51211 4.01347 6.61985C4.13019 6.7276 4.2716 6.78147 4.43771 6.78147ZM11.4478 13.3337C10.936 13.3337 10.4983 13.2147 10.1347 12.9768C9.77553 12.7433 9.49944 12.4201 9.3064 12.0071C9.11784 11.5896 9.02357 11.1069 9.02357 10.5592C9.02357 10.0071 9.12009 9.51997 9.31313 9.09797C9.51066 8.67597 9.789 8.34825 10.1481 8.1148C10.5118 7.87687 10.945 7.7579 11.4478 7.7579C11.9686 7.7579 12.413 7.87687 12.7811 8.1148C13.1493 8.34825 13.4276 8.67597 13.6162 9.09797C13.8047 9.51548 13.9012 10.0026 13.9057 10.5592C13.9012 11.1114 13.8047 11.5963 13.6162 12.0138C13.4276 12.4313 13.147 12.7545 12.7744 12.9835C12.4063 13.2169 11.9641 13.3337 11.4478 13.3337ZM11.4478 11.8791C11.6229 11.8791 11.7733 11.8252 11.899 11.7175C12.0247 11.6053 12.1167 11.4526 12.1751 11.2596C12.2334 11.0665 12.2626 10.8331 12.2626 10.5592C12.2626 10.2899 12.2334 10.0542 12.1751 9.85218C12.1167 9.64567 12.0247 9.48854 11.899 9.3808C11.7778 9.27305 11.6274 9.21918 11.4478 9.21918C11.2772 9.21918 11.1336 9.2753 11.0168 9.38753C10.9001 9.49976 10.8103 9.65914 10.7475 9.86564C10.6891 10.0677 10.6577 10.2989 10.6532 10.5592C10.6532 10.8286 10.6869 11.0621 10.7542 11.2596C10.8215 11.4526 10.9136 11.6053 11.0303 11.7175C11.147 11.8252 11.2862 11.8791 11.4478 11.8791ZM10.3906 3.13164H12.1818L5.47475 12.8825H3.6835L10.3906 3.13164Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconPrice = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.6668 2C10.2986 2 10.0002 2.29848 10.0002 2.66667C10.0002 3.03486 10.2986 3.33333 10.6668 3.33333H12.4312L8.42873 7.48402L6.76577 5.75947C6.64012 5.62916 6.46689 5.55556 6.28588 5.55556C6.10486 5.55556 5.93163 5.62916 5.80598 5.75947L1.52027 10.2039C1.26469 10.4689 1.27237 10.891 1.53741 11.1466C1.80245 11.4021 2.22449 11.3945 2.48006 11.1294L6.28588 7.18265L7.94884 8.9072C8.07449 9.0375 8.24772 9.11111 8.42873 9.11111C8.60975 9.11111 8.78298 9.0375 8.90863 8.9072L13.3335 4.31845V6C13.3335 6.36819 13.632 6.66667 14.0002 6.66667C14.3684 6.66667 14.6668 6.36819 14.6668 6V2.66667C14.6668 2.29848 14.3684 2 14.0002 2H10.6668ZM2.00016 12.6667C1.63197 12.6667 1.3335 12.9651 1.3335 13.3333C1.3335 13.7015 1.63197 14 2.00016 14H14.0002C14.3684 14 14.6668 13.7015 14.6668 13.3333C14.6668 12.9651 14.3684 12.6667 14.0002 12.6667H2.00016Z"
      fill={color ?? 'white'}
    />
  </svg>
);

export const IconPlus = ({ color, ...rest }: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z"
      fill={color ?? '#080117'}
    />
  </svg>
);

export const IconWithdraw = ({ color, ...rest }: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.666504 2.66667C0.666504 2.29848 0.964981 2 1.33317 2H14.6665C15.0347 2 15.3332 2.29848 15.3332 2.66667V5.33333C15.3332 5.70152 15.0347 6 14.6665 6C14.2983 6 13.9998 5.70152 13.9998 5.33333V3.33333H1.99984V5.33333C1.99984 5.70152 1.70136 6 1.33317 6C0.964981 6 0.666504 5.70152 0.666504 5.33333V2.66667ZM3.99984 5.33333V12.6667H11.9998V5.33333H3.99984ZM3.33317 4C2.96498 4 2.6665 4.29848 2.6665 4.66667V13.3333C2.6665 13.7015 2.96498 14 3.33317 14H12.6665C13.0347 14 13.3332 13.7015 13.3332 13.3333V4.66667C13.3332 4.29848 13.0347 4 12.6665 4H3.33317ZM8.66634 7C8.66634 6.63181 8.36786 6.33333 7.99967 6.33333C7.63148 6.33332 7.33301 6.6318 7.33301 6.99999V9.39038L7.13791 9.19528C6.87756 8.93493 6.45545 8.93493 6.1951 9.19528C5.93475 9.45563 5.93475 9.87774 6.1951 10.1381L7.52843 11.4714C7.78878 11.7318 8.21089 11.7318 8.47124 11.4714C8.4714 11.4713 8.47156 11.4711 8.47172 11.4709L9.80457 10.1381C10.0649 9.87774 10.0649 9.45563 9.80457 9.19528C9.54423 8.93493 9.12212 8.93493 8.86177 9.19528L8.66634 9.39071V7Z"
      fill={color ?? 'white'}
    />
  </svg>
);
