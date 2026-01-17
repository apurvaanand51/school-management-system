"use client";

import { useEffect, useState } from "react";
import { API } from "@/lib/api";

export default function IssueModal({ close, refresh }) {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    studentId: "",
    bookId: "",
    dueDate: "",
  });

  const loadData = async () => {
    const stu = await API.authGet("/students");
    const bok = await API.authGet("/books");

    setStudents(stu.data);
    setBooks(bok.data.filter((b) => b.availableCopies > 0));
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitIssue = async () => {
    await API.authPost("/issues", {
      studentId: Number(form.studentId),
      bookId: Number(form.bookId),
      dueDate: form.dueDate,
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-lg font-semibold mb-4">Issue Book</h2>

        <select
          className="w-full p-2 border rounded mb-3"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
        >
          <option>Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded mb-3"
          value={form.bookId}
          onChange={(e) => setForm({ ...form, bookId: e.target.value })}
        >
          <option>Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.availableCopies} left)
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />

        <div className="flex justify-between">
          <button
            onClick={close}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={submitIssue}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Issue
          </button>
        </div>
      </div>
    </div>
  );
}

