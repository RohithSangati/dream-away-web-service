import Loader from "./components/common/Loader";
import Navbar from "./components/common/Navbar";
import { Outlet } from "react-router-dom";
import { LoaderContext } from "./context/LoaderContext";
import { useContext } from "react";
import Footer from "./components/common/Footer";

function Layout() {
  const { isLoading } = useContext(LoaderContext);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isLoading && <Loader />}
      <div className="flex-grow pl-72 h-full w-full flex justify-center gap-20 pr-70">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
