import React from 'react';

function Footer() {
  const date = new Date();
  return (
    <div className="py-1 bg-black text-center text-white font-mono tracking-widest">
      {date.toDateString()}
    </div>
  );
}

export default Footer;
