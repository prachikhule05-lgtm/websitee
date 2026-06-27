import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, Star, Settings, LogOut, Crown, Menu, X, TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/testIds";

const AdminLayout = ({ children, title }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/admin/bookings", label: "Bookings", icon: <Calendar className="w-5 h-5" /> },
    { href: "/admin/services", label: "Services", icon: <Settings className="w-5 h-5" /> },
    { href: "/admin/reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#F97316] rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-heading font-bold text-white text-sm">Royal Cleaning</div>
              <div className="font-body text-[10px] text-[#F97316] uppercase tracking-wide">Admin Panel</div>
            </div>
          </div>
          <nav className="space-y-1">
            {nav.map(item => (
              <Link key={item.href} to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-medium transition-all ${
                  location.pathname === item.href
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}>
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white/5 rounded-xl p-3 mb-3">
            <p className="font-body text-xs text-slate-400">Logged in as</p>
            <p className="font-body text-sm font-semibold text-white truncate">{admin?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl font-body text-sm transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-[#0F172A] p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="font-heading font-bold text-lg text-[#0F172A]">{title}</h1>
          </div>
          <Link to="/" className="font-body text-sm text-[#2563EB] hover:underline">← View Site</Link>
        </div>
        <div data-testid={ADMIN.dashboard} className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color, bg, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-card`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
        <span className={color}>{icon}</span>
      </div>
      {trend && <span className="font-body text-xs text-[#22C55E] font-semibold bg-green-50 px-2 py-1 rounded-full">+{trend}</span>}
    </div>
    <div className="font-heading font-extrabold text-3xl text-[#0F172A] mb-1">{value}</div>
    <div className="font-body text-sm text-[#475569]">{label}</div>
  </motion.div>
);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats").then(r => setStats(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusColor = (status) => {
    if (status === "confirmed") return "bg-green-50 text-[#22C55E]";
    if (status === "completed") return "bg-blue-50 text-[#2563EB]";
    if (status === "cancelled") return "bg-red-50 text-red-500";
    return "bg-orange-50 text-[#F97316]";
  };

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="spinner !w-8 !h-8 !border-[#2563EB]" style={{ borderColor: "#2563EB", borderTopColor: "transparent", borderWidth: "3px" }} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Bookings" value={stats?.totalBookings || 0} icon={<Calendar className="w-6 h-6" />} color="text-[#2563EB]" bg="bg-blue-50" />
            <StatCard label="Pending" value={stats?.pendingBookings || 0} icon={<Clock className="w-6 h-6" />} color="text-[#F97316]" bg="bg-orange-50" />
            <StatCard label="Total Leads" value={stats?.totalLeads || 0} icon={<Users className="w-6 h-6" />} color="text-purple-600" bg="bg-purple-50" />
            <StatCard label="Total Reviews" value={stats?.totalReviews || 0} icon={<Star className="w-6 h-6" />} color="text-yellow-500" bg="bg-yellow-50" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: "/admin/bookings", label: "Manage Bookings", color: "bg-[#2563EB] text-white" },
              { href: "/admin/bookings?status=pending", label: `${stats?.pendingBookings || 0} Pending`, color: "bg-orange-50 text-[#F97316] border border-orange-200" },
              { href: "/admin/reviews", label: `${stats?.pendingReviews || 0} Pending Reviews`, color: "bg-yellow-50 text-yellow-600 border border-yellow-200" },
              { href: "/admin/services", label: "Manage Services", color: "bg-green-50 text-[#22C55E] border border-green-200" },
            ].map(a => (
              <Link key={a.href} to={a.href}
                className={`${a.color} rounded-2xl p-4 font-body font-semibold text-sm text-center hover:opacity-90 transition-all shadow-sm`}>
                {a.label}
              </Link>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
            <div className="flex items-center justify-between p-5 border-b border-gray-50">
              <h3 className="font-heading font-bold text-[#0F172A]">Recent Bookings</h3>
              <Link to="/admin/bookings" className="font-body text-sm text-[#2563EB] hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table data-testid={ADMIN.bookingsTable} className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    {["Booking ID", "Customer", "Service", "Date", "Status"].map(h => (
                      <th key={h} className="px-5 py-3 text-left font-body text-xs font-semibold text-[#94A3B8] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(stats?.recentBookings || []).map((b, i) => (
                    <tr key={b.bookingId || i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-body text-sm font-semibold text-[#2563EB]">{b.bookingId}</td>
                      <td className="px-5 py-3 font-body text-sm text-[#0F172A]">{b.customerName}</td>
                      <td className="px-5 py-3 font-body text-sm text-[#475569]">{b.service}</td>
                      <td className="px-5 py-3 font-body text-sm text-[#475569]">{b.date}</td>
                      <td className="px-5 py-3">
                        <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor(b.status)}`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentBookings || stats.recentBookings.length === 0) && (
                    <tr><td colSpan={5} className="px-5 py-8 text-center font-body text-sm text-[#94A3B8]">No bookings yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export { AdminLayout };
export default AdminDashboardPage;
