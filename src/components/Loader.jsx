import "./Loader.css";
const Loader = () => {
  const images = [
    "https://res.cloudinary.com/dlrsxizob/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1664724008/Conversion/cats-2.gif",
    "https://res.cloudinary.com/dlrsxizob/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1664724008/Conversion/cats-3.gif",
    "https://res.cloudinary.com/dlrsxizob/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1664724008/Conversion/cats-1.gif",
  ];
  const random = Math.floor(Math.random() * 3);
  return (
    <div className="loader">
      <p className="cargando">Cargando...</p>
      <img src={images[random]} alt="loading cat" width="250" />
    </div>
  );
};

export default Loader;
