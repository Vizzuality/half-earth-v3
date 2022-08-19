import React, { useState, useEffect } from 'react';
import Component from './component.jsx';

function Container(props) {
  const { children, onClose } = props;
  const [isClosed, setIsClosed] = useState(false);
  const handleCardClose = () => {
    setIsClosed(true);
    if (onClose) {
      onClose();
    }
  };
  useEffect(() => {
    // display the content of the card whenever the children are updated
    setIsClosed(false);
  }, [children]);
  return (
    <Component
      isClosed={isClosed}
      onCardClose={handleCardClose}
      {...props}
    />
  );
}

export default Container;
