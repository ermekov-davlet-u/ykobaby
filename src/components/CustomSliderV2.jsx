import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "../styles/CustomSliderV2.css";

// import required modules
import { EffectCards } from "swiper/modules";

const CustomSliderV2 = () => {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="xzSwiper" // Измененный класс
      >
        <SwiperSlide className="xzSwiper-slide">Slide 1</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 2</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 3</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 4</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 5</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 6</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 7</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 8</SwiperSlide>
        <SwiperSlide className="xzSwiper-slide">Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default CustomSliderV2;
