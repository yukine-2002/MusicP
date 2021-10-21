import MusicActionTypes from "./music.type";
import {
  addListLove,
  playChooseMusic,
  randomMusics,
  removeMusics,
  addPlayList,
  addPlayListPS
} from "./music.utils";

const INITIAL_STATE = {
  hidden: false,
  isPlay: false,
  listMusic: [],
  listLove: [],
  listTop: [],
  playList: [],
  playMusic: [],
};

const listMusicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MusicActionTypes.LIST_MUSIC:
      return {
        ...state,
        listMusic: action.payload,
      };
    case MusicActionTypes.SET_NULL:
      return {
        ...state,
        playList: action.payload,
      };
      case MusicActionTypes.ADD_MUSIC_PLAY:
      return {
        ...state,
        playList: addPlayListPS(state.playList,action.payload),
      };
    case MusicActionTypes.GET_PLAY_LIST:
      return {
        ...state,
        playList: action.payload,
      };
    case MusicActionTypes.ADD_PLAY_LIST:
      return {
        ...state,
        playList: addPlayList(state.playList, action.payload),
      };
    case MusicActionTypes.LIST_TOP_MUSIC:
      return {
        ...state,
        listTop: action.payload,
      };
    case MusicActionTypes.RANDOM_MUSIC:
      return {
        ...state,
        playMusic: randomMusics(action.payload),
      };

    case MusicActionTypes.ADD_ONE_MUSIC:
      return {
        ...state,
        playMusic: playChooseMusic(state.listTop, action.payload),
      };
    case MusicActionTypes.PLAY_MUSIC_LOVE:
      return {
        ...state,
        playMusic: action.payload,
      };
    case MusicActionTypes.MUSIC_LOVE:
      return {
        ...state,
        listLove: addListLove(state.listLove, action.payload),
      };
    case MusicActionTypes.REMOVE_MUSIC_LOVE:
      return {
        ...state,
        listLove: removeMusics(state.listLove, action.payload),
      };
    case MusicActionTypes.IS_PLAY:
      return {
        ...state,
        isPlay: !state.isPlay,
      };
    case MusicActionTypes.HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    default:
      return state;
  }
};

export default listMusicReducer;
