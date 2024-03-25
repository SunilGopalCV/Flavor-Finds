import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Compass, UserPlus, ChefHat, PersonStanding } from "lucide-react";
import { Link } from "react-router-dom";

function Carousel() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container mt-5 overflow-hidden">
      <Slider {...settings}>
        <div className="slide-wrapper mx-4">
          <div className="w-[70rem] h-[25rem] bg-gradient-to-bl from-emerald-500 to-emerald-300 rounded-[2.06rem] flex justify-center gap-6 items-center">
            <div className="">
              <h1 className="font-brandon-grotesque text-white text-[3.5rem] mb-[-1rem] ">
                Discover Tasty <span className="underline">Recipes</span>
              </h1>
              <p className="font-overlock text-white text-[1.5rem] w-[30rem]">
                Find your favorite recipes effortlessly with our powerful recipe
                search feature.
              </p>
              <Link to={`/search`} className="no-underline text-primary">
                <span className="flex justify-center items-center w-[5rem] gap-2 px-4 py-2 bg-white rounded-full font-proxima-nova hover:bg-[#ececec]">
                  <Compass />
                  Expolre
                </span>
              </Link>
            </div>
            <div>
              <img
                className="w-[22rem] h-[22rem] rounded-[5rem]"
                src="/images/Slide1Img.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="slide-wrapper mx-4">
          <div className="w-[70rem] h-[25rem] bg-gradient-to-r from-teal-400 to-blue-500 rounded-[2.06rem] flex justify-center items-center">
            <div className="">
              <h1 className="font-brandon-grotesque text-white text-[3.5rem] mb-[-1rem] w-[30rem]">
                Guided Culinary <span className="underline">Adventures</span>
              </h1>
              <p className="font-overlock text-white text-[1.5rem] w-[30rem]">
                Cook like a pro with clear step-by-step instructions. Watch
                engaging cooking videos to master new techniques and enhance
                your skills.
              </p>
              <Link to={`/sign-up`} className="no-underline text-primary">
                <span className="flex justify-center items-center w-[5.5rem] gap-2 px-4 py-2 bg-white rounded-full font-proxima-nova hover:bg-[#ececec]">
                  <UserPlus />
                  Sign Up
                </span>
              </Link>
            </div>
            <div>
              <img
                className="w-[22rem] h-[22rem] rounded-[2rem]"
                src="/images/Slide2Img.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="slide-wrapper mx-4">
          <div className="w-[70rem] h-[25rem] bg-gradient-to-r from-orange-400 to-yellow-500 rounded-[2.06rem] flex justify-center items-center">
            <div className="">
              <h1 className="font-brandon-grotesque text-white text-[3.5rem] mb-[-1rem] ">
                Eat Smart, <span className="underline">Eat Well</span>
              </h1>
              <p className="font-overlock text-white text-[1.5rem] w-[30rem]">
                Make informed choices with detailed nutritional information for
                each recipe. Stay mindful of your health goals while enjoying
                delicious meals.
              </p>
              <Link
                to={`/recipe/65fe7ee1bef5a130ebdbd33a`}
                className="no-underline text-primary"
              >
                <span className="flex justify-center items-center w-[7rem] gap-2 px-4 py-2 bg-white rounded-full font-proxima-nova hover:bg-[#ececec]">
                  <ChefHat />
                  Get Started
                </span>
              </Link>
            </div>
            <div>
              <img
                className="w-[22rem] h-[22rem] rounded-[5rem]"
                src="/images/Slide1Img.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="slide-wrapper mx-4">
          <div className="w-[70rem] h-[25rem] bg-gradient-to-r from-purple-400 to-pink-500 rounded-[2.06rem] flex justify-center items-center">
            <div className="">
              <h1 className="font-brandon-grotesque text-white text-[3.5rem] mb-[-1rem] ">
                Spread the <span className="underline">Flavor</span>
              </h1>
              <p className="font-overlock text-white text-[1.5rem] w-[30rem]">
                Share your culinary creations with friends and family. Connect
                with fellow foodies, and let the world savor the goodness you've
                discovered.
              </p>
              <Link to={`/community`} className="no-underline text-primary">
                <span className="flex justify-center items-center w-[6rem] gap-2 px-4 py-2 bg-white rounded-full font-proxima-nova hover:bg-[#ececec]">
                  <PersonStanding />
                  Join now
                </span>
              </Link>
            </div>
            <div>
              <img
                className="w-[22rem] h-[22rem] rounded-[5rem]"
                src="/images/Slide1Img.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="slide-wrapper mx-4">
          <div className="w-[70rem] h-[25rem] bg-gradient-to-r from-cyan-400 to-teal-500 rounded-[2.06rem] flex justify-center items-center">
            <div className="">
              <h1 className="font-brandon-grotesque text-white text-[3.5rem] mb-[-1rem] w-[35rem]">
                Simplify Your Grocery{" "}
                <span className="underline">Shopping</span>
              </h1>
              <p className="font-overlock text-white text-[1.5rem] w-[30rem]">
                Effortlessly create shopping lists from your favorite recipes.
                Check off ingredients as you shop and enjoy stress-free meal
                preparation.
              </p>
            </div>
            <div>
              <img
                className="w-[22rem] h-[22rem] rounded-[5rem]"
                src="/images/Slide1Img.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;
