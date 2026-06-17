export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Reports</h1>

      <p className="text-gray-400 mb-8">
        Download campaign reports
      </p>

      <div className="flex gap-4">
        <button className="bg-green-500 text-black px-6 py-3 rounded-lg">
          Download CSV
        </button>

        <button className="bg-blue-500 px-6 py-3 rounded-lg">
          Download Excel
        </button>

        <button className="bg-red-500 px-6 py-3 rounded-lg">
          Download PDF
        </button>
      </div>
    </div>
  );
}