import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { updateUser } from "../store/user/userSlice";

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:5000/api/admins/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        console.log(res.data.user._id);
        dispatch(
          updateUser({
            email: formData.email,
            id: res.data.user._id,
            name: res.data.user.name,
          })
        );
        navigate("/admin/quizes");
    }
    }
    catch(err) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);
    }
  };

  return (
    <>
      <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
        <div
          style={{ minHeight: "80vh" }}
          className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
        >
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <a href="#">QuizSync</a>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
              Create, Share, Connect: Join QuizSync and unleash the power of
              interactive quizzes. Craft personalized quizzes, share them
              effortlessly, and embark on a journey of knowledge and fun
              together.
            </p>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Don't have an account?</span>
              <Link to="/" className="underline">
                Get Started!
              </Link>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our{" "}
              <a href="#" className="underline">
                terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                conditions
              </a>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1 flex flex-col justify-center">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Account Login
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5"
            >
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-semibold text-gray-500">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-500">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:underline focus:text-blue-800"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2"></div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error ? (
          <>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed" style={{ bottom: "5vh", left: "2vw"}}
          role="alert"
        >
          <span className="font-bold">Invalid Credentials</span>
          <span className="block sm:inline pl-3">
            Please Try Again
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
        </div>
          </>
        ): (
          <></>
        )}
    </>
  );
}

export default Login;
