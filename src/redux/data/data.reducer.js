import MUSIC_DATA from "../../Page/dataMusic";
import { dataActionType } from "./data.type";

const INITIAL_STATE = {
  data: null,
};

const DataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionType.GET_DATA_MUSIC:
      return {
        ...state,
        data : action.payload
      };
    default:
      return state;
  }
};

export default DataReducer;
