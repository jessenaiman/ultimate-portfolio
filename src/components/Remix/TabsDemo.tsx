import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

export const TabsDemo = () => (
  <Tabs.Root className="flex flex-col w-full" defaultValue="tab1">
    <Tabs.List className="flex border-b border-gray-300" aria-label="Manage your account">
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-600 select-none hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none cursor-default"
        value="tab1"
      >
        Account
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-600 select-none hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none cursor-default"
        value="tab2"
      >
        Password
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-gray-600 select-none hover:text-violet-900 data-[state=active]:text-violet-900 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current outline-none cursor-default"
        value="tab3"
      >
        Settings
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none"
      value="tab1"
    >
      <p className="mb-5 text-gray-600">
        Make changes to your account here. Click save when you're done.
      </p>
    </Tabs.Content>
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none"
      value="tab2"
    >
      <p className="mb-5 text-gray-600">
        Change your password here. After saving, you'll be logged out.
      </p>
    </Tabs.Content>
    <Tabs.Content
      className="grow p-5 bg-white rounded-b-md outline-none"
      value="tab3"
    >
      <p className="mb-5 text-gray-600">
        Edit your notification and privacy settings here.
      </p>
    </Tabs.Content>
  </Tabs.Root>
);
