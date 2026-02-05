import { redirect } from "next/navigation";
import { checkAuth } from "@/app/actions/admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const isAuth = await checkAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
