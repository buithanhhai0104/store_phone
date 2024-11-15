import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { MouseEventHandler } from "react";
const AddProductForm = () => {
  // color
  const [chooseColor, setChooseColor] = useState<
    {
      color_name: string;
      color_id: string;
    }[]
  >([]);

  // version

  const [valueVersion, setValueVersion] = useState<string>("");
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
  const [chooseVersion, setChooseVersion] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [productLine, setProductLine] = useState<string>("");
  const [productImg, setProductImg] = useState<string>("");
  const [productColors, setProductColors] = useState<
    { color_id: string; color_name: string; color_img: string }[]
  >([]);

  const AddProduct = async () => {
    const addProduct = {
      model: productName,
      version: productLine,
      colors: chooseColor,
      image: productImg,
      price_vnd: productPrice,
      configuration: {
        storage: chooseVersion,
      },
    };

    try {
      fetch(`http://localhost:3001/${category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addProduct),
      });
    } catch (error) {
      console.error("Không thể thêm sản phẩm:", error);
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

  const handleDeleteVersion =
    (color_name: string): MouseEventHandler<HTMLSpanElement> =>
    (event) => {
      setChooseVersion((prev) => prev.filter((item) => item !== color_name));
    };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-custom-gradient rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Thêm sản phẩm mới
      </h1>

      {/* Product Information */}
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

      {/* Category and Brand */}
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
            <option value="iphones">iPhone</option>
            <option value="macbooks">Macbook</option>
            <option value="ipads">iPad</option>
            <option value="watches">Apple Watch</option>
          </select>
        </label>
      </section>

      {/* Pricing and Stock */}
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

      {/* Image Upload */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Ảnh sản phẩm
        </h2>
        <label className="block mb-4">
          <span className="text-gray-600">Link hình ảnh:</span>
          <input
            value={productImg}
            onChange={(e) => setProductImg(e.target.value)}
            type="text"
            placeholder="Nhập Link hình ảnh"
            className="mt-1 w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <div className="mt-2 w-full h-40 bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400">
          {"Xem trước ảnh tại đây"}
        </div>
      </section>

      {/* Additional Details */}
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

          <div className="w-full  min-h-[40px] border-[1px] border-blue-500  gap-[20px] mt-[10px] flex flex-col items-center p-[10px]">
            {chooseColor.map((item) => {
              return (
                <div className="flex items-center gap-[10px] w-full">
                  <div className="flex">
                    <span
                      style={{ backgroundColor: item.color_id }}
                      className="w-[50px] h-[30px] flex justify-center items-center text-white rounded-lg"
                    >
                      {item.color_name}
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập Link hình ảnh"
                    className="mt-1  flex-1 w-full p-2 border border-gray-300 rounded"
                  />
                  <span
                    onClick={handleDeleteColor(item.color_name)}
                    className=" flex justify-center items-center text-[20px]"
                  >
                    <FaXmark />
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
