import React, { useRef, useState } from "react";
import { addMusic,removeMusic } from "../../redux/Music/music.action";
import {connect} from 'react-redux';

const TableMusicLove = ({ songs,addMusic,removeMusic }) => {
  const audioRef = useRef();
  const [percentage, setPercentage] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const caculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinuteds = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const second = Math.floor(secs % 60);
    const returnedSecond = second < 10 ? `0${second}` : `${second}`;
    return `${returnedMinuteds} : ${returnedSecond}`;
  };
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
    <div>
      <div className="media" >
        <audio
          ref={audioRef}
          onTimeUpdate={getCurrDuration}
          onLoadedData={(e) => {
            setDuration(e.currentTarget.duration.toFixed(2));
          }}
          src={songs ? songs.music : null}
        ></audio>
        <div className="media-left" onClick={()=> addMusic(songs)}>
          <div className="song-thumb">
            <img src={songs ? songs.avatar: null} alt="" />
          </div>
          <div className="card-info">
            <div className="title-wrapper">
              <span className="item-title title">{ songs  ? songs.title : null}</span>
            </div>
            <h3 className="is-one-line subtitle">{songs ? songs.creator : null}</h3>
          </div>
        </div>
        <div className="media-content">
          <div className="song-duration">{ songs ? caculateTime(duration) : null}</div>
        </div>
        <div className="media-right">
          <div className="love" onClick={() => {removeMusic(songs);} }>
          <i className="far fa-trash-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addMusic : (item) => dispatch(addMusic(item)),
  removeMusic:(item) => dispatch(removeMusic(item))
})

export default connect(null,mapDispatchToProps)(TableMusicLove);
