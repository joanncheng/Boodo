import React, { useRef, useEffect } from 'react';

const useOutsideClicker = (ref, onDismiss) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        onDismiss();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

const OutsideClicker = ({ children, onDismiss }) => {
  const wrapperRef = useRef(null);
  useOutsideClicker(wrapperRef, onDismiss);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClicker;
