import React, { useEffect, useState } from "react";
import Carousel from "../../components/carousel/Carousel";
import ProductSection from "../../components/ProductSection/ProductSection";
import config from "../../config";

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataIphones, setDataIphones] = useState<any[]>([]);
  const [dataMacbooks, setDataMacbooks] = useState<any[]>([]);
  const [dataIpads, setDataIpads] = useState<any[]>([]);
  const [dataWatches, setDataWatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategoryData = async (
      url: string,
      setData: React.Dispatch<React.SetStateAction<any[]>>
    ) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoryData("http://localhost:3001/carouselhome", setData);
    fetchCategoryData("http://localhost:3001/iphones", setDataIphones);
    fetchCategoryData("http://localhost:3001/macbooks", setDataMacbooks);
    fetchCategoryData("http://localhost:3001/watches", setDataWatches);
    fetchCategoryData("http://localhost:3001/ipads", setDataIpads);
  }, []);
  return (
    <div>
      <Carousel dataImg={data} />
      <ProductSection
        dataSection={dataIphones}
        title={"iPhone"}
        link={config.routes.iphone}
      />
      <ProductSection
        dataSection={dataMacbooks}
        title={"Macbook"}
        link={config.routes.mac}
      />
      <ProductSection
        dataSection={dataIpads}
        title={"iPad"}
        link={config.routes.ipad}
      />
      <ProductSection
        dataSection={dataWatches}
        title={"Watch"}
        link={config.routes.watch}
      />
    </div>
  );
};

export default Home;
