import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SavingBox from "../../components/savingBox/SavingBox";
import { useMediaQuery } from "react-responsive";
type Configuration = {
  screen: string;
  chip: string;
  ram: string;
  storage: string[];
  camera: string;
  battery: string;
};

type Colors = {
  color_id: string;
  color_name: string;
  color_img: string;
};

type DataDetail = {
  id: number;
  model: string;
  price_usd: number;
  price_vnd: string;
  image: string;
  configuration: Configuration;
  promotion_online: boolean;
  colors: Colors[];
};

const ProductDetail: React.FC = () => {
  const { idproduct } = useParams<{ idproduct: string | undefined }>();
  const endpoint = idproduct ? idproduct.slice(1) : "";
  const [dataDetail, setDataDetail] = useState<DataDetail | null>(null);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImg, setActiveImg] = useState<string>("");
  const [activeVersion, setActiveVersion] = useState<string>("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const fetchProductData = async () => {
      if (endpoint) {
        try {
          let productType: string;
          switch (true) {
            case endpoint.includes("MacBook"):
              productType = "macbooks";
              break;
            case endpoint.includes("iPhone"):
              productType = "iphones";
              break;
            case endpoint.includes("iPad"):
              productType = "ipads";
              break;
            case endpoint.includes("Watch"):
              productType = "watches";
              break;
            default:
              productType = "default";
              break;
          }

          const response = await axios.get<DataDetail[]>(
            `http://localhost:3001/${productType}?model=${endpoint}`
          );

          const productData = response.data;

          if (productData.length > 0) {
            setDataDetail(productData[0]);
          }
        } catch (err) {
          console.log("Lỗi khi lấy dữ liệu:", err);
        }
      }
    };

    fetchProductData();
  }, [endpoint]);

  const handleClickVersion = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveVersion(event.currentTarget.value);
  };

  return (
    <section
      className={`  flex justify-center  items-center  ${
        isTabletOrMobile
          ? "flex-col gap-[30px]"
          : "min-w-[1180px] max-w-[1180px] m-auto gap-[100px]"
      }`}
    >
      <div
        className={
          isTabletOrMobile
            ? "w-[400px] h-[400px] mt-[20px]"
            : "w-[550px] h-[550px] sticky top-[80px]"
        }
      >
        <img
          src={activeImg === "" ? dataDetail?.image : activeImg}
          alt={dataDetail?.model}
        />
      </div>
      <div className={` ${isTabletOrMobile ? "w-[95%]" : "w-[580px]"}`}>
        <h1
          className={` ${
            isTabletOrMobile ? "text-[24px]" : "text-[32px]"
          } pb-[20px] pt-[5px] text-[#ffff] font-bold`}
        >
          {dataDetail?.model}
        </h1>
        <div className=" flex flex-col  gap-[20px] text-[#FFFF]">
          <span>Giá và khuyên mãi tại: Hồ Chí Minh</span>
          {!dataDetail?.promotion_online ? (
            <strong>{dataDetail?.price_vnd}</strong>
          ) : null}
          <div className="flex flex-col gap-[10px]">
            <span>Dung lượng</span>
            <div className="flex gap-[20px]">
              {dataDetail?.configuration.storage.map((version) => (
                <button
                  key={version}
                  value={version}
                  onClick={handleClickVersion}
                  className={`py-[10px] px-[12px] bg-[#2f3033] text-[#DBDBDB] rounded-lg ${
                    activeVersion === version ? "border-2 border-blue-500" : ""
                  } `}
                >
                  {version}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-[20px]">
              <span>Màu: {activeColor}</span>
              <div className="flex gap-[20px]">
                {dataDetail?.colors.map((item) => (
                  <button
                    key={item.color_id}
                    onClick={() => {
                      setActiveColor(item.color_name);
                      if (item.color_img) {
                        setActiveImg(item.color_img);
                      }
                    }}
                    style={{ backgroundColor: item.color_id }}
                    className={`w-[40px] h-[40px] rounded-full shadow-inner ${
                      activeColor === item.color_name
                        ? "border-2 border-blue-500"
                        : ""
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SavingBox
          dataDetail={dataDetail}
          productColor={activeColor}
          productVersion={activeVersion}
          productImg={activeImg}
        />
      </div>
    </section>
  );
};

export default ProductDetail;
