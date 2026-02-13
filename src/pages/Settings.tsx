import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-500">Manage your account settings and preferences.</p>
            </div>

            <div className="stat-card mb-6">
                <div className="text-lg font-semibold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    Profile Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea className="form-input resize-none" rows={4} placeholder="Tell us something about yourself..."></textarea>
                </div>
                <button className="btn btn-primary w-auto">Save Changes</button>
            </div>

            <div className="stat-card">
                <div className="text-lg font-semibold mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    Notifications
                </div>
                <div className="flex flex-col gap-4">
                    {[
                        { label: "Email Notifications", desc: "Receive emails about your account activity." },
                        { label: "Push Notifications", desc: "Receive push notifications on your browser." },
                        { label: "Marketing Emails", desc: "Receive emails about new features and offers." }
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div>
                                <div className="font-medium text-sm">{item.label}</div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                            </div>
                            <input type="checkbox" defaultChecked={i === 0} className="w-5 h-5 cursor-pointer appearance-none border border-slate-300 rounded checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}