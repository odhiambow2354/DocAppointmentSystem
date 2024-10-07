/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";

const SpecialtyMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="specialty"
    >
      <h1 className=" text-3xl font-medium">Find by Specialty</h1>
      <p className="sm:1/3 text-center text-sm">
        Simply browse through our extensive list of professional
        <br /> doctor & book for appointment
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyMenu;
