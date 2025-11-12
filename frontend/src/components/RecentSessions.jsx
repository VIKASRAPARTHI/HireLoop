import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/30 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-black text-base-content">Your Past Sessions</h2>
          </div>
          {sessions.length > 0 && (
            <div className="badge badge-primary badge-lg">
              {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className={`card relative ${
                  session.status === "active"
                    ? "bg-primary/10 border-primary/30 hover:border-primary/60"
                    : "bg-base-200 border-base-300 hover:border-primary/30"
                }`}
              >
                {session.status === "active" && (
                  <div className="absolute top-3 right-3">
                    <div className="badge badge-primary gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                      ACTIVE
                    </div>
                  </div>
                )}

                <div className="card-body p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        session.status === "active"
                          ? "bg-primary/70"
                          : "bg-primary"
                      }`}
                    >
                      <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base mb-1 truncate text-base-content">{session.problem}</h3>
                      <span
                        className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                      >
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-base-content/80 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-base-content/60" />
                      <span className="text-base-content">
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-base-content/60" />
                      <span className="text-base-content">
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-base-300">
                    <span className="text-xs font-semibold text-base-content/80 uppercase">Completed</span>
                    <span className="text-xs text-base-content/40">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-3xl flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-lg font-semibold text-base-content/70 mb-1">No sessions yet</p>
              <p className="text-sm text-base-content/50">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;
