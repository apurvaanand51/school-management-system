// components/students/AddStudentModal.js
"use client";

import AddStudentForm from "./AddStudentForm";

export default function AddStudentModal({ open, onClose, onSuccess }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-2xl mx-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Add Student</h2>
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Close</button>
          </div>

          <AddStudentForm onSuccess={onSuccess} />
        </div>
      </div>
    </div>
  );
}
