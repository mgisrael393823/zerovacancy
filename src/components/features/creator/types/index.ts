export interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
  tags?: string[];
  availabilityStatus?: AvailabilityStatus;
  notableClients?: NotableClient[];
}

export interface NotableClient {
  name: string;
  logo: string;
  projectType?: string;
  year?: string;
}

export interface CreatorCardProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
  onPreviewClick?: (imageSrc: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export type AvailabilityStatus = 'available-now' | 'available-tomorrow' | 'premium-only';