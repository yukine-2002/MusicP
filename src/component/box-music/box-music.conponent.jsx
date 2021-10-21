import React from "react";
import "./box-musix.style.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {addItem} from '../../redux/Music/music.action';

const BoxMusic = ({ data, history, match,addItem }) => {
  return (
    <div
      className="box-music"
      onClick={() => {
        history.push(`${match.url}/${data.routeName}`);
        addItem(data);
      }}
    >
      <div className="img-music">
        <img
          src="https://nhacsong.pro/public/uploads/thumb/1599477977-top-100-bai-hat-duoc-hat-nhieu-nhat-2020.jpg"
          alt=""
        />
      </div>
      <div className="content-music">
        <h4>{data.title}</h4>
      </div>
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  addItem : item => dispatch(addItem(item))
})
export default connect(null,mapDispatchToProps)(withRouter(BoxMusic));
