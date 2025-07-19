"use client";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

// Stats data
const overViewData = [
  {
    title: "Total Bookings",
    value: "2,399",
    growth: "15%",
    icon: "hugeicons:neural-network",
    bg: "bg-[#f4f8f2] dark:bg-[#1c0b13]",
  },
  {
    title: "Registered Travelers",
    value: "1,599",
    growth: "15%",
    icon: "pepicons-pencil:megaphone",
    bg: "bg-[#f1eefa]  dark:bg-[#11160c97]",
  },
  {
    title: "Active Packages",
    value: "3,699",
    growth: "15%",
    icon: "tabler:affiliate",
    bg: "bg-[#E4F9F2] dark:bg-[#100813]",
  },
  {
    title: "Tours Covered",
    value: "2,000",
    growth: "15%",
    icon: "solar:bag-2-broken",
    bg: "bg-[#faeef4] dark:bg-[#040D12]",
  },
];
//
export default function ShortOverview() {
  const openMenu = useSelector((state) => state.menu.openMenu);
  return (
    <div
      className={`grid gap-4 ${openMenu ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}
    >
      {overViewData.map((stat, index) => (
        <div
          key={index}
          className={` rounded-lg p-5 hover:shadow-md transition-shadow ${stat?.bg}  `}
        >
          <div className="mb-3">
            <Icon icon={stat.icon} className="size-8" />
          </div>
          <div className="text-sm text-gray-800 dark:text-white mt-1  ">
            {stat.title}
          </div>
          <div className="text-[33px] font-bold text-[#04344D] dark:text-amber-500 my-4">
            {stat.value}
          </div>
          <div className="flex items-start text-[13px] text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2  text-primary dark:text-blue-300 mr-2 mt-0.5">
              <Icon icon="uil:arrow-growth" className="size-[18px]" />
              {stat.growth}
            </span>
            growth from last month
          </div>
        </div>
      ))}
    </div>
  );
}
