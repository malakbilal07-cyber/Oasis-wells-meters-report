# ADVACON — Wells & Meters Field Report v2.0

## Files
- `index.html` — Main application
- `app.js` — All interactive logic (map, charts, tables, edit, export)
- `data.js` — Embedded well and meter data (141 wells, 231 meters)

## Features
- **Dashboard** — 8 KPI cards, detailed summary table, 3 doughnut charts, disconnection reason breakdown
- **Real map** — All 141 wells plotted with Leaflet/OpenStreetMap; filter Active / Non-Active / All
- **Wells table** — Search, filter by status & rehab, pagination (20/page), Edit & Remove every row
- **Meters table** — Same as wells, includes voltage/ampere data
- **Add Record** — Add new wells or meters via form; appear highlighted in table and on map
- **Upload Excel** — Replace all data by uploading a new .xlsx file (same sheet structure)
- **Export CSV** — Download current filtered data as CSV
- **Export PDF** — Full report PDF (summary + wells table + meters table)

## Deploy to GitHub Pages (free)

1. Go to https://github.com → New repository (name: `wells-meters-report`, Public)
2. Upload all 4 files: `index.html`, `app.js`, `data.js`, `README.md`
3. Go to Settings → Pages → Branch: main, Folder: / (root) → Save
4. Wait 1–2 minutes → your site is live at `https://YOUR-USERNAME.github.io/wells-meters-report/`

## Data persistence
- Edits, additions, and removals are saved in **browser localStorage** — free, no setup required
- Changes are per-browser/device (not shared with other visitors automatically)
- Use **Export CSV** anytime to back up your current data
- Use **Upload Excel** to push a new version of the spreadsheet to everyone

## Update the site
To update with a new Excel file, just use the **Upload Excel** page inside the app — no need to touch GitHub.
To update the app code, re-upload `index.html` or `app.js` to the GitHub repo.
