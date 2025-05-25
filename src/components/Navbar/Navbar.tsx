import { SignOutButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <div className="h-20 bg-gray-50 border-b-2 border-b-gray-300 overflow-hidden">
      <div className="flex items-center justify-between mx-8 h-full">
        <h1 className="text-3xl text-gray-800">Peerless</h1>
        <SignOutButton>
          <Button className="bg-slate-700 hover:bg-slate-500">Sign Out</Button>
        </SignOutButton>
      </div>
    </div>
  );
}
