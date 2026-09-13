# Design Specification

## Creative direction

The visual thesis is **editorial precision with cinematic depth**: large type creates authority, a strict two-color interface creates clarity, and real client media carries the proof. Sections switch directly between solid butter yellow and midnight blue; only the hero circle edge and translucent glass navigation blend those two colors.

## Visual system

### Color

| Token | Value | Use |
|---|---:|---|
| Butter yellow | `#FFF2BA` | Hero, cards, light sections and text on dark fields |
| Midnight blue | `#0F3C65` | Dark sections, borders, controls and text on light fields |

These two hex values are the only interface colors. User-provided portraits, reel footage, thumbnails and the Instagram screenshot keep their source colors.

### Typography

- Primary sans: DM Sans, with Arial fallback
- Editorial italic: Playfair Display, with Georgia fallback
- Headlines: tight tracking, compact line height and responsive `clamp()` sizing
- Body copy: at least 16 px with relaxed line height
- Metadata: uppercase with deliberate tracking

### Shape and depth

- Cards use 12–24 px corner radii and crisp two-color borders
- Buttons have clear rectangular geometry and visible focus outlines
- Shadows use the midnight-blue token
- Client profile crops stay circular, fill edge-to-edge with the supplied profile image, and contain no screenshot chrome or white ring
- The custom K mark uses a butter-yellow field and midnight-blue slab letterform

## Page sequence and behavior

### 1. Hero

- Full viewport editorial opening
- A transparent subject cutout derived from the supplied portrait sits over the outlined headline; the smaller script is raised so its complete sentence remains readable
- A midnight-blue circle softly fades at every edge behind the cutout; no color fade is applied to the figure
- “I turn footage into STORIES” establishes the positioning immediately
- Portrait and type move at different scroll speeds for restrained parallax
- The hero contains no simulated live views tracker
- The full-width liquid-glass header contracts on scroll; a compact mobile menu keeps all section links available

### 2. Falling toolkit

- A 205vh section creates enough scroll space for a sticky scene
- Eight skill cards begin below the heading, move with scroll and respond to the pointer on wide screens
- Recognizable application and platform icon silhouettes are recolored in the two brand colors
- Tablet and mobile render the cards in a static two-column grid for readability

### 3. Interactive clients

- Four real profile crops sit in a static responsive grid; there is no circular or drag motion
- Center-aligned proof shows the user-provided 100M+ views, 20+ clients served and 4–5 active clients; figures animate on entry but are not a live feed
- A compact offer announces onboarding capacity for 2–3 additional creator partners
- Selecting a profile updates the central client project note and shows a short confirmation toast
- A centered, horizontally scrollable rail holds four actual-work descriptions; the left and right edges fade to the section background
- “View profile & work” opens a native modal with social link, services and proof

### 4. About

- A 78-frame supplied landscape sequence scrubs directly with page scroll
- A subtle monochrome frame sequence sits beneath solid midnight-blue content on wide screens
- The complete, uncropped Instagram profile screenshot and direct profile link sit beside the About copy; the right column is width-constrained so its changing note is not clipped
- Four client project notes change as the landscape sequence progresses
- Detailed positioning, working approach and platform philosophy
- Four compact principles cover story, platform fit, purposeful motion and delivery reliability

### 5. Short-form work

- Ten real vertical MP4 files are directly playable, using the client's corrected source mapping and lightweight poster frames
- Cards alternate vertical offsets on wide screens; captions remain visible at all times
- The rail supports mouse, trackpad, touch, arrow buttons and CSS scroll snapping
- Starting one reel pauses any other playing reel

### 6. Long-form work

- The designated Talha project is oversized as a selected project; no unverified “best performing” claim is made
- Covers are packaged locally for fast first paint
- Clicking a cover opens a standard YouTube embed with `strict-origin-when-cross-origin` referrer policy, plus a direct watch link if the preview environment strips the referrer

### 7. Thumbnail wall

- Five real, locally saved YouTube covers are composed as an editorial wall
- Alternating angles create energy while hover returns the image toward neutral

### 8. Editing roadmap

- Copy explains strategy, review, editing, motion, revision, delivery and premium clipping
- Cards use sticky positioning to create a pinned-paper stacking effect
- A midnight-blue dashed path and circular pins connect the service sequence

### 9. Pricing

- Three clear monthly tiers
- Growth is the visual center and the approved most-popular offer
- The hierarchy prioritizes deliverable quantity, revision scope and service depth

### 10. Comparison and proof

- Each row contrasts a typical editor with Kamran’s content system
- Text remains fully visible without opacity fades
- Large proof numbers create a calm, high-contrast transition to contact

### 11. Contact

- Midnight-blue closing field mirrors the toolkit section
- The project enquiry form prepares a prefilled email to `kamrannouman6@gmail.com`; Instagram is the alternative supplied contact route. No third-party form relay is enabled by default.
- Availability copy stays selective and direct

## Responsive behavior

- Desktop: wide editorial compositions, a four-column client grid and two-column long form
- Tablet: static skill grid, stacked About content and preserved navigation
- Mobile: accessible menu, single-column media layouts, full profile screenshot and safe-width dialogs
- No horizontal body overflow; the reel rail is the only intentionally horizontal surface

## Accessibility

- Semantic sections and headings
- Descriptive media alternative text
- Buttons for every interactive action
- Native dialog behavior with Escape-to-close
- Keyboard-focusable reel rail and client selectors
- `prefers-reduced-motion` removes parallax, falling-card movement and entrance transitions
- YouTube embeds load only after an explicit user action
- Video files use native lazy loading and the About image sequence is windowed around the current frame

## Asset policy

- User-provided MP4s, original portrait, Instagram screenshot and client profile screenshots remain local
- The transparent hero cutout, poster frames and circular profile crops are derived assets and remain local
- YouTube covers were downloaded from the IDs supplied by the user
- No stock or generated review portraits are included
- Full provenance is recorded in `assets/asset-manifest.json`
- Editorial project notes are not presented as client-attributed testimonial quotes; no invented reviews are included.
