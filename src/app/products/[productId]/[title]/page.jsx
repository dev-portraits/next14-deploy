import ProductViewEdit from "@/components/ProductViewEdit";

export const generateMetadata = ({ params }) => {
  return {
    title: `productOf id- ${params.productId}`,
  };
};

export default async function ProductDetailsPage({ params }) {
  return (
    <div>
      <ProductViewEdit params={params} mode="view" />
    </div>
  );
}
