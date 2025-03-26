/**
 * Creator Types
 * 
 * These types define the creator entities and related components
 */

// Basic creator entity type
export interface Creator {
  id: string;
  name: string;
  location: string;
  services: string[];
  priceRange: string;
  rating: number;
  description: string;
  image: string;
  availability?: AvailabilityStatus;
}

// Type for availability status
export type AvailabilityStatus = 'available' | 'limited' | 'booked';

// Client references type
export interface NotableClient {
  id: string;
  name: string;
  logo?: string;
}

// Re-export from types folder for backward compatibility
// Later we can move these directly into the feature folder
import { Profile, ProfileSettings } from '@/types/creator/profile';
import { Portfolio, PortfolioItem, PortfolioGalleryProps } from '@/types/creator/portfolio';
import { AvailabilityCalendar, AvailabilityTimeSlot } from '@/types/creator/availability';

export type {
  Profile,
  ProfileSettings,
  Portfolio,
  PortfolioItem,
  PortfolioGalleryProps,
  AvailabilityCalendar,
  AvailabilityTimeSlot
};