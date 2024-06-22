import io from "socket.io-client";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import image1 from "../images/6437523_3313427.jpg";
import { useDispatch, useSelector } from "react-redux";
import { userNotifications } from "../Redux/Slices/userInfoSlice";

// Ensure this matches your server's address and port

const Notifications = () => {
  const [notification, setNotifications] = useState([]);

  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.userInfoSearch);
  useEffect(() => {
    dispatch(userNotifications());
    const socket = io("http://localhost:5000");
    console.log("Attempting to connect to server...");

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("notification", (data) => {
      console.log("Notification received:", data);
      setNotifications((prev) => [...prev, data]);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from server");
    };
  }, [dispatch]);
  useEffect(() => {
    if (notifications) {
      setNotifications(notifications.userNotifications || []);
    }
  }, [notifications]);

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${image1})` }}
    >
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full w-full overflow-hidden bg-opacity-0 bg-light-black smd:mt-40 mt-20">
        <SideBar />
        <div className="flex flex-col gap-y-10 p-6 items-center w-[80%] ">
          <h1 className="text-yellows text-lg lg:text-4xl font-joining bg-light-black bg-opacity-60 p-4 rounded-lg">
            User Notifications
          </h1>

          <div className="flex flex-col gap-y-2 flex-grow flex-wrap items-center min-h-screen smd:w-[85%] w-[90%]">
            {notification.length > 0 &&
              notification.map((Notification, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-white rounded-lg shadow-xl mx-auto relative w-full"
                >
                  <span className="text-xs font-bold uppercase px-2 mt-2 mr-2 text-green-900 bg-green-400 border rounded-full absolute top-0 right-0">
                    New
                  </span>
                  <span className="text-xs font-bold uppercase m-1 py-1 mr-3 text-gray-500 absolute bottom-0 right-0 font-radios">
                    {new Date(Notification.date).toLocaleString()}
                  </span>
                  <img
                    className="h-12 w-12 rounded-full"
                    alt="John Doe's avatar"
                    src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&faces=1&faceindex=1&facepad=2.5&w=500&h=500&q=80"
                  />
                  <div className="ml-5">
                    <h4 className="text-lg font-radios leading-tight text-gray-900">
                      {Notification.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {Notification.message}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
