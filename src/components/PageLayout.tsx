import { Header } from "../header/Header";

interface LayoutProps {
  children: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      {children}
      {/* <Toolbar/> */}
    </div>
  );
};
