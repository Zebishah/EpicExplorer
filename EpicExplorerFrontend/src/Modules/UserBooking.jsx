const UserBooking = () => {
  const bookingsData = [
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },

    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },
    {
      id: "#012",
      tour: "Swat Tour",
      name: "Zohaib Haider",
      email: "zebihaider123@gmail.com",
      date: "01-22-2010",
    },

    // Add more bookings as needed
  ];

  return (
    <div className="bg-light-black min-h-screen flex flex-col justify-center items-center w-[100%]">
      <h1 className="text-yellows text-4xl font-bold my-10">Bookings</h1>
      <div className="w-full space-y-4 flex flex-col justify-center items-center">
        {bookingsData.map((booking, index) => (
          <div
            key={index}
            className="bg-fade-black shadow-lg text-white p-4 rounded-lg flex flex-col smd:flex-row justify-between items-center space-x-4 w-[70%]"
          >
            <div className="flex-1 flex flex-col md:flex-row justify-between items-center md:space-x-4">
              <span className="font-bold text-yellows">{booking.id}</span>
              <span className="font-radios ">{booking.tour}</span>
              <span className="font-radios ">{booking.name}</span>
              <span className="font-radios ">{booking.email}</span>
              <span className="font-radios ">{booking.date}</span>
            </div>
            <button className="bg-yellows text-gray-900 px-4 py-2 rounded-lg">
              Details
            </button>
          </div>
        ))}
      </div>
      <button className="mt-10 bg-yellows text-gray-900 px-6 py-2 rounded-lg">
        See More
      </button>
    </div>
  );
};

export default UserBooking;