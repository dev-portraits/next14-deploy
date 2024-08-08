"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/ProductService";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !price || !description || !categoryId || !image) {
      setError("All fields are required.");
      return;
    }

    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      categoryId: parseInt(categoryId),
      images: [image],
    };

    try {
      await createProduct(newProduct);
      setSuccess("Product added successfully!");
      setError("");
      setTimeout(() => {
        router.push("/products");
      }, 2000);
    } catch (error) {
      setError("Failed to add product. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add New Product</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows="3"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="categoryId" className="form-label">
            Category ID
          </label>
          <input
            type="number"
            id="categoryId"
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            placeholder="Enter category ID"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
