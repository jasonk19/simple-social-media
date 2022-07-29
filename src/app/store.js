import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import postDetailReducer from "../features/postDetail/postDetailSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    postDetail: postDetailReducer,
  },
});
