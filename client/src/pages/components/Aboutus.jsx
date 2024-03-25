import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Aboutus() {
  return (
    <div className="flex justify-center items-center gap-4 mx-5 my-2">
      <div>
        <h1 className="font-brandon-grotesque text-[#114232] text-[2rem] font-bold w-[25rem]">
          Discover Unique Flavors with Flavor Finds
        </h1>
        <p className="mt-8 mb-6 font-proxima-nova text-primary font-medium leading-relaxed w-[30rem]">
          Unleash your culinary creativity with Flavor Finds. Our platform
          offers a curated collection of diverse, innovative recipes and smart
          features, making your cooking experience delightful and uniquely
          yours.
        </p>
        <Link to={`/sign-up`} className="no-underline text-primary">
          <span className="flex justify-center items-center w-[5.5rem] gap-2 px-4 py-2 bg-[#114232] rounded-full font-proxima-nova border border-solid border-white text-white hover:bg-white hover:text-[#114232] hover:border-[#114232]">
            <UserPlus />
            Sign Up
          </span>
        </Link>
      </div>
      <div>
        <img
          className="w-[35rem] h-[25rem] "
          src="/images/AboutUs.png"
          alt=""
        />
      </div>
    </div>
  );
}
