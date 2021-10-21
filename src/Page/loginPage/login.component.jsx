import React, { useState } from "react";
import {
  signInWithGoogle,
  auth,
  createUserProfileDocument,
} from "../../firebase/firebase.util";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
import {getPlayList} from "../../redux/Music/music.action";
import "./login.style.css";

const Login = () => {
  const [hidden, setHidden] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const { email, password } = userCredentials;
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("tài khoản mật khẩu sai");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = userCredentials;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div id="main">
      <div className="container">
        <div className={`login-circle ${hidden ? `round` : ``}`}></div>
        <div id="SignUp" className={`SignUpAccount ${hidden ? `display` : ``}`}>
          <div className="login-container">
            <div className="login-box " id="roundSignup">
              <div className="login-card">
                <div className="title">
                  <h2>Đăng Ký</h2>
                </div>
                <form onSubmit={handleSubmit} method="POST">
                  <div className="username login-input">
                    <label htmlFor="username">Tài Khoản</label>
                    <input
                      type="text"
                      id="uername"
                      name="email"
                      onChange={handleChange}
                      placeholder="Tài khoản"
                      required
                    />
                  </div>
                  <div className="password login-input">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="Mật khẩu"
                      required
                    />
                  </div>

                  <div className="password login-input">
                    <label htmlFor="password-another">Nhập lại mật khẩu</label>
                    <input
                      type="password"
                      id="password-another"
                      name="confirmPassword"
                      onChange={handleChange}
                      placeholder="Mật khẩu"
                      required
                    />
                  </div>

                  <div className="button-login">
                    <button>Đăng ký</button>
                  </div>
                  <div className="signUp-another">
                    <p>Đăng kí với google or facebook</p>
                  </div>
                  <div className="login-another">
                    <div className="button-facebook">
                      <button>Facebook</button>
                    </div>
                    <div className="button-google">
                      <button>google</button>
                    </div>
                  </div>
                </form>
                <div className="SignUp">
                  <p id="Signup-change" onClick={() => setHidden(!hidden)}>
                    Quay lại trang đăng nhập
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="login"
          className={`login-container ${!hidden ? `display` : ``}`}
        >
          <div className="login-box" id="roundLogin">
            <div className="login-card">
              <div className="title">
                <h2>Đăng nhập</h2>
              </div>
              <form onSubmit={handleSubmitLogin} method="POST">
                <div className="username login-input">
                  <label htmlFor="usernames">Tài Khoản</label>
                  <input
                    type="text"
                    id="uernames"
                    name="email"
                    onChange={handleChange}
                    placeholder="Tài khoản"
                    required
                  />
                </div>
                <div className="password login-input">
                  <label htmlFor="passwordss">Mật khẩu</label>
                  <input
                    type="password"
                    id="passwordss"
                    name="password"
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    required
                  />
                </div>
                <div className="button-login">
                  <button>Đăng nhập</button>
                </div>
                <div className="login-another">
                  <div className="button-facebook">
                    <button>Facebook</button>
                  </div>
                  <div className="button-google">
                    <button onClick={signInWithGoogle}>google</button>
                  </div>
                </div>
                <div className="SignUp" onClick={() => setHidden(!hidden)}>
                  <p id="login-change">Bạn chưa có tài khoàn ?</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  getPlayList:(item) => dispatch(getPlayList(item))
});
const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
