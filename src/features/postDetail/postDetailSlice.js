import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  detail: {},
  error: "",
};

const parseEmailToName = (email) => {
  let raw = email.split("@");
  let prefix = raw[0].split(/\W|_/);
  let last = raw[1].split(".")[0];

  prefix = prefix.map((name) => {
    return name[0].toUpperCase() + name.substr(1);
  });

  last = last[0].toUpperCase() + last.substr(1);

  const name = prefix.join(" ") + " " + last;

  return name;
};

export const fetchPostDetail = createAsyncThunk(
  "posts/fetchPosts",
  async (postId) => {
    const id = postId;
    const [postResponse, commentsResponse, usersResponse] = await Promise.all([
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.data),
      axios(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(
        (res) => res.data
      ),
      axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then((res) => res.data),
    ]);

    const data = {
      id,
      userId: postResponse.userId,
      name: usersResponse.find((user) => user.id === postResponse.userId).name,
      title: postResponse.title,
      body: postResponse.body,
      comments: commentsResponse.map((comment) => {
        return {
          name: parseEmailToName(comment.email),
          body: comment.body,
        };
      }),
    };

    return data;
  }
);

const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPostDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPostDetail.rejected, (state, action) => {
      state.loading = false;
      state.detail = {};
      state.error = action.error.message;
    });
  },
});

export default postDetailSlice.reducer;
