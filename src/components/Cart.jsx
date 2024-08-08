"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "@/redux/features/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLoaded = useSelector((state) => state.cart.isLoaded);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartItemQuantity({ id, quantity }));
    }
  };

  return (
    <div className="container mx-auto p-6 vh-100">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {isLoaded && cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
              {item.image.startsWith("https://") ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              ) : (
                <Image
                  src={"/cat.jpg"}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-lg mb-2">${item.price}</p>
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link href="/products">
        <button className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
          Back to Products
        </button>
      </Link>
    </div>
  );
};

export default Cart;
