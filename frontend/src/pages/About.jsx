import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-[360px]" src={assets.about_image} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-500">
          <p>
            Welcome to Afya yangu doctor Appointment system. You health and
            wellbeing is our priority. Welcome to Afya yangu doctor Appointment
            system. You health and wellbeing is our priority
          </p>
          <p>
            Welcome to Afya yangu doctor Appointment system. You health and
            wellbeing is our priority. Welcome to Afya yangu doctor Appointment
            system. You health and wellbeing is our priority
          </p>
          <b className="text-gray-700">Our Vision</b>
          <p>
            Welcome to Afya yangu doctor Appointment system. You health and
            wellbeing is our priority. Welcome to Afya yangu doctor Appointment
            system. You health and wellbeing is our priority
          </p>
        </div>
      </div>
      <div className="text-xl my-4 text-center">
        <p>
          Why <span className="text-gray-700 font-semibold">Choose Us</span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary  hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] text-gray-600 hover:bg-primary hover:text-white transition-all duration-300  cursor-pointer ">
          <b>Convenience:</b>
          <p>
            Access to network of trusted healthcare professionals in your area
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
