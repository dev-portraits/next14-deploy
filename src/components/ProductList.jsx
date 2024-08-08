"use client";
import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct, getAllProducts } from "@/services/ProductService";
import dynamic from "next/dynamic";
import LoadingSpinner from "./LoadingSpinner";
import Tooltip from "rc-tooltip";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

const ProductDeleteModal = dynamic(() =>
  import("@/components/ProductDeleteModal")
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("title_asc");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(result);
    setCurrentPage(1);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "title_asc") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "title_desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete.id);
        setProducts(products.filter((p) => p.id !== productToDelete.id));
        setFilteredProducts(
          filteredProducts.filter((p) => p.id !== productToDelete.id)
        );
        setShowDeleteModal(false);
      } catch (err) {
        setError("Failed to delete the product. Please try again later.");
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the Link component
    const newItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0], // assuming the first image as the main one
    };
    dispatch(addToCart(newItem));
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <label htmlFor="search" className="sr-only">
            Search Products
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black w-64"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="search products"
          />
          <button
            type="submit"
            className="px-3 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-700 ml-2"
          >
            Search
          </button>
        </form>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black ml-4"
        >
          <option value="title_asc">Sort by Title (Ascending)</option>
          <option value="title_desc">Sort by Title (Descending)</option>
        </select>
        <div className="text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <Link href="/products/addProduct">
          <button className="ml-4 px-4 py-2 border rounded-md bg-green-500 text-white hover:bg-green-700">
            Add Product
          </button>
        </Link>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            ) : (
              paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg  p-4 bg-white hover:shadow-2xl transition-shadow duration-300 relative"
                >
                  <Link
                    href={`products/${product.id}/${product.title
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`}
                    className="text-decoration-none"
                  >
                    <div className="flex justify-center mb-2">
                      <Suspense fallback={<LoadingSpinner />}>
                        <Image
                          src={
                            (product.images[0].startsWith("https://") &&
                              product.images[0]) ||
                            "/cat.jpg"
                          }
                          alt={product.title}
                          width={500}
                          height={500}
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </Suspense>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-black truncate w-full max-w-[260px]">
                      {product.title}
                    </h2>
                    <div className="mb-4">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-red-600 font-bold text-xl">
                          -{(Math.random() * 19 + 1).toFixed(0)}%
                        </span>
                        <h2 className="text-xl font-bold text-black truncate w-full max-w-[255px]">
                          $
                          {`${(
                            product.price -
                            (product.price *
                              (Math.random() * 19 + 1).toFixed(0)) /
                              100
                          ).toFixed(3)}`}
                        </h2>
                      </div>
                      <div className="text-sm text-gray-500">
                        M.R.P.:{" "}
                        <span className="line-through">${product.price}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Inclusive of all taxes
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center space-x-2">
                    <Tooltip placement="top" overlay={<span>Add to Cart</span>}>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        aria-label="add to cart"
                        className="flex items-center text-green-600 hover:text-green-900"
                      >
                        <FontAwesomeIcon icon={faCartPlus} className="mr-1" />
                      </button>
                    </Tooltip>
                    <Tooltip placement="top" overlay={<span>Edit</span>}>
                      <Link
                        href={`/products/${product.id}/update`}
                        aria-label="edit product details"
                        className="flex items-center text-indigo-600 hover:text-indigo-900"
                      >
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                      </Link>
                    </Tooltip>
                    <Tooltip placement="top" overlay={<span>Delete</span>}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteClick(product);
                        }}
                        aria-label="delete product"
                        className="flex items-center text-red-600 hover:text-red-900"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => {
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  Math.abs(currentPage - pageNumber) <= 2
                ) {
                  return (
                    <button
                      aria-label="page number"
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-md text-black ${
                        currentPage === pageNumber
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === currentPage - 3 && pageNumber > 1) ||
                  (pageNumber === currentPage + 3 && pageNumber < totalPages)
                ) {
                  return (
                    <span key={pageNumber} className="px-4 py-2">
                      ...
                    </span>
                  );
                }
                return null;
              }
            )}
            <button
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {showDeleteModal && (
        <ProductDeleteModal
          product={productToDelete}
          onClose={() => setShowDeleteModal(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
