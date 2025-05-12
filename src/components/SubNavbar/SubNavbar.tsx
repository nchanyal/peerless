"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Package, Lock } from "lucide-react";
import AddPostButton from "../AddPostButton/AddPostButton";

enum ROUTE {
  Available = "/dashboard/available",
  Claimed = "/dashboard/claimed",
}

export default function SubNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isAvailable = pathname === ROUTE.Available;
  const isClaimed = pathname === ROUTE.Claimed;

  const handleClick = (targetPath: string) => {
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Item Requests</h1>
      <div className="flex justify-between">
        <div className="flex justify-between flex-wrap w-60">
          <Button
            className={`${
              isAvailable
                ? "bg-blue-500 text-gray-50"
                : "bg-gray-100 text-gray-800 border"
            } border-gray-300 hover:bg-blue-400 hover:text-gray-50`}
            aria-selected={isAvailable}
            onClick={() => handleClick(ROUTE.Available)}
          >
            <Package />
            Available
          </Button>
          <Button
            className={`${
              isClaimed
                ? "bg-blue-500 text-gray-50"
                : "bg-gray-100 text-gray-800 border"
            } border-gray-300 hover:bg-blue-400 hover:text-gray-50`}
            aria-selected={isClaimed}
            onClick={() => handleClick(ROUTE.Claimed)}
          >
            <Lock />
            Claimed
          </Button>
        </div>
        <AddPostButton />
      </div>
    </div>
  );
}
