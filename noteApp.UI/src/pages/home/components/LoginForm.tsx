import { FC, useState } from 'react'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

interface Error
{
  message:string;
  type:string
}

const LoginForm:FC = () =>
{
  const [errors,setErrors]:Error[] = useState([])
  const [userName,setUserName]:String = useState("")
  const [password,setPassword]:String = useState("")

  const navigate = useNavigate()

  const validate = () =>
  {
    let temp:Error[] = []

    if(!userName || userName?.length == 0 )
      temp = [...temp, {type:"Username",message:"Username is required"}]

    if(userName?.length < 3)
      temp = [...temp, {type:"Username",message:"Username must contain at least 3 characters"}]

    if(!password || password?.length == 0 )
      temp = [...temp, {type:"Password",message:"Password is required"}]

    if(temp.length > 0)
    {
      setErrors(temp)
      return;
    }
    //login api call here
    //create promise toast hook
    toast.success("logged in!")
    navigate("/files")
  }

  return (
    <div className="tw-mx-10 tw-mt-2">
      <div className="tw-flex tw-flex-col tw-gap-3">
        <div>
          <label>Username</label>
          <div className="tw-w-[100px]">
            <input
            onChange={(val)=>{setErrors([]); setUserName(val.target.value)}}
            type='text'
            className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"/>
          </div>
          {errors && errors.some(error => error.type == "Username") && errors.map(error => error.type == "Username" && (
            <div key={`error-${error.message}`} className="tw-text-red-500 tw-text-xs">
              {error.message}
            </div>)
          )}
        </div>
        <div>
          <label>Password</label>
          <div className="tw-w-[100px]">
            <input
            onChange={(val)=>{setErrors([]); setPassword(val.target.value)}}
            type='password'
            className="tw-bg-red-100 focus:tw-outline-none tw-p-1 tw-shadow"/>
          </div>
          {errors && errors.some(error => error.type == "Password") && errors.map(error => error.type == "Password" && (
            <div key={`error-${error.message}`} className="tw-text-red-500 tw-text-xs">
              {error.message}
            </div>)
          )}
        </div>
        <div>
          <button
            onClick={validate}
            className="tw-border tw-shadow tw-text-center tw-w-[80px] hover:tw-bg-yellow-200 active:tw-bg-yellow-300 tw-bg-yellow-100">
            Login
          </button>
        </div>
      </div>
    </div>)
}

export default LoginForm;
