import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

type CarouselProps = {
  dataImg: { id: number; carousel_img: string }[];
};
const Carousel: React.FC<CarouselProps> = ({ dataImg }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === dataImg.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [dataImg.length]);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < dataImg.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= dataImg.length && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative  ">
      <div
        ref={sliderRef}
        className={`flex overflow-auto overflow-x-hidden shadow-lg rounded-2xl ${
          isTabletOrMobile ? "mt-3.5 w-[95%] m-auto" : ""
        } `}
      >
        {dataImg.map((item) => {
          return <img key={item.id} src={item.carousel_img} alt="" />;
        })}
      </div>
      <button
        onClick={nextSlide}
        className={` flex justify-center items-center absolute right-[20px] top-[45%]  bg-[#29292a] text-[#ffff] rounded-full hover:bg-[#757575] ${
          isTabletOrMobile ? " w-[35px] h-[35px]" : "w-[50px] h-[50px]"
        }`}
      >
        <FaArrowRight />
      </button>
      <button
        onClick={prevSlide}
        className={` flex justify-center items-center absolute left-[20px] top-[45%]  bg-[#29292a] text-[#ffff] rounded-full hover:bg-[#757575] ${
          isTabletOrMobile ? " w-[35px] h-[35px]" : "w-[50px] h-[50px]"
        }`}
      >
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default Carousel;
