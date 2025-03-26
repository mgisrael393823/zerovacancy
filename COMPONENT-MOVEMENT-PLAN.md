# Component Movement Plan

This document outlines the plan for moving components to the new directory structure. Each component's movement is tracked with:

1. Source path
2. Destination path 
3. Import path updates required
4. Testing criteria

## Movement Status Tracking

| Component | Source Path | Destination Path | Status | Tested |
|-----------|-------------|-----------------|--------|--------|
| Example | /src/components/ui/button.tsx | /src/components/ui/buttons/button.tsx | Not Started | No |

## Detailed Movement Plans

### UI Components

#### Buttons

| Component | Source Path | Destination Path | Import Updates | Testing Criteria |
|-----------|-------------|-----------------|----------------|------------------|
| button.tsx | /src/components/ui/button.tsx | /src/components/ui/buttons/button.tsx | Update imports from `@/components/ui/button` to `@/components/ui/buttons/button` | Verify all buttons render correctly across the site |
| ... | ... | ... | ... | ... |

#### Inputs

| Component | Source Path | Destination Path | Import Updates | Testing Criteria |
|-----------|-------------|-----------------|----------------|------------------|
| input.tsx | /src/components/ui/input.tsx | /src/components/ui/inputs/input.tsx | Update imports from `@/components/ui/input` to `@/components/ui/inputs/input` | Verify all inputs render and function correctly |
| ... | ... | ... | ... | ... |

### Layout Components

| Component | Source Path | Destination Path | Import Updates | Testing Criteria |
|-----------|-------------|-----------------|----------------|------------------|
| Header.tsx | /src/components/Header.tsx | /src/components/layout/Header.tsx | Update imports from `@/components/Header` or `../components/Header` to `@/components/layout/Header` | Check header renders correctly on all pages |
| ... | ... | ... | ... | ... |

### Feature Components

#### Creator Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| CreatorCard.tsx | /src/components/creator/CreatorCard.tsx | /src/components/features/creator/card/CreatorCard.tsx | ✅ Completed | Verify creator cards render correctly throughout the site |
| CreatorMedia.tsx | /src/components/creator/CreatorMedia.tsx | /src/components/features/creator/media/CreatorMedia.tsx | ✅ Completed | Verify creator media displays correctly in cards |
| CreatorRating.tsx | /src/components/creator/CreatorRating.tsx | /src/components/features/creator/rating/CreatorRating.tsx | ✅ Completed | Verify ratings display correctly in creator cards |
| PortfolioPreview.tsx | /src/components/creator/PortfolioPreview.tsx | /src/components/features/creator/portfolio/PortfolioPreview.tsx | ✅ Completed | Verify portfolio previews display in creator cards |
| types.ts | /src/components/creator/types.ts | /src/components/features/creator/types/index.ts | ✅ Completed | Verify types are correctly exported and used |
| CreatorInfo.tsx | /src/components/creator/CreatorInfo.tsx | /src/components/features/creator/info/CreatorInfo.tsx | Not Started | Verify creator info displays correctly |
| NotableClients.tsx | /src/components/creator/NotableClients.tsx | /src/components/features/creator/clients/NotableClients.tsx | Not Started | Verify notable clients section displays correctly |
| CreatorTags.tsx | /src/components/creator/CreatorTags.tsx | /src/components/features/creator/tags/CreatorTags.tsx | Not Started | Verify creator tags display correctly |
| PortfolioGallery.tsx | /src/components/creator/PortfolioGallery.tsx | /src/components/features/creator/portfolio/PortfolioGallery.tsx | Not Started | Verify portfolio gallery displays correctly |

## Implementation Notes

For each component:

1. **Copy First Approach**:
   - Copy the component to its new location
   - Update imports within the copied file
   - Test the application to ensure it loads
   - Only then update imports in other files

2. **Import Path Updates**:
   - Prefer `@/` path aliases over relative paths
   - Update one component at a time
   - Use search and replace carefully

3. **Testing Procedure**:
   - Run the application locally after each component move
   - Verify the component renders correctly
   - Check any interactive functionality
   - Run any available automated tests

4. **Commit Strategy**:
   - Make small, focused commits
   - Include only related changes in each commit
   - Use clear commit messages that explain what was moved/changed

## Post-Movement Cleanup

After all components have been moved and thoroughly tested:

1. Remove all empty original directories
2. Update any documentation references
3. Run final comprehensive tests