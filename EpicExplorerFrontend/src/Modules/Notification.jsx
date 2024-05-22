import PropTypes from "prop-types";

const Notification = ({ title, message }) => {
  return (
    <div className="bg-light-black border border-slate-300 w-[100%] h-20 shadow-lg rounded-md gap-4 p-4 flex flex-row items-center justify-center">
      <section className="w-6 h-full flex flex-col items-center justify-start">
        <svg
          width="100%"
          className="md:mt-0 mt-4"
          viewBox="0 0 15 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 13.25C10.9518 13.25 13.75 10.4518 13.75 7C13.75 3.54822 10.9518 0.75 7.5 0.75C4.04822 0.75 1.25 3.54822 1.25 7C1.25 10.4518 4.04822 13.25 7.5 13.25Z"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.3269 7.96143C4.80767 9.69219 6.73075 10.7499 8.46152 10.2691C9.51921 9.8845 10.3846 9.01912 10.6731 7.96143"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0481 5.55767C9.91536 5.55767 9.80774 5.45005 9.80774 5.31729C9.80774 5.18453 9.91536 5.0769 10.0481 5.0769"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.0481 5.5577C10.1809 5.5577 10.2885 5.45008 10.2885 5.31732C10.2885 5.18456 10.1809 5.07693 10.0481 5.07693"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.95193 5.55767C4.81917 5.55767 4.71155 5.45005 4.71155 5.31729C4.71155 5.18453 4.81917 5.0769 4.95193 5.0769"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.95197 5.5577C5.08473 5.5577 5.19235 5.45008 5.19235 5.31732C5.19235 5.18456 5.08473 5.07693 4.95197 5.07693"
            stroke="#21ce8f"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </section>
      <section className="h-full flex flex-col items-start justify-end gap-1">
        <h1 className="text-xs smd:text-lg font-semibold text-yellows antialiased">
          {title}
        </h1>
        <p className="text-xs smd:text-sm font-medium text-yellows antialiased">
          {message}
        </p>
      </section>
    </div>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
