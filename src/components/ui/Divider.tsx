import React from 'react';

const Divider = () => {
  return (
    <div className="relative w-full h-[2px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent animate-[slide_3s_linear_infinite]" />
    </div>
  );
};

export default Divider;
