// components/students/StudentRow.js
"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function StudentRow({ student, onDeleted }) {
  const token = useAuthStore((s) => s.token);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const ok = confirm(`Delete student "${student.name}"? This cannot be undone.`);
    if (!ok) return;

    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:4000/api/students/${student.id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Delete failed");
      }

      alert("Student deleted");
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error("Delete error", err);
      alert(err.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <tr>
      <td className="px-4 py-3 text-sm text-gray-700">{student.id}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{student.admnNo ?? "-"}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{student.class ?? "-"}</td>
      <td className="px-4 py-3 text-sm text-gray-700">{student.section ?? "-"}</td>
      <td className="px-4 py-3 text-sm text-gray-700">
        <div className="flex gap-2">
          {/* Edit button placeholder - implement edit modal later */}
          <button
            disabled
            title="Edit not implemented yet"
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 cursor-not-allowed"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
}

