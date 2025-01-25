import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const DropdownMenuDemo = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Options
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
          sideOffset={5}
        >
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-900 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none cursor-pointer hover:bg-violet-100">
            New Tab
          </DropdownMenu.Item>
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-900 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none cursor-pointer hover:bg-violet-100">
            New Window
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-violet-300 m-[5px]" />
          <DropdownMenu.Item className="group text-[13px] leading-none text-violet-900 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none cursor-pointer hover:bg-violet-100">
            Share
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
