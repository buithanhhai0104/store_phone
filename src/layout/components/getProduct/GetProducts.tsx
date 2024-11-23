import React, { useEffect, useState } from "react";
import { getProducts } from "../../../service/product";
import { IProduct } from "../../../../type/product";
import UpdateProduct from "./UpdateProduct";
import { ClipLoader } from "react-spinners";
const GetProduct: React.FC = (props) => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [renderNewData, setRenderNewData] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await getProducts();
        if (productData) {
          setProductData(productData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [renderNewData]);
  console.log(productData);
  if (loading)
    return (
      <div className="w-[90%] flex justify-center items-center mx-auto p-6 bg-white rounded-lg shadow-md">
        <ClipLoader color="#39aa6c" size={200} speedMultiplier={1} />
      </div>
    );
  return (
    <div className="w-[90%]  mx-auto p-6 bg-white rounded-lg shadow-md text-black">
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
              <UpdateProduct
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
              <UpdateProduct
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
              <UpdateProduct
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
              <UpdateProduct
                product={product}
                setRenderNewData={setRenderNewData}
                renderNewData={renderNewData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default GetProduct;
