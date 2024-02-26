import COVER_IMAGE from "/images/Login.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success == false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-[85vh] align-middle items-center justify-center">
      <div className="flex flex-col align-middle items-center">
        <div className="md:w-1/2 flex items-center align-middle justify-center">
          <img
            className="object-cover object-center rounded-lg"
            src={COVER_IMAGE}
            alt="Food"
            width={350}
            height={350}
          />
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2 text-gray-700">Login</h2>
          <p className="text-primary font-proxima-nova">
            Sign up today to discover endless recipes, share your favorites, and
            connect with fellow food enthusiasts!
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-primary font-proxima-nova"
          >
            <div>
              <input
                id="email"
                type="email"
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div>
              <input
                id="password"
                type="password"
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="w-full flex flex-col my-2">
              <button
                disabled={loading}
                className="w-full text-white bg-[#060606] rounded-md my-1 p-4 font-proxima-nova font-semibold text-center flex items-center justify-center hover:bg-[#292929]"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="w-full">
            <p className="text-sm font-proxima-nova text-primary">
              Don&apos;t have an account?
              <Link to={"/sign-up"}>
                <span className="font-semibold text-blue-500 underline underline-offset-2 cursor-pointer px-1">
                  Signup
                </span>
              </Link>
              {error && <span className="text-red-500">{error}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
