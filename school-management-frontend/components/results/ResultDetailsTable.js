"use client";

export default function ResultDetailsTable({ details }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">Q. No.</th>
          <th className="p-3 text-left">Given Answer</th>
          <th className="p-3 text-left">Correct Answer</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        {details.map((d) => (
          <tr key={d.questionId} className="border-t">
            <td className="p-3">{d.sequenceNo}</td>
            <td className="p-3">
              {d.givenAnswer === null ? "—" : d.givenAnswer}
            </td>
            <td className="p-3">
              {d.correctAnswer === null ? "—" : d.correctAnswer}
            </td>
            <td
              className={`p-3 font-semibold ${
                d.correct ? "text-green-600" : "text-red-600"
              }`}
            >
              {d.correct ? "Correct" : "Wrong"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
