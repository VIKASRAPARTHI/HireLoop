import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="card bg-base-100 border-2 border-primary/20 hover:border-primary/30 shadow-lg h-full">
      <div className="card-body p-4">
        {/* HEADERS SECTION */}
        <div className="flex items-center justify-between mb-4">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-lg">
              <ZapIcon className="size-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-base-content">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="size-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-base-content">{sessions.length} active</span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoaderIcon className="size-6 animate-spin text-primary" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => (
              <div
                key={session._id}
                className="card bg-base-200 border-2 border-base-300 hover:border-primary/50 transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 p-3">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative size-10 rounded-lg bg-primary flex items-center justify-center">
                      <Code2Icon className="size-5 text-white" />
                      <div className="absolute -top-0.5 -right-0.5 size-3 bg-primary rounded-full border-2 border-base-100" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm truncate text-base-content">{session.problem}</h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(
                            session.difficulty
                          )}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-base-content/80">
                        <div className="flex items-center gap-1">
                          <CrownIcon className="size-3 text-base-content/60" />
                          <span className="font-medium text-base-content">{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="size-3 text-base-content/60" />
                          <span className="text-xs text-base-content">{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="badge badge-secondary badge-sm">FULL</span>
                        ) : (
                          <span className="badge badge-primary badge-sm">OPEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {session.participant && !isUserInSession(session) ? (
                    <button className="btn btn-disabled btn-sm text-base-content/40">Full</button>
                  ) : (
                    <Link to={`/session/${session._id}`} className="btn btn-primary btn-sm gap-1">
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-3 text-white" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-primary/50" />
              </div>
              <p className="text-base font-semibold text-base-content/70 mb-1">No active sessions</p>
              <p className="text-sm text-base-content/50">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;
