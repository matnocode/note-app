import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

const Container: FC = () => {
  return (
    <div className="tw-bg-yellow-50 tw-h-screen">
      <NavBar />
      <div className="tw-container tw-mx-auto tw-mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Container;
