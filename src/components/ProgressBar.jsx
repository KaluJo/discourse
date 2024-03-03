import React, { useState, useRef, useEffect } from 'react';

const ProgressBar = () => {
  const [percentage, setPercentage] = useState(50);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.style.background = `linear-gradient(to right, #6FC0C2 0%, #6FC0C2 ${percentage}%, #C8D869 ${percentage}%, #C8D869 100%)`;
    }
  }, [percentage]);

  const handleChange = (e) => {
    setPercentage(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="range"
        min="0"
        max="100"
        value={percentage}
        onChange={handleChange}
        ref={sliderRef}
        style={{
          width: "90vw",
          cursor: 'pointer',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>For</span>
        <span>Against</span>
      </div>
    </div>
  );
};

export default ProgressBar;