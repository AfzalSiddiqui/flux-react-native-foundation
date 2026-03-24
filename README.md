# flux-react-native-foundation

**26 production-ready React Native components built on Flux Design Tokens.**

`flux-react-native-foundation` provides the full UI component library for the Flux React Native Design System. Every component uses tokens from `@anthropic-flux/react-native-ds` — no hard-coded values. Components are organized into 3 hierarchical levels following Atomic Design methodology.

**11 Atoms | 10 Molecules | 5 Organisms | TypeScript | Animated API**

---

## Features

- **26 components** — Complete UI library from buttons to charts
- **Atomic Design** — Atoms, Molecules, Organisms hierarchy
- **Token-driven** — All visual values from `flux-react-native-ds`
- **Theme-aware** — Automatic color updates on theme change
- **Animated** — Built-in React Native `Animated` API animations
- **TypeScript** — Full type safety with strict mode
- **Cross-platform** — iOS + Android with platform-specific shadows

---

## Installation

```bash
npm install @anthropic-flux/react-native-foundation
# or
yarn add @anthropic-flux/react-native-foundation
```

**Peer dependencies:** `react`, `react-native`, `@anthropic-flux/react-native-ds`, `react-native-svg`, `react-native-webview`

---

## Component Overview

```
+-------------------------------------------------------------+
|  ATOMS (11)               Basic building blocks              |
|  FluxButton    FluxText      FluxIcon       FluxLoader       |
|  FluxDivider   FluxToggle    FluxCheckBox   FluxRadioButton  |
|  FluxSegmentedControl        FluxImage      FluxShimmer      |
+-------------------------------------------------------------+
|  MOLECULES (10)           Atom combinations                  |
|  FluxCard      FluxTextField   FluxListRow   FluxAlertView   |
|  FluxInfoView  FluxOptionCard  FluxExpandableView            |
|  FluxFlapView  FluxCardFlap    FluxBoxGrid                   |
+-------------------------------------------------------------+
|  ORGANISMS (5)            Screen-level patterns              |
|  FluxHeader    FluxBottomSheet   FluxFormSection              |
|  FluxGraph     FluxWebView                                   |
+-------------------------------------------------------------+
```

---

## Atoms (11)

### FluxButton

Primary action trigger with 3 variants, 3 sizes, and loading/disabled states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Button label |
| `variant` | `'primary' \| 'secondary' \| 'destructive'` | `'primary'` | Visual style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size preset |
| `isLoading` | `boolean` | `false` | Shows spinner, hides title |
| `isDisabled` | `boolean` | `false` | Dims with 0.5 opacity |
| `onPress` | `() => void` | — | Tap callback |

**Variants:** `primary` = filled primary bg, `secondary` = outlined with primary border, `destructive` = filled error bg

```tsx
<FluxButton title="Continue" variant="primary" size="large" onPress={() => {}} />
<FluxButton title="Delete" variant="destructive" isLoading={loading} onPress={handleDelete} />
```

---

### FluxText

Text display supporting plain text and multi-segment attributed text.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | — | Plain text content |
| `segments` | `FluxTextSegment[]` | — | Attributed segments |
| `textStyle` | Style enum | `'body'` | Typography style |
| `color` | `string` | auto | Override color |

**Styles:** `largeTitle`, `title1`, `title2`, `title3`, `headline`, `subheadline`, `body`, `callout`, `footnote`, `caption`, `code`

**FluxTextSegment:** `{ text, style?, color?, bold?, italic? }`

```tsx
<FluxText textStyle="headline">Welcome Back</FluxText>
<FluxText segments={[
  { text: 'Hello ' },
  { text: 'World', bold: true, color: '#007AFF' },
]} />
```

---

### FluxIcon

Renders icons from Ionicons, asset catalog, or remote URLs.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `'ionicon' \| 'asset' \| 'uri'` | — | Icon source type |
| `name` | `string` | — | Icon name or URI |
| `size` | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Size preset or custom |
| `color` | `string` | `primary` | Tint color |

**Sizes:** `small` = 16, `medium` = 24, `large` = 32

```tsx
<FluxIcon source="ionicon" name="star" size="large" color={colors.accent} />
```

---

### FluxImage

Displays images from assets or remote URLs with loading/error states.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `ImageSourcePropType \| { uri }` | — | Image source |
| `size` | `'small' \| 'medium' \| 'large' \| 'flexible' \| number` | `'medium'` | Size preset |
| `contentMode` | `'cover' \| 'contain'` | `'cover'` | Resize mode |
| `cornerRadius` | `number` | `0` | Corner rounding |
| `borderColor` | `string` | — | Border color |
| `borderWidth` | `number` | `0` | Border width |
| `onPress` | `() => void` | — | Tap callback |

**Sizes:** `small` = 40, `medium` = 80, `large` = 160, `flexible` = fills container

---

### FluxLoader

Loading indicator — indeterminate spinner or determinate progress bar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `tint` | `string` | `primary` | Color |
| `progress` | `number` | — | `undefined` = spinner, `0–1` = progress bar |

```tsx
<FluxLoader size="large" />
<FluxLoader progress={0.65} tint={colors.success} />
```

---

### FluxDivider

Visual separator line — horizontal or vertical.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axis` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `color` | `string` | `colors.border` | Line color |
| `thickness` | `number` | `1` | Line width |
| `cornerRadius` | `number` | `0` | Rounded ends |

---

### FluxCheckBox

Multi-select toggle with label — filled or outlined.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isChecked` | `boolean` | `false` | Checked state |
| `label` | `string` | — | Label text |
| `style` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `color` | `string` | `primary` | Check color |
| `isDisabled` | `boolean` | `false` | Disabled |
| `onToggle` | `(checked: boolean) => void` | — | Callback |

**Sizes:** `small` = 16pt box, `medium` = 20pt, `large` = 24pt. Animation: 200ms spring.

---

### FluxRadioButton

Single-select option with circular indicator.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Label text |
| `isSelected` | `boolean` | `false` | Selected state |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `color` | `string` | `primary` | Selection color |
| `isDisabled` | `boolean` | `false` | Disabled |
| `onSelect` | `() => void` | — | Callback |

**Sizes:** `small` = 16pt circle / 8pt dot, `medium` = 20/10, `large` = 24/12. Animation: 200ms.

---

### FluxToggle

Boolean switch using native React Native Switch component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOn` | `boolean` | `false` | Toggle state |
| `label` | `string` | — | Label text |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `tintColor` | `string` | `primary` | Tint |
| `isDisabled` | `boolean` | `false` | Disabled |
| `onToggle` | `(value: boolean) => void` | — | Callback |

---

### FluxSegmentedControl

Multi-option selector with filled or outlined styles.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | — | Segment labels |
| `selectedIndex` | `number` | `0` | Selected segment |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size |
| `style` | `'filled' \| 'outlined'` | `'filled'` | Visual style |
| `onSelectionChanged` | `(index: number) => void` | — | Callback |

```tsx
<FluxSegmentedControl
  items={['Day', 'Week', 'Month']}
  selectedIndex={0}
  onSelectionChanged={(idx) => setMode(idx)}
/>
```

---

### FluxShimmer

Skeleton loading placeholder with animated gradient sweep.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `'line' \| 'circle' \| 'rectangle'` | — | Placeholder shape |
| `isAnimating` | `boolean` | `true` | Animation toggle |
| `width` | `number` | — | Shape width |
| `height` | `number` | — | Shape height |

**Helpers:**
```tsx
FluxShimmer.TextBlock({ lines: 3 })   // Multi-line placeholder
FluxShimmer.Card()                      // Avatar + title + image + text
```

---

## Molecules (10)

### FluxCard

Generic surface container with padding, rounded corners, and shadow.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `number` | `FluxSpacing.md` (16) | Content padding |
| `cornerRadius` | `number` | `FluxRadius.lg` (16) | Corner radius |
| `shadow` | `ShadowStyle` | `FluxShadow.small` | Elevation |
| `children` | `ReactNode` | — | Content |

```tsx
<FluxCard>
  <FluxText textStyle="headline">Card Title</FluxText>
  <FluxText>Card content goes here</FluxText>
</FluxCard>
```

---

### FluxTextField

Text input with label, placeholder, error state, and secure mode.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Field label |
| `placeholder` | `string` | `''` | Placeholder text |
| `value` | `string` | `''` | Input value |
| `onChangeText` | `(text: string) => void` | — | Value callback |
| `errorMessage` | `string` | — | Error text (shows red border) |
| `isSecure` | `boolean` | `false` | Password mode |

Focus states: error → red border, focused → primary border, default → border color. Secure mode includes eye/eye-off toggle.

```tsx
<FluxTextField
  label="Email"
  placeholder="you@example.com"
  value={email}
  onChangeText={setEmail}
  errorMessage={emailError}
/>
```

---

### FluxListRow

Navigation row with icon, title, subtitle, and chevron.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconName` | `string` | — | Ionicons name |
| `title` | `string` | — | Title text |
| `subtitle` | `string` | — | Subtitle text |
| `showChevron` | `boolean` | `true` | Trailing arrow |
| `onPress` | `() => void` | — | Tap handler |

---

### FluxAlertView

Status banner with 4 semantic variants and auto-icon.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | — | Alert type |
| `title` | `string` | — | Title |
| `message` | `string` | — | Message body |
| `isDismissible` | `boolean` | `true` | Show close button |
| `onDismiss` | `() => void` | — | Dismiss callback |

Auto-icons: info → `information-circle`, success → `checkmark-circle`, warning → `warning`, error → `close-circle`. Left accent: 4pt colored border. Dismiss animation: 200ms opacity.

---

### FluxInfoView

Icon + text information display in horizontal or vertical layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconName` | `string` | — | Ionicons name |
| `title` | `string` | — | Title |
| `description` | `string` | — | Description |
| `alignment` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction |

---

### FluxOptionCard

Selection card list supporting single or multi selection.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `FluxOption[]` | — | Option list |
| `selectionMode` | `'single' \| 'multiple'` | `'single'` | Selection mode |
| `selectedIndices` | `number[]` | `[]` | Current selection |
| `onSelectionChanged` | `(indices: number[]) => void` | — | Callback |

Selection indicator: radio button (single) or checkbox (multi).

---

### FluxExpandableView

Collapsible content section with 3 visual styles.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Header title |
| `icon` | `string` | — | Ionicons name |
| `isExpanded` | `boolean` | `false` | Expand state |
| `style` | `'card' \| 'plain' \| 'bordered'` | `'card'` | Visual style |
| `onToggle` | `(expanded: boolean) => void` | — | Callback |
| `children` | `ReactNode` | — | Expandable content |

Chevron rotates 180 degrees (300ms animation). Content reveals with animated height.

---

### FluxFlapView (Tabbed Container)

Tab bar container with 3 visual styles and icon support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `FluxFlapTab[]` | — | Tab definitions |
| `selectedIndex` | `number` | `0` | Active tab |
| `style` | `'underlined' \| 'filled' \| 'pill'` | `'underlined'` | Tab bar style |
| `onTabChanged` | `(index: number) => void` | — | Callback |
| `children` | `(index: number) => ReactNode` | — | Content render prop |

```tsx
<FluxFlapView
  tabs={[{ title: 'Tab 1' }, { title: 'Tab 2' }]}
  selectedIndex={0}
  onTabChanged={setTab}
>
  {(index) => index === 0 ? <View1 /> : <View2 />}
</FluxFlapView>
```

---

### FluxCardFlap (3D Flip Card)

Dual-sided card with 3D Y-axis flip animation.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isFlipped` | `boolean` | `false` | Flip state |
| `front` | `ReactNode` | — | Front content |
| `back` | `ReactNode` | — | Back content |
| `flipDuration` | `number` | `600` | Animation ms |

3D rotation with perspective transform.

---

### FluxBoxGrid

Grid layout with optional selection support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FluxBoxItem[]` | — | Grid items |
| `columns` | `number` | `3` | Column count |
| `selectionMode` | `'none' \| 'single' \| 'multiple'` | `'none'` | Selection behavior |
| `selectedIndices` | `number[]` | `[]` | Current selection |
| `itemSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Item preset |
| `onSelectionChanged` | `(indices: number[]) => void` | — | Callback |

**Item Sizes:** `small` = 60, `medium` = 80, `large` = 100. Uses `flexWrap: 'wrap'` layout.

---

## Organisms (5)

### FluxHeader

Top navigation bar with title, subtitle, and action slots.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Title text |
| `subtitle` | `string` | — | Subtitle text |
| `leadingAction` | `ReactNode` | — | Left action |
| `trailingAction` | `ReactNode` | — | Right action |

---

### FluxBottomSheet

Modal overlay panel with 3 size detents and drag-to-dismiss.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isPresented` | `boolean` | `false` | Show/hide |
| `title` | `string` | — | Sheet title |
| `detent` | `'quarter' \| 'half' \| 'large'` | `'half'` | Height |
| `showHandle` | `boolean` | `true` | Drag indicator |
| `showCloseButton` | `boolean` | `true` | Close button |
| `isDismissibleByDrag` | `boolean` | `true` | Drag to dismiss |
| `onDismiss` | `() => void` | — | Dismiss callback |
| `children` | `ReactNode` | — | Sheet content |

**Detents:** `quarter` = 25%, `half` = 50%, `large` = 85% of screen. Drag threshold: 100px. Background overlay at 50% opacity. Uses PanResponder for gesture handling.

---

### FluxFormSection

Form grouping container with optional section title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Section title |
| `spacing` | `number` | `FluxSpacing.md` | Item spacing |
| `children` | `ReactNode` | — | Form fields |

```tsx
<FluxFormSection title="Personal Info">
  <FluxTextField label="Name" value={name} onChangeText={setName} />
  <FluxTextField label="Email" value={email} onChangeText={setEmail} />
</FluxFormSection>
```

---

### FluxGraph

Data visualization supporting bar, line, and pie charts with animation.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chartType` | `'bar' \| 'line' \| 'pie'` | — | Chart type |
| `data` | `FluxDataPoint[]` | — | Data points |
| `title` | `string` | — | Chart title |
| `showLabels` | `boolean` | `true` | Show labels |
| `animate` | `boolean` | `true` | Animate on mount |

**FluxDataPoint:** `{ label: string, value: number, color?: string }`

Animation: 800ms easeInOut. Rendered with `react-native-svg`.

```tsx
<FluxGraph
  chartType="bar"
  data={[
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 200 },
    { label: 'Mar', value: 160, color: '#FF3B30' },
  ]}
  title="Monthly Revenue"
/>
```

---

### FluxWebView

Embedded web browser with progress indicator and error handling.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | — | Page URL |
| `showProgressBar` | `boolean` | `true` | Progress bar toggle |

Progress bar animates during loading. Error state shows retry button. Uses `react-native-webview`.

---

## File Structure

```
flux-react-native-foundation/
|-- package.json
|-- tsconfig.json
|-- LICENSE
|-- README.md
+-- src/
    |-- index.ts                              (barrel exports)
    |-- types/
    |   +-- common.ts                         (FluxSize, FluxComponentBase)
    |-- atoms/
    |   |-- FluxButton.tsx
    |   |-- FluxText.tsx
    |   |-- FluxIcon.tsx
    |   |-- FluxImage.tsx
    |   |-- FluxLoader.tsx
    |   |-- FluxDivider.tsx
    |   |-- FluxCheckBox.tsx
    |   |-- FluxRadioButton.tsx
    |   |-- FluxToggle.tsx
    |   |-- FluxSegmentedControl.tsx
    |   +-- FluxShimmer.tsx
    |-- molecules/
    |   |-- FluxCard.tsx
    |   |-- FluxTextField.tsx
    |   |-- FluxListRow.tsx
    |   |-- FluxAlertView.tsx
    |   |-- FluxInfoView.tsx
    |   |-- FluxOptionCard.tsx
    |   |-- FluxExpandableView.tsx
    |   |-- FluxFlapView.tsx
    |   |-- FluxCardFlap.tsx
    |   +-- FluxBoxGrid.tsx
    +-- organisms/
        |-- FluxHeader.tsx
        |-- FluxBottomSheet.tsx
        |-- FluxFormSection.tsx
        |-- FluxGraph.tsx
        +-- FluxWebView.tsx
```

---

## License

MIT License - Copyright (c) 2026 Afzal Siddiqui
