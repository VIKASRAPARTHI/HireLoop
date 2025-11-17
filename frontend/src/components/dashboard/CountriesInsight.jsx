import { motion } from "../../lib/motion-shim";
import { Globe, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export function CountriesInsight() {
  const [activeTab, setActiveTab] = useState("companies");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Countries Insight</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("companies")}
          className={`pb-3 text-sm relative ${
            activeTab === "companies"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Companies
          {activeTab === "companies" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("candidates")}
          className={`pb-3 text-sm relative ${
            activeTab === "candidates"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Candidates
          {activeTab === "candidates" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
          )}
        </button>
      </div>

      {/* World Map */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl overflow-hidden">
        <svg
          viewBox="0 0 800 400"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple world map representation */}
          {/* North America */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            d="M 100 80 L 150 70 L 180 90 L 170 120 L 140 130 L 120 110 Z"
            fill="#4ade80"
            className="hover:fill-green-600 cursor-pointer transition-colors"
          />
          {/* South America */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            d="M 130 160 L 150 150 L 160 180 L 150 210 L 135 200 Z"
            fill="#86efac"
            className="hover:fill-green-500 cursor-pointer transition-colors"
          />
          {/* Europe */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            d="M 380 80 L 420 75 L 440 90 L 430 110 L 400 105 Z"
            fill="#4ade80"
            className="hover:fill-green-600 cursor-pointer transition-colors"
          />
          {/* Africa */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            d="M 380 130 L 420 125 L 440 160 L 430 200 L 390 195 Z"
            fill="#86efac"
            className="hover:fill-green-500 cursor-pointer transition-colors"
          />
          {/* Asia */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            d="M 480 70 L 580 65 L 620 90 L 610 130 L 560 125 L 500 110 Z"
            fill="#4ade80"
            className="hover:fill-green-600 cursor-pointer transition-colors"
          />
          {/* Australia */}
          <motion.path
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
            d="M 580 240 L 630 235 L 650 260 L 640 280 L 590 275 Z"
            fill="#4ade80"
            className="hover:fill-green-600 cursor-pointer transition-colors"
          />

          {/* Activity dots */}
          <motion.circle
            cx="120"
            cy="95"
            r="4"
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.circle
            cx="410"
            cy="90"
            r="4"
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.circle
            cx="540"
            cy="100"
            r="4"
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.circle
            cx="615"
            cy="260"
            r="4"
            fill="#ef4444"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Connection lines */}
          <motion.line
            x1="120"
            y1="95"
            x2="410"
            y2="90"
            stroke="#4ade80"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          />
          <motion.line
            x1="410"
            y1="90"
            x2="540"
            y2="100"
            stroke="#4ade80"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Active Regions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Major Hubs</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CountriesInsight;
