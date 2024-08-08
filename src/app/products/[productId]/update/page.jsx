import ProductViewEdit from "@/components/ProductViewEdit";

function page({ params }) {
  return (
    <div>
      <ProductViewEdit params={params} mode="edit" />
    </div>
  );
}

export default page;
