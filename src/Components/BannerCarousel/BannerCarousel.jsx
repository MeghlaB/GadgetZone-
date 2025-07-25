
import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function BannerCarousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="overflow-hidden rounded-lg shadow-md"
      >
        <SwiperSlide>
          <img
            src="https://www.startech.com.bd/image/cache/catalog/home/banner/2025/home-appliance-banner-982x500.webp"
            alt="Slide 1"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.startech.com.bd/image/cache/catalog/home/banner/2025/logitech-offer-home-banner-982x500.webp"
            alt="Slide 2"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.startech.com.bd/image/cache/catalog/home/banner/2025/deli-offer-982x500.webp"
            alt="Slide 3"
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
