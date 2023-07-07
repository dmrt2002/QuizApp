import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { MdOutlineQuiz, MdCreate } from "react-icons/md";
import {RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi"

export default function SideBar() {
  const [ SideBarState, setSidebarState] = React.useState(true);
  let userSlice = useSelector((state: RootState) => state.user)
  console.log(userSlice.id)
  const Navigate = () => {
    setSidebarState(!SideBarState)
  }
  return (
    <div className={`flex sticky top-0 flex-col flex-auto flex-shrink-0 antialiased bg-red text-gray-800`}>
      <div className={`fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r ${SideBarState ? 'animate-left' : 'animate-right'}`}>
        <div className="flex items-center justify-between h-14 border-b">
          <div className="px-4">QuizSync</div>
          <AiOutlineClose className="mr-4 cursor-pointer" onClick={Navigate} size={18} />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5"></li>
            <li>
              <div
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <MdOutlineQuiz size={20} />
                </span>
                <Link to="/admin/quizes">
                <span className="ml-2 text-sm tracking-wide truncate">
                Quizes
                </span>
                </Link>
              </div>
            </li>
            <li>
              <div
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <RxDashboard size={20} />
                </span>
                <Link to="/admin/analysis">
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
                </Link>
              </div>
            </li>
            <li>
              <div
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <MdCreate size={20}/>
                </span>
                <Link to="/create">
                <span className="ml-2 text-sm tracking-wide truncate">
                 Create a Quiz
                </span>
                </Link>
              </div>
            </li>
            <li>
              <div
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BiLogOut size={20} />
                </span>
                <Link to="/login">
                <span className="ml-2 text-sm tracking-wide truncate">
                 Logout
                </span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <AiOutlineMenu onClick={Navigate} size={24} className="m-5 cursor-pointer" />
    </div>
  );
}
