
import React, { useState, useMemo } from 'react';
import { FeatureTab } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import PhotographerFeature from './components/PhotographerFeature';
import CustomFeature from './components/CustomFeature';
import TabButton from './components/ui/TabButton';
import { Camera, Brush } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>(FeatureTab.Photographer);

  const renderFeature = useMemo(() => {
    switch (activeTab) {
      case FeatureTab.Photographer:
        return <PhotographerFeature />;
      case FeatureTab.Custom:
        return <CustomFeature />;
      default:
        return <PhotographerFeature />;
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center border-b border-slate-300 mb-8">
            <TabButton
              Icon={Camera}
              label="Sewa Fotografer AI"
              isActive={activeTab === FeatureTab.Photographer}
              onClick={() => setActiveTab(FeatureTab.Photographer)}
            />
            <TabButton
              Icon={Brush}
              label="Custom Foto AI"
              isActive={activeTab === FeatureTab.Custom}
              onClick={() => setActiveTab(FeatureTab.Custom)}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 transition-all duration-300">
            {renderFeature}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
