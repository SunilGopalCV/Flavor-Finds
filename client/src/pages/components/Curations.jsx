import React from "react";
import { Link } from "react-router-dom";

export default function Curations() {
  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <h1 className="font-brandon-grotesque text-[#114232] text-[2rem] font-bold">
        Handcrafted Curations
      </h1>
      <div className="mt-4 flex justify-center gap-[5rem]">
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=Beverage"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/Beverage.webp"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            Beverages
          </span>
        </div>
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=SweetDish"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/SweetDish.webp"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            Sweet Dish
          </span>
        </div>
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=French"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/French.jpeg"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            French
          </span>
        </div>
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=Indian"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/Indian.jpeg"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            Indian
          </span>
        </div>
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=Japanese"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/Japanese.jpeg"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            Japanese
          </span>
        </div>
        <div className="flex flex-col align-middle justify-center items-center">
          <Link
            to="/search?cuisine=Meditarian"
            className="ml-2 text-primary font-proxima-nova font-semibold no-underline"
          >
            <img
              className="w-[90px] h-[90px] rounded-full object-cover object-center hover:scale-105 transition-scale duration-300"
              src="/images/Meditarian.jpeg"
              alt=""
            />
          </Link>
          <span className="text-primary font-bold font-proxima-nova">
            Meditarian
          </span>
        </div>
      </div>
    </div>
  );
}
