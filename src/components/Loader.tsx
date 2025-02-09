const Loader = () => {
  return (
    <div className="relative inline-block w-12 h-12">
      <div className="absolute w-12 h-12 border-2 border-white animate-spin"></div>
      <div className="absolute w-12 h-12 delay-1000 border-2 border-red-500 animate-spin"></div>
    </div>
  );
};

export default Loader;
