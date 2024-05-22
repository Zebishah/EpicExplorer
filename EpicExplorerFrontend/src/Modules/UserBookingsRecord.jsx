import Footer from "./Footer";
import SideBar from "./SideBar";
import UserBooking from "./UserBooking";

const UserBookingsRecord = () => {
  return (
    <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden">
      <SideBar />

      <div className="flex flex-col gap-y-10 flex-grow lg:p-6 items-center ">
        <UserBooking />
        <Footer />
      </div>
    </div>
  );
};

export default UserBookingsRecord;
