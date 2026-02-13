
export default function Users() {
    const users = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Inactive" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer", status: "Active" },
        { id: 4, name: "Dana White", email: "dana@example.com", role: "Admin", status: "Active" },
        { id: 5, name: "Edward Norton", email: "edward@example.com", role: "Editor", status: "Pending" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
            case "Inactive": return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";
            case "Pending": return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
            default: return "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400";
        }
    };

    return (
        <div>
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h1>
                    <p className="text-slate-500">Manage your team members and their roles.</p>
                </div>
                <button className="btn btn-primary w-auto">+ Add User</button>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-xs">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="text-sm">{user.role}</span>
                                </td>
                                <td>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="bg-transparent border-none text-indigo-600 hover:text-indigo-700 cursor-pointer font-semibold text-sm">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}