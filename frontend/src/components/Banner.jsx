import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

/* eslint-disable no-unreachable */
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      <div className="flex-1 py-8 sm:py-19 md:py-16 lg:py-24 lg:pl-5">
        {/* ---left side--- */}
        <div className="text-xl sm:text-1xl md:text-2xl lg:text-4xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all    "
        >
          Create Account
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        {/* ---right side--- */}
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
