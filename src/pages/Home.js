import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

const Home = () => {
  const [greetText, setGreetText] = useState("");
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("default", { weekday: "long" });
  const month = currentDate.toLocaleString("default", { month: "long" });
  const date = `${day}, ${month} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  useEffect(() => {
    let currentHour = currentDate.getHours();
    if (currentHour < 12) setGreetText("Good Morning!");
    else if (currentHour < 18) setGreetText("Good Afternoon!");
    else setGreetText("Good Evening!");
  }, []);

  return (
    <div className="app flex w-screen">
      <Sidebar />
      <div className="min-h-[100vh] w-full">
        <div className="pt-4 w-full flex items-center">
          <div className="flex items-center justify-end gap-2 flex-1 me-3">
            <h3 className="hidden sm:block font-bold text-green-600 text-base">
              {greetText}
            </h3>
            <span className="uppercase text-sm font-light">{date}</span>
          </div>
        </div>
        <div className="notes-wrapper py-4 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
