import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden bg-base-100 border-b border-primary/10">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-black text-base-content">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-sm lg:text-base text-base-content/70 ml-10">
              Ready to conduct technical interviews?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-5 py-2.5 bg-primary rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-md"
          >
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <ZapIcon className="w-4 h-4 text-white" />
              <span>Create Session</span>
              <ArrowRightIcon className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
