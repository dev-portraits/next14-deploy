// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useSelector } from "react-redux";

// const Header = () => {
//   const cart = useSelector((state) => state.cart.items);
//   const isLoaded = useSelector((state) => state.cart.isLoaded);

//   return (
//     <header className="bg-gray-900 text-white shadow-md">
//       <div className="flex justify-between items-center py-4 px-5">
//         <Link href="#">
//           <div className="flex items-center space-x-2">
//             <Image
//               src="/cat.jpg"
//               alt="MinditProducts Logo"
//               width={40}
//               height={40}
//               className="rounded-full"
//             />
//             <h1 className="text-2xl font-bold">MinditProducts</h1>
//           </div>
//         </Link>
//         <nav>
//           <ul className="flex space-x-6">
//             <li>
//               <Link href="/products" className="hover:text-gray-400">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/products" className="hover:text-gray-400">
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/products/cart"
//                 className="hover:text-gray-400 relative"
//               >
//                 Cart
//                 <span className="absolute top-0 right-0 rounded-full bg-red-600 w-5 h-5 flex items-center justify-center text-xs">
//                   {isLoaded ? cart.length : 0}
//                 </span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

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
