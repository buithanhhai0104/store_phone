import React from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useMediaQuery } from "react-responsive";
const Footer: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <footer className="bg-black text-gray-400 py-8 mb-[20px]">
      <div className=" w-[85%] container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="inline-flex gap-[10px] items-center">
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
        </div>

        {/* Các cột link */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 text-sm border-b border-gray-700 pb-[30px]">
          <div className="text-sm">
            <div className="font-bold text-white">Tổng đài</div>
            <p>
              Mua hàng:{" "}
              <Link to={config.routes.home} className="text-blue-500">
                1900.9696.42
              </Link>{" "}
              (8:00 - 21:30)
            </p>
            <p>
              Khiếu nại:{" "}
              <Link to={config.routes.home} className="text-blue-500">
                1900.9868.43
              </Link>{" "}
              (8:00 - 21:30)
            </p>
            <div className="mt-[20px]">
              <h3 className="font-bold text-white">Kết nối với chúng tôi</h3>
              <div className="flex space-x-2 mt-3 gap-[15px]">
                <Link
                  to={config.routes.home}
                  className="text-gray-400 text-[28px] hover:text-white"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to={config.routes.home}
                  className="text-gray-400 text-[30px] hover:text-white"
                >
                  <FaYoutube />
                </Link>
                <Link
                  to={config.routes.home}
                  className="text-gray-400 text-[30px] hover:text-white"
                >
                  <FcGoogle />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Hệ thống cửa hàng</h3>
            <ul className="leading-7">
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Xem 86 cửa hàng
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Nội quy cửa hàng
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Chất lượng phục vụ
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Chính sách bảo hành & đổi trả
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white">Hỗ trợ khách hàng</h3>
            <ul className="leading-7">
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Điều kiện giao dịch chung
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Hướng dẫn mua hàng online
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Hướng dẫn thanh toán
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white">Về thương hiệu TopZone</h3>
            <ul className="leading-7">
              <li>
                <Link to={config.routes.home} className="hover:text-blue-500">
                  Tích điểm Quà tặng VIP
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Giới thiệu TopZone
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Bán hàng doanh nghiệp
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Chính sách xử lý dữ liệu cá nhân
                </Link>
              </li>
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Xem bản mobile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white">Trung tâm bảo hành TopCare</h3>
            <ul className="leading-7">
              <li>
                <Link to={config.routes.home} className="hover:text-white">
                  Giới thiệu TopCare
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`flex ${
            isTabletOrMobile ? "flex-col" : "justify-between"
          } `}
        >
          <div
            className={` ${
              isTabletOrMobile ? "w-full" : "w-[55%] text-center"
            }  pt-1 text-xs  md:text-left mb-[20px]`}
          >
            <p>
              &copy; 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354
              do sở KH & ĐT TP.HCM cấp ngày 02/01/2007.
            </p>
            <p>
              Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP. Hồ Chí Minh.
              Điện thoại: 028 38125960. Địa chỉ liên hệ và gửi chứng từ: Lô
              T2-1.2, Đường D1, D, D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh.
              Chịu trách nhiệm nội dung: Huỳnh Văn Tốt.
            </p>
            <p>Email: hotro@thegioididong.com</p>
          </div>
          <div className="flex justify-cente gap-[20px] r md:justify-end mt-3 space-x-4">
            <img
              src="https://cdnv2.tgdd.vn/webmwg/2024/tz/images/certify-bct.png"
              alt="Cert 1"
              className={isTabletOrMobile ? "h-5" : "h-10"}
            />{" "}
            <img
              src="https://tinnhiemmang.vn/handle_cert?id=topzone.vn"
              alt="Cert 2"
              className={isTabletOrMobile ? "h-5" : "h-10"}
            />
            <img
              src="https://images.dmca.com/Badges/_dmca_premi_badge_4.png?ID=4f44c8e7-b645-4ddb-8aec-c130d0598c85"
              alt="Cert 3"
              className={isTabletOrMobile ? "h-5" : "h-10"}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
