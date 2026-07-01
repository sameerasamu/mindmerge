import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analyticsApi";

export default function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalCampaigns: 0,
    totalContacts: 0,
    totalTemplates: 0,
    draft: 0,
    running: 0,
    scheduled: 0,
    completed: 0,
    failed: 0,
    paused: 0,
    recentCampaigns: [],
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();

      setAnalytics(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load analytics");
    }
  };

  return (
        <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <button
          onClick={loadAnalytics}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold"
        >
          Refresh
        </button>

      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Active Campaigns</p>

          <h2 className="text-4xl font-bold text-blue-400 mt-2">
            {analytics.running + analytics.scheduled}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Success Rate</p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            92%
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-gray-400">Completion Rate</p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {analytics.completed}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-gray-400 text-lg">
            Total Campaigns
          </h2>

          <p className="text-4xl font-bold mt-3">
            {analytics.totalCampaigns}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-gray-400 text-lg">
            Total Contacts
          </h2>

          <p className="text-4xl font-bold mt-3">
            {analytics.totalContacts}
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-gray-400 text-lg">
            Total Templates
          </h2>

          <p className="text-4xl font-bold mt-3">
            {analytics.totalTemplates}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">

        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <h3>Draft</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.draft}
          </p>
        </div>

        <div className="bg-blue-600 rounded-lg p-4 text-center">
          <h3>Running</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.running}
          </p>
        </div>

        <div className="bg-yellow-500 text-black rounded-lg p-4 text-center">
          <h3>Scheduled</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.scheduled}
          </p>
        </div>

        <div className="bg-green-600 rounded-lg p-4 text-center">
          <h3>Completed</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.completed}
          </p>
        </div>

        <div className="bg-red-600 rounded-lg p-4 text-center">
          <h3>Failed</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.failed}
          </p>
        </div>

        <div className="bg-orange-500 rounded-lg p-4 text-center">
          <h3>Paused</h3>
          <p className="text-3xl font-bold mt-2">
            {analytics.paused}
          </p>
        </div>

      </div>
            <div className="bg-slate-900 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold">
            Recent Campaigns
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>
              <th className="text-left p-4">
                Campaign
              </th>

              <th className="text-left p-4">
                Audience
              </th>

              <th className="text-left p-4">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {analytics.recentCampaigns.length > 0 ? (

              analytics.recentCampaigns.map(
                (campaign: any) => (

                  <tr
                    key={campaign._id}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4">
                      {campaign.name}
                    </td>

                    <td className="p-4">
                      {campaign.audience}
                    </td>

                    <td className="p-4">
                      {campaign.status}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan={3}
                  className="text-center p-8 text-gray-400"
                >
                  No Campaigns Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>
          </div>
  );
}