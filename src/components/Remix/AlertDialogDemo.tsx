import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const AlertDialogDemo = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
        Delete account
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="bg-black/50 fixed inset-0" />
      <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <AlertDialog.Title className="text-gray-900 m-0 text-[17px] font-medium">
          Are you absolutely sure?
        </AlertDialog.Title>
        <AlertDialog.Description className="text-gray-600 mt-4 mb-5 text-[15px] leading-normal">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialog.Description>
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <button className="text-gray-600 bg-gray-100 hover:bg-gray-200 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Cancel
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <button className="text-red-500 bg-red-100 hover:bg-red-200 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
              Yes, delete account
            </button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
