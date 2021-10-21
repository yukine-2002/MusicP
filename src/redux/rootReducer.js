import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer";
import listMusicReducer from './Music/music.reducer';
import DataReducer from './data/data.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['listMusic']
  };
  
const rootReducer = combineReducers({
    listMusic: listMusicReducer,
    user: userReducer,
    data : DataReducer
});

export default persistReducer(persistConfig, rootReducer);
