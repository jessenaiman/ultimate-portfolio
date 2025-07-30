import React, { useState } from 'react';
import TextTab from './TextTab';
import ImageTab from './ImageTab';
import ChatTab from './ChatTab';

const TABS = {
  text: { label: 'Text', Component: TextTab },
  image: { label: 'Image', Component: ImageTab },
  chat: { label: 'Chat', Component: ChatTab },
};

type TabKey = keyof typeof TABS;

export default function PollinateTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("text");

  const { Component: ActiveComponent } = TABS[activeTab];

  return (
    <div className="space-y-4">
      <div role="tablist" className="tabs tabs-lifted">
        {Object.entries(TABS).map(([key, { label }]) => (
          <button
            key={key}
            role="tab"
            className={`tab ${activeTab === key ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(key as TabKey)}
            aria-selected={activeTab === key}
          >
            {label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="bg-base-100 border-base-300 rounded-box p-6">
        <ActiveComponent key={activeTab} />
      </div>
    </div>
  );
}
