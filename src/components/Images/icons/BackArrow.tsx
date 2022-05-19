import React from "react";

export const BackArrow: React.VFC = () => {
  return (
    <svg
      width="26"
      height="22"
      viewBox="0 0 26 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 11H2"
        stroke="#777D7F"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2L2 11L11 20"
        stroke="#777D7F"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
