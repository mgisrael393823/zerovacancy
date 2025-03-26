/**
 * Creators Feature
 * 
 * This is the main entry point for the creators feature.
 * It exports components, hooks, and utilities related to creator profiles.
 */

// Re-export types
export * from './types';

// Export components from new structure
export { CreatorCard } from './components/CreatorCard';

// Re-export components from legacy paths (to be gradually migrated)
export { CreatorInfo } from '@/components/creator/CreatorInfo';
export { CreatorMedia } from '@/components/creator/CreatorMedia';
export { CreatorRating } from '@/components/creator/CreatorRating';
export { CreatorTags } from '@/components/creator/CreatorTags';
export { NotableClients } from '@/components/creator/NotableClients';
export { PortfolioGallery } from '@/components/creator/PortfolioGallery';
export { PortfolioPreview } from '@/components/creator/PortfolioPreview';

// TODO: Migrate hooks and utilities as we move them