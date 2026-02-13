
export default function Dashboard() {
    const stats = [
        { label: "Total Revenue", value: "$45,231.89", trend: "+20.1%", color: "#6366f1" },
        { label: "Active Users", value: "2,350", trend: "+180.1%", color: "#10b981" },
        { label: "Sales", value: "+12,234", trend: "+19%", color: "#f59e0b" },
        { label: "Active Now", value: "573", trend: "+201", color: "#ec4899" },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
                <p className="text-slate-500">Welcome back to your dashboard summary.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="text-slate-500 text-sm font-medium mb-2">{stat.label}</div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className={`text-xs ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'} font-semibold`}>
                            {stat.trend} <span className="text-slate-500 font-normal">from last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="stat-card lg:col-span-2 h-[400px] flex flex-col">
                    <div className="font-semibold mb-6">Revenue Growth</div>
                    <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 text-sm italic">
                        Chart Placeholder (Interactive Visualization)
                    </div>
                </div>
                <div className="stat-card h-[400px] flex flex-col">
                    <div className="font-semibold mb-6">Recent Activity</div>
                    <div className="flex-1 overflow-y-auto">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`py-3 ${i < 5 ? 'border-b border-slate-100 dark:border-slate-800' : ''} flex gap-4 items-center`}>
                                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                                <div>
                                    <div className="text-sm font-medium">New user registered</div>
                                    <div className="text-xs text-slate-500">2 minutes ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
