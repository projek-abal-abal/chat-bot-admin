"use client";
import Link from "next/link";
import React from "react";
import {
  ActivityIcon,
  CandidateIcon,
  GridIcon,
  SettingIcon,
  StatisticIcon,
  VoteIcon,
  WhitelistIcon,
} from "../../../../public/image";
import Image from "next/image";
import { usePathname } from "next/navigation";

const siderBarItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: GridIcon,
  },
  {
    name: "Intents",
    href: "/admin/intents",
    icon: VoteIcon,
  },
  {
    name: "Logs",
    href: "/admin/logs",
    icon: CandidateIcon,
  },
  {
    name: "Questions",
    href: "/admin/questions",
    icon: WhitelistIcon,
  },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <aside className="h-full col-span-1  border-r border-r-[#A1A1A1] border-r-opacity-30">
      <div className=" mt-10 flex items-center px-4 gap-1">
        <div className="w-16 bg-[#A1A1A1] aspect-square"></div>
        <div className="font-bold text-2xl text-[#A1A1A1]">
          <p>LOREMIPSUM</p>
          <p>DOLOR</p>
        </div>
      </div>
      <div className="flex flex-col mt-12">
        {siderBarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`py-2.5 px-4 rounded-lg hover:bg-[#FFFFFF0F] flex items-center gap-3 ${
              pathName === item.href && "bg-[#FFFFFF0F]"
            }`}
          >
            <Image
              alt={item.name}
              src={item.icon}
              draggable={false}
              className="w-7 h-7"
            />
            <span className="text-lg font-semibold text-[#A1A1A1]">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
