/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

// Spinner component with rotating effect
const Spinner = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-16 h-16 border-8 border-t-8 border-primary border-solid rounded-full animate-spin"></div>
    <span className="text-lg">Enter your M-Pesa PIN</span>
  </div>
);

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, userData } =
    useContext(AppContext); // Ensure userData is available in context

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointmentId, setLoadingAppointmentId] = useState(null); // Track loading state per appointment
  const [showSpinner, setShowSpinner] = useState(false); // Show/Hide the spinner
  const months = [
    "",
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("/");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle payment
  const appointmentPayment = async (appointmentId) => {
    setLoadingAppointmentId(appointmentId); // Set loading for the current appointment
    setShowSpinner(true); // Show the spinner

    try {
      // Check if phone number exists in userData
      const phoneNumber = userData?.phone;

      if (!phoneNumber) {
        toast.error("No phone number found.");
        setLoadingAppointmentId(null); // Reset loading
        setShowSpinner(false); // Hide spinner
        return;
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/pay-appointment",
        { appointmentId, phoneNumber }, // Send the phone number from userData
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Payment initiated successfully!");
      } else {
        toast.error(data.message || "Payment initiation failed.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while initiating the payment."
      );
    } finally {
      setTimeout(() => {
        setShowSpinner(false); // Hide spinner after 25 seconds
      }, 25000); // 25 seconds delay
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <img className="w-32 bg-indigo-50" src={item.docData.image} />
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.specialty}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}{" "}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button
                  onClick={() => appointmentPayment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Spinner Overlay */}
      {showSpinner && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-8 border-t-8 border-primary border-solid rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
