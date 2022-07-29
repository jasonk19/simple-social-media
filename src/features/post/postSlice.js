import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const [postsResponse, usersResponse] = await Promise.all([
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data),
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data),
  ]);

  const data = postsResponse.map((post) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      name: usersResponse.find((user) => user.id === post.userId).name,
      company: usersResponse.find((user) => user.id === post.userId).company
        .name,
    };
  });

  return data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
