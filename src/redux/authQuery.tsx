import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfile } from "../components/signup/authTypes";
import { useSelector } from "react-redux";
import { RootState } from "./store";

const PORT = 5000;

interface RegisterProps {
  login: string;
  password: string;
}

interface LoginProps {
  login: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: `http://localhost:${PORT}/api/`,
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
      const token = getState().profileReducer.token;
      console.log(token);
      if (token) {
        headers.set("refresh_token", "Bearer " + token);
      }
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<IProfile, RegisterProps>({
      query: ({ login, password }) => {
        return {
          url: "register",
          method: "POST",
          body: {
            login: login,
            password: password,
          },
        };
      },
    }),

    login: builder.mutation<IProfile, LoginProps>({
      query: ({ login, password }) => {
        return {
          url: "login",
          method: "POST",
          credentials: "include",
          body: {
            login: login,
            password: password,
          },
        };
      },
    }),

    checkAuth: builder.mutation<any, any>({
      //@ts-ignore
      query: () => {
        return {
          url: "refresh",
          method: "GET",
          credentials: "include",
        };
      },
    }),

    logout: builder.mutation<any, any>({
      query: () => {
        return {
          url: "logout",
          method: "POST",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCheckAuthMutation,
  useLogoutMutation,
} = authApi;

// checkAuth: async () => {
//   try {
//     set({ isLoading: true });

//     const response = await axios.get<AuthResponse>(
//       "http://localhost:5000/api/refresh",
//       { withCredentials: true }
//     );

//     localStorage.setItem("token", response.data.token.access_token);
//     set({
//       access_token: response.data.token.access_token,
//       isAuth: true,
//       user: response.data.user_dto,
//     });
//   } catch (e) {
//     localStorage.removeItem("token");
//     console.log(e);
//   } finally {
//     set({ isLoading: false });
//   }
// },
