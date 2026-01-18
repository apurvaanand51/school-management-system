"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AddStudentForm({ onSuccess }) {
  const token = useAuthStore((s) => s.token);

  const [form, setForm] = useState({
    admnNo: "",
    name: "",
    parentName: "",
    address: "",
    class: "",
    section: "",
    dob: "",
    category: "",
    rollNo: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add student");

      alert("Student added successfully!");
      setForm({
        admnNo: "",
        name: "",
        parentName: "",
        address: "",
        class: "",
        section: "",
        dob: "",
        category: "",
        rollNo: "",
      });

      if (onSuccess) onSuccess(); // Refresh list after add
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Student</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="admnNo"
          placeholder="Admission No"
          value={form.admnNo}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="parentName"
          placeholder="Parent Name"
          value={form.parentName}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="class"
          placeholder="Class"
          value={form.class}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={form.dob}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="rollNo"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Student"}
        </button>
      </form>
    </div>
  );
}
