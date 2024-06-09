import Footer from "./Footer";
import Navbar from "./Navbar";
import Notification from "./Notification";
import SideBar from "./SideBar";
import image1 from "../images/6437523_3313427.jpg";
const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Successfully saved!",
      message: "Anyone with a link can now view this file",
    },
    {
      id: 2,
      title: "Upload complete!",
      message: "Your files have been uploaded successfully",
    },
    {
      id: 3,
      title: "Password changed",
      message: "Your password has been changed successfully",
    },
  ];
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
          <div className="flex flex-col gap-y-5 flex-grow flex-wrap items-center min-h-screen smd:w-[75%] w-[90%]">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                title={notification.title}
                message={notification.message}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
