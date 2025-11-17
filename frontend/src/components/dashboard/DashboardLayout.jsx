import { useState } from "react";
import { motion } from "../../lib/motion-shim";
import {
  LayoutDashboard,
  Calendar,
  Users,
  BarChart3,
  FileText,
  Briefcase,
  UserCircle,
  MessageSquare,
  FileCheck,
  Settings,
  HelpCircle,
  Bell,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import Sidebar from "./Sidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 mb-1">Hello, Alex Holland 👋</h1>
              <p className="text-sm text-gray-500">Here's the current status for today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Notifications</span>
                <Badge className="bg-gray-900 hover:bg-gray-900 text-white">4</Badge>
              </button>
              <button className="relative flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">Messages</span>
                <Badge className="bg-gray-900 hover:bg-gray-900 text-white">2</Badge>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
