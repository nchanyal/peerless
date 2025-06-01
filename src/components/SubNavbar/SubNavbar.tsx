"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Package, Lock } from "lucide-react";
import AddPostButton from "../AddPostButton/AddPostButton";
import { SetStateAction } from "react";
import { Post } from "@/interfaces/Post";

enum ROUTE {
  Available = "/dashboard/available",
  Claimed = "/dashboard/claimed",
}

interface SubNavbarProps {
  itemName: string;
  pickupCountry: string;
  deliveryCity: string;
  imageUrl: string;
  setPostArray: React.Dispatch<SetStateAction<Post[]>>;
}

export default function SubNavbar({
  itemName,
  pickupCountry,
  deliveryCity,
  imageUrl,
  setPostArray,
}: SubNavbarProps) {
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
    <div className="overflow-auto">
      <h1 className="text-3xl font-semibold text-gray-800 my-8">
        Item Requests
      </h1>
      <div className="flex justify-between min-w-98">
        <div className="flex gap-6 w-60">
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
        <AddPostButton
          itemName={itemName}
          pickupCountry={pickupCountry}
          deliveryCity={deliveryCity}
          imageUrl={imageUrl}
          setPostArray={setPostArray}
        />
      </div>
    </div>
  );
}
