import { REQUEST_COMPLETE, REQUEST_FAILURE } from "../constants";

const initialState = {
  Name: "",
  Album: "",
  Artist: "",
  AlbumImage: ""
};

const MusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_COMPLETE:
      return Object.assign({}, state, action.data);
    case REQUEST_FAILURE:
      return action.exception;
    default:
      return state;
  }
};
export default MusicReducer;
