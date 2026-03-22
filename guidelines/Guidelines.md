## 6. Mobile App-Like Responsive UI (PWA Inspired Design)

Website ko aise design kiya jayega ki:

- Mobile devices par → App jaisa experience
- Desktop par → Traditional news website layout

### 📱 6.1 Mobile UI Behavior (App Mode)

Jab screen width ≤ 768px ho:

#### 🔻 Bottom Navigation Bar (Fixed)

Mobile par top navbar ke bajaye bottom navigation use hoga:

Tabs:

- 🏠 Home
- 🔴 Live TV
- 🎬 Shorts
- 🔍 Search
- ☰ Menu/Profile

```html
<div class="mobile-bottom-nav d-md-none">
  <a href="/"><i class="fas fa-home"></i></a>
  <a href="/live"><i class="fas fa-tv"></i></a>
  <a href="/shorts"><i class="fas fa-play"></i></a>
  <a href="/search"><i class="fas fa-search"></i></a>
  <a href="/menu"><i class="fas fa-bars"></i></a>
</div>
```

**What is this?**

- 📲 **Full Screen App Layout**
  - Header minimize hoga ya hide
  - Content full screen occupy karega
  - Smooth scroll + swipe gestures enabled
- 🔄 **App-like Navigation (No Page Reload)**
  - AJAX / Fetch API / HTMX use hoga
  - Pages reload nahi honge → smooth transition
- 🎬 **Shorts & Stories = Native App Feel**
  - Vertical swipe (Instagram Reels jaisa)
  - Full screen video
  - Tap gestures
- 🔔 **Push Notifications (Optional Advanced)**
  - Breaking news ke liye push notifications
  - Service Worker use hoga

### 💻 6.2 Desktop UI Behavior (Website Mode)

Jab screen width > 768px ho:

- Top Navbar visible
- Sidebar + Grid layout active
- Footer traditional hoga
- Bottom nav hidden
