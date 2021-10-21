import React, { useState } from "react";
import { connect } from "react-redux";
import TableMusic from "../../component/tableMusic/tableMusic.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addPlayListToItem } from "../../firebase/firebase.util";
import { addPlayList } from "../../redux/Music/music.action";
import "./pageUser.style.css";

const UserPage = ({ playMusic, playList, currentUser, addPlayList }) => {
  const [hidden, setHidden] = useState(false);
  const [playLists, setPlayList] = useState({
    id: "",
    title: "",
  });
  const [boxPlay, setBoxPlay] = useState(playList);
  
  const additem = (playList, b) => {
    const existingMusic = playList.find((musicItem) => musicItem.id === b.id);
    if (existingMusic) {
      return playList.map((musicItem) =>
        musicItem.id === b.id ? { ...musicItem } : musicItem
      );
    }

    return [...playList, { ...b }];
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const { id, title } = playLists;
    const play = {
      id: Date.now() + Math.random(),
      title,
      items: [],
    };

    addPlayList(play);

    addPlayListToItem(currentUser.id, additem(playList, play));

    setBoxPlay(playList)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPlayList({ [name]: value });
  };

  return (
    <div className="content">
      {currentUser ? (
        <div>
          <div className="title-header">
            <h4>Bài Hát đang nghe</h4>
          </div>
          <div className="listPlay">
            <div className="select-item">
              <div className="list-item bor-b-1 media-item">
                {playMusic.map((item, index) => {
                  return <TableMusic songs={item} key={index} />;
                })}
              </div>
            </div>
          </div>

          <div className="title-header">
            <h4>Tạo PlayList</h4>
          </div>
          <div className="box-PlayList">
            <div className="list">
              <div className="box__" onClick={() => setHidden(!hidden)}>
                <FontAwesomeIcon icon={faPlus} />
              </div>

              {
              playList.map((data, index) => (
                <div key={index} className="box__" style={{backgroundImage:`url(${data.items[0] ? data.items[0].avatar: null})`}}>
                  <div className="title-box">
                     <h5>Music</h5>
                  </div>
                  <div className="tt">
                    <strong>{data.title}({data.items.length})</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`model ${!hidden ? `display` : ``}`}>
            <div className="model-container">
              <div className="model-box">
                <form onSubmit={handleSubmitLogin}>
                  <div className="title">
                    <input
                      type="title"
                      name="title"
                      placeholder="Tên play list ..."
                      onChange={handleChange}
                    />
                  </div>
                  <div className="button">
                    <button
                      className="create"
                      onClick={() => setHidden(!hidden)}
                    >
                      {" "}
                      Tạo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Vui lòng đăng nhập để tiếp tục</div>
      )}
    </div>
  );
};
const mapStateToProps = ({
  listMusic: { playMusic, playList },
  user: { currentUser },
}) => ({
  playMusic,
  playList,
  currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  addPlayList: (item) => dispatch(addPlayList(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
