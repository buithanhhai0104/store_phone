import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import SavingBox from "../../components/savingBox/SavingBox";
import { useMediaQuery } from "react-responsive";
import Evaluate from "../../components/Evaluate/Evaluate";
import Comments from "../../components/Comments/Comments";
import { getDocumentByFieldName } from "../../service/product";

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
  id: string;
  model: string;
  price_usd: number;
  price_vnd: string;
  image: string;
  configuration: Configuration;
  promotion_online: boolean;
  colors: Colors[];
};

const ProductDetail: React.FC = () => {
  const { idproduct } = useParams<{ idproduct: string }>();
  const id = idproduct ? idproduct.slice(1) : "";
  const [dataDetail, setDataDetail] = useState<DataDetail>();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeImg, setActiveImg] = useState<string>("");
  const [activeVersion, setActiveVersion] = useState<string>("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const fetchData = async () => {
      const productsDataMacbook = await getDocumentByFieldName(
        "products",
        "id",
        id
      );

      setDataDetail(productsDataMacbook[0]);
    };

    fetchData();
  }, [id]);

  const handleClickVersion = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActiveVersion(e.currentTarget.value);
  };

  return (
    <section className="w-[90%] m-auto">
      <div
        className={`  flex justify-center  items-center  ${
          isTabletOrMobile
            ? "flex-col gap-[30px]"
            : "min-w-[1180px] max-w-[1180px] m-auto gap-[150px]"
        }`}
      >
        <div
          className={
            isTabletOrMobile
              ? "w-[400px] h-[400px] mt-[20px]"
              : "w-[500px] h-[500px] "
          }
        >
          <img
            src={activeImg === "" ? dataDetail?.image : activeImg}
            alt={dataDetail?.model}
          />
        </div>
        <div className={` ${isTabletOrMobile ? "w-[95%]" : "w-[580px]"} mt-5`}>
          <h1
            className={` ${
              isTabletOrMobile ? "text-[24px]" : "text-[32px]"
            } pb-[20px] pt-[5px]  font-bold`}
          >
            {dataDetail?.model}
          </h1>
          <div className=" flex flex-col  gap-[20px] ">
            <span>Giá và khuyên mãi tại: Hồ Chí Minh</span>
            <div className="flex flex-col gap-[10px]">
              <span>Dung lượng</span>
              <div className="flex gap-[20px]">
                {dataDetail?.configuration.storage.map((version) => (
                  <button
                    key={version}
                    value={version}
                    onClick={handleClickVersion}
                    className={`py-[10px] px-[12px] bg-[#2f3033] text-white rounded-lg ${
                      activeVersion === version
                        ? "border-2 border-blue-500"
                        : ""
                    } `}
                  >
                    {version}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-[10px]">
                <span>Màu: {activeColor}</span>
                <div className="flex gap-[20px]">
                  {dataDetail?.colors.map((item) => (
                    <button
                      key={item.color_id}
                      onClick={() => {
                        setActiveColor(item.color_name);
                        setActiveImg(dataDetail.image);
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
      <div className="flex gap-[75px] mt-[30px]">
        <div className="inline-block w-full">
          <Evaluate
            id={dataDetail?.id as string}
            model={dataDetail?.model as string}
          />
        </div>
        <div className="inline-block w-full">
          <Comments id={dataDetail?.id as string} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
