import Footer from "./Footer";
import PaymentsHistory from "./PaymentsHistory";
import SideBar from "./SideBar";

const UserPaymentRecord = () => {
  return (
    <div className="flex flex-row gap-x-6 h-full bg-light-black w-full overflow-hidden">
      <SideBar />

      <div className="flex flex-col gap-y-10 flex-grow lg:p-6 items-center ">
        <PaymentsHistory />
        <Footer />
      </div>
    </div>
  );
};

export default UserPaymentRecord;
