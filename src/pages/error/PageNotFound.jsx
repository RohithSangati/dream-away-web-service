import { Link } from "react-router-dom";
import pageNotFound from "../../assets/images/page-not-found.png";
const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <img src={pageNotFound} alt="Page Not Found" />
      <div className="text-center flex flex-col text-primary items-center justify-center">
        <div className="font-bold text-[50px]">Ooops!</div>
        <div className="text-[25px] font-bold">
          Looks like you're in the wrong page
        </div>
        <div>We can't find the page you're looking for...</div>
        <Link className="btn-primary mt-5" to="/">
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
