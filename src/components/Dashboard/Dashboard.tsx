"use client";

import Navbar from "../Navbar/Navbar";
import SubNavbar from "../SubNavbar/SubNavbar";
import Posts from "../Posts/Posts";
import { useState } from "react";
import { Post } from "@/interfaces/Post";

interface DashboardProps {
  posts: Post[];
  itemName: string;
  pickupCountry: string;
  deliveryCity: string;
  imageUrl: string;
}

export default function Dashboard({
  posts,
  itemName,
  pickupCountry,
  deliveryCity,
  imageUrl,
}: DashboardProps) {
  const [postArray, setPostArray] = useState(posts);

  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="bg-gray-100 flex-1">
        <div className="w-full max-w-[1400px] mx-auto px-8">
          <SubNavbar
            itemName={itemName}
            pickupCountry={pickupCountry}
            deliveryCity={deliveryCity}
            imageUrl={imageUrl}
            setPostArray={setPostArray}
          />
          <Posts postArray={postArray} setPostArray={setPostArray} />
        </div>
      </main>
    </div>
  );
}
