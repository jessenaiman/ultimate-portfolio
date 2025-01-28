import React from 'react';
import { RemixCounter } from './RemixCounter';
import { AlertDialogDemo } from './AlertDialogDemo';
import { DropdownMenuDemo } from './DropdownMenuDemo';
import { TabsDemo } from './TabsDemo';

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface RemixTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

const RemixTabs: React.FC<RemixTabsProps> = ({ tabs, defaultValue = tabs[0]?.value, className = '' }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className}>
      <div className="tabs tabs-lifted">
        {tabs.map((tab) => (
          <a
            key={tab.value}
            className={`tab ${activeTab === tab.value ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <div className="p-4 bg-base-200 rounded-b-box">
        {tabs.find(tab => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}

const tabs: TabItem[] = [
  {
    value: 'counter',
    label: 'Counter',
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Counter Demo</h2>
        <RemixCounter />
      </div>
    ),
  },
  {
    value: 'alert',
    label: 'Alert Dialog',
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Alert Dialog Demo</h2>
        <AlertDialogDemo />
      </div>
    ),
  },
  {
    value: 'dropdown',
    label: 'Dropdown Menu',
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Dropdown Menu Demo</h2>
        <DropdownMenuDemo />
      </div>
    ),
  },
  {
    value: 'tabs',
    label: 'Tabs',
    content: (
      <div>
        <h2 className="text-xl font-semibold mb-4">Tabs Demo</h2>
        <TabsDemo />
      </div>
    ),
  },
];

export const RemixTabsComponent = () => {
  return <RemixTabs tabs={tabs} />;
};
