import React,{useState,useEffect} from "react";
import "./lovePage.style.css";
import TableMusicLove from "../../component/tableMusicLove/tableMusicLove.component";
import { connect } from "react-redux";
import {playMusicLove} from '../../redux/Music/music.action';

const LovePage = ({listLove,playMusicLove}) => {
  const [list,setList]=useState([]);
  useEffect(()=>{
    setList(listLove)
  },[listLove])
  return (
    <div className="content">
    <div className="PlayListMusic">
        <div className="row">
           <div className="title-header">
               <h4>Bài hát yêu thích </h4> <div className="play" onClick={ () => playMusicLove(list)}>
                <i className="fas fa-play"></i>
            </div>
           </div>
            <div className="ListMusic">
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
                      {
                          listLove.length === 0 ? (<div className="empty"> <h3>Danh sách rỗng</h3> </div>) : ( listLove.map((item,index) => <TableMusicLove  key={index} songs={item} />) ) 
                      } 
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

  const mapStateToProps = ({ listMusic: { listLove } }) => ({
    listLove
  });
  const mapDispatchToProps = dispatch => ({
    playMusicLove : (item) => dispatch(playMusicLove(item))
  })
export default connect(mapStateToProps,mapDispatchToProps)(LovePage);
