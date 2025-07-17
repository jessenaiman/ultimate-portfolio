import React from 'react';

export const DropdownMenuDemo = () => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-primary m-1">
        Options
      </div>
      <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>New Tab</a></li>
        <li><a>New Window</a></li>
        <div className="divider my-0"></div>
        <li><a>Share</a></li>
      </ul>
    </div>
  );
};
