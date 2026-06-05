export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">Analytics</h1>
      <p className="text-gray-400 mb-8">
        Engagement and performance insights
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-gray-400">Messages Sent</h3>
          <p className="text-3xl font-bold mt-2">248,320</p>
          <p className="text-green-400 mt-2">▲ +12.4%</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-gray-400">Delivered</h3>
          <p className="text-3xl font-bold mt-2">241,108</p>
          <p className="text-green-400 mt-2">▲ 97.1%</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-gray-400">Failed</h3>
          <p className="text-3xl font-bold mt-2">1,820</p>
          <p className="text-red-400 mt-2">▼ -3.1%</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h3 className="text-gray-400">Avg. Response</h3>
          <p className="text-3xl font-bold mt-2">1.4m</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Message Trends */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-2">
            Message Trends
          </h2>
          <p className="text-gray-400 mb-6">
            Sent vs delivered (14d)
          </p>

          <div className="h-64 flex items-end gap-4">
            {[40, 55, 70, 65, 80, 95, 90].map((h, i) => (
              <div
                key={i}
                className="bg-green-500 w-10 rounded-t"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Day 1</span>
            <span>Day 3</span>
            <span>Day 5</span>
            <span>Day 7</span>
            <span>Day 9</span>
            <span>Day 11</span>
            <span>Day 14</span>
          </div>
        </div>

        {/* Delivery Rate */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-2">
            Delivery Rate
          </h2>
          <p className="text-gray-400 mb-6">
            Daily delivery %
          </p>

          <div className="h-64 flex items-end gap-4">
            {[80, 84, 88, 91, 95, 98, 100].map((h, i) => (
              <div
                key={i}
                className="bg-blue-500 w-10 rounded-t"
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <span>Day 1</span>
            <span>Day 3</span>
            <span>Day 5</span>
            <span>Day 7</span>
            <span>Day 9</span>
            <span>Day 11</span>
            <span>Day 14</span>
          </div>

          <p className="mt-4 text-green-400 font-semibold">
            Day 14 Rate: 99.8%
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Campaign Performance */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            Campaign Performance
          </h2>

          <div className="space-y-4">
            <div>
              <p>Re-engagement</p>
              <div className="bg-slate-700 h-3 rounded mt-1">
                <div className="bg-green-500 h-3 rounded w-[92%]"></div>
              </div>
            </div>

            <div>
              <p>Webinar</p>
              <div className="bg-slate-700 h-3 rounded mt-1">
                <div className="bg-blue-500 h-3 rounded w-[78%]"></div>
              </div>
            </div>

            <div>
              <p>Newsletter</p>
              <div className="bg-slate-700 h-3 rounded mt-1">
                <div className="bg-purple-500 h-3 rounded w-[65%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">
            Success Rate Distribution
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Delivered</span>
              <span className="text-green-400">97%</span>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>
              <span className="text-yellow-400">2%</span>
            </div>

            <div className="flex justify-between">
              <span>Failed</span>
              <span className="text-red-400">1%</span>
            </div>
          </div>

          <div className="mt-6 bg-slate-700 rounded-full h-6 overflow-hidden flex">
            <div className="bg-green-500 w-[97%]"></div>
            <div className="bg-yellow-400 w-[2%]"></div>
            <div className="bg-red-500 w-[1%]"></div>
          </div>
        </div>

      </div>
    </div>
  );
}