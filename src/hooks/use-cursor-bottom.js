/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const useIsCursorBottom = ({ distance = 100 }) => {
  const [cursorBottom, setCursorBottom] = useState(false);
  useEffect(() => {
    const windowHeight = window.innerHeight;
    document.addEventListener('mousemove', (event) => {
      const mouseYPosition = event.clientY;
      if ((windowHeight - mouseYPosition) < distance) {
        setCursorBottom(true);
      }
      if ((windowHeight - mouseYPosition) > distance) {
        setCursorBottom(false);
      }
    });
  }, [document]);
  return cursorBottom;
};
export default useIsCursorBottom;
