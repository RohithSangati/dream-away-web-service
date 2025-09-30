import logo from "../../assets/images/logo.png";
const Loader = () => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/70">
      <span className="relative inline-block w-18 h-18">
        <span className="absolute top-0 left-0 w-full h-full rounded-full border-t-4 border-primary border-r-4 border-r-transparent animate-spinLoader"></span>
        <img src={logo} alt="Dream Away logo" className="w-fit h-fit pt-3" />
        <span className="absolute top-0 left-0 w-full h-full rounded-full border-b-4 border-secondary border-l-4 border-l-transparent animate-spinLoader"></span>
      </span>
    </div>
  );
};

export default Loader;
