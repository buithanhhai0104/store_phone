import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { TbDatabaseEdit } from "react-icons/tb";

const SidebarManagement: React.FC = () => {
  return (
    <div className="w-[35%] sticky top-[0px] h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700 text-center text-lg font-bold">
        Product Manager
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col">
          <li>
            <button className="w-full flex text-left text-[18px] items-center gap-3  px-4 py-2 hover:bg-gray-700 transition">
              <FaCartPlus />
              Thêm sản phẩm
            </button>
          </li>
          <li>
            <button className="w-full  flex text-left text-[18px] items-center gap-3 px-4 py-2 hover:bg-gray-700 transition">
              <TbDatabaseEdit />
              Xem sản phẩm
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarManagement;
