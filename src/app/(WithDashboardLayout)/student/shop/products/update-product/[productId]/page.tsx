const ProductUpdatePage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  console.log(await params);
  return <div>Update</div>;
};

export default ProductUpdatePage;
