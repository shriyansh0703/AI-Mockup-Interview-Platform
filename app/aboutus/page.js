import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';

const developers = [
  { name: 'Tanmay Kalra', linkedin: 'https://www.linkedin.com/in/tanmay-kalra-09oct/' },
  { name: 'Vaishnav Gupta', linkedin: 'https://www.linkedin.com/in/vaishnavgupta/' },
  { name: 'Shriyansh Goel', linkedin: 'https://www.linkedin.com/in/shriyansh-g-b944742a4/' },
  { name: 'Saksham Agrawal', linkedin: 'https://www.linkedin.com/in/saksham-agrawal-b10686331/' },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
      <Image src="/2944658_28388-removebg-preview.png" alt="Company Logo" width={250} height={250} className="mb-6" />
      
      {/* Company Description */}
      <h1 className="text-3xl font-bold text-gray-800">AI Mock Interview</h1>
      {/* <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center">
      AI-Based Mock Interview lets you practice interviews tailored to your tech stack and requirements. The AI conducts a realistic session and provides detailed feedback on your performance, helping you improve and boost your confidence for real interviews. 
      </p> */}
      
      {/* Developer Section */}
      <h2 className="text-xl font-semibold text-gray-700 mt-8">Created with ❤️ by</h2>
      <ul className="mt-4 flex flex-col items-start space-y-2 mb-30">
        {developers.map((dev, index) => (
          <li key={index} className="flex items-center space-x-2">
            <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-600 text-2xl hover:text-blue-800 transition" />
            </a>
            <p className="text-lg font-medium text-gray-700">{dev.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
