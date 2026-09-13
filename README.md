# Kamran Editorial Portfolio

A complete, dependency-free portfolio website for Kamran, a video editor and motion designer. The interface uses only butter yellow `#FFF2BA` and midnight blue `#0F3C65`; original photos and videos retain their natural colors.

## Open the website

The project is plain HTML, CSS and JavaScript—no installation or build step is required.

1. Unzip the project.
2. Double-click `index.html` for a quick layout preview.
3. For embedded YouTube playback, serve the folder over HTTP or HTTPS. YouTube requires a referrer from the enclosing page and may show error 153 if a local or in-app preview strips it. Each player also provides a direct Watch on YouTube link.

## What is included

- Responsive hero with a transparent cutout, softly faded midnight-blue circle, fully readable script above the subject and parallax movement
- Liquid-glass navigation that contracts on scroll, with an accessible mobile menu
- Centered 100M+ views, 20+ clients and 4–5 active clients figures that animate when the section enters view; these are not a live data feed
- Scroll-scrubbed About section built from all 78 supplied landscape frames on desktop
- Full uncropped Instagram profile screenshot and a direct Instagram button inside About
- Four client project notes that change with the About scroll, instead of embedded reels
- Detailed About copy and four working principles, without a logo panel
- Scroll-controlled skill cards on desktop, laid out as a readable grid on tablet and mobile
- Static grid of four actual client profiles and a centered, edge-faded carousel of four supplied-client work notes, plus a 2–3 partner onboarding offer
- Ten locally packaged, playable vertical reels with poster frames and lazy loading
- Five supplied YouTube links with inline playback, recommended referrer policy, and direct playback fallback
- Locally packaged 1280 × 720 YouTube cover images used in the thumbnail wall
- Clear, always-visible portfolio headings and captions
- Sticky pinned-card editing roadmap
- Basic, Growth and Premium pricing tiers
- Side-by-side service comparison
- Client capacity proof, final contact section and a project-enquiry form
- Reduced-motion support, keyboard-accessible controls and responsive layouts

## Project structure

```text
kamran-editorial-portfolio/
├── index.html
├── styles.css
├── theme.css
├── script.js
├── README.md
├── DESIGN-SPEC.md
└── assets/
    ├── asset-manifest.json
    ├── logo/
    │   └── k-neo.svg
    ├── profile/
    │   ├── kamran-hero.jpeg
    │   ├── kamran-cutout.png
    │   ├── kamran-instagram.jpg
    │   └── kamran-instagram-full.jpg
    ├── icons/
    ├── posters/
    ├── about-sequence/ (78 scroll-animation frames)
    ├── thumbnails/
    └── clients/
        ├── talha-reviews/
        │   ├── profile/
        │   ├── reels/
        │   └── youtube/
        ├── rehan-scales/
        │   ├── profile/
        │   ├── reels/
        │   └── youtube/
        ├── mr-falex/
        │   ├── profile/
        │   └── reels/
        └── fahad-films/
            ├── profile/
            └── reels/
```

## Client mapping

### Talha Reviews

- Profile screenshot and full circular profile crop
- 3 original reels (source numbers 13, 8 and 11)
- 4 YouTube videos
- 4 locally saved YouTube cover images
- Featured video: `AhFdygt6jhg`

### Rehan Scales

- Profile screenshot and full circular profile crop
- 3 original reels (source number 16 plus two supplied founder clips)
- 1 YouTube video and local cover image

### Mr Falex

- Profile screenshot and full circular profile crop
- 2 original reels (source numbers 17 and 18)

### Fahad Films

- Profile screenshot and full circular logo crop
- 2 original reels (source numbers 12 and 19)

The referenced conversation describes a larger set of 11 reels and 8 user-uploaded thumbnail images. This revision packages ten mapped reel files available locally, all four client profile screenshots, the hero portrait and the supplied Instagram screenshot. The short-form mapping follows the user's final correction and visual review of the supplied clips. The thumbnail wall uses the real covers from the five supplied YouTube links; nothing is replaced with stock footage or AI placeholders. See `assets/asset-manifest.json` for file-level provenance.

## Client notes and testimonials

The four carousel cards and the changing About note describe supplied client work; they are not client-attributed testimonial quotes. The previously invented review cards and generated portrait files were removed. Genuine approved client feedback can be added later. The 100M+ views and 20+ client figures are user-provided claims, not independently verified or a live counter.

## Project enquiries

The Start a project buttons open a short enquiry form. On submit, the page prepares an email to `kamrannouman6@gmail.com` in the visitor's email app, including their name, email, package and project details. A direct Instagram button is provided if they prefer to DM. The form intentionally stays mailto-based so visitor information is not sent through an unapproved third-party service; automatic delivery would require choosing and authorizing a form backend or booking service.

## Performance notes

- Local videos use `preload="none"` with lightweight poster frames; nearby videos begin loading only as they approach the viewport.
- The 78-frame About sequence loads a seven-frame window around the current scroll position instead of downloading every frame on first paint.
- Hero imagery is preloaded; YouTube covers and thumbnail art use native lazy loading.
- The site respects `prefers-reduced-motion` and removes parallax, falling-card movement and reveal animation for visitors who request less motion.
- A small selected-collaboration panel describes the supplied work without inventing client outcomes or testimonials.

## Update content

### Add another reel

1. Place the MP4 in the correct client’s `reels` folder.
2. Create a poster image and place it in `assets/posters`.
3. Duplicate a `.reel-card` in `index.html` and update the video, poster, client and caption.

### Add a YouTube project

1. Save a 16:9 cover image in the client’s `youtube` folder.
2. Duplicate a `.youtube-card` in `index.html`.
3. Set `data-video` to the YouTube video ID and update the image path and labels.

### Update a client profile

Client details are stored in the `clients` object at the top of `script.js`. Profile images and original screenshots live inside each client’s `profile` folder.

### Update pricing

Pricing copy is in the `#pricing` section of `index.html`. The current plans follow the approved brief:

- Basic: $800 / month, 10 talking-head reels
- Growth: $1,800 / month, 20 talking-head reels, 2 revisions
- Premium: $3,000 / month, 30 reels, 5 YouTube videos and clipping

## Publishing

This project can be deployed as a static site on Netlify, Vercel, Cloudflare Pages, GitHub Pages or any standard web host. Upload the entire unzipped folder and keep the `assets` directory next to `index.html`.

## Browser support

Current Chrome, Edge, Safari and Firefox are supported. The client detail experience uses the native HTML dialog element. Scroll effects automatically simplify when a visitor enables “Reduce Motion.”
