import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../api/user";

interface Error {
  message: string;
  type: string;
}

const LoginForm: FC = () => {
  const [errors, setErrors] = useState<Error[]>([]);
  const [register, setRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const validate = async () => {
    let temp: Error[] = [];

    if (!userName || userName?.length == 0)
      temp = [...temp, { type: "Username", message: "Username is required" }];

    if (userName?.length < 3)
      temp = [
        ...temp,
        {
          type: "Username",
          message: "Username must contain at least 3 characters",
        },
      ];

    if (!password || password?.length == 0)
      temp = [...temp, { type: "Password", message: "Password is required" }];

    if (temp.length > 0) {
      setErrors(temp);
      return;
    }
    //create promise toast hook

    await handleLogin();
  };

  const handleLogin = async () => {
    if (register)
      toast.promise(registerUser(userName, password), {
        loading: "loading",
        error: "Something went wrong",
        success: () => {
          setRegister(false);
          return "Successfully created an account! Now Log in!";
        },
      });
    else
      toast.promise(loginUser(userName, password), {
        loading: "loading",
        error: "Wrong credentials!",
        success: (res) => {
          res.json().then((x) => {
            localStorage.clear();
            localStorage.setItem("userId", x);
          });
          navigate("/files");
          return "Logged in!";
        },
      });
  };

  return (
    <div className="tw-mx-10 tw-mt-2">
      <div className="tw-text-2xl tw-py-2">
        {register ? "Register" : "Login"}
      </div>
      <div className="tw-flex tw-flex-col tw-gap-3">
        <div>
          <label>Username</label>
          <div className="tw-w-[100px]">
            <input
              onChange={(val) => {
                setErrors([]);
                setUserName(val.target.value);
              }}
              type="text"
              className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"
            />
          </div>
          {errors &&
            errors.some((error) => error.type == "Username") &&
            errors.map(
              (error) =>
                error.type == "Username" && (
                  <div
                    key={`error-${error.message}`}
                    className="tw-text-red-500 tw-text-xs"
                  >
                    {error.message}
                  </div>
                )
            )}
        </div>
        <div>
          <label>Password</label>
          <div className="tw-w-[100px]">
            <input
              onChange={(val) => {
                setErrors([]);
                setPassword(val.target.value);
              }}
              type="password"
              className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"
            />
          </div>
          {errors &&
            errors.some((error) => error.type == "Password") &&
            errors.map(
              (error) =>
                error.type == "Password" && (
                  <div
                    key={`error-${error.message}`}
                    className="tw-text-red-500 tw-text-xs"
                  >
                    {error.message}
                  </div>
                )
            )}
        </div>
        <div>
          <button
            onClick={validate}
            className="tw-border tw-shadow tw-text-center tw-w-[80px] hover:tw-bg-yellow-200 active:tw-bg-yellow-300 tw-bg-yellow-100"
          >
            {register ? "Register" : "Login"}
          </button>
        </div>
        <div className="tw-mt-6 tw-flex tw-flex-col tw-gap-3">
          <div>{!register ? "Dont have an account?" : "Switch to login"}</div>
          <button
            className="tw-border tw-shadow tw-text-center tw-w-[80px] hover:tw-bg-yellow-200 active:tw-bg-yellow-300 tw-bg-yellow-100"
            onClick={() => setRegister((prev) => !prev)}
          >
            {!register ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
