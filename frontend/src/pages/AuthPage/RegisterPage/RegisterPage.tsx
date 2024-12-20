import { FcGoogle } from "react-icons/fc"
import { FaFacebook } from "react-icons/fa"
import { Link } from "react-router-dom"
const RegisterPage = () => {
  return (
    <>
      <div className="flex h-[550px] w-[500px] flex-col justify-between">
        <div>
          <span className="mb-[20px] text-[40px] font-bold text-[#5d5fef]">Create an account</span>
          <div>
            <span className="text-[20px] font-normal text-black">Already have an acount? </span>
            <Link to="/Login" className="text-[20px] text-[#f17ab7] underline-offset-4">
              Login
            </Link>
          </div>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="h-[40px] rounded-lg bg-white p-1 text-[20px] text-[#f17ab7]"
        />

        <div className="flex w-full justify-between">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="h-[40px] w-[48%] rounded-lg bg-white p-1 text-[20px] text-[#f17ab7]"
          />
          <input
            type="password"
            name="retype-password"
            placeholder="Retype Password"
            className="h-[40px] w-[48%] rounded-lg bg-white p-1 text-[20px] text-[#f17ab7]"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="h-[40px] rounded-lg bg-white p-1 text-[20px] text-[#f17ab7]"
        />

        <div>
          <input type="checkbox" className="mr-1 h-[18px] w-[18px] bg-white" />
          <label className="text-[20px] font-normal text-black">I agree to the </label>
          <Link to="/Login" className="text-[20px] text-[#f17ab7] underline-offset-4">
            Terms and Conditions
          </Link>
        </div>

        <button className="w-full rounded-lg bg-fuschia p-[6px] text-[20px] font-normal text-white">
          Create account
        </button>

        <div className="flex-start flex justify-between align-bottom">
          <hr className="mt-5 block w-[35%] border-2 text-[#767676]" />
          <span className="text-[20px] font-normal text-[#767676]">Or register with</span>
          <hr className="mt-5 block w-[35%] border-2 text-[#767676]" />
        </div>

        <div className="mx-auto flex w-[70%] justify-between">
          <button className="flex w-[150px] items-center justify-center rounded-lg bg-white p-[6px] text-[20px] font-normal text-black">
            <FaFacebook fill="#1877f2" className="mr-2 h-6 w-6" />
            Facebook
          </button>
          <button className="flex w-[150px] items-center justify-center rounded-lg bg-white p-[6px] text-[20px] font-normal text-black">
            <FcGoogle className="mr-2 h-6 w-6" />
            Google
          </button>
        </div>
      </div>
    </>
  )
}
export default RegisterPage
