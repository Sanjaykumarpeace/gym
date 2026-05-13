# ⚡ PowerForge Gym — Website

**Industrial-strength gym website. Mobile-first. Conversion-optimised.**

---

## 📁 File Structure

```
gym-website/
├── index.html      — Main page (all sections)
├── styles.css      — All styles (mobile-first)
├── app.js          — JavaScript (lazy load, BMI, gallery, nav)
├── sitemap.xml     — SEO sitemap
├── robots.txt      — Search engine crawler rules
└── README.md       — This file
```

---

## 🚀 Deployment

### Option 1 — Netlify Drop (fastest, free)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the **entire `gym-website/` folder** onto the page
3. Done — live in under 30 seconds

### Option 2 — GitHub Pages
```bash
cd gym-website
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/powerforgegym.git
git push -u origin main
# Then enable GitHub Pages in repo Settings → Pages
```

### Option 3 — Vercel
```bash
npm i -g vercel
cd gym-website
vercel
```

### Option 4 — Traditional hosting (cPanel, etc.)
Upload all files to `public_html/` via FTP.

---

## 🔧 Customisation Checklist

### Replace placeholder content
- [ ] **Gym name** — Search/replace `PowerForge` with your gym name
- [ ] **Address** — Update in Contact section and footer
- [ ] **Phone** — Replace `(555) 000-1234` with real number
- [ ] **Email** — Replace `hello@powerforgegym.com`
- [ ] **Instagram handle** — Replace `@powerforgegym`
- [ ] **Domain** — Replace `powerforgegym.com` in sitemap, canonical tags
- [ ] **Google Maps embed** — Add iframe to contact section
- [ ] **Google Business link** — Update review CTA button href

### Photos (high priority — doubles conversions)
Replace Unsplash placeholders with **your actual gym photos**:
- `hero-img` → Wide shot of gym floor / entrance
- Gallery items → Actual weight floor, cardio zone, locker room, reception
- Trainer cards → Real trainer headshots
- Transformation cards → Real member before/after (get written consent)

To replace: Find `data-src="https://images.unsplash.com/..."` in `index.html`
and swap with your image paths or hosted URLs.

### Pricing
- [ ] Update plan prices in the Membership section
- [ ] Update feature lists per plan

### Trainers
- [ ] Update names, roles, certifications, bios
- [ ] Add real certification badge logos (SVG or PNG)

### Google Reviews
- [ ] Replace review card content with real Google review excerpts
- [ ] Update reviewer names and dates
- [ ] Update `127 reviews` count
- [ ] Update the "See All Reviews" link with your Google Business URL

### Videos
- [ ] Replace video modal placeholder with actual YouTube/Vimeo embeds:
```html
<!-- In the modal-video-wrap div, replace the placeholder paragraph with: -->
<iframe
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
  allow="autoplay; encrypted-media"
  allowfullscreen
  style="width:100%;aspect-ratio:16/9;border:none;border-radius:8px;"
></iframe>
```

### Instagram Feed
For a live feed, sign up for [Elfsight](https://elfsight.com) or
[LightWidget](https://lightwidget.com) and replace the `.ig-grid` div
with their embed code.

### Forms
The contact form currently shows a simulated success state.
Connect a real backend:

**Option A — Netlify Forms** (if hosted on Netlify):
Add `netlify` attribute to the form element and `name="contact"`:
```html
<form name="contact" netlify>
```

**Option B — Formspree** (free tier):
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option C — EmailJS** (client-side, no server):
Add EmailJS SDK and send from app.js.

---

## ⚡ Performance Features

- **Lazy loading** — Images only load when near viewport (IntersectionObserver)
- **Critical image preload** — Hero image loads immediately (`fetchpriority="high"`)
- **No heavy dependencies** — Zero npm packages, zero jQuery, zero frameworks
- **CSS variables** — Instant theme changes with one edit
- **Mobile-first CSS** — Styles written for small screens first
- **Reduced motion** — Respects `prefers-reduced-motion` OS setting
- **Minifiable** — CSS and JS can be minified for production (see below)

### Minify for production
```bash
# Install tools (one-time)
npm install -g clean-css-cli uglify-js

# Minify
cleancss -o styles.min.css styles.css
uglifyjs app.js -o app.min.js -c -m

# Then update index.html references:
# styles.css → styles.min.css
# app.js → app.min.js
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Red | `#E5091A` |
| Dark Red | `#B5060F` |
| Black | `#0a0a0a` |
| Dark BG | `#111111` |
| White text | `#f5f5f5` |
| Display font | Barlow Condensed |
| Body font | Barlow |

---

## 📊 Sections Included

| Section | Conversion Purpose |
|---|---|
| Hero | First impression, primary CTA |
| Trust Bar | Immediate credibility |
| About (cards) | Scannable features |
| Photo Gallery | Visual proof — filtered tabs |
| Trainers | Authority + certification |
| Transformations | Before/after social proof |
| Video Testimonials | Emotional trust |
| Google Reviews | Third-party validation |
| Instagram Feed | Social proof + followership |
| BMI Calculator | Engagement + lead gen |
| Why Us | Objection handling |
| Pricing | Conversion |
| Contact Form | Lead capture |
| Footer | Navigation + trust signals |

---

## 🔍 SEO Included

- Semantic HTML5 structure (`<nav>`, `<section>`, `<article>`, `<footer>`)
- Meta title, description, keywords
- Open Graph tags (Facebook/WhatsApp sharing)
- Twitter Card tags
- Canonical URL tag
- `robots.txt` — tells crawlers what to index
- `sitemap.xml` — helps Google find all pages
- `aria-*` attributes for accessibility
- `alt` text on all images
- `loading="lazy"` on below-fold images
- `fetchpriority="high"` on hero image

---

## 📱 Mobile Optimisations

- Viewport `width=device-width, initial-scale=1.0, viewport-fit=cover`
- `inputmode="numeric"` / `inputmode="tel"` on inputs (better mobile keyboard)
- Floating bottom CTA bar (only on mobile)
- Touch-friendly tap targets (min 44px)
- No heavy blur/particle effects on mobile
- Parallax only activates on desktop (`window.innerWidth >= 900`)
- `will-change: transform` only on hero image for GPU compositing

---

*Built with ⚡ for PowerForge Gym*
