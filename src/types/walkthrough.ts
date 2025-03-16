
export type WalkthroughStep = {
  id: string;
  title: string;
  description: string;
  elementId?: string; // Optional ID of the element to highlight
  position?: 'top' | 'right' | 'bottom' | 'left'; // Tooltip position
  page: string; // Which page this step belongs to
  order: number; // Order within the page
};

export type WalkthroughPage = {
  path: string;
  name: string;
  description: string;
  steps: WalkthroughStep[];
};
