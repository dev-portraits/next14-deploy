import dynamic from "next/dynamic";


const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Layout({ children }) {
  return (
        <>
        <Header/>
          <div className="p-5">{children}</div>
        <Footer/>
        </>
  );
}