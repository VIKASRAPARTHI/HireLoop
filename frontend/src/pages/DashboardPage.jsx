import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

// Dashboard widgets (new)
import { UpcomingInterview } from "../components/dashboard/UpcomingInterview";
import { CurrentVacancies } from "../components/dashboard/CurrentVacancies";
import { IndustriesInsight } from "../components/dashboard/IndustriesInsight";
import { PotentialCandidates } from "../components/dashboard/PotentialCandidates";
import { CountriesInsight } from "../components/dashboard/CountriesInsight";
import Sidebar from "../components/dashboard/Sidebar";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();

  const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;

    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
          {/* Stats Section - Top Row */}
          <div className="mb-8">
            <StatsCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
          </div>

          {/* New Dashboard Widgets (merged) */}
          <div className="space-y-6 mb-8">
            {/* Upcoming Interview - Full Width */}
            <UpcomingInterview />

            {/* Two Column Layout: Vacancies + Industries */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CurrentVacancies />
              </div>
              <div>
                <IndustriesInsight />
              </div>
            </div>

            {/* Two Column Layout: Candidates + Countries */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PotentialCandidates />
              </div>
              <div>
                <CountriesInsight />
              </div>
            </div>
          </div>

          {/* Active Sessions - Full Width */}
          <div className="mb-8">
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          {/* Recent Sessions Section - Full Width */}
          <div className="mt-6">
            <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
          </div>
            </div>
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;