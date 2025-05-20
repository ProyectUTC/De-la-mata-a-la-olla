export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  category?: string;
  price?: string; // Using string for display flexibility, can be number if calculations needed
  producerName?: string;
  dataAiHint?: string; // For placeholder image generation
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  isProtected?: boolean; // For dashboard/admin links
  isExternal?: boolean;
}
