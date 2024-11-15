import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  username: string;
  admin: boolean;
  img: string;
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
