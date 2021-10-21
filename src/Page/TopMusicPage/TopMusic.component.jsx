import React, { useEffect } from "react";
import BoxMusic from "../../component/box-music/box-music.conponent";
import "./TopMusic.style.css";
import MUSIC_DATA from "../dataMusic";
import { connect } from "react-redux";
import { getData } from "../../redux/data/data.action";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.util";

const TopMusic = ({ getData,data }) => {
  
  useEffect(() => {
    const collectionRef = firestore.collection("collection");
    collectionRef.onSnapshot(async (snapshot) => {
      const data = convertCollectionsSnapshotToMap(snapshot);
      getData(data);
    });
  }, []);

  return (
    <div className="content">
      <div className="MusicContainer">
        {!data ? (<div>Đang tải</div>) : data.map((datas, index) => {
          return <BoxMusic key={index} data={datas} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ data: { data } }) => ({
  data
});

const mapDispatchToProps = (dispatch) => ({
  getData: (item) => dispatch(getData(item)),
});

export default connect(mapStateToProps,mapDispatchToProps)(TopMusic);
