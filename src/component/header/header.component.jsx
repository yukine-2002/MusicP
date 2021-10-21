import "./header.style.css";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { isHidden,setNull } from "../../redux/Music/music.action";
import { auth } from "../../firebase/firebase.util";

const Header = ({ isHidden, hidden, currentUser ,setNull}) => {
  return (
    <div className="header">
      <input
        type="checkBox"
        id="check"
        defaultChecked={hidden}
        onClick={() => isHidden()}
      />
      <header>
        <label htmlFor="check">
          <i className="fas fa-bars" id="slidebar_btn"></i>
        </label>
        <div className="left_area">
          <h3>Music</h3>
        </div>
        <div className="right_area">
          {currentUser ? (
            <div
              className="logout_btn"
              onClick={() => {
                setNull([]);
                auth.signOut();
              }}
            >
              Đăng xuất
            </div>
          ) : (
            <Link className="logout_btn" to="/login">
              Đăng nhập
            </Link>
          )}
        </div>
      </header>

      <div className="slidebar">
        <div className="profile_info">
          <img
            src="https://cf.shopee.vn/file/ad70c59e61388bb965b4b52cdccde2de"
            className="profile_imgae"
            alt=""
          />
          <h4>
            {currentUser
              ? currentUser.displayName === null
                ? currentUser.email
                : currentUser.displayName
              : `cus`}
          </h4>
        </div>
        <div className="menu">

          <div className="item">
            <Link className="sub-btn" to="/user">
              <i className="fa fa-user"></i>
              <span>Trang cá nhân</span>
            </Link>
          </div>
          <div className="item">
            <Link className="sub-btn" to="/love">
              <i className="fas fa-headphones-alt"></i>
              <span>Nhạc yêu thích</span>
            </Link>
          </div>
          <div className="item">
            <Link className="sub-btn" to="/topMusic">
              <i className="fa fa-music"></i>
              <span>Top 100 bài hát</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  isHidden: () => dispatch(isHidden()),
  setNull: (item) => dispatch(setNull(item)),
});
const mapStateToProps = ({ listMusic: { hidden }, user: { currentUser } }) => ({
  hidden,
  currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
