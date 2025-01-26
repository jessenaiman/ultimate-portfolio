import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { RemixCounter } from './RemixCounter';
import { AlertDialogDemo } from './AlertDialogDemo';
import { DropdownMenuDemo } from './DropdownMenuDemo';
import { TabsDemo } from './TabsDemo';

export const RemixTabs = () => {
  return (
    <Tabs.Root defaultValue="counter" className="w-full max-w-3xl mx-auto">
      <Tabs.List className="flex border-b mb-4" aria-label="Remix components">
        <Tabs.Trigger 
          value="counter"
          className="px-4 py-2 -mb-px text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Counter
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="alert"
          className="px-4 py-2 -mb-px text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Alert Dialog
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="dropdown"
          className="px-4 py-2 -mb-px text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Dropdown Menu
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="tabs"
          className="px-4 py-2 -mb-px text-sm font-medium border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-primary data-[state=active]:text-primary"
        >
          Tabs
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="counter" className="p-4 rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Counter Demo</h2>
        <RemixCounter />
      </Tabs.Content>

      <Tabs.Content value="alert" className="p-4 rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Alert Dialog Demo</h2>
        <AlertDialogDemo />
      </Tabs.Content>

      <Tabs.Content value="dropdown" className="p-4 rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Dropdown Menu Demo</h2>
        <DropdownMenuDemo />
      </Tabs.Content>

      <Tabs.Content value="tabs" className="p-4 rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Tabs Demo</h2>
        <TabsDemo />
      </Tabs.Content>
    </Tabs.Root>
  );
};
