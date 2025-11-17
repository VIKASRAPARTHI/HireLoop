import { motion } from "../../lib/motion-shim";
import { Button } from "../ui/button";
import { Video, MoreHorizontal } from "lucide-react";

export function UpcomingInterview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-gray-600" />
          <h3 className="text-gray-900">Upcoming Interview</h3>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
            NT
          </div>

          {/* Info */}
          <div>
            <p className="text-gray-900">Nicolas Trevino</p>
            <p className="text-sm text-gray-500">Back-End Developer</p>
          </div>
        </div>

        {/* Time */}
        <div className="text-center px-6 border-l border-r border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Time</p>
          <p className="text-sm text-gray-900">10:30 AM - 11:30 AM</p>
        </div>

        {/* Company */}
        <div className="flex items-center gap-2 px-6 border-r border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Company</p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-white text-xs">F</div>
              <span className="text-sm text-gray-900">Feedly</span>
            </div>
          </div>
        </div>

        {/* Attendees */}
        <div className="px-6">
          <p className="text-xs text-gray-500 mb-1">Attendees</p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 border-2 border-white"></div>
            </div>
            <span className="text-sm text-gray-500">+2 peoples</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">View details</Button>
          <Button size="sm" className="bg-green-500 hover:bg-green-600">Join meeting</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default UpcomingInterview;
