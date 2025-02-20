import { FC } from "react";
import LoginForm from "./components/LoginForm";

const Home: FC = () => {
  return (
    <div className="tw-bg-white">
      <h1 className="tw-text-6xl tw-font-serif tw-w-max tw-border tw-shadow tw-mx-auto tw-py-2 hover:tw-bg-slate-50 hover:tw-cursor-pointer">
        Note App
      </h1>
      <LoginForm />
    </div>
  );
};

export default Home;
