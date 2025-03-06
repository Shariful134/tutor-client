import ManageProducts from "@/components/modules/shop/products";
import { getAllProducts } from "@/services/Product";
import React from "react";

const ManageProductsPage = async () => {
  const { data } = await getAllProducts();
  console.log(data);
  return (
    <div>
      <ManageProducts products={data}></ManageProducts>
    </div>
  );
};

export default ManageProductsPage;
