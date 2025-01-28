import React from 'react';

export const AlertDialogDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button className="btn btn-error" onClick={() => setIsOpen(true)}>
        Delete account
      </button>

      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you absolutely sure?</h3>
          <p className="py-4">
            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
          </p>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={() => {
              // Handle delete action here
              setIsOpen(false);
            }}>
              Yes, delete account
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={() => setIsOpen(false)}>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
