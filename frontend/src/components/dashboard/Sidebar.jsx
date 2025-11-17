import React, { useState } from "react";
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
  ChevronRight,
} from "lucide-react";
import { Badge } from "../ui/badge";

export function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("overview");

  const mainMenu = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "ongoing", label: "Ongoing Recruitment", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const recruitmentMenu = [
    { id: "vacancies", label: "Vacancies", icon: Briefcase },
    { id: "candidates", label: "Candidates", icon: UserCircle },
    { id: "interviews", label: "Interviews", icon: MessageSquare },
    { id: "offers", label: "Offers", icon: FileCheck },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" stroke="white" strokeWidth="2" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-gray-900">
            Hire<span className="text-indigo-600">Loop</span>
          </span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">AH</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <p className="text-gray-900">Alex Holland</p>
            <p className="text-xs text-gray-500">Recruitment Specialist</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-6">
          <p className="text-xs text-gray-500 mb-2">Main Menu</p>
          <div className="space-y-1">
            {mainMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-4">
          <p className="text-xs text-gray-500 mb-2">Recruitment</p>
          <div className="space-y-1">
            {recruitmentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Help & Support</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
