import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: {},
  error: "",
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userId) => {
    const id = userId;

    const [userResponse, albumResponse, photosResponse] = await Promise.all([
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.data),
      axios
        .get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
        .then((res) => res.data),
      axios
        .get(`https://jsonplaceholder.typicode.com/photos`)
        .then((res) => res.data),
    ]);

    const data = {
      id,
      name: userResponse.name,
      email: userResponse.email,
      address: userResponse.address,
      company: userResponse.company.name,
      albums: albumResponse.map((album) => {
        return {
          albumId: album.id,
          title: album.title,
          photos: photosResponse.filter((photo) => photo.albumId === album.id),
        };
      }),
    };

    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = {};
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
