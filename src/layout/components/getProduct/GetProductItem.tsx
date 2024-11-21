import React, { useState } from "react";
import { ICategory } from "../../../type";
import { updateProduct } from "../../../service/product";

interface IgetProductItemProps {
  product: ICategory;
  setRenderNewData: (render: boolean) => void;
  renderNewData: boolean;
}
const GetProductItem: React.FC<IgetProductItemProps> = ({
  product,
  setRenderNewData,
  renderNewData,
}) => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [modelValue, setModelValue] = useState<string>(product.model);
  const [priceValue, setPriceValue] = useState<string>(product.price_vnd);
  const [categoryValue, setCategoryValue] = useState<string>(product.category);
  const [imageValue, setImageValue] = useState<string>(product.image);

  const handleUpdateProduct = async (docId: string) => {
    const productRepair = {
      model: modelValue,
      price_vnd: priceValue,
      category: categoryValue,
      image: imageValue,
    };
    await updateProduct(docId, productRepair);
    setRenderNewData(!renderNewData);
    setShowUpdate((prev) => !prev);
  };

  return (
    <div
      className={`flex  flex-col w-[full]  ${
        showUpdate ? "h-[300px]" : "h-[100px]"
      }  justify-between border-[1px] p-[10px]`}
    >
      <div className="h-[70px] w-full flex justify-between ">
        <div className="flex gap-[20px] ">
          <img src={product.image} alt={product.model} />
          <div className="flex flex-col h-[70px] justify-center">
            <p className="font-semibold text-[17px]">{product.model}</p>
            <p> Giá bán: {product.price_vnd}</p>
          </div>
        </div>
        <div className="flex  flex-col gap-2 items-center">
          <button
            onClick={() => setShowUpdate((prev) => !prev)}
            className="h-[35px] w-[60px] bg-green-400"
          >
            Sửa
          </button>
          <button className="h-[35px] w-[60px] bg-red-400">Xóa</button>
        </div>
      </div>
      {showUpdate && (
        <div className="flex-1 relative grid grid-cols-2 w-[85%] mt-3 gap-5">
          <div className="flex  flex-col gap-2 mr-[50px]">
            <h4 className="font-semibold">Tên sản phẩm:</h4>
            <input
              value={modelValue}
              onChange={(e) => setModelValue(e.target.value)}
              type="text"
              className="border-[2px] h-[50px] rounded-lg pl-2 border-black"
            />
          </div>
          <div className="flex  flex-col gap-2 ">
            <h4 className="font-semibold">Giá sản phẩm:</h4>
            <input
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              type="text"
              className="border-[2px] h-[50px] rounded-lg pl-2 border-black"
            />
          </div>
          <div className="flex  flex-col gap-2  mr-[50px] mt-[-15px]">
            <h4 className="font-semibold">Dòng sản phẩm:</h4>
            <input
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              type="text"
              className="border-[2px] h-[50px] rounded-lg pl-2 border-black"
            />
          </div>
          <div className="flex  flex-col gap-2 mt-[-15px]">
            <h4 className="font-semibold">Hình ảnh sản phẩm :</h4>
            <input
              value={imageValue}
              onChange={(e) => setImageValue(e.target.value)}
              type="text"
              className="border-[2px] h-[50px] rounded-lg pl-2 border-black"
            />
          </div>
          <button
            onClick={() => handleUpdateProduct(product.docId)}
            className="px-4 w-[100px] absolute bottom-[35%] right-[-145px] py-2 bg-green-500 text-white rounded"
          >
            Lưu
          </button>
        </div>
      )}
    </div>
  );
};

export default GetProductItem;
