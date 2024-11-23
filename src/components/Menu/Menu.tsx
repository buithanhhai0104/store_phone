import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import Tippy from "@tippyjs/react/headless";

import { TiAdjustContrast } from "react-icons/ti";
import { FcPrevious } from "react-icons/fc";
import { user } from "../../../type/user";

interface ICustomListItem {
  title: string;
  icon?: JSX.Element;
  children?: { title: string }[];
}

type userProps = {
  user: user;
};
const Menu: React.FC<userProps> = ({ user }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const customList: ICustomListItem[] = [
    {
      title: `Giao diện: ${isDarkMode ? "Sáng" : "Tối"}`,
      icon: <TiAdjustContrast />,
    },
    {
      title: "Đăng xuất",
      icon: <FcPrevious />,
    },
  ];

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark", !isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleItemClick = (item: ICustomListItem) => {
    if (item.title === "Đăng xuất") {
      handleLogout();
      return;
    }
    toggleDarkMode();
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  };
  return (
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
          {customList.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className="flex w-full border-[1px] text-center items-center gap-[10px] p-[10px] rounded-xl hover:bg-[#1f1f1f]"
            >
              <span>{item.icon}</span>
              <p className="flex-1">{item.title}</p>
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
  );
};

export default Menu;
