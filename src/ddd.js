import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Test = () => {
  const date = useSelector(state => state.date);
  console.log(date)
  return(
    <div>bla</div>
  )
};

export default Test;