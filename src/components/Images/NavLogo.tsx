import React from "react";

export const NavLogo: React.FC<{ height?: string; width?: string }> = ({
  height,
  width,
}) => {
  return (
    <svg
      width={width || "163"}
      height={height || "30"}
      viewBox={width && height ? `0 0 ${width} ${height}` : "0 0 163 30"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M72.5319 30C80.7928 30 83.9232 25.8261 83.9232 21.1739C83.9232 16.913 81.8363 13.6957 75.7058 12.5217L70.5319 11.5217C67.1406 10.8696 66.358 10.4348 66.358 8.56522C66.358 6.73913 67.5319 5.91304 71.271 5.91304C75.5754 5.91304 76.8363 6.91304 76.8363 9.95652V10.4348H83.271V10.087C83.271 4.30435 79.7928 0 71.4884 0C63.1406 0 59.8797 4.3913 59.8797 8.82609C59.8797 13.3478 62.2276 16.1739 67.7928 17.1304L72.9232 18.0435C77.0102 18.7391 77.445 19.4348 77.445 21.3913C77.445 23.3478 76.5319 24.087 72.8363 24.087C67.5754 24.087 66.4015 23.1739 66.4015 19.9565V19.5217H60.0102V20.087C60.0102 26.5217 63.9667 30 72.5319 30Z"
        fill="#3E3E3E"
      />
      <path
        d="M6.52174 18.7826V29.5652H0V0.434782H21.8696V6.30435H6.52174V12.9565H21.2174V18.7826H6.52174Z"
        fill="#3E3E3E"
      />
      <path
        d="M53.3594 18.2174C53.3594 25.4783 49.055 30 40.5768 30C32.0985 30 27.7942 25.4783 27.7942 18.2174V0.434782H34.2724V18.1304C34.2724 22.3043 35.7507 23.6957 40.5768 23.6957C45.3594 23.6957 46.8376 22.3043 46.8376 18.1304V0.434782H53.3594V18.2174Z"
        fill="#3E3E3E"
      />
      <path
        d="M96.1124 0.434782V29.5652H89.5907V0.434782H96.1124Z"
        fill="#3E3E3E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M116.427 30C125.123 30 130.383 24.087 130.383 15C130.383 5.91304 125.123 0 116.427 0C107.731 0 102.427 5.91304 102.427 15C102.427 24.087 107.731 30 116.427 30ZM123.555 8.11871H109.792V21.8813H123.555V8.11871Z"
        fill="#3E3E3E"
      />
      <path
        d="M143.088 15.7826V29.5652H136.566V0.434782H143.522L152.957 15.0435L155.392 18.9565H155.827L155.74 15.0435V0.434782H162.262V29.5652H155.305L146.262 15.7826L143.435 11.3043H143.001L143.088 15.7826Z"
        fill="#3E3E3E"
      />
    </svg>
  );
};
