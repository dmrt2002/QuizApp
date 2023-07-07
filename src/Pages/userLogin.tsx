import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { updateUser } from "../store/user/userSlice";
import { useParams } from "react-router-dom";
function UserLogin() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const navigate = useNavigate();
  const { slug } = useParams();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const res = await axios.post("http://localhost:5000/users/login", {
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
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
            >
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Who are you?
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </>
  );
}

export default UserLogin;
