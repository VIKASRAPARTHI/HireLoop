import { motion } from "../../lib/motion-shim";
import { Building2, MoreHorizontal, ChevronRight } from "lucide-react";
import { useState } from "react";

const industries = [
  { name: "Information Technology", companies: 30, color: "bg-green-500" },
  { name: "Finance", companies: 12, color: "bg-green-500" },
  { name: "Automotive", companies: 10, color: "bg-green-500" },
  { name: "Hospitality", companies: 7, color: "bg-green-500" },
];

export function IndustriesInsight() {
  const [activeTab, setActiveTab] = useState("companies");
  const maxValue = Math.max(...industries.map((i) => i.companies));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Industries Insight</h3>
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

      {/* Bar Chart */}
      <div className="space-y-4 mb-4">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">{industry.name}</span>
              <span className="text-sm text-gray-900">{industry.companies}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(industry.companies / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                className={`h-full ${industry.color} rounded-full`}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button className="w-2 h-2 rounded-full bg-indigo-600"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </motion.div>
  );
}

export default IndustriesInsight;
