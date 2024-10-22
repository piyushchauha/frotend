//Redux-Toolkit
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

//Redux-Persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Store
import userReducer from "Store/UserSlice";

const persistConf = {
  key: "root",
  version: 1,
  storage,
};


const reducer = combineReducers({
  user: userReducer,
});


const persistRed = persistReducer(persistConf, reducer);


export default configureStore({
  reducer: persistRed,
});
