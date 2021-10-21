import React,{useEffect} from "react";
import "./App.css";
import Header  from "./component/header/header.component";
import TopMusic from "./Page/TopMusicPage/TopMusic.component";
import { Switch, Route ,Redirect  } from "react-router-dom";
import ListenPage from "./Page/listenMusicPage/listenMucsic.component";
import { connect } from "react-redux";
import Top100 from "./Page/top100Page/top100.component";
import RunMusic from "./component/runMusic/runMusic.component";
import LovePage from "./Page/lovePage/lovePage.component";
import Login from "./Page/loginPage/login.component";
import {setCurrentUser} from './redux/user/user.action';
import { auth, createUserProfileDocument,addPlayListToItem,convertItem } from './firebase/firebase.util';
import UserPage from "./Page/pageUser/pageUser.component";
import {getPlayList} from "./redux/Music/music.action";

const  App = ({setCurrentUser,currentUser,playMusic,hidden,getPlayList}) => {
  useEffect (() => {
   auth.onAuthStateChanged(async userAuth => { 
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
      
        userRef.onSnapshot(snapShot => {
          const {item} = snapShot.data();
          getPlayList(item);
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
      
    });
  },[])

  return (
    <div className={`App ${hidden ?`checkContent` : `` } `} >
      <Header />
      <Switch>
        <Route exact  path="/login" render={() =>
              currentUser ? (
                <Redirect to='/topMusic' />
              ) : (
                <Login />
              )
            } />
        <Route exact component={UserPage} path="/user" />
        <Route exact component={LovePage} path="/love" />
        <Route exact component={TopMusic} path="/topMusic" />
        <Route exact component={Top100} path="/topMusic/:top" />
        <Route exact component={ListenPage} path="/topMusic/:top/:tops" />
      </Switch>
      {
        playMusic.length !== 0 ? (<RunMusic songs={playMusic ? playMusic : null} />) : null
      }
  
    </div>
  );
}
const mapStateToProps = ({ listMusic: { listTop,playMusic,hidden } , user:{currentUser} }) => ({
  listTop,
  playMusic,
  hidden,
  currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  getPlayList : item => dispatch(getPlayList(item))
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
