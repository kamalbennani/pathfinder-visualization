import { keyframes } from "styled-components";

export const animatePathNodes = keyframes`
  0% {
    opacity: 0;
    background-color: #9DE3AD;
  }

  100% {
    opacity: 1;
    background-color: #F8FFAE;
  }
`;

export const animateVisitedNodes = keyframes`
  0% {
    opacity: 0;
    background-color: rgba(0, 0, 66, 0.75);
  }

  100% {
    opacity: 1;
    background-color: rgba(0, 190, 218, 0.75);
  }
`;
