import React from 'react';
import { IntelligenceProvider, useIntelligence } from './context/IntelligenceContext';
import { Sidebar } from './components/navigation/Sidebar';
import { Header } from './components/common/Header';

import { ExecutiveOverview } from './views/ExecutiveOverview';
import { IntelligenceFeed } from './views/IntelligenceFeed';
import { TrendRadar } from './views/TrendRadar';
import { TopicValidator } from './views/TopicValidator';
import { CompetitorIntelligence } from './views/CompetitorIntelligence';
import { SEOIntelligence } from './views/SEOIntelligence';
import { OpportunityBacklog } from './views/OpportunityBacklog';
import { ContentStudio } from './views/ContentStudio';
import { VisualStudio } from './views/VisualStudio';
import { AgentControlRoom } from './views/AgentControlRoom';
import { AIModelControl } from './views/AIModelControl';
import { KnowledgeBrandProfiles } from './views/KnowledgeBrandProfiles';
import { PublishingPerformance } from './views/PublishingPerformance';
import { SystemSettings } from './views/SystemSettings';

const DashboardContent = () => {
  const { activeTab } = useIntelligence();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <ExecutiveOverview />;
      case 'feed':
        return <IntelligenceFeed />;
      case 'trendRadar':
        return <TrendRadar />;
      case 'topicValidator':
        return <TopicValidator />;
      case 'competitor':
        return <CompetitorIntelligence />;
      case 'seo':
        return <SEOIntelligence />;
      case 'backlog':
        return <OpportunityBacklog />;
      case 'contentStudio':
        return <ContentStudio />;
      case 'visualStudio':
        return <VisualStudio />;
      case 'agents':
        return <AgentControlRoom />;
      case 'models':
        return <AIModelControl />;
      case 'brand':
        return <KnowledgeBrandProfiles />;
      case 'publishing':
        return <PublishingPerformance />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#070708] text-zinc-100 font-sans overflow-hidden">
      {/* 14-Section Sidebar */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Dynamic Header */}
        <Header />

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gradient-to-b from-[#09090b] via-[#070708] to-[#040405]">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <IntelligenceProvider>
      <DashboardContent />
    </IntelligenceProvider>
  );
}
