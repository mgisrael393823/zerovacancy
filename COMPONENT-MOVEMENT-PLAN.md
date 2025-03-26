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

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| button.tsx | /src/components/ui/button.tsx | /src/components/ui/buttons/button.tsx | ✅ Completed | Verify all buttons render correctly across the site |
| button-3d.tsx | /src/components/ui/button-3d.tsx | /src/components/ui/buttons/3d/button-3d.tsx | ✅ Completed | Verify 3D buttons render correctly |
| button-3d-border.tsx | /src/components/ui/button-3d-border.tsx | /src/components/ui/buttons/3d/button-3d-border.tsx | ✅ Completed | Verify 3D border buttons render correctly |
| button-3d-enhanced.tsx | /src/components/ui/button-3d-enhanced.tsx | /src/components/ui/buttons/3d/button-3d-enhanced.tsx | ✅ Completed | Verify enhanced 3D buttons render correctly |
| button-3d-physical.tsx | /src/components/ui/button-3d-physical.tsx | /src/components/ui/buttons/3d/button-3d-physical.tsx | ✅ Completed | Verify physical 3D buttons render correctly |
| button-colorful.tsx | /src/components/ui/button-colorful.tsx | /src/components/ui/buttons/colorful/button-colorful.tsx | ✅ Completed | Verify colorful buttons render correctly |
| shimmer-button.tsx | /src/components/ui/shimmer-button.tsx | /src/components/ui/buttons/shimmer/shimmer-button.tsx | ✅ Completed | Verify shimmer buttons render correctly |
| rainbow-button.tsx | /src/components/ui/rainbow-button.tsx | /src/components/ui/buttons/rainbow/rainbow-button.tsx | ✅ Completed | Verify rainbow buttons render correctly |

#### Form Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| input.tsx | /src/components/ui/input.tsx | /src/components/ui/inputs/input.tsx | ✅ Completed | Verify all inputs render and function correctly |
| input-otp.tsx | /src/components/ui/input-otp.tsx | /src/components/ui/forms/input/input-otp.tsx | ✅ Completed | Verify OTP inputs render and function correctly |
| form.tsx | /src/components/ui/form.tsx | /src/components/ui/forms/form.tsx | ✅ Completed | Verify forms render and validation works correctly |
| label.tsx | /src/components/ui/label.tsx | /src/components/ui/forms/label/label.tsx | ✅ Completed | Verify labels render correctly |
| checkbox.tsx | /src/components/ui/checkbox.tsx | /src/components/ui/forms/checkbox/checkbox.tsx | ✅ Completed | Verify checkboxes render and function correctly |
| textarea.tsx | /src/components/ui/textarea.tsx | /src/components/ui/forms/textarea/textarea.tsx | ✅ Completed | Verify textareas render and function correctly |
| select.tsx | /src/components/ui/select.tsx | /src/components/ui/forms/select/select.tsx | ✅ Completed | Verify select dropdowns render and function correctly |
| radio-group.tsx | /src/components/ui/radio-group.tsx | /src/components/ui/forms/radio/radio-group.tsx | ✅ Completed | Verify radio groups render and function correctly |

#### Feedback Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| toast.tsx | /src/components/ui/toast.tsx | /src/components/ui/feedback/toast.tsx | ✅ Completed | Verify toast notifications display correctly |
| toaster.tsx | /src/components/ui/toaster.tsx | /src/components/ui/feedback/toaster.tsx | ✅ Completed | Verify toast container works properly |
| alert.tsx | /src/components/ui/alert.tsx | /src/components/ui/feedback/alert/alert.tsx | ✅ Completed | Verify alerts display correctly |

#### Overlay Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| dialog.tsx | /src/components/ui/dialog.tsx | /src/components/ui/overlays/dialog.tsx | ✅ Completed | Verify dialogs open and close correctly |
| glow-dialog.tsx | /src/components/ui/glow-dialog.tsx | /src/components/ui/overlays/glow-dialog.tsx | ✅ Completed | Verify glow dialogs display correctly |
| alert-dialog.tsx | /src/components/ui/alert-dialog.tsx | /src/components/ui/overlays/alert-dialog/alert-dialog.tsx | ✅ Completed | Verify alert dialogs function properly |
| hover-card.tsx | /src/components/ui/hover-card.tsx | /src/components/ui/overlays/hover-card/hover-card.tsx | ✅ Completed | Verify hover cards display and function correctly |
| popover.tsx | /src/components/ui/popover.tsx | /src/components/ui/overlays/popover/popover.tsx | ✅ Completed | Verify popovers display and function correctly |
| dropdown-menu.tsx | /src/components/ui/dropdown-menu.tsx | /src/components/ui/overlays/dropdown-menu/dropdown-menu.tsx | ✅ Completed | Verify dropdown menus display and function correctly |
| context-menu.tsx | /src/components/ui/context-menu.tsx | /src/components/ui/overlays/context-menu/context-menu.tsx | ✅ Completed | Verify context menus display and function correctly |
| sheet.tsx | /src/components/ui/sheet.tsx | /src/components/ui/overlays/sheet/sheet.tsx | ✅ Completed | Verify sheets display and function correctly |

#### Media Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| avatar.tsx | /src/components/ui/avatar.tsx | /src/components/ui/media/avatar/avatar.tsx | ✅ Completed | Verify avatars display correctly |
| avatar-placeholder.tsx | /src/components/ui/avatar-placeholder.tsx | /src/components/ui/media/avatar/avatar-placeholder.tsx | ✅ Completed | Verify avatar placeholders display correctly |
| optimized-image.tsx | /src/components/ui/optimized-image.tsx | /src/components/ui/media/image/optimized-image.tsx | ✅ Completed | Verify optimized images display correctly |
| desktop-optimized-image.tsx | /src/components/ui/desktop-optimized-image.tsx | /src/components/ui/media/image/desktop-optimized-image.tsx | ✅ Completed | Verify desktop optimized images display correctly |

#### Navigation Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| navigation-menu.tsx | /src/components/ui/navigation-menu.tsx | /src/components/ui/navigation/menu/navigation-menu.tsx | ✅ Completed | Verify navigation menus display and function correctly |
| menubar.tsx | /src/components/ui/menubar.tsx | /src/components/ui/navigation/menubar/menubar.tsx | ✅ Completed | Verify menubars display and function correctly |
| tabs.tsx | /src/components/ui/tabs.tsx | /src/components/ui/navigation/tabs/tabs.tsx | ✅ Completed | Verify tabs display and function correctly |

#### Data Display Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| table.tsx | /src/components/ui/table.tsx | /src/components/ui/data-display/table/table.tsx | ✅ Completed | Verify tables display correctly |
| progress.tsx | /src/components/ui/progress.tsx | /src/components/ui/data-display/progress/progress.tsx | ✅ Completed | Verify progress bars display correctly |
| slider.tsx | /src/components/ui/slider.tsx | /src/components/ui/data-display/slider/slider.tsx | ✅ Completed | Verify sliders display and function correctly |
| calendar.tsx | /src/components/ui/calendar.tsx | /src/components/ui/data-display/calendar/calendar.tsx | ✅ Completed | Verify calendars display and function correctly |
| skeleton.tsx | /src/components/ui/skeleton.tsx | /src/components/ui/data-display/skeleton/skeleton.tsx | ✅ Completed | Verify skeleton loaders display correctly |

#### Animation Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| border-beam.tsx | /src/components/ui/border-beam.tsx | /src/components/ui/animations/borders/border-beam/border-beam.tsx | ✅ Completed | Verify border beam animations display correctly |
| optimized-border-beam.tsx | /src/components/ui/optimized-border-beam.tsx | /src/components/ui/animations/borders/border-beam/optimized-border-beam.tsx | ✅ Completed | Verify optimized border beam animations display correctly |
| moving-border.tsx | /src/components/ui/moving-border.tsx | /src/components/ui/animations/borders/moving-border/moving-border.tsx | ✅ Completed | Verify moving border animations display correctly |
| border-trail.tsx | /src/components/ui/border-trail.tsx | /src/components/ui/animations/borders/border-trail/border-trail.tsx | ✅ Completed | Verify border trail animations display correctly |
| spotlight.tsx | /src/components/ui/spotlight.tsx | /src/components/ui/animations/spotlight/spotlight.tsx | ✅ Completed | Verify spotlight effects display correctly |
| optimized-spotlight.tsx | /src/components/ui/optimized-spotlight.tsx | /src/components/ui/animations/spotlight/optimized-spotlight.tsx | ✅ Completed | Verify optimized spotlight effects display correctly |
| animated-grid.tsx | /src/components/ui/animated-grid.tsx | /src/components/ui/animations/grid/animated-grid.tsx | ✅ Completed | Verify animated grid displays correctly |
| optimized-animated-grid.tsx | /src/components/ui/optimized-animated-grid.tsx | /src/components/ui/animations/grid/optimized-animated-grid.tsx | ✅ Completed | Verify optimized animated grid displays correctly |
| animated-shiny-text.tsx | /src/components/ui/animated-shiny-text.tsx | /src/components/ui/animations/text/animated-shiny-text.tsx | ✅ Completed | Verify animated shiny text displays correctly |
| gradient-blob-background.tsx | /src/components/ui/gradient-blob-background.tsx | /src/components/ui/animations/backgrounds/gradient-blob-background.tsx | ✅ Completed | Verify gradient blob backgrounds display correctly |
| floating-background.tsx | /src/components/ui/floating-background.tsx | /src/components/ui/animations/backgrounds/floating-background.tsx | ✅ Completed | Verify floating backgrounds display correctly |
| scroll-fade-effect.tsx | /src/components/ui/scroll-fade-effect.tsx | /src/components/ui/animations/effects/scroll-fade-effect.tsx | ✅ Completed | Verify scroll fade effects work correctly |
| confetti.tsx | /src/components/ui/confetti.tsx | /src/components/ui/animations/effects/confetti.tsx | ✅ Completed | Verify confetti animations display correctly |

#### Utility Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| badge.tsx | /src/components/ui/badge.tsx | /src/components/ui/utilities/badge/badge.tsx | ✅ Completed | Verify badges display correctly in various contexts |
| separator.tsx | /src/components/ui/separator.tsx | /src/components/ui/utilities/separator/separator.tsx | ✅ Completed | Verify separators display correctly |
| scroll-area.tsx | /src/components/ui/scroll-area.tsx | /src/components/ui/utilities/scroll-area/scroll-area.tsx | ✅ Completed | Verify scrollable areas function properly |
| switch.tsx | /src/components/ui/switch.tsx | /src/components/ui/utilities/switch/switch.tsx | ✅ Completed | Verify switches toggle correctly |
| aspect-ratio.tsx | /src/components/ui/aspect-ratio.tsx | /src/components/ui/utilities/aspect-ratio/aspect-ratio.tsx | ✅ Completed | Verify aspect ratio component maintains proper ratios |
| tooltip.tsx | /src/components/ui/tooltip.tsx | /src/components/ui/feedback/tooltip/tooltip.tsx | ✅ Completed | Verify tooltips display correctly on hover |
| breadcrumb.tsx | /src/components/ui/breadcrumb.tsx | /src/components/ui/navigation/breadcrumb/breadcrumb.tsx | ✅ Completed | Verify breadcrumb navigation is displayed properly |
| command.tsx | /src/components/ui/command.tsx | /src/components/ui/input-command/command.tsx | ✅ Completed | Verify command menu functions correctly |

#### Interaction Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| toggle.tsx | /src/components/ui/toggle.tsx | /src/components/ui/interaction/toggle/toggle.tsx | ✅ Completed | Verify toggle buttons display and function correctly |
| toggle-group.tsx | /src/components/ui/toggle-group.tsx | /src/components/ui/interaction/toggle-group/toggle-group.tsx | ✅ Completed | Verify toggle groups display and function correctly |
| collapsible.tsx | /src/components/ui/collapsible.tsx | /src/components/ui/interaction/collapsible/collapsible.tsx | ✅ Completed | Verify collapsible sections expand and collapse correctly |
| accordion.tsx | /src/components/ui/accordion.tsx | /src/components/ui/interaction/accordion/accordion.tsx | ✅ Completed | Verify accordion sections expand and collapse correctly |

### Layout Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| Header.tsx | /src/components/Header.tsx | /src/components/layout/header/header.tsx | ✅ Completed | Check header renders correctly on all pages |
| Footer.tsx | /src/components/Footer.tsx | /src/components/layout/footer/footer.tsx | ✅ Completed | Check footer renders correctly on all pages |

### Feature Components

#### Creator Components

| Component | Source Path | Destination Path | Status | Testing Criteria |
|-----------|-------------|-----------------|--------|------------------|
| CreatorCard.tsx | /src/components/creator/CreatorCard.tsx | /src/components/features/creator/card/CreatorCard.tsx | ✅ Completed | Verify creator cards render correctly throughout the site |
| CreatorMedia.tsx | /src/components/creator/CreatorMedia.tsx | /src/components/features/creator/media/CreatorMedia.tsx | ✅ Completed | Verify creator media displays correctly in cards |
| CreatorRating.tsx | /src/components/creator/CreatorRating.tsx | /src/components/features/creator/rating/CreatorRating.tsx | ✅ Completed | Verify ratings display correctly in creator cards |
| PortfolioPreview.tsx | /src/components/creator/PortfolioPreview.tsx | /src/components/features/creator/portfolio/PortfolioPreview.tsx | ✅ Completed | Verify portfolio previews display in creator cards |
| types.ts | /src/components/creator/types.ts | /src/components/features/creator/types/index.ts | ✅ Completed | Verify types are correctly exported and used |
| CreatorInfo.tsx | /src/components/creator/CreatorInfo.tsx | /src/components/features/creator/info/CreatorInfo.tsx | ✅ Completed | Verify creator info displays correctly |
| NotableClients.tsx | /src/components/creator/NotableClients.tsx | /src/components/features/creator/clients/NotableClients.tsx | ✅ Completed | Verify notable clients section displays correctly |
| CreatorTags.tsx | /src/components/creator/CreatorTags.tsx | /src/components/features/creator/tags/CreatorTags.tsx | ✅ Completed | Verify creator tags display correctly |
| PortfolioGallery.tsx | /src/components/creator/PortfolioGallery.tsx | /src/components/features/creator/portfolio/gallery/PortfolioGallery.tsx | ✅ Completed | Verify portfolio gallery displays correctly |

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