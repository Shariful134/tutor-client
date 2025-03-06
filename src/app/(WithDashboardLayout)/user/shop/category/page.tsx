import ManageCategories from "@/components/modules/shop/category";
import { getAllCategories } from "@/services/Category";

const ProductsCategoryPage = async () => {
  const { data } = await getAllCategories();
  console.log(data);
  return (
    <div>
      <ManageCategories categories={data}></ManageCategories>
    </div>
  );
};

export default ProductsCategoryPage;
