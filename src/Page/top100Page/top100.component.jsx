import React from "react";
import "./top100.style.css";
import { connect } from "react-redux";
import { addItemTop } from "../../redux/Music/music.action";
import { withRouter } from "react-router";

const Top100 = ({ listMusic,addItemTop,history,match }) => {
  return (
    <div className="content">
      <div className="title">
        <h3>{listMusic.title}</h3>
      </div>
      <div className="MusicContainerTop-100">
        {listMusic.item.map((datas, index) => {
          return (
            <div className="box-music" key={index}  onClick={() => {
              history.push(`${match.url}/${datas.route}`);
              addItemTop(datas);
            }}>
              <div className="img-music">
                <img src={datas.url} alt={datas.name} />
              </div>
              <div className="content-music">
                <h4>{datas.name}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const mapStateToProps = ({ listMusic: { listMusic } }) => ({
  listMusic,
});
const mapDispatchToProps = dispatch => ({
  addItemTop : item => dispatch(addItemTop(item))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Top100));
