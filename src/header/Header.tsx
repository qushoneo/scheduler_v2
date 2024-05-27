import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/authSlice";

export const Header = () => {
  const links = [
    {
      name: "Table",
      url: "/table",
    },
  ];

  const dispatch = useDispatch();

  const logoutClickHandler = () => {
    dispatch(setIsAuth(false));
    localStorage.removeItem("token");
  };

  return (
    <div className="h-16 w-full flex flex-row px-10 bg-black">
      <div className="flex justify-self-center">
        {links.map((link) => (
          <Link
            className="h-full flex items-center w-20 hover:bg-white flex justify-center cursor-pointer text-white border-black border-2 border-solid hover:text-black text-2xl px-12 tracking-widest"
            key={link.name}
            to={link.url}
          >
            <p className="text-large">{link.name}</p>
          </Link>
        ))}
      </div>
      <p
        onClick={logoutClickHandler}
        className="ml-auto h-full w-20 flex items-center justify-center cursor-pointer hover:bg-white hover:text-black text-white border-black border-2 border-solid"
      >
        Logout
      </p>
    </div>
  );
};
