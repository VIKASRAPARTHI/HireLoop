import { motion } from "../../lib/motion-shim";
import { Users, MoreHorizontal } from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Alec Whitten",
    location: "New York, USA",
    flag: "🇺🇸",
    job: "Software Engineer",
    level: "Senior",
    avatar: "AW",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    name: "Risa Nakamoto",
    location: "Tokyo, Japan",
    flag: "🇯🇵",
    job: "Project Manager",
    level: "Junior",
    avatar: "RN",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 3,
    name: "Nicolas Wang",
    location: "Shanghai, China",
    flag: "🇨🇳",
    job: "Financial Analyst",
    level: "Mid",
    avatar: "NW",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    name: "Brianna Ware",
    location: "Melbourne, Australia",
    flag: "🇦🇺",
    job: "Operations Manager",
    level: "Senior",
    avatar: "BW",
    color: "from-purple-500 to-violet-500",
  },
];

export function PotentialCandidates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Potential Candidates</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-xs text-gray-500 font-medium">Name</th>
              <th className="text-left py-3 text-xs text-gray-500 font-medium">Location</th>
              <th className="text-left py-3 text-xs text-gray-500 font-medium">Preferred Job</th>
              <th className="text-left py-3 text-xs text-gray-500 font-medium">Level</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <motion.tr
                key={candidate.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${candidate.color} flex items-center justify-center text-white text-sm`}>
                      {candidate.avatar}
                    </div>
                    <span className="text-sm text-gray-900">{candidate.name}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{candidate.flag}</span>
                    <span className="text-sm text-gray-600">{candidate.location}</span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-600">{candidate.job}</span>
                </td>
                <td className="py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs ${
                    candidate.level === "Senior"
                      ? "bg-purple-100 text-purple-700"
                      : candidate.level === "Mid"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {candidate.level}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default PotentialCandidates;
