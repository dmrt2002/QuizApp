import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function Analysis() {
  let userSlice = useSelector((state: RootState) => state.user);
  let [dashboards, setDashboards] = useState([[]]);
  let [loading, setLoading] = useState(false)
  let quizes = new Array();
  useEffect(() => {
    fetchAnalytics();
  }, []);
  let fetchAnalytics = async () => {
    let param = {
      id: userSlice.id,
    };
    let res = await axios.post("/api/admins/quizes", param);
    let arr = new Array();
    quizes = res.data.quizes;
    res.data.quizes.map(async (quiz: any) => {
      let response = await axios.post(
        "/api/admins/quiz/users",
        { id: quiz._id }
      );
      for (let i = 0; i < quizes.length; i++) {
        if (quizes[i]._id === quiz._id) {
          quizes[i].users = response.data.users;
          console.log(response.data.users)
          for (let j = 0; j < quizes[i].users.length; j++) {
            let res = await axios.post("/api/admins/quiz/users/marks", { id:quizes[i].users[j]._id })
            quizes[i].users[j].percentage = +res.data.result.percentage
          }
        }
      }
      setDashboards(quizes);
    });
    setLoading(true)
  };
  return (
    <>
      <SideBar />
      {loading ? (
      <div className="flex flex-col">
      <div className="overflow-x-auto">
        {dashboards !== undefined ? (
          dashboards.map((dash: any, index: number) => {
            return (
              <div key={index}>
              <h2 className="m-5 text-center">{dash.title}</h2>
              <div key={index} className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full ml-5 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Name
                        </th>
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
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {dash.users !== undefined && dash.users.length !== 0 ? dash.users.map((user: any, index: number) => {
                    return (
                      <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                        {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5
                        font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          {user.percentage}
                        </span>
                      </td>
                      </tr> 
                    );
                    }) : <div className="text-md m-5">No Data Found</div>} 
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
      ): (
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