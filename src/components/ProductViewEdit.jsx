"use client";
import { Suspense, useEffect, useState } from "react";
import { getProductById, editProduct } from "@/services/ProductService";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import LoadingSpinner from "./LoadingSpinner"; // Assuming you have a LoadingSpinner component

const ProductViewEdit = ({ params, mode }) => {
  const [productDetails, setProductDetails] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(params.productId);
      setProductDetails(data);
      setProductImages(data.images || []);
      setLoading(false); // Set loading to false after data is fetched
    };
    fetchData();
  }, [params.productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
    };

    await editProduct(params.productId, updatedProduct);
    router.push(
      `/products/${params.productId}/${productDetails.title
        .replace(/\s+/g, "-")
        .toLowerCase()}`
    );
  };

  const filteredImages = productImages.filter((url) =>
    url.startsWith("https://")
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = {
      id: productDetails.id,
      title: productDetails.title,
      price: productDetails.price,
      image: productDetails.images[0], // assuming the first image as the main one
    };
    dispatch(addToCart(newItem));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <LoadingSpinner />
          </div>
        ) : filteredImages.length > 0 ? (
          <Suspense fallback={<LoadingSpinner />}>
            <Slider {...settings} className="carousel">
              {filteredImages.map((imageUrl, index) => (
                <div key={index} className="p-4">
                  <Image
                    src={imageUrl}
                    alt={`Product Image ${index + 1}`}
                    width={800}
                    height={600}
                    className="object-cover w-full h-96"
                    priority
                  />
                </div>
              ))}
            </Slider>
          </Suspense>
        ) : (
          <div className="p-6 text-center text-gray-700">
            <Image
              src="/cat.jpg"
              alt="No Image"
              width={800}
              height={600}
              className="object-cover w-full h-96"
            />
          </div>
        )}

        <div className="p-6">
          {mode === "edit" ? (
            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                Edit Product
              </h1>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  defaultValue={productDetails?.title}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={productDetails?.description}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  defaultValue={productDetails?.price}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4 text-gray-800">
                {productDetails?.title || "Loading..."}
              </h1>
              <p className="text-lg mb-4 text-gray-700">
                {productDetails?.description}
              </p>
              <div className="mb-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-red-600 font-bold text-xl">
                    -{(Math.random() * 19 + 1).toFixed(0)}%
                  </span>
                  <h2 className="text-xl font-bold text-black truncate w-full max-w-[255px]">
                    $
                    {`${(
                      productDetails?.price -
                      (productDetails?.price * (Math.random() * 19 + 1)) / 100
                    ).toFixed(3)}`}
                  </h2>
                </div>
                <div className="text-sm text-gray-500">
                  M.R.P.:{" "}
                  <span className="line-through">${productDetails.price}</span>
                </div>
                <div className="text-xs text-gray-600">
                  Inclusive of all taxes
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-600 transition-all duration-300"
                >
                  Add to Cart
                </button>
                <Link href={`/products/${params.productId}/update`}>
                  <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600 transition-all duration-300">
                    Edit Product
                  </button>
                </Link>
                <Link href="/products">
                  <button className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-300">
                    Back to Products
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductViewEdit;
