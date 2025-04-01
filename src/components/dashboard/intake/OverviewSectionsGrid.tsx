
import React from 'react';

interface OverviewSection {
  title: string;
  items: string[];
}

interface OverviewSectionsGridProps {
  sections: OverviewSection[];
}

export const OverviewSectionsGrid: React.FC<OverviewSectionsGridProps> = ({ sections }) => {
  if (sections.length === 0) return null;
  
  return (
    <div className="mt-6">
      <h4 className="font-medium text-gray-900 mb-3">Assessment Overview</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section, idx) => (
          <div key={idx} className="border border-gray-100 rounded-lg p-4">
            <h5 className="font-medium text-gray-800 mb-2">{section.title}</h5>
            <ul className="text-sm space-y-1 list-disc list-inside">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
