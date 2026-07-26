import { redirect } from "next/navigation";

// Root always routes to login; the login page forwards signed-in users to /dashboard.
export default function Root() {
  redirect("/login");
}
