import { useEffect, useMemo, useState } from "react";
import {
  getReports,
  deleteReport,
} from "../api/reportApi";

interface Report {
  _id: string;
  campaignName: string;
  totalSent: number;
  delivered: number;
  failed: number;
  read: number;
  createdAt?: string;
}

export default function Reports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const loadReports = async () => {
    try {
      const data = await getReports();

      if (Array.isArray(data)) {
        setReports(data);
      } else if (data.success) {
        setReports(data.reports || []);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load reports");
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReport(id);

      setReports((prev) =>
        prev.filter((report) => report._id !== id)
      );

      alert("Report deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const exportCSV = () => {
    const rows = [
      [
        "Campaign",
        "Sent",
        "Delivered",
        "Failed",
        "Read",
        "Success %",
        "Created",
      ],

      ...reports.map((report) => [
        report.campaignName,
        report.totalSent,
        report.delivered,
        report.failed,
        report.read,
        report.totalSent === 0
          ? 0
          : (
              (report.delivered /
                report.totalSent) *
              100
            ).toFixed(1) + "%",
        report.createdAt
          ? new Date(
              report.createdAt
            ).toLocaleDateString()
          : "-",
      ]),
    ];

    const csv = rows
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "reports.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    window.print();
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const searchMatch =
        report.campaignName
          .toLowerCase()
          .includes(search.toLowerCase());

      const dateMatch =
        !dateFilter ||
        (report.createdAt &&
          report.createdAt.startsWith(
            dateFilter
          ));

      return searchMatch && dateMatch;
    });
  }, [reports, search, dateFilter]);

  const totalSent = reports.reduce(
    (sum, report) =>
      sum + report.totalSent,
    0
  );

  const totalDelivered =
    reports.reduce(
      (sum, report) =>
        sum + report.delivered,
      0
    );

  const totalFailed =
    reports.reduce(
      (sum, report) =>
        sum + report.failed,
      0
    );

  const successRate =
    totalSent === 0
      ? "0.0"
      : (
          (totalDelivered /
            totalSent) *
          100
        ).toFixed(1);

          return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Reports Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Campaign Performance & Delivery Analytics
          </p>

        </div>

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={loadReports}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl font-semibold"
          >
            Refresh
          </button>

          <button
            onClick={exportCSV}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
          >
            Export CSV
          </button>

          <button
            onClick={exportPDF}
            className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
          >
            Export PDF
          </button>

        </div>

      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Total Reports
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {reports.length}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Messages Sent
          </p>

          <h2 className="text-4xl font-bold text-blue-400 mt-3">
            {totalSent}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Delivered
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-3">
            {totalDelivered}
          </h2>

        </div>

        <div className="bg-slate-900 rounded-xl p-6">

          <p className="text-gray-400">
            Delivery Success
          </p>

          <div className="bg-slate-900 rounded-xl p-6">

            <p className="text-gray-400">
              Failed Messages
            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">
              {totalFailed}
            </h2>

          </div>

          <h2 className="text-4xl font-bold text-yellow-400 mt-3">
            {successRate}%
          </h2>

        </div>

      </div>

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Search Campaign..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-lg p-3"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-lg p-3"
          />

        </div>

      </div>

      {/* Simple Report Chart */}

      <div className="bg-slate-900 rounded-xl p-6 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Delivery Overview
        </h2>

        <div className="space-y-5">

          <div>

            <div className="flex justify-between mb-2">

              <span>Delivered</span>

              <span>{totalDelivered}</span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${successRate}%`,
                }}
              ></div>

            </div>

          </div>

          <div>

            <div className="flex justify-between mb-2">

              <span>Failed</span>

              <span>{totalFailed}</span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-4">

              <div
                className="bg-red-500 h-4 rounded-full"
                style={{
                  width: `${
                    totalSent === 0
                      ? 0
                      : (totalFailed / totalSent) * 100
                  }%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </div>
            <div className="bg-slate-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4">Campaign</th>

              <th className="text-left p-4">Sent</th>

              <th className="text-left p-4">Delivered</th>

              <th className="text-left p-4">Failed</th>

              <th className="text-left p-4">Success</th>

              <th className="text-left p-4">Status</th>

              <th className="text-left p-4">Created</th>

              <th className="text-left p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.length > 0 ? (

              filteredReports.map((report) => {

                const percentage =
                  report.totalSent === 0
                    ? 0
                    : (
                        (report.delivered /
                          report.totalSent) *
                        100
                      ).toFixed(1);

                return (

                  <tr
                    key={report._id}
                    className="border-t border-slate-800 hover:bg-slate-800 transition"
                  >

                    <td className="p-4 font-semibold">
                      {report.campaignName}
                    </td>

                    <td className="p-4">
                      {report.totalSent}
                    </td>

                    <td className="p-4 text-green-400 font-semibold">
                      {report.delivered}
                    </td>

                    <td className="p-4 text-red-400 font-semibold">
                      {report.failed}
                    </td>

                    <td className="p-4 text-yellow-400 font-bold">
                      {percentage}%
                    </td>

                    <td className="p-4">

                      {Number(percentage) >= 90 ? (

                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Excellent
                        </span>

                      ) : Number(percentage) >= 70 ? (

                        <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Good
                        </span>

                      ) : (

                        <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                          Poor
                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      {report.createdAt
                        ? new Date(
                            report.createdAt
                          ).toLocaleDateString()
                        : "-"}

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() => setSelectedReport(report)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(report._id)}
                          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                );

              })

            ) : (

              <tr>

                <td
                  colSpan={8}
                  className="text-center text-gray-400 p-10"
                >
                  No Reports Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
      <div className="mt-8 bg-slate-900 rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Report Summary
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <p className="text-gray-400">
              Total Campaign Reports
            </p>

            <h3 className="text-3xl font-bold text-green-400">
              {reports.length}
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Overall Delivery Rate
            </p>

            <h3 className="text-3xl font-bold text-blue-400">
              {successRate}%
            </h3>
          </div>

          <div>
            <p className="text-gray-400">
              Failed Deliveries
            </p>

            <h3 className="text-3xl font-bold text-red-400">
              {totalFailed}
            </h3>
          </div>

        </div>

      </div>
      
      {selectedReport && (

        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">

          <div className="bg-slate-900 rounded-xl p-6 w-[500px]">

            <h2 className="text-2xl font-bold mb-6">
              Report Details
            </h2>

          <div className="space-y-4">

            <div>
              <p className="text-gray-400">Campaign</p>
              <p className="font-semibold">
                {selectedReport.campaignName}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Messages Sent</p>
              <p className="font-semibold">
                {selectedReport.totalSent}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Delivered</p>
              <p className="font-semibold text-green-400">
                {selectedReport.delivered}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Failed</p>
              <p className="font-semibold text-red-400">
                {selectedReport.failed}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Read</p>
              <p className="font-semibold text-blue-400">
                {selectedReport.read}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Delivery Success</p>
              <p className="font-semibold text-yellow-400">
                {selectedReport.totalSent === 0
                  ? "0%"
                  : (
                      (selectedReport.delivered /
                        selectedReport.totalSent) *
                      100
                    ).toFixed(1) + "%"}
              </p>
            </div>

            <div>
              <p className="text-gray-400">Created</p>
              <p className="font-semibold">
                {selectedReport.createdAt
                  ? new Date(selectedReport.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>

          </div>

          <div className="flex justify-end mt-8">

            <button
              onClick={() => setSelectedReport(null)}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    )}

    </div>
  );
}