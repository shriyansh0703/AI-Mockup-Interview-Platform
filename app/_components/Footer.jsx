import React from 'react'
import { useRouter } from "next/navigation";

function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-purple-600 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">© 2025 AI Mock Interview. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="text-sm hover:text-purple-300 mx-3" onClick={() => router.push('/privacypolicy')}>Privacy Policy</a>
          <a href="#" className="text-sm hover:text-purple-300 mx-3" onClick={() => router.push('/terms&condition')}>Terms & Conditions</a>
          <a href="#" className="text-sm hover:text-purple-300 mx-3" onClick={() => router.push('/aboutus')}>About Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer