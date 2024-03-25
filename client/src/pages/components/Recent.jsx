import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

export default function Recent() {
  const [recentRecipes, setRecentRecipes] = useState([]);

  useEffect(() => {
    const fetchRecentRecipes = async () => {
      try {
        const res = await fetch(
          "/api/recipe/get?sort=createdAt&order=desc&limit=6"
        );
        const data = await res.json();
        setRecentRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentRecipes();
  }, []);

  return (
    <div className="m-12">
      <span className="font-brandon-grotesque text-[2rem] text-[#114232] font-bold">
        Recently Added To{" "}
        <span className="text-[#43ff6c] underline">Flavor Finds</span>
      </span>
      <div className="mt-10">
        {recentRecipes.length > 0 && (
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={4}
            spaceBetween={10}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 3,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper_container"
          >
            {recentRecipes.map((recipe) => (
              <SwiperSlide key={recipe._id}>
                <Link to={`/recipe/${recipe._id}`} className="no-underline">
                  <div
                    className="w-[20rem] h-[20rem] bg-cover bg-center rounded-lg flex flex-col justify-end"
                    style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                  >
                    <div className="bg-[#114232] px-2 py-1 rounded-b-lg">
                      <span className="font-brandon-grotesque font-bold text-white text-[1.5rem] block">
                        {recipe.title}
                      </span>
                      <div className="text-white text-sm font-proxima-nova">
                        <span>Total Time: {recipe.totalTime}</span>
                        <span className="ml-2">
                          Calories: {recipe.calories}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
