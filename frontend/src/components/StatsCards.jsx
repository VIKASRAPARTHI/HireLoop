import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Active Count */}
      <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/40 shadow-md transition-all duration-200">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-primary/20 rounded-xl">
              <UsersIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="badge badge-primary">Live</div>
          </div>
          <div className="text-4xl font-black mb-1 text-base-content">{activeSessionsCount}</div>
          <div className="text-sm text-base-content/60 font-medium">Active Sessions</div>
        </div>
      </div>

      {/* Recent Count */}
      <div className="card bg-base-100 border-2 border-secondary/20 hover:border-secondary/40 shadow-md transition-all duration-200">
        <div className="card-body p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-secondary/20 rounded-xl">
              <TrophyIcon className="w-5 h-5 text-secondary" />
            </div>
            <div className="badge badge-secondary">Total</div>
          </div>
          <div className="text-4xl font-black mb-1 text-base-content">{recentSessionsCount}</div>
          <div className="text-sm text-base-content/60 font-medium">Total Sessions</div>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
