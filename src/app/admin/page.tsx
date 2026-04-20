import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin-editor";

export const metadata: Metadata = {
  title: "admin",
};

export default function AdminPage() {
  return <AdminEditor />;
}
