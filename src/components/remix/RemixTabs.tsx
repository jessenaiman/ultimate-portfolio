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
      <div role="tablist" className="tabs tabs-lifted">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            className={`tab ${activeTab === tab.value ? 'tab-active' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 bg-base-200 rounded-b-box min-h-[200px]">
        {tabs.find(tab => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}

const tabs: TabItem[] = [
  {
    value: 'counter',
    label: 'Counter',
    content: <RemixCounter />,
  },
  {
    value: 'alert',
    label: 'Alert Dialog',
    content: <AlertDialogDemo />,
  },
  {
    value: 'dropdown',
    label: 'Dropdown Menu',
    content: <DropdownMenuDemo />,
  },
  {
    value: 'tabs',
    label: 'Tabs',
    content: <TabsDemo />,
  },
];

export function RemixTabsComponent() {
  return <RemixTabs tabs={tabs} />;
}
