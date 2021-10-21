import React, { useEffect, useState, useRef } from "react";
import "./range.style.css";

const RangeSlider = ({currentTime,duration, percentage = 0, onChange }) => {
    const [position, setPosition] = useState(0)
    const [marginLeft, setMarginLeft] = useState(0)
    const [progressBarWidth, setProgressBarWidth] = useState(0)
    const rangeRef = useRef()
    const thumbRef = useRef()
  
    useEffect(() => {
      const rangeWidth = rangeRef.current.getBoundingClientRect().width
      const thumbWidth = thumbRef.current.getBoundingClientRect().width
      const centerThumb = (thumbWidth / 100) * percentage * -1
      const centerProgressBar =
        thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
      setPosition(percentage)
      setMarginLeft(centerThumb)
      setProgressBarWidth(centerProgressBar)
    }, [percentage])

    const caculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const returnedMinuteds = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const second = Math.floor(secs % 60);
      const returnedSecond = second < 10 ? `0${second}` : `${second}`;
      return `${returnedMinuteds} : ${returnedSecond}`;
    };
    return (
      <div className="container-play">
        <div className="currentime">
          <span>{caculateTime(currentTime)}</span>
        </div>
         <div className='slider-container'>
        <div
          className='progress-bar-cover'
          style={{
            width: `${progressBarWidth}px`
          }}
        ></div>
        <div
          className='thumb'
          ref={thumbRef}
          style={{
            left: `${position}%`,
            marginLeft: `${marginLeft}px`
          }}
        ></div>
        <input
          type='range'
          value={position}
          ref={rangeRef}
          step='0.01'
          className='range'
          onChange={onChange}
        />
      </div>
      <div className="duration">
        <span>{caculateTime(duration)}</span>
      </div>
      </div>
     
    )
  }

export default RangeSlider;
