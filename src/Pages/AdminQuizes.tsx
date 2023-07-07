import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Quizes() {
  let userSlice = useSelector((state: RootState) => state.user);
  let [dashboards, setDashboards] = useState([[]]);
  const [loading, setLoading] = useState(false);
  let quizes = new Array();
  useEffect(() => {
    fetchAnalytics();
  }, []);
  let fetchAnalytics = async () => {
    let param = {
      id: userSlice.id,
    };
    let res = await axios.post("http://localhost:5000/admins/quizes", param);
    quizes = res.data.quizes;
    let countArr = new Array(quizes.length);
    for (let i = 0; i < quizes.length; i++) {
      let param = {
        id: quizes[i]._id,
      };
      let res = await axios.post(
        "http://localhost:5000/admins//quiz/count",
        param
      );
      quizes[i].count = res.data.count;
    }
    setDashboards(quizes);
    setLoading(true)
  };
  return (
    <>
      <SideBar />
      {loading ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div>
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <h2 className="m-5 text-center">My Quizes</h2>
                  <table className="min-w-full ml-5 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Link
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Attendees
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboards !== undefined && dashboards.length !== 0 ? (
                        dashboards.map((user, index: number) => {
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {user.title}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  <a className="underline" href={`http://127.0.0.1:5173/quiz/${user._id}`} target="_blank">http://127.0.0.1:5173/quiz/{user._id}</a>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className="px-2 inline-flex text-xs leading-5
                        font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                  {user.count}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="text-md m-5">No Data Found</div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <img
            className="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt=""
          />
        </div>
      </div>
      )}
    </>
  );
}
