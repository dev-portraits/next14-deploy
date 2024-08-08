"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBoxOpen,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const cart = useSelector((state) => state.cart.items);
  const isLoaded = useSelector((state) => state.cart.isLoaded);

  return (
    <header className="bg-dark text-white shadow-md">
      <div className="d-flex justify-content-between align-items-center py-3 px-5">
        <Link
          href="/"
          className="d-flex align-items-center text-decoration-none text-white"
        >
          <Image
            src="/cat.jpg"
            alt="MinditProducts Logo"
            width={40}
            height={40}
            className="rounded-circle me-2"
          />
          <h1 className="h4 m-0">MinditProducts</h1>
        </Link>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link
                href="/products"
                className="nav-link text-white d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faHome} className="me-1" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/products"
                className="nav-link text-white d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faBoxOpen} className="me-1" />
                Products
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link
                href="/products/cart"
                className="nav-link text-white d-flex align-items-center"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                Cart
                {isLoaded && cart.length > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
