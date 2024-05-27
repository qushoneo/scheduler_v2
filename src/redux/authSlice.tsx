import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProfile, IUser } from "../components/signup/authTypes";

export interface AuthInterface {
  isAuth: boolean;
  token: string | null;
  userData: IProfile;
}

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  userData: {
    login: "",
    id: 0,
    account_id: 0,
    role_name: "",
  },
};

export const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setUserData: (state, action: PayloadAction<IUser>) => {
      console.log(action.payload);
      state.userData = action.payload;
    },
  },
});

export const { setIsAuth, setUserData, setToken } = profileSlice.actions;
