import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gp-14 my-10 mt-40 text-sm">
        {/* ---left section--- */}
        <div>
          <img className="mb-5 w-20 cursor-pointer" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We offer the best consultancy service in the country. Book now for a
            service. We offer the best consultancy service in the country. Book
            now for a service.
          </p>
        </div>
        {/* ---center section--- */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600 cursor-pointer">
            <li>Home</li>
            <li>About us</li>
            <li>Privacy Policies</li>
            <li>Contacts us</li>
          </ul>
        </div>

        {/* ---right section--- */}
        <div>
          <p className="text-xl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600 cursor-pointer">
            <li>+254-777-777-777</li>
            <li>dairyproducteshop@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* --copyright text-- */}
        <hr />
        <p className="py-5 text-sm text-center">
          © 2024 Dairy Products. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
