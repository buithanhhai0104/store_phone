import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { ICategory } from "../../type";

type ProductsProps = {
  products: ICategory[];
};

const SlideProduct: React.FC<ProductsProps> = ({ products }) => {
  const sliderRefIphone = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const currentSlider = sliderRefIphone.current;
    if (currentSlider) {
      currentSlider.scrollTo({
        left: currentSlider.offsetWidth * currentIndex,

        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < products.length / 6) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div className="flex h-[500px] relative">
      <div
        ref={sliderRefIphone}
        className="  flex flex-row  gap-4 overflow-auto overflow-x-hidden  max-w-[1200px] min-w-[1024px] m-auto rounded-3xl "
      >
        {products.map((item) => {
          return (
            <Link
              to={`/:${item.id}`}
              key={item.id}
              className="flex items-center flex-col w-[280px] flex-shrink-0 bg-[#2b2a2a] py-[30px]  rounded-3xl hover:shadow-product m-[4px]"
            >
              <img
                className="w-[250px] h-[250px]"
                src={item.image}
                alt={item.model}
              />
              <h3 className="text-[#ffff] my-[20px]">{item.model}</h3>
              <span className="text-[#ffff]">{item.price_vnd}</span>
              <span className="text-[#ff9f00]">
                {item.promotion_online ? "Online giá rẻ quá" : ""}
              </span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={nextSlide}
        className=" flex justify-center items-center absolute right-[20px] top-[45%] w-[50px] h-[50px] bg-[#29292a] text-[#ffff] rounded-full hover:bg-[#757575]"
      >
        <FaArrowRight />
      </button>
      <button
        onClick={prevSlide}
        className=" flex justify-center items-center absolute left-[20px] top-[45%] w-[50px] h-[50px] bg-[#29292a] text-[#ffff] rounded-full hover:bg-[#757575]"
      >
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default SlideProduct;
