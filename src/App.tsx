import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Authentication } from "./components/signup/Authentication.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.tsx";
import { Table } from "./components/table/Table.tsx";
import { Layout } from "./components/PageLayout.tsx";
import { ReactNode, useEffect } from "react";
import { useCheckAuthMutation } from "./redux/authQuery.tsx";
import { setIsAuth, setUserData } from "./redux/authSlice.tsx";

interface ProtectedRouteProps {
  children: string | JSX.Element | JSX.Element[] | ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useSelector((state: RootState) => state.profileReducer.isAuth);

  return isAuth ? children : <Navigate to={{ pathname: "/auth" }} />;
};

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Authentication />,
  },
  {
    path: "/table",
    element: (
      <ProtectedRoute>
        <Layout>
          <Table />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Authentication />,
  },
]);

export const App = () => {
  const [checkAuth] = useCheckAuthMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth({})
        .unwrap()
        .then((response) => {
          localStorage.setItem("token", response.token.access_token);
          dispatch(setUserData(response.user_dto));
        })
        .catch((e) => {
          dispatch(setIsAuth(false));
          localStorage.removeItem("token");
        });
    }
  }, []);

  return <RouterProvider router={router} />;
};
