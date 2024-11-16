import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SavingBox from "../../components/savingBox/SavingBox";
import { useMediaQuery } from "react-responsive";
import Evaluate from "../../components/Evaluate/Evaluate";
import Comments from "../../components/Comments/Comments";
import { fetchProductItem } from "../../service/getProductItem";
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
  postProduct: {
    id: number;
    model: string;
    price_usd: number;
    price_vnd: string;
    image: string;
    configuration: Configuration;
    promotion_online: boolean;
    colors: Colors[];
  };
};

const ProductDetail: React.FC = () => {
  const { idproduct } = useParams<{ idproduct: string | undefined }>();
  const endpoint = idproduct ? idproduct.slice(1) : "";
  const [dataDetail, setDataDetail] = useState<DataDetail>();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImg, setActiveImg] = useState<string>("");
  const [activeVersion, setActiveVersion] = useState<string>("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // const fetchProductdata = useCallback(async () => {
  //   try {
  //     if (endpoint) {
  //       const response = await fetch(
  //         `http://localhost:3001/products?id=${endpoint}`
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       setDataDetail(data[0]);
  //     }
  //   } catch (error) {
  //     console.error("Không thể tải bình luận:", error);
  //   }
  // }, []);
  // useEffect(() => {
  //   fetchProductdata();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const productsDataMacbook = await fetchProductItem(endpoint);

      setDataDetail(productsDataMacbook[0]);
    };

    fetchData();
  }, []);

  const handleClickVersion = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveVersion(event.currentTarget.value);
  };

  return (
    <section className="w-[90%] m-auto">
      <div
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
            src={activeImg === "" ? dataDetail?.postProduct.image : activeImg}
            alt={dataDetail?.postProduct.model}
          />
        </div>
        <div className={` ${isTabletOrMobile ? "w-[95%]" : "w-[580px]"}`}>
          <h1
            className={` ${
              isTabletOrMobile ? "text-[24px]" : "text-[32px]"
            } pb-[20px] pt-[5px] text-[#ffff] font-bold`}
          >
            {dataDetail?.postProduct.model}
          </h1>
          <div className=" flex flex-col  gap-[20px] text-[#FFFF]">
            <span>Giá và khuyên mãi tại: Hồ Chí Minh</span>
            {!dataDetail?.postProduct.promotion_online ? (
              <strong>{dataDetail?.postProduct.price_vnd}</strong>
            ) : null}
            <div className="flex flex-col gap-[10px]">
              <span>Dung lượng</span>
              <div className="flex gap-[20px]">
                {dataDetail?.postProduct.configuration.storage.map(
                  (version) => (
                    <button
                      key={version}
                      value={version}
                      onClick={handleClickVersion}
                      className={`py-[10px] px-[12px] bg-[#2f3033] text-[#DBDBDB] rounded-lg ${
                        activeVersion === version
                          ? "border-2 border-blue-500"
                          : ""
                      } `}
                    >
                      {version}
                    </button>
                  )
                )}
              </div>
              <div className="flex flex-col gap-[20px]">
                <span>Màu: {activeColor}</span>
                <div className="flex gap-[20px]">
                  {dataDetail?.postProduct.colors.map((item) => (
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
      </div>
      <div className="flex gap-[75px] mt-[20px]">
        <div className="inline-block w-full">
          <Evaluate id={dataDetail?.postProduct.id} />
        </div>
        <div className="inline-block w-full">
          <Comments id={dataDetail?.postProduct.id} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
