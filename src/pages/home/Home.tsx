import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import SlideProduct from "../../components/slide/SlideProduct";
import { FaApple } from "react-icons/fa6";
const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataIphone, setDataIphone] = useState<any[]>([]);
  const [dataMacbook, setDataMacbook] = useState<any[]>([]);
  const [dataIpads, setDataIpads] = useState<any[]>([]);
  const [dataWatches, setDataWatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/carouselhome");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://store-phone-1t1i2ahu7-thanh-hais-projects-0e39a8d1.vercel.app/api/iphones"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setDataIphone(result[0].iphones);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/macbooks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataMacbook(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/watches");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataWatches(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/ipads");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setDataIpads(result);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousel dataImg={data} />
      <div>
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />

          <p>iPhone</p>
        </div>
        <SlideProduct dataPhone={dataIphone} />
      </div>
      <div>
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>Macbook</p>
        </div>
        <SlideProduct dataPhone={dataMacbook} />
      </div>
      <div>
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>iPad</p>
        </div>
        <SlideProduct dataPhone={dataIpads} />
      </div>
      <div>
        <div className="flex justify-center items-center text-[40px] text-[#ffff] mt-[30px] mb-[30px]">
          <FaApple />
          <p>Watch</p>
        </div>
        <SlideProduct dataPhone={dataWatches} />
      </div>
    </div>
  );
};

export default Home;
