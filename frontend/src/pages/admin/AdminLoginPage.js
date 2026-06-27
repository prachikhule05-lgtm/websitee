import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import api, { formatApiError } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/testIds";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post("/auth/login", { email, password });
      login(r.data.user, r.data.token);
      toast.success("Welcome, Admin!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E3A5F] to-[#2563EB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 md:p-10 w-full max-w-md shadow-2xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#0F172A] rounded-2xl flex items-center justify-center">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg text-[#0F172A]">Royal Cleaning</div>
            <div className="font-body text-xs text-[#F59E0B] font-semibold uppercase tracking-wide">Admin Panel</div>
          </div>
        </div>

        <h1 className="font-heading text-2xl font-bold text-[#0F172A] text-center mb-1">Welcome Back</h1>
        <p className="font-body text-sm text-[#1E293B] text-center mb-7">Sign in to manage your business</p>

        <form data-testid={ADMIN.loginForm} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5 block">Email Address</label>
            <input
              data-testid={ADMIN.emailInput}
              type="email"
              placeholder="admin@royalcleaning.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-[#2563EB] transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-[#1E293B] uppercase tracking-wide mb-1.5 block">Password</label>
            <div className="relative">
              <input
                data-testid={ADMIN.passwordInput}
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 font-body text-sm focus:outline-none focus:border-[#2563EB] transition-colors"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            data-testid={ADMIN.loginBtn}
            disabled={loading}
            className="w-full btn-blue-glow bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-xl font-body font-bold text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? <div className="spinner" /> : "Sign In to Admin Panel"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
