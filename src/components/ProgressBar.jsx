import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      style={{ border: "1px solid #ccc", width: "100%", borderRadius: "5px" }}
    >
      <div
        style={{
          height: "20px",
          width: `${percentage}%`,
          backgroundColor: "green",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default ProgressBar;
