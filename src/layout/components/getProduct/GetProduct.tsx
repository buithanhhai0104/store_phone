import React, { useEffect, useState } from "react";
import { getProducts } from "../../../service/product";
import { ICategory } from "../../../type";
import GetProductItem from "./GetProductItem";

const GetProduct: React.FC = (props) => {
  const [productData, setProductData] = useState<ICategory[]>([]);
  const [renderNewData, setRenderNewData] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProducts();
        if (productData) {
          setProductData(productData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [renderNewData]);
  console.log(productData);
  return (
    <div className="w-[90%]  mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Danh sách sản phẩm
      </h1>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-2">
          Sản phẩm iPhone
        </h3>
        {productData
          .filter((item) => item.category === "iphone")
          .map((product) => {
            return (
              <GetProductItem
                setRenderNewData={setRenderNewData}
                renderNewData={renderNewData}
                product={product}
              />
            );
          })}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-2">
          Sản phẩm Macbook
        </h3>
        {productData
          .filter((item) => item.category === "macbook")
          .map((product) => {
            return (
              <GetProductItem
                setRenderNewData={setRenderNewData}
                renderNewData={renderNewData}
                product={product}
              />
            );
          })}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-2">
          Sản phẩm iPad
        </h3>
        {productData
          .filter((item) => item.category === "ipad")
          .map((product) => {
            return (
              <GetProductItem
                setRenderNewData={setRenderNewData}
                renderNewData={renderNewData}
                product={product}
              />
            );
          })}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-2">
          Sản phẩm Apple Watch
        </h3>
        {productData
          .filter((item) => item.category === "watch")
          .map((product) => {
            return (
              <GetProductItem
                product={product}
                setRenderNewData={setRenderNewData}
                renderNewData={renderNewData}
              />
            );
          })}
      </div>
      r
    </div>
  );
};

export default GetProduct;
