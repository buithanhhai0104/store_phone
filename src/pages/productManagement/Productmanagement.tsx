import React, { useEffect, useState } from "react";
import AddProductForm from "../../layout/components/addProduct/AddProduct";
import SidebarManagement from "../../layout/components/sidebarManagement/SidebarManagement";
import GetProduct from "../../layout/components/getProduct/GetProducts";
const ProductManagement: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("addProduct");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case "addProduct":
        return <AddProductForm />;
      case "getProduct":
        return <GetProduct />;
      default:
        return;
    }
  };
  return (
    <div className="flex ">
      <SidebarManagement
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      {renderComponent()}
    </div>
  );
};

export default ProductManagement;
