import Navbar from "@/components/Navbar/Navbar";
import SubNavbar from "@/components/SubNavbar/SubNavbar";

export default function AvailablePage() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="bg-gray-100 flex-1">
        <SubNavbar />
      </main>
    </div>
  );
}
