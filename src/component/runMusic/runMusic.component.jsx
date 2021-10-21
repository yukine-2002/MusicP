import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward
} from "@fortawesome/free-solid-svg-icons";
import './runMusic.style.css';
import RangeSlider from "../range/range.component";
import Volume from "../volume/volume.component";
import { connect } from "react-redux";
import { isPlaying } from "../../redux/Music/music.action";

const RunMusic = ({ songs, isPlay, isPlaying }) => {
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextSong,setnextSong] = useState(false);

  const actionMusic = (forward = true) => {
    if (forward) {
      setCurrentIndex(() => {
        let temp = currentIndex;
        temp++;
        if (temp > songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    } else {
      setCurrentIndex(() => {
        let temp = currentIndex;
        temp--;
        if (temp < 0) {
          temp = songs.length - 1;
        }
        return temp;
      });
    }
  };
  const onNextMusic = () => {
    if (nextSong) {
      setCurrentIndex(() => {
        let temp = currentIndex;
        temp++;
        if (temp > songs.length - 1) {
          temp = 0;
        }
        return temp;
      });
    }
  }
 
  const onChangeVolume = (e) => {
    const audio = audioRef.current;
    audio.volume = e.target.value / 100;
    setVolume(e.target.value / 100);
  };

  const HandleVolume = (volume) => {
    const audio = audioRef.current;
    audio.volume = volume;
  };

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlay) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            console.log("audio played auto");
          })
          .catch(error => {
            console.log("playback prevented");
          });
      }
    }
    if (!isPlay) {
      audio.pause();
    }
    
  });
 
  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;
    setPercentage(percent);
    setCurrentTime(time.toFixed(2));
  };

  return (
    <div className={`runMusic ${songs !== undefined ? null : `display` }`}>
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
        onEnded={onNextMusic}
        src={songs[currentIndex] ? songs[currentIndex].music : null}
      ></audio>
      <div className="level player-controls__container">
        <div className="player-controls-left level-left">
          <div className="media">
            <div className="media-left">
              <div className="song-thumb">
                <img src={songs[currentIndex]  ? songs[currentIndex].avatar : null} alt="" />
                <div className="opacity"></div>
              </div>
              <div className="card-info">
                <div className="title-wrapper">
                  <marquee scrollamount="5">
                    <span className="item-title title">
                      {songs[currentIndex] ? songs[currentIndex].title : null}
                    </span>
                  </marquee>
                </div>
                <h3 className="is-one-line subtitle">
                  {songs[currentIndex] ? songs[currentIndex].creator: null}
                </h3>
              </div>
            </div>
            <div className="media-right">
              <div className="love">
                <i className="far fa-heart"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="player-controls__player-bar level-center">
          <div className="level-item">
            <div className="actions">
              <div className="c-player--controls">
                <button className="skip-btn" onClick={() => actionMusic(false)}>
                  <FontAwesomeIcon icon={faBackward} />
                </button>
                <button className="play-btn" onClick={() => isPlaying()}>
                  <FontAwesomeIcon icon={!isPlay ? faPlay : faPause} />
                </button>
                <button className="skip-btn">
                  <FontAwesomeIcon
                    icon={faForward}
                    onClick={() => actionMusic()}
                  />
                </button>
              </div>
              <RangeSlider
                currentTime={currentTime}
                duration={duration}
                percentage={percentage}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className="player-controls-right level-right">
          <div className="level-item">
            <div className="actions">
              <Volume
                nextSong={nextSong}
                setnextSong={setnextSong}
                percentage={volume}
                handleVolume={HandleVolume}
                onChange={onChangeVolume}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ listMusic: { isPlay } }) => ({
  isPlay,
});

const mapDispatchToProps = (dispatch) => ({
  isPlaying: () => dispatch(isPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunMusic);
