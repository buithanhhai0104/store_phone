import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { MouseEventHandler } from "react";
import { addProduct } from "../../../service/product";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../../../../type/product";
const AddProductForm: React.FC = () => {
  const optionColors = [
    {
      color_name: "Đỏ",
      color_id: "#FF0000",
    },
    {
      color_name: "Đen",
      color_id: "#000000",
    },
    {
      color_name: "Hồng",
      color_id: "#FFC0CB",
    },
    {
      color_name: "Vàng",
      color_id: "#FFFF00",
    },
    {
      color_name: "Xám",
      color_id: "#D3D3D3",
    },
    {
      color_name: "Cam",
      color_id: "#FFA500",
    },
  ];
  const [chooseColor, setChooseColor] = useState<
    {
      color_name: string;
      color_id: string;
    }[]
  >([]);
  const [chooseVersion, setChooseVersion] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("iphone");
  const [productLine, setProductLine] = useState<string>("");
  const [productImg, setProductImg] = useState<string>("");
  const [valueVersion, setValueVersion] = useState<string>("");
  const [imgPrivew, setImgPreview] = useState<string>("");

  const AddProduct = async () => {
    const product: IProduct = {
      id: uuidv4(),
      category: category,
      model: productName,
      version: productLine,
      colors: chooseColor,
      image: productImg,
      price_vnd: productPrice,
      configuration: {
        storage: chooseVersion,
      },
    };
    const isObjectEmpty: any = (product: any) => {
      return Object.values(product).every((value) => {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return isObjectEmpty(value);
        }
        return value !== null && value !== undefined && value !== "";
      });
    };
    if (isObjectEmpty(product)) {
      await addProduct(product);
    } else {
      alert("vui lòng nhập đầy đủ thông tin");
    }
  };

  // add
  const handleAddColor =
    (item: {
      color_name: string;
      color_id: string;
    }): MouseEventHandler<HTMLButtonElement> =>
    () => {
      const checkChoose = chooseColor.find(
        (e) => e.color_name === item.color_name
      );
      if (checkChoose) {
        return;
      } else if (chooseColor.length < 5) {
        setChooseColor((prev) => [...prev, item]);
      }
    };
  // Delete
  const handleDeleteColor =
    (color_name: string): MouseEventHandler<HTMLSpanElement> =>
    (event) => {
      setChooseColor((prev) =>
        prev.filter((item) => item.color_name !== color_name)
      );
    };
  // Thông tin sản phẩm
  const handleDeleteVersion =
    (color_name: string): MouseEventHandler<HTMLSpanElement> =>
    (event) => {
      setChooseVersion((prev) => prev.filter((item) => item !== color_name));
    };
  return (
    <div className="w-[90%]  mx-auto p-6 bg-white text-black rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Thêm sản phẩm mới
      </h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Thông tin sản phẩm
        </h2>
        <label className="block mb-4">
          <span className="text-gray-600">Tên Sản phẩm:</span>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Nhập tên sản phẩm"
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </section>

      {/* Dòng sản phẩm */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Danh mục và Thương hiệu
        </h2>
        <label className="block mb-4">
          <span className="text-gray-600">Danh mục:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          >
            <option value="iphone">iPhone</option>
            <option value="macbook">Macbook</option>
            <option value="ipad">iPad</option>
            <option value="watch">Apple Watch</option>
          </select>
        </label>
      </section>

      {/* Giá bán  */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Giá bán</h2>
        <label className="block mb-4">
          <span className="text-gray-600">Giá bán:</span>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            type="text"
            placeholder="Nhập giá bán"
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </section>

      {/*Hình ảnh sản phẩm  */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Ảnh sản phẩm
        </h2>
        <label className="flex mb-4 items-end gap-4 ">
          <div className="flex-1">
            <span className="text-gray-600">Link hình ảnh:</span>
            <input
              value={productImg}
              onChange={(e) => setProductImg(e.target.value)}
              type="text"
              placeholder="Nhập Link hình ảnh"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={() => setImgPreview(productImg)}
            className=" flex justify-center items-center w-[80px] h-[35px] p-1 text-[14px] bg-red-500 rounded-xl text-white mb-1 "
          >
            Xem trước
          </button>
        </label>
        <div className="mt-2 w-full h-40 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
          <img className="w-[140px] h-[140px]" src={imgPrivew} alt="" />
        </div>
      </section>
      {/* chi tiết  sản phẩm */}

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Chi tiết và Thuộc tính
        </h2>
        <div className="block mb-4">
          <span className="text-gray-600">
            Màu sắc:
            <div className="flex gap-[10px] py-[5px] overflow-hidden">
              {optionColors.map((item) => {
                return (
                  <button
                    key={item.color_id}
                    onClick={handleAddColor(item)}
                    className={`w-[40px] h-[40px] rounded-full`}
                    style={{ backgroundColor: item.color_id }}
                  ></button>
                );
              })}
            </div>
          </span>

          <div className="w-full  min-h-[40px] border-[1px] border-blue-500  gap-[20px] mt-[10px] flex items-center p-[10px]">
            {chooseColor.map((item) => {
              return (
                <div className="flex items-center gap-[10px]">
                  <div className="flex">
                    <span
                      style={{ backgroundColor: item.color_id }}
                      className="w-[50px] h-[30px] flex justify-center items-center text-white rounded-lg"
                    >
                      {item.color_name}
                    </span>
                  </div>
                  <span
                    onClick={handleDeleteColor(item.color_name)}
                    className=" flex justify-center items-center text-[20px]"
                  >
                    <FaXmark className="cursor-pointer" />
                  </span>
                </div>
              );
            })}
          </div>
          <label className="block mb-4 mt-3 ">
            <span className="text-gray-600">Version:</span>
            <div className="flex items-center gap-3">
              <input
                onChange={(e) => setValueVersion(e.target.value)}
                value={valueVersion}
                type="text"
                placeholder="Nhập version vd: 256Gb"
                className="mt-1 w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={() => {
                  setChooseVersion((prev) => [...prev, valueVersion]);
                  setValueVersion("");
                }}
                className="w-[80px] h-[35px] bg-red-500 rounded-xl text-white "
              >
                OK
              </button>
            </div>
          </label>

          <div className="w-full  min-h-[40px] border-[1px] border-blue-500  gap-[20px] mt-[10px] flex flex-col items-center p-[10px]">
            {chooseVersion.map((item) => {
              return (
                <div className="flex items-center gap-[10px] w-full">
                  <div className="flex">
                    <span className="w-[50px] h-[30px] flex justify-center items-center rounded-lg bg-slate-500 text-white">
                      {item}
                    </span>
                  </div>
                  <span
                    onClick={handleDeleteVersion(item)}
                    className=" flex justify-center items-center text-[20px]"
                  >
                    <FaXmark />
                  </span>
                </div>
              );
            })}
          </div>
          <label className="block mb-4">
            <span className="text-gray-600">Tên Sản phẩm:</span>
            <input
              value={productLine}
              onChange={(e) => setProductLine(e.target.value)}
              type="text"
              placeholder="Nhập dòng sản phẩm vd: iPad Pro"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </label>
        </div>
      </section>

      <div className="flex justify-between mt-6">
        <button
          onClick={AddProduct}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Lưu
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded">Hủy</button>
      </div>
    </div>
  );
};

export default AddProductForm;
