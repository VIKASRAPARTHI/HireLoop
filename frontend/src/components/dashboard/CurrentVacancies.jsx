import { motion } from "../../lib/motion-shim";
import { Briefcase, MoreHorizontal, ChevronRight } from "lucide-react";
import { useState } from "react";

const vacancies = [
  {
    id: 1,
    title: "Marketing Specialist",
    company: "Webflow",
    recruited: 1,
    total: 4,
    color: "bg-indigo-600",
    icon: "W",
  },
  {
    id: 2,
    title: "Financial Analyst",
    company: "Zapier",
    recruited: 0,
    total: 3,
    color: "bg-orange-500",
    icon: "*",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Framer",
    recruited: 2,
    total: 4,
    color: "bg-gray-900",
    icon: "✈",
  },
  {
    id: 4,
    title: "Graphic Designer",
    company: "Grammarly",
    recruited: 0,
    total: 2,
    color: "bg-green-500",
    icon: "G",
  },
  {
    id: 5,
    title: "Data Engineer",
    company: "Semio",
    recruited: 0,
    total: 1,
    color: "bg-yellow-400",
    icon: "⚡",
  },
  {
    id: 6,
    title: "Software Developer",
    company: "Confluence",
    recruited: 0,
    total: 1,
    color: "bg-blue-500",
    icon: "⚙",
  },
];

export function CurrentVacancies() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Current Vacancies</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {vacancies.slice(0, itemsPerPage).map((vacancy, index) => (
          <motion.div
            key={vacancy.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${vacancy.color} flex items-center justify-center text-white shrink-0`}
              >
                {vacancy.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                  {vacancy.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Briefcase className="w-3 h-3" />
                  <span>{vacancy.company}</span>
                  <span className="mx-1">•</span>
                  <span>
                    {vacancy.recruited}/{vacancy.total} recruited
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
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

export default CurrentVacancies;
