import Footer from "./Footer";
import Navbar from "./Navbar";
import Notification from "./Notification";
import SideBar from "./SideBar";

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
    <>
      <Navbar />
      <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden">
        <SideBar />
        <div className="flex flex-col gap-y-9 items-center justify-center smd:w-[70%] w-[95%] mt-6">
          <h1 className="text-yellows text-xl text-radios">
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
    </>
  );
};

export default Notifications;
