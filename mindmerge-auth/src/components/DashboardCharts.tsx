import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { day: "Mon", messages: 20 },
  { day: "Tue", messages: 35 },
  { day: "Wed", messages: 30 },
  { day: "Thu", messages: 45 },
  { day: "Fri", messages: 40 },
  { day: "Sat", messages: 60 },
  { day: "Sun", messages: 55 },
];

const pieData = [
  { name: "Delivered", value: 46 },
  { name: "Failed", value: 2 },
  { name: "Scheduled", value: 0 },
];

const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">
          Messages This Week
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="messages"
              stroke="#22c55e"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">
          Campaign Performance
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}