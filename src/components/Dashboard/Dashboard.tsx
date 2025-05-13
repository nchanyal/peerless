import Navbar from "../Navbar/Navbar";
import SubNavbar from "../SubNavbar/SubNavbar";

export default function Dashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="bg-gray-100 flex-1">
        <div className="w-full max-w-[1400px] mx-auto px-8">
          <SubNavbar />
        </div>
      </main>
    </div>
  );
}
