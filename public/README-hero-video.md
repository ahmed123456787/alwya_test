# Hero video — drop your file here

Place a file named **`hero.mp4`** in this `public/` directory. The Hero section
will automatically pick it up and apply Apple-style frame scrubbing as the user
scrolls.

When the file is missing or fails to load, the Hero falls back to the animated
SVG eye automatically — no broken state.

---

## Encoding requirements (important)

Frame-by-frame scrubbing requires a video that the browser can seek into
quickly. By default, MP4s encode one keyframe every ~2 seconds, which makes
scrubbing jumpy. You want a **keyframe on every frame** (or at least every
2–3 frames).

### Recommended ffmpeg command

```bash
ffmpeg -i source.mov \
  -an \
  -vf "scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080" \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -g 1 \
  -keyint_min 1 \
  -profile:v high \
  -level 4.2 \
  public/hero.mp4
```

Key flags:

- `-g 1 -keyint_min 1` → every frame is a keyframe → smooth scrub
- `-an` → strip audio (the video is muted)
- `-pix_fmt yuv420p` → maximum browser/iOS compatibility
- `-movflags +faststart` → moves the metadata to the start of the file so the
  browser can begin playback before the full download finishes
- `scale/crop` → forces a 1:1 square (the Hero displays in a circular frame)

### Practical sizing

- **Square 1080×1080** is the sweet spot for visual quality vs. file size
- Aim for **< 6 MB** total (a 6-second clip at 1080² ≈ 4–5 MB with these flags)
- Stick to **24–30 fps** — more fps = larger file with no perceived benefit

### Where to source

- Pexels (`pexels.com/videos`) — search "eye macro", "human eye", "iris" → CC0
- Coverr (`coverr.co`) — also free
- Your own clinic footage (best — actually shows your space)

---

## How the scrubbing works

- **Desktop / hover-capable**: video is paused. `video.currentTime` is driven
  by a smoothed `scrollYProgress` (spring-eased). Scroll the page = scrub the
  clip.
- **Touch / mobile**: scrubbing is skipped (seek perf is poor on mobile
  decoders). The video autoplay-loops normally with the same parallax/scale
  treatment applied to the wrapper.
- **No file / load error**: the animated SVG eye renders in place with the
  same scroll-linked transforms.

No changes to your code needed when you drop the file in — just refresh the
page.
