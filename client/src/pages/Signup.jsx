import COVER_IMAGE from "/images/Signup.jpg";
import Logo from "./components/Logo";
import GOOGLE_ICON from "/icons/LogoGoogle.png";
export default function Signup() {
  return (
    <div className="flex flex-col md:flex-row h-[85vh] align-middle items-center">
      <div className="flex flex-col align-middle items-center">
        <div className="flex align-middle items-center space-x-3">
          <Logo />
          <h2>Flavor Finds</h2>
        </div>
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            className="object-cover object-center rounded-lg"
            src={COVER_IMAGE}
            alt="Food"
            width={540}
          />
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2 text-gray-700">Sign Up</h2>
          <p className="text-primary font-proxima-nova">
            Sign up today to discover endless recipes, share your favorites, and
            connect with fellow food enthusiasts!
          </p>
          <form className="space-y-4 text-primary font-proxima-nova">
            <div>
              <input
                type="text"
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                placeholder="Email"
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                placeholder="Password"
              />
            </div>
            <div className="w-full flex flexcol my-2">
              <button className="w-full text-white bg-[#060606] rounded-md my-1 p-4 font-proxima-nova font-semibold text-center flex items-center justify-center">
                Sign Up
              </button>
            </div>
            <button className="w-full text-[#060606] bg-white border-2 border-black rounded-md py-2 font-proxima-nova font-semibold text-center flex items-center justify-center">
              <img src={GOOGLE_ICON} className="h-6 mr-2" />
              Sign Up With Google
            </button>
          </form>
          <div className="w-full">
            <p className="text-sm font-proxima-nova text-primary">
              Already a member?
              <span className="font-semibold text-blue-500 underline underline-offset-2 cursor-pointer px-1">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
