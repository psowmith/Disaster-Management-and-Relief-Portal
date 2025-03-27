// src/pages/user/Feedback.jsx
import  { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    alert("Thank you for your feedback!");
    setFeedback("");
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md"
        rows="5"
        placeholder="Write your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Feedback;
