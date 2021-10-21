import React, {  useState } from "react";
import "./listenMucsic.style.css";
import { connect } from "react-redux";
import TableMusic from "../../component/tableMusic/tableMusic.component";
import { randomMusic, addListPlay } from "../../redux/Music/music.action";
import { addPlayListToItem } from "../../firebase/firebase.util";

const ListenPage = ({
  listTop,
  currentUser,
  randomMusic,
  playList,
  addListPlay,
}) => {
  const [hidden, setHidden] = useState(false);

  const songs = listTop.songs;

  const handleClick = async (id) => {
    addListPlay([id, songs]);

     addPlayListToItem(currentUser.id, playList);
  };

   

  

  return (
    <div className="content">
      <div className="PlayListMusic">
        <div className="row">
          <div className="BgPlayMusicLeft">
            <div className="img">
              <img src={listTop.url} alt="" />
            </div>
            <div className="btnMusic">
              <div className="title">
                <h4>Top 100 {listTop.name} hay nhất</h4>
              </div>
              <div className="button">
                <button
                  className="contiPlay"
                  onClick={() => {
                    randomMusic(songs);
                  }}
                >
                  <i className="fas fa-play"></i> Phát Ngẫu nhiên
                </button>
                <button
                  className="contiPlay"
                  onClick={() => setHidden(!hidden)}
                >
                  Thêm vào PlayList
                </button>
              </div>
              <div className="love">
                <i className="far fa-heart"></i>
              </div>
            </div>
          </div>
          <div className="ListMusicRight">
            <div className="media select-header">
              <div className="media-left">
                <div className="column-text">Bài Hát</div>
              </div>
              <div className="media-content">
                <div className="column-text">Thời gian</div>
              </div>
              <div className="media-right">
                <div className="column-text">Mặc định</div>
              </div>
            </div>
            <div className="select-item">
              <div className="list-item bor-b-1 media-item">
                {listTop.songs
                  ? listTop.songs.map((datas, index) => {
                      return <TableMusic songs={datas} key={index} />;
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`model ano ${!hidden ? `display` : ``}`}>
        <div className="a">
          <div className="model-box">
            <span className="b" onClick={() => setHidden(!hidden)}>
              X
            </span>
            <div className="list">
              {playList.map((data, index) => (
                <div
                  key={index}
                  className="box__"
                  onClick={() => {
                    handleClick(data.id);
                  }}
                >
                  <div className="title-box">
                    <h5>Music</h5>
                  </div>
                  <div className="tt">
                    <strong>{data.title}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({
  listMusic: { listTop, playList },
  user: { currentUser },
}) => ({
  listTop,
  playList,
  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  randomMusic: (item) => dispatch(randomMusic(item)),
  addListPlay: (item) => dispatch(addListPlay(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ListenPage);
