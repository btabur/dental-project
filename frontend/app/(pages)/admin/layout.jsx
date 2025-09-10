import Menu from "@/app/components/admin/Menu";
import Header from "../../components/admin/Header";

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-body">
      <Header />
      <main className="flex">
        <Menu />
        {children}
      </main>
    </div>
  );
}
