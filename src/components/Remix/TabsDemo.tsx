import React from 'react';

export const TabsDemo = () => {
  const [activeTab, setActiveTab] = React.useState('tab1');

  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Account"
          checked={activeTab === 'tab1'}
          onChange={() => setActiveTab('tab1')}
        />
        <div role="tabpanel" className={`tab-content p-5 ${activeTab === 'tab1' ? 'block' : 'hidden'}`}>
          <p className="text-base-content/70">
            Make changes to your account here. Click save when you're done.
          </p>
        </div>

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Password"
          checked={activeTab === 'tab2'}
          onChange={() => setActiveTab('tab2')}
        />
        <div role="tabpanel" className={`tab-content p-5 ${activeTab === 'tab2' ? 'block' : 'hidden'}`}>
          <p className="text-base-content/70">
            Change your password here. After saving, you'll be logged out.
          </p>
        </div>

        <input
          type="radio"
          name="tabs"
          role="tab"
          className="tab"
          aria-label="Settings"
          checked={activeTab === 'tab3'}
          onChange={() => setActiveTab('tab3')}
        />
        <div role="tabpanel" className={`tab-content p-5 ${activeTab === 'tab3' ? 'block' : 'hidden'}`}>
          <p className="text-base-content/70">
            Edit your notification and privacy settings here.
          </p>
        </div>
      </div>
    </div>
  );
};
