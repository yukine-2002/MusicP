import {dataActionType} from './data.type'

export const getData = item => ({
    type: dataActionType.GET_DATA_MUSIC,
    payload: item
  });