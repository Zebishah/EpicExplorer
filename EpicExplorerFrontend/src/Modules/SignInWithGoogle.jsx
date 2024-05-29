// import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // Use named import

const SignInWithGoogle = () => {
  //   const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    const credentials = jwtDecode(response.credential);
    console.log("Login Success:", credentials);
    // setUser(credentials); // Store user credentials in state
    // Handle successful login here (e.g., send the token to your backend)
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    // Handle login failure here
  };

  //   const handleLogout = () => {
  //     googleLogout(); // Logout from Google
  //     setUser(null); // Clear user state
  //     console.log("Logout Success");
  //     window.location.reload(true);
  //   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign In with Google</h1>

      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        useOneTap
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Sign in with Google
          </button>
        )}
      />
    </div>
  );
};

export default SignInWithGoogle;
