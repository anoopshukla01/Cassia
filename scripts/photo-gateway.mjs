import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const IMGS_DIR = path.join(ROOT_DIR, 'public', 'imgs');
const CONFIG_FILE = path.join(ROOT_DIR, 'src', 'data', 'siteConfig.json');
const PUBLIC_CONFIG_FILE = path.join(ROOT_DIR, 'public', 'siteConfig.json');

const PORT = 5180;

if (!fs.existsSync(IMGS_DIR)) fs.mkdirSync(IMGS_DIR, { recursive: true });

function readConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    } catch (e) {
      console.error('Error parsing siteConfig.json', e);
    }
  }
  return {};
}

function saveConfig(data) {
  const jsonStr = JSON.stringify(data, null, 2);
  fs.writeFileSync(CONFIG_FILE, jsonStr, 'utf-8');
  fs.writeFileSync(PUBLIC_CONFIG_FILE, jsonStr, 'utf-8');
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET API: Read configuration
  if (req.method === 'GET' && req.url.startsWith('/api/config')) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    res.end(JSON.stringify(readConfig()));
    return;
  }

  // POST API: Save full configuration
  if (req.method === 'POST' && req.url === '/api/config') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        saveConfig(parsed);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Settings saved and synced live' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve live photos from /public/imgs/
  if (req.url.startsWith('/img/')) {
    const filename = path.basename(req.url.split('?')[0]);
    const filePath = path.join(IMGS_DIR, filename);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filename).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.svg') mime = 'image/svg+xml';
      else if (ext === '.webp') mime = 'image/webp';

      res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-store' });
      fs.createReadStream(filePath).pipe(res);
      return;
    } else {
      res.writeHead(404);
      res.end('Image not found');
      return;
    }
  }

  // Image Upload Handler
  if (req.method === 'POST' && req.url.startsWith('/api/upload')) {
    const urlObj = new URL(req.url, `http://localhost:${PORT}`);
    const targetFile = urlObj.searchParams.get('file');

    if (!targetFile) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Target filename required' }));
      return;
    }

    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const destPath = path.join(IMGS_DIR, targetFile);

      const contentType = req.headers['content-type'] || '';
      if (contentType.includes('multipart/form-data')) {
        const boundary = contentType.split('boundary=')[1];
        if (boundary) {
          const raw = buffer.toString('binary');
          const parts = raw.split('--' + boundary);
          for (const part of parts) {
            if (part.includes('filename=') && part.includes('Content-Type: image/')) {
              const fileDataStart = part.indexOf('\r\n\r\n') + 4;
              const fileDataEnd = part.lastIndexOf('\r\n');
              const binaryData = part.substring(fileDataStart, fileDataEnd);
              fs.writeFileSync(destPath, Buffer.from(binaryData, 'binary'));
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: `Updated ${targetFile} successfully` }));
              return;
            }
          }
        }
      }

      fs.writeFileSync(destPath, buffer);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: `Updated ${targetFile} successfully` }));
    });
    return;
  }

  // Serve Admin Dashboard HTML
  if (req.url === '/' || req.url === '/index.html' || req.url === '/admin') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CASSIA — Master Executive Admin Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --bg: #070707;
      --card: #12110f;
      --card-inner: #191816;
      --border: rgba(201, 169, 110, 0.22);
      --gold: #c9a96e;
      --gold-soft: #e2cca0;
      --text: #f5f2eb;
      --text-muted: #8e8a82;
      --danger: #e05d5d;
      --success: #60c080;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 0;
      min-height: 100vh;
    }
    .top-header {
      background: #0d0c0a;
      border-bottom: 1px solid var(--border);
      padding: 20px 4vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .logo-badge {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .seal-preview-header {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1.5px solid var(--gold);
      background: radial-gradient(circle at 35% 35%, #221d15 0%, #0d0c0a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Georgia, serif;
      font-size: 1.35rem;
      font-weight: bold;
      color: var(--gold-soft);
      box-shadow: 0 0 16px rgba(201, 169, 110, 0.3);
      overflow: hidden;
      position: relative;
    }
    .seal-preview-header::before {
      content: '';
      position: absolute;
      inset: 3px;
      border-radius: 50%;
      border: 1px dashed rgba(201, 169, 110, 0.45);
      pointer-events: none;
      z-index: 2;
    }
    .seal-preview-header img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      z-index: 1;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .btn-save-master {
      background: var(--gold);
      color: #070707;
      border: none;
      padding: 11px 26px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.78rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 0 20px rgba(201, 169, 110, 0.35);
      transition: all 0.3s;
    }
    .btn-save-master:hover {
      background: var(--gold-soft);
      transform: translateY(-2px);
    }
    .btn-view-site {
      color: var(--gold);
      border: 1px solid var(--border);
      padding: 10px 18px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.74rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      transition: all 0.3s;
    }
    .btn-view-site:hover {
      background: rgba(201, 169, 110, 0.12);
      border-color: var(--gold);
    }
    .main-content {
      padding: 36px 4vw 80px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 28px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 12px;
      overflow-x: auto;
    }
    .tab-btn {
      background: none;
      border: 1px solid transparent;
      color: var(--text-muted);
      padding: 9px 20px;
      border-radius: 999px;
      font-size: 0.76rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.3s;
      white-space: nowrap;
    }
    .tab-btn.active, .tab-btn:hover {
      border-color: var(--gold);
      color: var(--gold-soft);
      background: rgba(201, 169, 110, 0.08);
    }
    .tab-panel {
      display: none;
    }
    .tab-panel.active {
      display: block;
      animation: fadeIn 0.3s;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .panel-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 26px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.7);
    }
    .panel-title {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--gold);
      margin-bottom: 6px;
      letter-spacing: 0.06em;
    }
    .panel-sub {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-bottom: 22px;
      line-height: 1.5;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .form-group.full {
      grid-column: 1 / -1;
    }
    label {
      font-size: 0.7rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--gold-soft);
    }
    input, textarea, select {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #fff;
      padding: 11px 15px;
      border-radius: 4px;
      font-size: 0.88rem;
      outline: none;
      transition: border 0.3s;
      width: 100%;
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--gold);
    }
    textarea {
      min-height: 85px;
      resize: vertical;
    }

    /* Circular Logo Box */
    .logo-visualizer-box {
      display: flex;
      align-items: center;
      gap: 28px;
      padding: 24px;
      background: var(--card-inner);
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .circular-seal-display {
      width: 86px;
      height: 86px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      background: radial-gradient(circle at 35% 35%, #2a2318 0%, #0d0c0a 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Georgia, serif;
      font-size: 2.2rem;
      font-weight: bold;
      color: var(--gold-soft);
      box-shadow: 0 0 25px rgba(201, 169, 110, 0.35);
      position: relative;
      flex-shrink: 0;
      overflow: hidden;
    }
    .circular-seal-display::before {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      border: 1px dashed rgba(201, 169, 110, 0.5);
      pointer-events: none;
      z-index: 2;
    }
    .circular-seal-display img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      z-index: 1;
    }

    /* Photo Grid inside admin */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 22px;
    }
    .photo-item-card {
      background: #090908;
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .photo-thumb {
      height: 175px;
      width: 100%;
      overflow: hidden;
      position: relative;
      background: #000;
    }
    .photo-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .photo-thumb.circular-thumb-preview {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0b0a09;
    }
    .photo-thumb.circular-thumb-preview img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid var(--gold);
      box-shadow: 0 0 20px rgba(201,169,110,0.3);
    }
    .photo-badge {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(7, 7, 7, 0.85);
      border: 1px solid var(--gold);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 0.65rem;
      color: var(--gold);
    }
    .photo-info {
      padding: 16px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: space-between;
    }
    .file-drop-btn {
      position: relative;
      border: 1px dashed var(--gold);
      border-radius: 4px;
      padding: 10px;
      text-align: center;
      margin-top: 12px;
      cursor: pointer;
      font-size: 0.74rem;
      color: var(--gold);
      background: rgba(201, 169, 110, 0.04);
      transition: all 0.2s;
    }
    .file-drop-btn:hover {
      background: rgba(201, 169, 110, 0.12);
    }
    .file-drop-btn input {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }

    /* Dish Editor List */
    .dish-editor-row {
      background: var(--card-inner);
      border: 1px solid rgba(201, 169, 110, 0.14);
      border-radius: 6px;
      padding: 18px;
      margin-bottom: 14px;
      position: relative;
    }
    .dish-editor-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 14px;
      margin-bottom: 12px;
    }
    .dish-btn-delete {
      background: none;
      border: 1px solid var(--danger);
      color: var(--danger);
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 0.72rem;
      cursor: pointer;
      position: absolute;
      top: 14px;
      right: 14px;
      transition: all 0.2s;
    }
    .dish-btn-delete:hover {
      background: var(--danger);
      color: #fff;
    }
    .btn-add-dish {
      background: rgba(201, 169, 110, 0.1);
      border: 1px dashed var(--gold);
      color: var(--gold);
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 0.78rem;
      cursor: pointer;
      display: inline-block;
      margin-top: 10px;
      transition: all 0.2s;
    }
    .btn-add-dish:hover {
      background: rgba(201, 169, 110, 0.22);
    }

    .toast {
      position: fixed;
      bottom: 28px;
      right: 28px;
      background: var(--gold);
      color: #070707;
      padding: 15px 30px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.88rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      display: none;
      z-index: 1000;
    }
  </style>
</head>
<body>
  <div class="top-header">
    <div class="logo-badge">
      <div class="seal-preview-header" id="header-seal-preview">
        <span id="header-seal-char">C</span>
      </div>
      <div>
        <h2 style="font-size: 1.15rem; letter-spacing: 0.15em; font-weight: 400; color: #fff;">CASSIA PORTAL</h2>
        <p style="font-size: 0.7rem; color: var(--gold); letter-spacing: 0.1em;">MASTER EXECUTIVE CONTROL</p>
      </div>
    </div>
    <div class="header-actions">
      <a href="http://127.0.0.1:5176/" target="_blank" class="btn-view-site">View Live Website (5176) ↗</a>
      <button class="btn-save-master" onclick="saveAllChanges()">Save All Changes ✓</button>
    </div>
  </div>

  <div class="main-content">
    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('tab-brand', this)">Logo & Branding</button>
      <button class="tab-btn" onclick="switchTab('tab-photos', this)">All Photos</button>
      <button class="tab-btn" onclick="switchTab('tab-contact', this)">Location, Hours & Contact</button>
      <button class="tab-btn" onclick="switchTab('tab-chapters', this)">Anthology Chapters</button>
      <button class="tab-btn" onclick="switchTab('tab-menus', this)">Full Category Menus</button>
    </div>

    <!-- TAB 1: LOGO & BRANDING -->
    <div id="tab-brand" class="tab-panel active">
      <div class="panel-card">
        <h3 class="panel-title">Circular Logo & Brand Identity</h3>
        <p class="panel-sub">Control your circular logo appearance, monogram lettermark, brand titles, and hero presentation.</p>

        <div class="logo-visualizer-box">
          <div class="circular-seal-display" id="large-seal-preview">
            <span id="large-seal-char">C</span>
          </div>
          <div style="flex-grow: 1;">
            <h4 style="font-size: 1.05rem; color: #fff; margin-bottom: 6px;">Circular Logo Preview</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
              Rendered in a gold circular ring with micro-dashed accents across the navigation bar and hero scene.
            </p>
            <div style="display:flex; gap:16px; align-items:center;">
              <div class="file-drop-btn" style="margin-top:0;">
                <input type="file" accept="image/*" onchange="uploadLogoImage(this.files[0])">
                <span>📷 Upload Custom Circular Logo Image</span>
              </div>
              <span id="logo-upload-status" style="font-size:0.75rem; color:var(--gold);"></span>
            </div>
          </div>
        </div>

        <div class="form-grid">
          <div class="form-group">
            <label>Logo Display Mode</label>
            <select id="brand-logoMode" onchange="toggleLogoMode(this.value)">
              <option value="seal">Gold Monogram Circular Seal</option>
              <option value="image">Custom Uploaded Circular Logo Image</option>
            </select>
          </div>
          <div class="form-group">
            <label>Circular Seal Monogram (Center Letter/Initials)</label>
            <input id="brand-logoText" type="text" maxlength="3" oninput="updateSealChar(this.value)">
          </div>
          <div class="form-group">
            <label>Custom Circular Logo Image Path</label>
            <input id="brand-logoImage" type="text" placeholder="/imgs/logo.png" oninput="refreshLogoPreview()">
          </div>
          <div class="form-group">
            <label>Brand Name</label>
            <input id="brand-name" type="text">
          </div>
          <div class="form-group">
            <label>City & Subtitle</label>
            <input id="brand-city" type="text">
          </div>
          <div class="form-group">
            <label>Intro Eyebrow Tag</label>
            <input id="brand-eyebrow" type="text">
          </div>
          <div class="form-group full">
            <label>Hero Intro Tagline</label>
            <textarea id="brand-tagline"></textarea>
          </div>
          <div class="form-group">
            <label>Intro 3D Zoom Circle Image Path</label>
            <input id="brand-introCircleImage" type="text" placeholder="/imgs/intro_circle.jpg">
          </div>
          <div class="form-group">
            <label>Intro CTA Button Text</label>
            <input id="brand-introCta" type="text">
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: ALL PHOTOS -->
    <div id="tab-photos" class="tab-panel">
      <div class="panel-card">
        <h3 class="panel-title">Site Photography Assets</h3>
        <p class="panel-sub">Upload high-resolution photos to replace any image across the hero, chapters, modals, and circular logo.</p>
        <div class="photo-grid" id="photo-grid-container">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>

    <!-- TAB 3: LOCATION & CONTACT -->
    <div id="tab-contact" class="tab-panel">
      <div class="panel-card">
        <h3 class="panel-title">Location, Timing & Concierge Inquiries</h3>
        <p class="panel-sub">Manage your dining address, weekday/weekend hours, direct phone, official email, and WhatsApp concierge.</p>
        <div class="form-grid">
          <div class="form-group">
            <label>Address Title</label>
            <input id="contact-addressTitle" type="text">
          </div>
          <div class="form-group">
            <label>Address Main Line</label>
            <input id="contact-addressMain" type="text">
          </div>
          <div class="form-group full">
            <label>Address Sub Details / Landmark</label>
            <input id="contact-addressSub" type="text">
          </div>
          <div class="form-group">
            <label>Weekday Hours (Mon – Thu)</label>
            <input id="contact-hoursWeekday" type="text">
          </div>
          <div class="form-group">
            <label>Weekend Hours (Fri – Sun)</label>
            <input id="contact-hoursWeekend" type="text">
          </div>
          <div class="form-group full">
            <label>Hours Note / Bar Details</label>
            <input id="contact-hoursNote" type="text">
          </div>
          <div class="form-group">
            <label>Phone Number (Display)</label>
            <input id="contact-phone" type="text">
          </div>
          <div class="form-group">
            <label>Official Email</label>
            <input id="contact-email" type="text">
          </div>
          <div class="form-group">
            <label>WhatsApp Number (without + or spaces, e.g. 919876543210)</label>
            <input id="contact-whatsappNumber" type="text">
          </div>
          <div class="form-group full">
            <label>Valet & Arrival Note</label>
            <textarea id="contact-valetNote"></textarea>
          </div>
          <div class="form-group full">
            <label>Google Maps Embed iFrame URL</label>
            <input id="contact-mapEmbedUrl" type="text">
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: ANTHOLOGY CHAPTERS -->
    <div id="tab-chapters" class="tab-panel">
      <div class="panel-card">
        <h3 class="panel-title">Anthology Section & 5 Pinned Chapters</h3>
        <p class="panel-sub">Edit the section headings, description, and individual card taglines, titles, excerpts, and buttons.</p>

        <div style="background:var(--card-inner); padding:20px; border-radius:6px; border:1px solid var(--border); margin-bottom:24px;">
          <h4 style="color:var(--gold); font-size:0.95rem; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.1em;">Section Header</h4>
          <div class="form-grid">
            <div class="form-group">
              <label>Section Tagline</label>
              <input id="anthology-sectionTag" type="text">
            </div>
            <div class="form-group">
              <label>Section Main Title</label>
              <input id="anthology-sectionTitle" type="text">
            </div>
            <div class="form-group full">
              <label>Section Description</label>
              <textarea id="anthology-sectionDesc"></textarea>
            </div>
          </div>
        </div>

        <div id="chapters-list-container">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>

    <!-- TAB 5: CATEGORY MENUS -->
    <div id="tab-menus" class="tab-panel">
      <div class="panel-card">
        <h3 class="panel-title">Full Menu Items & Dispositions</h3>
        <p class="panel-sub">Edit dishes, add new items, delete items, update prices, notes, and culinary narratives for every category.</p>
        <div id="menus-list-container">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  </div>

  <div class="toast" id="toast-msg">Settings Saved Live!</div>

  <script>
    let SITE_DATA = {};

    const PHOTO_SLOTS = [
      { key: 'intro_circle', label: '3D Intro Hero Circle Image', filename: 'intro_circle.jpg', desc: 'The circular emblem/image zooming in the 3D Intro section.', isCircular: true },
      { key: 'food', label: 'Signature Dish / Gastronomy (Chapter 1)', filename: 'food.jpg', desc: 'Gourmet signature dish shown in Chapter 01 Gastronomy card and Cuisine modal.' },
      { key: 'logo', label: 'Circular Logo Image', filename: 'logo.png', desc: 'Custom circular logo displayed on navigation and intro.', isCircular: true },
      { key: 'coffee', label: 'Specialty Coffee / Pour', filename: 'coffee.jpg', desc: 'Espresso pour in Chapter 2 card and Coffee modal.' },
      { key: 'bar', label: 'Bar Counter / Ambiance', filename: 'bar.jpg', desc: 'Cocktail bar in Chapter 5 card and Evenings modal.' },
      { key: 'bartender', label: 'Bartender Mixology Action', filename: 'bartender.jpg', desc: 'Mixologist shaking drink in Chapter 3 card and Cocktails modal.' },
      { key: 'interior', label: 'Interior Dining Architecture', filename: 'interior.jpg', desc: '3D Intro Portal, Chapter 4 card, and Salon modal.' },
      { key: 'entrance', label: 'Entrance Portal Doors', filename: 'entrance.jpg', desc: 'Grand wooden entrance doors.' },
      { key: 'menu', label: 'Menu Book Leather Cover', filename: 'menu.jpg', desc: 'Editorial leather menu background.' }
    ];

    async function loadConfig() {
      try {
        const res = await fetch('/api/config?t=' + Date.now());
        SITE_DATA = await res.json();
        populateFields();
      } catch (err) {
        console.error('Failed to load config', err);
      }
    }

    function populateFields() {
      // Brand
      if (SITE_DATA.brand) {
        document.getElementById('brand-logoMode').value = SITE_DATA.brand.logoMode || 'seal';
        document.getElementById('brand-logoText').value = SITE_DATA.brand.logoText || 'C';
        document.getElementById('brand-logoImage').value = SITE_DATA.brand.logoImage || '';
        document.getElementById('brand-introCircleImage').value = SITE_DATA.brand.introCircleImage || '/imgs/intro_circle.jpg';
        document.getElementById('brand-name').value = SITE_DATA.brand.name || 'CASSIA';
        document.getElementById('brand-city').value = SITE_DATA.brand.city || 'Gorakhpur';
        document.getElementById('brand-eyebrow').value = SITE_DATA.brand.eyebrow || '';
        document.getElementById('brand-tagline').value = SITE_DATA.brand.tagline || '';
        document.getElementById('brand-introCta').value = SITE_DATA.brand.introCta || '';
        refreshLogoPreview();
      }

      // Contact
      if (SITE_DATA.contact) {
        document.getElementById('contact-addressTitle').value = SITE_DATA.contact.addressTitle || '';
        document.getElementById('contact-addressMain').value = SITE_DATA.contact.addressMain || '';
        document.getElementById('contact-addressSub').value = SITE_DATA.contact.addressSub || '';
        document.getElementById('contact-hoursWeekday').value = SITE_DATA.contact.hoursWeekday || '';
        document.getElementById('contact-hoursWeekend').value = SITE_DATA.contact.hoursWeekend || '';
        document.getElementById('contact-hoursNote').value = SITE_DATA.contact.hoursNote || '';
        document.getElementById('contact-phone').value = SITE_DATA.contact.phone || '';
        document.getElementById('contact-email').value = SITE_DATA.contact.email || '';
        document.getElementById('contact-whatsappNumber').value = SITE_DATA.contact.whatsappNumber || '';
        document.getElementById('contact-valetNote').value = SITE_DATA.contact.valetNote || '';
        document.getElementById('contact-mapEmbedUrl').value = SITE_DATA.contact.mapEmbedUrl || '';
      }

      // Anthology Header
      if (SITE_DATA.anthology) {
        document.getElementById('anthology-sectionTag').value = SITE_DATA.anthology.sectionTag || '';
        document.getElementById('anthology-sectionTitle').value = SITE_DATA.anthology.sectionTitle || '';
        document.getElementById('anthology-sectionDesc').value = SITE_DATA.anthology.sectionDesc || '';
      }

      // Photos Grid
      renderPhotoGrid();

      // Chapters List
      renderChaptersList();

      // Menus List
      renderMenusList();
    }

    function renderPhotoGrid() {
      const photoGrid = document.getElementById('photo-grid-container');
      photoGrid.innerHTML = PHOTO_SLOTS.map(slot => \`
        <div class="photo-item-card">
          <div class="photo-thumb \${slot.isCircular ? 'circular-thumb-preview' : ''}">
            <img id="thumb-\${slot.key}" src="/img/\${slot.filename}?t=\${Date.now()}" alt="\${slot.label}">
            <div class="photo-badge">\${slot.filename}</div>
          </div>
          <div class="photo-info">
            <div>
              <h4 style="color:#fff; font-size:0.95rem; margin-bottom:4px;">\${slot.label}</h4>
              <p style="font-size:0.75rem; color:#888;">\${slot.desc}</p>
            </div>
            <div class="file-drop-btn">
              <input type="file" accept="image/*" onchange="uploadImage('\${slot.filename}', '\${slot.key}', this.files[0])">
              <span>📷 Replace Photo</span>
            </div>
            <div id="upload-status-\${slot.key}" style="font-size:0.7rem; color:var(--gold); margin-top:6px; min-height:16px;"></div>
          </div>
        </div>
      \`).join('');
    }

    function renderChaptersList() {
      if (!SITE_DATA.cards) return;
      const chapContainer = document.getElementById('chapters-list-container');
      chapContainer.innerHTML = SITE_DATA.cards.map((c, i) => \`
        <div style="background:var(--card-inner); border:1px solid var(--border); border-radius:6px; padding:22px; margin-bottom:18px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:14px;">
            <h4 style="color:var(--gold); font-size:1.05rem;">Chapter \${i+1}: \${c.title}</h4>
            <span style="font-size:0.75rem; color:#888;">Key: \${c.menuKey}</span>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Chapter Tagline</label>
              <input type="text" value="\${c.tagline}" onchange="SITE_DATA.cards[\${i}].tagline = this.value">
            </div>
            <div class="form-group">
              <label>Chapter Title</label>
              <input type="text" value="\${c.title}" onchange="SITE_DATA.cards[\${i}].title = this.value">
            </div>
            <div class="form-group">
              <label>CTA Button Label</label>
              <input type="text" value="\${c.ctaText}" onchange="SITE_DATA.cards[\${i}].ctaText = this.value">
            </div>
            <div class="form-group full">
              <label>Excerpt Description</label>
              <textarea onchange="SITE_DATA.cards[\${i}].excerpt = this.value">\${c.excerpt}</textarea>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function renderMenusList() {
      if (!SITE_DATA.menus) return;
      const menuContainer = document.getElementById('menus-list-container');
      menuContainer.innerHTML = Object.entries(SITE_DATA.menus).map(([catKey, cat]) => \`
        <div style="background:var(--card-inner); border:1px solid var(--border); border-radius:6px; padding:24px; margin-bottom:26px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:1px solid var(--border); padding-bottom:12px;">
            <div>
              <h4 style="color:var(--gold); font-size:1.15rem; text-transform:uppercase;">\${cat.keyText} · \${cat.title}</h4>
              <p style="font-size:0.75rem; color:var(--text-muted);">\${cat.subtitle}</p>
            </div>
            <span style="color:#aaa; font-size:0.78rem;">\${cat.dishes.length} Items</span>
          </div>

          <div class="form-grid" style="margin-bottom:18px;">
            <div class="form-group">
              <label>Background Clip Key Text</label>
              <input type="text" value="\${cat.keyText}" onchange="SITE_DATA.menus['\${catKey}'].keyText = this.value">
            </div>
            <div class="form-group">
              <label>Menu Title</label>
              <input type="text" value="\${cat.title}" onchange="SITE_DATA.menus['\${catKey}'].title = this.value">
            </div>
            <div class="form-group full">
              <label>Menu Subtitle</label>
              <input type="text" value="\${cat.subtitle}" onchange="SITE_DATA.menus['\${catKey}'].subtitle = this.value">
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            \${cat.dishes.map((dish, dIdx) => \`
              <div class="dish-editor-row">
                <button type="button" class="dish-btn-delete" onclick="deleteDish('\${catKey}', \${dIdx})">✕ Delete</button>
                <div class="dish-editor-grid">
                  <div class="form-group">
                    <label>Dish Name</label>
                    <input type="text" value="\${dish.name}" onchange="SITE_DATA.menus['\${catKey}'].dishes[\${dIdx}].name = this.value">
                  </div>
                  <div class="form-group">
                    <label>Price</label>
                    <input type="text" value="\${dish.price}" onchange="SITE_DATA.menus['\${catKey}'].dishes[\${dIdx}].price = this.value">
                  </div>
                  <div class="form-group">
                    <label>Badge</label>
                    <input type="text" value="\${dish.badge || ''}" onchange="SITE_DATA.menus['\${catKey}'].dishes[\${dIdx}].badge = this.value">
                  </div>
                </div>
                <div class="form-group" style="margin-bottom:10px;">
                  <label>Culinary Notes</label>
                  <input type="text" value="\${dish.notes || ''}" onchange="SITE_DATA.menus['\${catKey}'].dishes[\${dIdx}].notes = this.value">
                </div>
                <div class="form-group">
                  <label>Description Narrative</label>
                  <textarea onchange="SITE_DATA.menus['\${catKey}'].dishes[\${dIdx}].desc = this.value">\${dish.desc}</textarea>
                </div>
              </div>
            \`).join('')}
          </div>

          <button type="button" class="btn-add-dish" onclick="addNewDish('\${catKey}')">+ Add New Dish to \${cat.keyText}</button>
        </div>
      \`).join('');
    }

    function addNewDish(catKey) {
      if (!SITE_DATA.menus || !SITE_DATA.menus[catKey]) return;
      SITE_DATA.menus[catKey].dishes.push({
        name: 'New Artisanal Creation',
        price: '₹750',
        notes: 'Hand-Harvested · Fresh Botanicals',
        desc: 'Crafted with seasonal regional produce and slow cooking techniques.',
        badge: 'New'
      });
      renderMenusList();
      showToast('New dish added. Remember to click Save All Changes!');
    }

    function deleteDish(catKey, index) {
      if (!confirm('Are you sure you want to remove this dish?')) return;
      SITE_DATA.menus[catKey].dishes.splice(index, 1);
      renderMenusList();
      showToast('Dish removed.');
    }

    function refreshLogoPreview() {
      const mode = document.getElementById('brand-logoMode').value;
      const char = document.getElementById('brand-logoText').value || 'C';
      const imgPath = document.getElementById('brand-logoImage').value || '/imgs/logo.png';

      const headerSeal = document.getElementById('header-seal-preview');
      const largeSeal = document.getElementById('large-seal-preview');

      if (mode === 'image' && imgPath) {
        headerSeal.innerHTML = \`<img src="\${imgPath}?t=\${Date.now()}" alt="Logo">\`;
        largeSeal.innerHTML = \`<img src="\${imgPath}?t=\${Date.now()}" alt="Logo">\`;
      } else {
        headerSeal.innerHTML = \`<span id="header-seal-char">\${char}</span>\`;
        largeSeal.innerHTML = \`<span id="large-seal-char">\${char}</span>\`;
      }
    }

    function toggleLogoMode(val) {
      refreshLogoPreview();
    }

    function updateSealChar(val) {
      refreshLogoPreview();
    }

    function switchTab(tabId, el) {
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      el.classList.add('active');
    }

    async function uploadLogoImage(file) {
      if (!file) return;
      const statusEl = document.getElementById('logo-upload-status');
      statusEl.innerText = 'Uploading logo...';

      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload?file=logo.png', {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          statusEl.innerText = '✓ Logo updated';
          document.getElementById('brand-logoImage').value = '/imgs/logo.png';
          document.getElementById('brand-logoMode').value = 'image';
          refreshLogoPreview();
          renderPhotoGrid();
          showToast('Circular Logo image replaced live!');
        } else {
          statusEl.innerText = 'Upload failed';
        }
      } catch (err) {
        statusEl.innerText = 'Error: ' + err.message;
      }
    }

    async function uploadImage(targetFilename, key, file) {
      if (!file) return;
      const statusEl = document.getElementById('upload-status-' + key);
      const thumbEl = document.getElementById('thumb-' + key);
      statusEl.innerText = 'Uploading...';

      try {
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('/api/upload?file=' + encodeURIComponent(targetFilename), {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          statusEl.innerText = '✓ Replaced';
          if (thumbEl) thumbEl.src = '/img/' + targetFilename + '?t=' + Date.now();
          if (key === 'logo') {
            document.getElementById('brand-logoImage').value = '/imgs/' + targetFilename;
            refreshLogoPreview();
          }
          showToast('Image ' + targetFilename + ' updated live!');
        } else {
          statusEl.innerText = 'Upload failed';
        }
      } catch (err) {
        statusEl.innerText = 'Error: ' + err.message;
      }
    }

    async function saveAllChanges() {
      // Gather inputs
      SITE_DATA.brand = {
        name: document.getElementById('brand-name').value,
        city: document.getElementById('brand-city').value,
        eyebrow: document.getElementById('brand-eyebrow').value,
        logoMode: document.getElementById('brand-logoMode').value,
        logoText: document.getElementById('brand-logoText').value || 'C',
        logoImage: document.getElementById('brand-logoImage').value || '',
        introCircleImage: document.getElementById('brand-introCircleImage')?.value || '/imgs/intro_circle.jpg',
        logoSub: document.getElementById('brand-name').value,
        tagline: document.getElementById('brand-tagline').value,
        introCta: document.getElementById('brand-introCta').value
      };

      SITE_DATA.anthology = {
        sectionTag: document.getElementById('anthology-sectionTag').value,
        sectionTitle: document.getElementById('anthology-sectionTitle').value,
        sectionDesc: document.getElementById('anthology-sectionDesc').value
      };

      SITE_DATA.contact = {
        addressTitle: document.getElementById('contact-addressTitle').value,
        addressMain: document.getElementById('contact-addressMain').value,
        addressSub: document.getElementById('contact-addressSub').value,
        hoursWeekday: document.getElementById('contact-hoursWeekday').value,
        hoursWeekend: document.getElementById('contact-hoursWeekend').value,
        hoursNote: document.getElementById('contact-hoursNote').value,
        phone: document.getElementById('contact-phone').value,
        email: document.getElementById('contact-email').value,
        whatsappNumber: document.getElementById('contact-whatsappNumber').value,
        valetNote: document.getElementById('contact-valetNote').value,
        mapEmbedUrl: document.getElementById('contact-mapEmbedUrl').value
      };

      try {
        const res = await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(SITE_DATA)
        });

        if (res.ok) {
          showToast('✓ All changes saved and synced live!');
        } else {
          showToast('Error saving settings');
        }
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    function showToast(msg) {
      const t = document.getElementById('toast-msg');
      t.innerText = msg;
      t.style.display = 'block';
      setTimeout(() => { t.style.display = 'none'; }, 4000);
    }

    loadConfig();
  </script>
</body>
</html>`);
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[Admin Portal] Running on http://127.0.0.1:${PORT}`);
});
