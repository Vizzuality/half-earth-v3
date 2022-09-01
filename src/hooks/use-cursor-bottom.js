/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const useIsCursorBottom = () => {
  const [cursorBottom, setCursorBottom] = useState(false);
  useEffect(() => {
    const windowHeight = window.innerHeight;
    document.addEventListener('mousemove', (event) => {
      const mouseYPosition = event.clientY;
      if ((windowHeight - mouseYPosition) < 50) {
        setCursorBottom(true);
      }
      if ((windowHeight - mouseYPosition) > 50) {
        setCursorBottom(false);
      }
    });
  }, [document]);
  return cursorBottom;
};
export default useIsCursorBottom;
