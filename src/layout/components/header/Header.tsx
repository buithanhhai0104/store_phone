import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import config from "../../../config";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Tippy from "@tippyjs/react/headless";
// icon
import { MdOutlineShoppingBag } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { HiOutlineXMark } from "react-icons/hi2";
import { IoReorderThree } from "react-icons/io5";
import { TiAdjustContrast } from "react-icons/ti";
import { BsTranslate } from "react-icons/bs";
import { FcPrevious } from "react-icons/fc";

interface iProduct {
  id: number;
  name: string;
  to?: string;
}

interface ICustomListItem {
  title: string;
  icon?: JSX.Element;
  children?: { title: string }[];
}

const productList: iProduct[] = [
  { id: 1, name: "iPhone", to: config.routes.iphone },
  { id: 2, name: "Mac", to: config.routes.mac },
  { id: 3, name: "iPad", to: config.routes.ipad },
  { id: 4, name: "Watch", to: config.routes.watch },
  { id: 5, name: "Tai nghe, Loa" },
  { id: 6, name: "Phụ Kiện" },
  { id: 7, name: "TekZone" },
  { id: 8, name: "TopCare" },
];

const customList = [
  {
    title: "Giao diện",
    icon: <TiAdjustContrast />,
    children: [
      {
        title: "Sáng",
      },
      {
        title: "Tối",
      },
    ],
  },
  {
    title: "Ngôn ngữ",
    icon: <BsTranslate />,
    children: [
      {
        title: "Tiếng việt",
      },
      {
        title: "English",
      },
    ],
  },
  {
    title: "Đăng xuất",
    icon: <FcPrevious />,
  },
];

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [activeNavMobile, setActiveNavMobile] = useState<boolean>(false);
  const [showCustomList, setShowCustomList] =
    useState<ICustomListItem[]>(customList);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const cartQuantity = useSelector((state: RootState) => state.cart.items);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const hanldeActiveNavMobile = () => {
    setActiveNavMobile((prev) => !prev);
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleItemClick = (item: ICustomListItem) => {
    if (item.title === "Đăng xuất") {
      handleLogout();
      return;
    }
    if (item.title === "Giao diện") {
      toggleDarkMode();
    }
  };
  return (
    <div className={showSearch ? "w-full h-[100vh] bg-screen-cover z-20" : ""}>
      <div className="h-[60px] flex bg-[#101010]">
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
                {!user.id ? (
                  <Link
                    className="bg-custom-gradient p-[5px] rounded-lg"
                    to={config.routes.login}
                  >
                    Đăng nhập
                  </Link>
                ) : (
                  <Tippy
                    interactive={true}
                    delay={[0, 200]}
                    render={(attrs) => (
                      <div
                        className="w-[180px]  bg-[#3e3e3f] p-[10px] flex  gap-[10px] flex-col justify-center items-center rounded-xl text-[#ffff] "
                        {...attrs}
                        tabIndex={1}
                      >
                        <Link
                          className="flex w-full border-[1px] text-[18px] justify-center items-center gap-[20px] p-[10px] rounded-xl hover:bg-[#1f1f1f]"
                          to={config.routes.productmanagement}
                        >
                          Quản lý
                        </Link>
                        {showCustomList.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="flex w-full border-[1px] text-[18px] items-center gap-[20px] p-[10px] rounded-xl hover:bg-[#1f1f1f]"
                          >
                            <span className="text-[20px]">{item.icon}</span>
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  >
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={user.user_img}
                      alt={user.user_name}
                    />
                  </Tippy>
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
      </div>
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
