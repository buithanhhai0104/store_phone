import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import config from "../../../config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

// icon
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoReorderThree } from "react-icons/io5";
import Menu from "../../../components/Menu/Menu";

interface iProductList {
  id: number;
  name: string;
  to?: string;
}

const productList: iProductList[] = [
  { id: 1, name: "iPhone", to: config.routes.iphone },
  { id: 2, name: "Mac", to: config.routes.mac },
  { id: 3, name: "iPad", to: config.routes.ipad },
  { id: 4, name: "Watch", to: config.routes.watch },
  { id: 5, name: "Tai nghe, Loa" },
  { id: 6, name: "Phụ Kiện" },
  { id: 7, name: "TekZone" },
  { id: 8, name: "TopCare" },
];

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [activeNavMobile, setActiveNavMobile] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const cartQuantity = useSelector((state: RootState) => state.cart.items);
  const [headerFixed, setHeaderFixed] = useState<boolean>(false);
  const handleSearch = () => {
    setShowSearch(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest(".search-container")) {
        setShowSearch(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const hanldeActiveNavMobile = () => {
    setActiveNavMobile((prev) => !prev);
  };

  return (
    <div className={showSearch ? "w-full h-[100vh] bg-screen-cover z-20" : ""}>
      <header
        className={`h-[60px] w-full flex bg-[#101010] ${
          headerFixed ? "fixed z-50" : ""
        }`}
      >
        <div
          className={`flex justify-between items-center   gap-[20px] ${
            !isTabletOrMobile ? "min-w-[1200px] m-auto" : "w-[95%] m-auto"
          }  h-[60px] `}
        >
          {!showSearch ? (
            <>
              {isTabletOrMobile ? (
                <div
                  onClick={hanldeActiveNavMobile}
                  className=" flex justify-center items-center w-[40px] h-[40px] text-[#ffff] text-[30px] "
                >
                  <IoReorderThree />
                </div>
              ) : (
                ""
              )}
              <div className="  inline-flex gap-[10px] items-center">
                <Link
                  to={config.routes.home}
                  className="m-auto bg-logo w-[103px] h-[35px]"
                />
                <div className="w-[0.1px] h-[35px] bg-[#858484]"></div>
                <Link
                  to={config.routes.home}
                  className="m-auto bg-logo2 w-[32px] h-[40px]"
                />
              </div>
              {!isTabletOrMobile ? (
                <ul className="flex w-[65%] text-[#ffffff]">
                  {productList.map((item) => (
                    <li
                      className="flex justify-center w-full h-[60px] hover:bg-[#2D2D2D] font-semibold text-[14px]"
                      key={item.id}
                    >
                      <Link
                        className="flex text-center w-full justify-center items-center gap-[10px]"
                        to={item.to || "/"}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
              <div className="flex gap-[10px] justify-center items-center">
                <div
                  onClick={handleSearch}
                  className={`flex justify-center items-center text-[20px] text-[#ffff] ${
                    !isTabletOrMobile
                      ? "w-[40px] h-[40px]"
                      : "w-[30px] h-[30px]"
                  }  bg-[#2F3033] rounded-full cursor-pointer hover:bg-[#5e5e60]`}
                >
                  <CiSearch />
                </div>
                <Link
                  className={`relative flex justify-center items-center text-[20px] text-[#ffff] ${
                    !isTabletOrMobile
                      ? "w-[40px] h-[40px]"
                      : "w-[30px] h-[30px]"
                  }  bg-[#2F3033] rounded-full cursor-pointer hover:bg-[#5e5e60]`}
                  to={!user ? config.routes.cart : config.routes.cart}
                >
                  <MdOutlineShoppingBag />
                  {cartQuantity.length !== 0 ? (
                    <div className=" flex justify-center items-center absolute top-[-3px] left-[25px] w-[15px] h-[15px] bg-red-600 text-[#fff] rounded-full text-[14px]">
                      {cartQuantity.length}
                    </div>
                  ) : null}
                </Link>
                {!user ? (
                  <Link
                    className="bg-custom-gradient p-[5px] rounded-lg"
                    to={config.routes.login}
                  >
                    Đăng nhập
                  </Link>
                ) : (
                  <Menu user={user} />
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center w-full px-4 search-container">
              <CiSearch className="w-[25px] h-[25px] text-[#979494] mr-[-30px] z-10 " />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-[600px] h-[40px] text-[#ffff] bg-screen-cover pl-[40px] border border-transparent  focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setShowSearch(false)}
                className="ml-2 text-white text-[25px] p-2 rounded-md"
              >
                <HiOutlineXMark />
              </button>
            </div>
          )}
        </div>
      </header>
      {isTabletOrMobile && !showSearch ? (
        <ul
          className={`flex w-[100%] h-[40px] bg-custom-gradient text-[#ffffff] transition-all duration-500 ${
            activeNavMobile ? "" : "hidden"
          }`}
        >
          {productList.slice(0, -2).map((item) => (
            <li
              className="flex justify-center w-full border-[1px] font-semibold text-[11px]"
              key={item.id}
            >
              <Link
                className="flex text-center w-full justify-center items-center gap-[10px]"
                to={item.to || "/"}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
