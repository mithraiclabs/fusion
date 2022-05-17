import React from "react";

export const LinkOut: React.VFC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.375 3.125H3.125C2.56141 3.125 2.02091 3.34888 1.6224 3.7474C1.22388 4.14591 1 4.68641 1 5.25V15.875C1 16.4386 1.22388 16.9791 1.6224 17.3776C2.02091 17.7761 2.56141 18 3.125 18H13.75C14.3136 18 14.8541 17.7761 15.2526 17.3776C15.6511 16.9791 15.875 16.4386 15.875 15.875V11.625M11.625 1H18M18 1V7.375M18 1L7.375 11.625"
        stroke="#777777"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
