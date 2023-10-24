import React from 'react'
import { useState, CSSProperties } from 'react';
import ClockLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "10rem auto",
};

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("red");
  return (
    <div className='text-center'>
      <ClockLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner
