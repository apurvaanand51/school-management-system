"use client";

import Link from "next/link";

export default function ResultTable({ results }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Student</th>
          <th className="p-3 text-left">Exam</th>
          <th className="p-3 text-left">Marks</th>
          <th className="p-3 text-left">Submitted</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {results.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="p-3">{r.student?.name || "N/A"}</td>
            <td className="p-3">{r.exam?.name || "N/A"}</td>
            <td className="p-3">{r.marksObtained}</td>
            <td className="p-3">
              {new Date(r.submittedAt).toLocaleString()}
            </td>
            <td className="p-3">
              <Link
                href={`/dashboard/results/${r.id}`}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                View Details
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
