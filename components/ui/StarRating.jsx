import { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ onChange, value = 0 }) => {
  const [hovered, setHovered] = useState(null);

  const handleClick = (rating) => {
    onChange(rating);
  };

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            (hovered || value) >= star ? 'fill-yellow-400 stroke-yellow-500' : 'stroke-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;