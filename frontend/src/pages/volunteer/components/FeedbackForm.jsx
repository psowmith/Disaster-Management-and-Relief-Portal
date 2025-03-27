import { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    alert('Feedback submitted!');
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-black">Submit Feedback</h3>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        className="w-full p-2 mt-4"
        placeholder="Write your feedback here"
      />
      <button className="mt-4 p-2 bg-green-500 text-white" onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
};

export default FeedbackForm;
