import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/CustomSlider.css";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";

const CustomSlider = ({ images, imageWidth, imageHeight, label }) => {
  const { t } = useTranslation();

  const allImages = images.map((img) => ({
    img,
  }));

  return (
    <>
      <Swiper
        slidesPerView={1} // Убедитесь, что только 1 изображение отображается
        spaceBetween={10}
        slidesPerGroup={1}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        touchReleaseOnEdges={true} // Разрешает выходить за границы
        resistanceRatio={0} // Уменьшает сопротивление при скролле
      >
        {allImages.map(({ img }, index) => (
          <SwiperSlide key={index}>
            {/* Обёртка для изображения, которая сохраняет фиксированный размер */}
            <div
              className="image-wrapper"
              style={{ width: imageWidth, height: imageHeight }}
            >
              <img
                src={img}
                alt={label}
                style={{ width: imageWidth, height: imageHeight }}
              />
            </div>
            <div className="slider_label_new">
              {label}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default CustomSlider;
