import { useState } from "react";

const StarRating = ({ maxStars = 5, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitRating = () => {
    if (onSubmit) {
      onSubmit(rating);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${
              star <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-400"
            }`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max={maxStars}
          step="1"
          value={rating}
          readOnly
          className="p-2 border border-gray-300 rounded text-center w-20"
        />
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSubmitRating}
          disabled={!rating}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default StarRating;
