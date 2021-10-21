import MusicActionTypes from './music.type';

export const isPlaying = () => ({
  type: MusicActionTypes.IS_PLAY
});
export const isHidden = () => ({
  type: MusicActionTypes.HIDDEN
});
export const setNull = (item) => ({
  type: MusicActionTypes.SET_NULL,
  payload: item
});
export const getPlayList = (item) => ({
  type: MusicActionTypes.GET_PLAY_LIST,
  payload: item
});
export const addItem = item => ({
  type: MusicActionTypes.LIST_MUSIC,
  payload: item
});
export const addPlayList = item => ({
  type: MusicActionTypes.ADD_PLAY_LIST,
  payload: item
});
export const addItemTop = item => ({
  type: MusicActionTypes.LIST_TOP_MUSIC,
  payload: item
});
export const addMusic = item => ({
  type: MusicActionTypes.ADD_ONE_MUSIC,
  payload: item
});
export const randomMusic = item => ({
  type: MusicActionTypes.RANDOM_MUSIC,
  payload: item
});
export const addListLoves = item => ({
  type: MusicActionTypes.MUSIC_LOVE,
  payload: item
});
export const removeMusic = item => ({
  type: MusicActionTypes.REMOVE_MUSIC_LOVE,
  payload: item
});
export const playMusicLove = item => ({
  type: MusicActionTypes.PLAY_MUSIC_LOVE,
  payload: item
});
export const addListPlay = item => ({
  type: MusicActionTypes.ADD_MUSIC_PLAY,
  payload: item
})

