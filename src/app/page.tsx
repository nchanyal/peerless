import { syncUser } from "@/actions/user.actions";

export default function Home() {
  syncUser();

  return <div>hi mom!</div>;
}
