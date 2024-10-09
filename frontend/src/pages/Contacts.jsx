import { assets } from "../assets/assets";

const Contacts = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contact_image} />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className="text-gray-500">
            00200 Afya Center
            <br />
            House 200, Nairobi, Kenya
          </p>
          <p className="text-gray-500">
            Tel: +254-777-777-777
            <br />
            Email: dairyproducteshop@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">Careers at Afya</p>
          <p className="text-gray-600">
            Keep updated on our teams and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
