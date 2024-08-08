import LoadingSpinner from "@/components/LoadingSpinner";
import React, { lazy, Suspense } from "react";

const LazyList = lazy(() => import("@/components/ProductList"));

export const metadata = {
  title: "mindIt-products",
  description: "we provide best products in the world",
};

function view() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyList />
      </Suspense>
    </div>
  );
}

export default view;
