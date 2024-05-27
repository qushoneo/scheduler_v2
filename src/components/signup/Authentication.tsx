import { useState } from "react";
import "./auth.scss";
import { BaseInput } from "../common/BaseInput";
import { BaseButton } from "../common/BaseButton";
import { useLoginMutation, useRegisterMutation } from "../../redux/authQuery";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setToken } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

export const Authentication = () => {
  const [userLogin, setUserLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.profileReducer.isAuth);

  // console.log(register);

  const switchMode = () => {
    if (mode === "signIn") {
      setMode("signUp");
    }
    if (mode === "signUp") {
      setMode("signIn");
    }
  };

  const handleSubmit = () => {
    if (mode === "signUp") {
      register({
        login: userLogin,
        password: password,
      })
        .unwrap()
        .then((response) => {
          localStorage.setItem("token", response.token.access_token);
          dispatch(setToken(response.token.access_token));
          dispatch(setIsAuth(true));
        })
        .catch((e) => console.log(e));
    } else {
      login({
        login: userLogin,
        password: password,
      })
        .unwrap()
        .then((response) => {
          localStorage.setItem("token", response.token.access_token);
          dispatch(setToken(response.token.access_token));
          dispatch(setIsAuth(true));
        })
        .catch((e) => console.log(e));
    }
  };

  if (isAuth) {
    return <Navigate to="/table" />;
  }

  return (
    <div className="signup w-full h-full flex">
      <div className="w-96 bg-white h-96 mx-auto my-auto border-gray-300 border-2 br-8 rounded-xl shadow-2xl">
        <div className="w-full border-b border-gray-300 h-10 flex mt-5">
          <p className="mx-auto w-3xl fs-lg text-3xl text-gray-700 ">
            {mode === "signIn" ? "Sign In" : "Sign Up"}
          </p>
        </div>
        <div className="w-full h-full flex flex-col px-8">
          <BaseInput
            value={userLogin}
            fieldName="Login"
            onChange={(e) => setUserLogin(e.target.value)}
            containerClassName="my-3 w-full "
            className="w-full"
          />

          <BaseInput
            value={password}
            fieldName="Password"
            onChange={(e) => setPassword(e.target.value)}
            containerClassName="my-3 w-full "
            className="w-full"
            type="password"
          />

          <div className="my-auto h-16 bg-red w-full flex justify-between items-center">
            <BaseButton
              onClick={switchMode}
              className="bg-transparent border"
              text={mode === "signUp" ? "To Sign In" : "To Sign Up"}
            />

            <p>or</p>

            <BaseButton
              onClick={handleSubmit}
              text={mode === "signIn" ? "Sign In" : "Sign Up"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
