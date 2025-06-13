import { FC } from 'react';
import clsx from 'clsx';

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabSelector: FC<TabSelectorProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={clsx(
            'px-4 py-2 rounded-lg font-medium transition-colors',
            activeTab === tab
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
