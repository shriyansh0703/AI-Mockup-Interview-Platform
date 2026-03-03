import React from 'react';
import Image from 'next/image';

function Logo() {
  return (
    <div className="flex items-center gap-4 ml-8">
      <Image 
        src="/Blue_Modern_Technology_and_Software_Company_Logo-removebg-preview.png"  
        alt="AI Mock Interview Logo" 
        width={250} 
        height={250} 
      />
    </div>
  );
}

export default Logo;