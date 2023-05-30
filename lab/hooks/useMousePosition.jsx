import React, { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
     
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

const AComponent = () => {
  const position = useMousePosition();
  const { x, y } = position;
  return (
    <>
      <div>x: {x}</div>
      <div>x: {y}</div>
    </>
  )
};
