import { syncUser } from "@/actions/user.actions";

export default function Navbar() {
  /* syncUser() */ // uncomment when testing

  return (
    <div className="h-20 bg-gray-50 border-b-2 border-b-gray-300 flex items-center">
      <h1 className="text-3xl mx-8 text-gray-800">Peerless</h1>
    </div>
  );
}
