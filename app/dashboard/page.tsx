import LogoutButton from "@/components/LogoutButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg border bg-white">
        <h1 className="text-3xl font-bold mb-4">
          Welcome {session.user?.name} 👋
        </h1>

        <p className="mb-2">
          <strong>Email:</strong> {session.user?.email}
        </p>

        <p className="mb-4">
          You are successfully logged in.
        </p>

        <LogoutButton />
      </div>
    </div>
  );
}