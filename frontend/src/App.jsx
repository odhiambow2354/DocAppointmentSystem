import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import MyAppointments from "./pages/MyAppointments";
import Contacts from "./pages/Contacts";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:specialty" element={<Doctors />} />
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointments/:docId" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
