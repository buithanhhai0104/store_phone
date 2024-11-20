import React from "react";
import AddProductForm from "../../layout/components/addProduct/AddProduct";
import SidebarManagement from "../../layout/components/sidebarManagement/SidebarManagement";

const ProductManagement: React.FC = () => {
  return (
    <div className="flex ">
      <SidebarManagement />
      <AddProductForm />
    </div>
  );
};

export default ProductManagement;
