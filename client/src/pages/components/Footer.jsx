import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#114232] text-center">
      <div className="flex mt-10 py-[7rem] px-[3rem] bg-[#114232] text-white">
        <div className="flex flex-col ml-[4rem]">
          <a className="inline-block" href="/">
            <img
              className="w-[4rem] h-[4rem] rounded-full"
              src="/images/LOGO2.jpg"
              alt=""
            />
          </a>
          <p className="font-proxima-nova text-white w-[24rem]">
            Unleash Culinary Creativity: Discover, savor, and share the best
            recipes tailored to your taste with Flavor Finds – Your Recipe
            Finder Extraordinaire!
          </p>
        </div>
        <div className="flex gap-[5rem] justify-center ml-[10rem] font-proxima-nova">
          <div className="flex flex-col gap-4">
            <span className="font-bold text-[1.5rem]">Menu</span>
            <Link to={`/`} className="no-underline text-white">
              <span>Home</span>
            </Link>
            <Link to={`/search`} className="no-underline text-white">
              <span>Explore</span>
            </Link>
            <Link to={`/community`} className="no-underline text-white">
              <span>Community</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-[1.5rem]">Help</span>
            <span>Privacy and Policy</span>
            <span>Terms of Use</span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-bold text-[1.5rem]">Social</span>
            <span>Instagram</span>
            <span>Facebook</span>
            <span>Youtube</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
      <span className="text-white font-proxima-nova">
        {" "}
        © 2024 Sunil Gopal C V Flavor Finds. All rights reserved.
      </span>
    </div>
  );
}
