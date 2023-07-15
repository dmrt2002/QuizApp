import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { updateUser } from "../store/user/userSlice";
import { useParams } from "react-router-dom";

function UserLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const navigate = useNavigate();
  const { slug } = useParams();

  const handleSubmit = async (event: any) => {
    event.preventDefault(); 
    if(formData.email !== "" && formData.name !== "") {
      try {
        const res = await axios.post("/api/users/login", {
          email: formData.email,
          name: formData.name,
          quizId: slug,
        });
        if (res.status === 200) {
          dispatch(
            updateUser({
              email: formData.email,
              id: res.data.user._id,
              name: res.data.user.name,
            })
          );
          navigate(`/quiz/${slug}/questions`);
        }
      }
      catch(err) {
        setError(true)
      }
    }
    else {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000)
    }
  };

  return (
    <>
      <section className="bg-[#1A1A1A] dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white/5 border-white/10 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
            >
              <h1 className="text-xl text-gray-400 font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                Who are you?
              </h1> 
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    name="email"
                    id="email"
                    className="bg-slate-800 border text-white border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    name="name"
                    id="password"
                    placeholder=""
                    className="bg-slate-800 border text-white border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={() => handleSubmit}
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Take Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
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

export default UserLogin;
