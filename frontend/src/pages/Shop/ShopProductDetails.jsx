import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";

const ShopProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);
  const normalizeImagePath = (path) => path.startsWith("/") ? path : path;

  const product = products?.find((item) => item._id === id);
  console.log(product);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (!product) return <div className="p-6 text-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 font-bold mb-2">₹{product.discountPrice}</p>
        <p className="text-gray-600 font-bold mb-2">Stock: {product.stock}</p>
        <p className="text-gray-600 font-bold mb-2">Category: {product.category}</p>
        <p className="text-gray-700 font-bold mt-4">{product.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

{product.images.map((img, index) => (
  <img
    key={index}
    src={`${backend_url}${normalizeImagePath(img)}`}
    alt="product"
    className="w-full h-64 object-cover rounded-lg shadow"
  />
))}
        </div>

        <button
          className="mt-8 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => navigate("/dashboard-products")}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
};

export default ShopProductDetails;
