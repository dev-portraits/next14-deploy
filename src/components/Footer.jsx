"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-bold mb-2">MinditProducts</h2>
          <p className="text-sm mb-4">
            Delivering quality products with a focus on innovation and customer
            satisfaction.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-sm mb-2">Follow us on:</p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
