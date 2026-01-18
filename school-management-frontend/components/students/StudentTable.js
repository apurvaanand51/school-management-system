// components/students/StudentTable.js
"use client";

import StudentRow from "./StudentRow";

export default function StudentTable({ students = [], onDeleted }) {
  if (!students || students.length === 0) {
    return <div className="text-center py-8 text-gray-500">No students found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Admission No</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Class</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Section</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y">
          {students.map((s) => (
            <StudentRow key={s.id} student={s} onDeleted={onDeleted} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

