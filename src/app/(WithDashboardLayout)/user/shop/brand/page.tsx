import ManageCategoriesBrand from "@/components/modules/shop/brand";
import { getAllBrands } from "@/services/Brand";

const ProductsBrandPage = async () => {
  const { data } = await getAllBrands();
  return (
    <div>
      <ManageCategoriesBrand brands={data}></ManageCategoriesBrand>
    </div>
  );
};

export default ProductsBrandPage;
