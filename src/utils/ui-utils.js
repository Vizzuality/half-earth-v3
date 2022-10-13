import { useEffect } from 'react';

export function useClickOutside(ref, callback, exceptionRef) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(event.target) &&
        (!exceptionRef ||
          (exceptionRef &&
            exceptionRef.current &&
            !exceptionRef.current.contains(event.target)))
      ) {
        callback();
      }
    }

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
