import React from 'react';

const Divider = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 bg-border/10" />
      <div className="relative h-px bg-border/20" />
    </div>
  );
};

export default Divider;
