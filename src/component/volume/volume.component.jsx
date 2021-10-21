import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeOff,
  faVolumeUp,
  faVolumeMute,
  faRandom
} from "@fortawesome/free-solid-svg-icons";
import "./volume.style.css";

const Volume = ({setnextSong,nextSong, percentage = 0, onChange, handleVolume }) => {
  const [position, setPosition] = useState(0);
  const rangeRef = useRef();
  useEffect(() => {
    setPosition(percentage * 100);
  }, [percentage]);

  return (
    <div className="volume-container"  >
      <button className={`random ${nextSong ? `color` : null }`} onClick={() => {
      setnextSong(!nextSong)
    }}> 
      <FontAwesomeIcon icon={faRandom} />
      </button>

      <button
        className="volume-off"
        onClick={() => {
          setPosition(0);
          handleVolume(0);
        }}
      >
        <FontAwesomeIcon icon={position != 0 ? faVolumeOff : faVolumeMute} />
      </button>

      <input
        type="range"
        value={position}
        ref={rangeRef}
        className="range-volume"
        onChange={onChange}
      />
      <button
        className="volume-on"
        onClick={() => {
          setPosition(1 * 100);
          handleVolume(1);
        }}
      >
        <FontAwesomeIcon icon={faVolumeUp} />
      </button>


    </div>
  );
};
export default Volume;
