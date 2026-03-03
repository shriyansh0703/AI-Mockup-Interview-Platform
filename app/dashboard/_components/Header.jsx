import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from '@/app/_components/Logo';

function Header() {
  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-4">
      <Logo />
      <div className="flex items-center gap-4">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          Premium
        </Button>
      </div>
    </div>
  );
}

export default Header;