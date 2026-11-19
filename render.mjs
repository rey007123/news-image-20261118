import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, "page.html");

// High-detail dot-matrix world map generator (64x28 grid)
const MAP_ROWS = [
  "................................................................",
  ".......111111...1111111......................3333...............",
  ".....111111111111111111....................333333333333333333...",
  "....111111111111111111....................333333333333333333333.",
  ".....111111111111111.....................33333333344444444444444",
  "......1111111111111......................33333333444444444444444",
  ".......11111111111.......................3333333444444444444444.",
  "........111111111.........................33.33222444444444444..",
  ".........1111111............................55522224444444444...",
  "..........111.11...........................555552222444444444...",
  "...........11..1..........................555555522244444444....",
  ".............111..........................5555555522.4444444....",
  "..............11111.......................55555555....44.444....",
  "...............1111111.....................5555555....4...44....",
  "...............111111111....................555555........444...",
  "................111111111...................555555.........444..",
  ".................11111111....................55555..........44..",
  ".................1111111.....................55555..............",
  "..................11111.......................5555...5...........",
  "..................1111........................555...5....6666...",
  "..................111..........................55.......666666..",
  "..................11....................................666666..",
  "..................11.....................................6666...",
  "..................1.........................................66..",
  "................................................................"
];
let mapDotsSvg = '<g opacity="0.55">';
for (let r = 0; r < MAP_ROWS.length; r++) {
  const row = MAP_ROWS[r];
  for (let c = 0; c < row.length; c++) {
    const ch = row[c];
    if (ch !== ".") {
      const cx = 14 + c * 4.65;
      const cy = 12 + r * 5.2;
      mapDotsSvg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1.65" fill="#7c7262"/>`;
    }
  }
}
mapDotsSvg += "</g>";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #f6f2e9;
    color: #141923;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #f6f2e9;
  }

  /* FULL-BLEED DARK NAVY MASTHEAD */
  .masthead {
    width: 1024px;
    height: 98px;
    background: #0c1b33;
    border-bottom: 3.5px solid #c9a24b;
    padding: 8px 18px 8px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .cal-box {
    width: 74px;
    height: 78px;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    flex-shrink: 0;
  }
  .cal-box .m {
    width: 100%;
    background: #b91c1c;
    color: #ffffff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    text-align: center;
    padding: 2px 0;
  }
  .cal-box .d {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 33px;
    font-weight: 900;
    color: #0c1b33;
    line-height: 1;
  }
  .cal-box .w {
    font-size: 9.5px;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.6px;
    padding-bottom: 4px;
  }
  .mast-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .mast-overline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.8px;
    color: #e6bc5a;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .mast-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 46px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.4px;
    line-height: 1.04;
  }
  .mast-sub {
    font-family: Georgia, "Times New Roman", serif;
    font-style: italic;
    font-size: 12.5px;
    color: #cbd5e1;
    margin-top: 3px;
  }

  /* CONTENT BODY */
  .body-wrap {
    flex: 1;
    padding: 9px 14px 6px 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;
  }

  /* ROW 1: 3 LARGE LEAD CARDS */
  .lead-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    height: 218px;
  }
  .lead-card {
    background: #fcfaf4;
    border: 1px solid #d5cbb8;
    border-top: 3.5px solid #c9a24b;
    border-radius: 3px;
    padding: 6px 8px 7px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .lead-art {
    width: 100%;
    height: 86px;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    border: 1px solid #d6cebe;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .lead-art svg {
    width: 100%;
    height: 69px;
    display: block;
  }
  .art-cap {
    height: 17px;
    background: #0c1b33;
    color: #f8fafc;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1.3px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }
  .lead-head-row {
    display: flex;
    gap: 8px;
    align-items: flex-start;
    margin-top: 4px;
  }
  .lead-badge {
    width: 30px;
    height: 54px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 27px;
    font-weight: 900;
    color: #ffffff;
    flex-shrink: 0;
  }
  .b-gold { background: linear-gradient(180deg, #d4a849, #a47922); }
  .b-silver { background: linear-gradient(180deg, #8b95a5, #5b6575); }
  .b-bronze { background: linear-gradient(180deg, #b87b4b, #875026); }

  .lead-title-col {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .meta-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.7px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .src-tag {
    color: #64748b;
    font-weight: 700;
    font-size: 9px;
  }
  .lead-h {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.12;
  }
  .lead-p {
    font-size: 11px;
    color: #334155;
    line-height: 1.28;
    margin-top: 3px;
  }

  /* ROWS 2 & 3: 8 MID CARDS (4x2) */
  .mid-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 9px;
    height: 158px;
  }
  .mid-card {
    background: #fcfaf4;
    border: 1px solid #d5cbb8;
    border-radius: 3px;
    padding: 5px 7px 6px 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mid-art {
    width: 100%;
    height: 55px;
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #dcd4c4;
  }
  .mid-art svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .mid-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 3px;
  }
  .mid-meta-left {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .num-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #ffffff;
    font-size: 9.5px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .mid-h {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 13.8px;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.13;
    margin-top: 2px;
  }
  .mid-p {
    font-size: 10.2px;
    color: #334155;
    line-height: 1.24;
    margin-top: 2px;
  }

  /* REGION COLORS */
  .c-as { color: #7e22ce; }
  .c-me { color: #b91c1c; }
  .c-eu { color: #1d4ed8; }
  .c-am { color: #15803d; }
  .c-af { color: #b45309; }
  .c-gl { color: #0f766e; }

  .bg-as { background: #7e22ce; }
  .bg-me { background: #b91c1c; }
  .bg-eu { background: #1d4ed8; }
  .bg-am { background: #15803d; }
  .bg-af { background: #b45309; }
  .bg-gl { background: #0f766e; }

  /* BOTTOM SECTION: MAP + STATS (LEFT) & 27 BRIEFS + DATE CHECK (RIGHT) */
  .bottom-row {
    display: grid;
    grid-template-columns: 332px 1fr;
    gap: 12px;
    height: 334px;
  }
  .left-col {
    background: #f2ece0;
    border: 1px solid #d5cbb8;
    border-radius: 3px;
    padding: 6px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .sec-hdr {
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 1.4px;
    color: #1e293b;
    text-transform: uppercase;
    border-bottom: 1.5px solid #0c1b33;
    padding-bottom: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .map-box {
    width: 100%;
    height: 162px;
    background: #eae3d4;
    border: 1px solid #d5cbb8;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }
  .map-box svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .kpi-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 10px;
    height: 128px;
  }
  .kpi-item {
    border-top: 2px solid #0c1b33;
    padding-top: 3px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .kpi-val {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 19px;
    font-weight: 900;
    color: #0c1b33;
    line-height: 1.05;
  }
  .kpi-lbl {
    font-size: 9.8px;
    color: #334155;
    line-height: 1.22;
    margin-top: 2px;
  }

  .right-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .briefs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 12px;
    margin-top: 2px;
  }
  .brief-col {
    display: flex;
    flex-direction: column;
  }
  .b-row {
    font-size: 10.3px;
    line-height: 1.35;
    color: #1e293b;
    padding: 1.6px 0;
    border-bottom: 1px solid #e2dac9;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .b-idx {
    font-weight: 800;
    font-size: 9.8px;
    margin-right: 4px;
    display: inline-block;
    width: 15px;
  }
  .b-lead {
    font-weight: 700;
    color: #0f172a;
  }

  /* DATE CHECK BAR */
  .date-check {
    background: #fdf2f2;
    border-left: 3.5px solid #b91c1c;
    border-top: 1px solid #e5c7c7;
    border-right: 1px solid #e5c7c7;
    border-bottom: 1px solid #e5c7c7;
    padding: 4px 8px;
    font-size: 9.5px;
    line-height: 1.28;
    color: #334155;
    margin-top: 3px;
  }
  .date-check strong {
    color: #b91c1c;
    font-weight: 800;
    letter-spacing: 0.6px;
    margin-right: 4px;
  }

  /* FOOTER */
  .footer {
    padding: 3px 14px 5px 14px;
    border-top: 1px solid #d5cbb8;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.2px;
    color: #475569;
    background: #f2ece0;
  }
</style>
</head>
<body>
<div class="page">

  <!-- MASTHEAD -->
  <div class="masthead">
    <div class="cal-box">
      <div class="m">NOV</div>
      <div class="d">18</div>
      <div class="w">WED · 2026</div>
    </div>
    <div class="mast-text">
      <div class="mast-overline">
        <span>THE DAY IN WORLD NEWS</span>
        <span>38 STORIES · 6 CONTINENTS · ONE PAGE</span>
      </div>
      <div class="mast-title">Wednesday 18 November 2026</div>
      <div class="mast-sub">Everything on this page happened, or was first reported, on Wednesday 18 November 2026.</div>
    </div>
  </div>

  <div class="body-wrap">

    <!-- ROW 1: 3 LEAD CARDS -->
    <div class="lead-grid">

      <!-- LEAD 1: SHENZHEN APEC -->
      <div class="lead-card">
        <div class="lead-art">
          <svg viewBox="0 0 310 69">
            <defs>
              <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#f5d0a9"/>
                <stop offset="100%" stop-color="#fdf2e9"/>
              </linearGradient>
            </defs>
            <rect width="310" height="69" fill="url(#sky1)"/>
            <!-- Terminal Building -->
            <rect x="172" y="12" width="130" height="44" fill="#d99b66" stroke="#b37440" stroke-width="1"/>
            <rect x="182" y="18" width="14" height="32" fill="#b37440"/>
            <rect x="204" y="18" width="14" height="32" fill="#b37440"/>
            <rect x="226" y="18" width="14" height="32" fill="#b37440"/>
            <!-- Tarmac & Red Carpet -->
            <rect x="0" y="54" width="310" height="15" fill="#cbd5e1"/>
            <polygon points="105,56 178,56 184,68 98,68" fill="#dc2626"/>
            <!-- Presidential Jet -->
            <path d="M12,38 L108,38 C118,38 124,42 126,46 L10,46 Z" fill="#ffffff" stroke="#64748b" stroke-width="1"/>
            <path d="M12,42 L123,42" stroke="#1d4ed8" stroke-width="2.5"/>
            <polygon points="12,38 24,22 36,38" fill="#1d4ed8"/>
            <polygon points="58,43 82,43 72,50 50,50" fill="#94a3b8"/>
            <!-- Stairs -->
            <polygon points="118,44 132,57 124,57 112,44" fill="#64748b"/>
            <!-- 3 Flags Badge -->
            <rect x="218" y="20" width="22" height="14" fill="#de2910"/>
            <circle cx="223" cy="25" r="2.2" fill="#ffde00"/>
            <rect x="245" y="20" width="22" height="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
            <rect x="245" y="20" width="22" height="3" fill="#b91c1c"/>
            <rect x="245" y="25" width="22" height="3" fill="#b91c1c"/>
            <rect x="245" y="30" width="22" height="4" fill="#b91c1c"/>
            <rect x="245" y="20" width="10" height="8" fill="#1e3a8a"/>
            <rect x="272" y="20" width="22" height="5" fill="#ffffff"/>
            <rect x="272" y="25" width="22" height="4.5" fill="#1d4ed8"/>
            <rect x="272" y="29.5" width="22" height="4.5" fill="#dc2626"/>
            <rect x="214" y="40" width="84" height="13" rx="3" fill="#0c1b33"/>
            <text x="256" y="49" fill="#ffffff" font-size="7.5" font-weight="800" text-anchor="middle">3-WAY TALKS · THU</text>
          </svg>
          <div class="art-cap">SHENZHEN · APEC LEADERS' WEEK</div>
        </div>
        <div class="lead-head-row">
          <div class="lead-badge b-gold">1</div>
          <div class="lead-title-col">
            <div class="meta-line"><span class="c-as">ASIA · SUMMIT</span><span class="src-tag">CNBC · CNN</span></div>
            <div class="lead-h">Xi welcomes Trump at Shenzhen's airport</div>
          </div>
        </div>
        <div class="lead-p">A rare honour from China's leader. Trump and Putin shake hands at the APEC banquet; their three-way talks with Xi are on Thursday.</div>
      </div>

      <!-- LEAD 2: BAHRAIN & KUWAIT DRONES -->
      <div class="lead-card">
        <div class="lead-art">
          <svg viewBox="0 0 310 69">
            <rect width="310" height="69" fill="#13233f"/>
            <rect x="0" y="54" width="310" height="15" fill="#1b3228"/>
            <!-- Radar Dome -->
            <path d="M26,54 A22,22 0 0,1 70,54 Z" fill="#e2e8f0"/>
            <rect x="22" y="51" width="52" height="4" fill="#94a3b8"/>
            <!-- Patriot Launcher -->
            <rect x="218" y="47" width="42" height="8" fill="#4d7c5b"/>
            <polygon points="212,42 246,27 251,36 217,50" fill="#6b9e78"/>
            <!-- Intercept Arcs & Bursts -->
            <path d="M58,42 Q98,16 124,22" fill="none" stroke="#eab308" stroke-width="1.5" stroke-dasharray="3,2"/>
            <path d="M225,32 Q196,18 184,26" fill="none" stroke="#eab308" stroke-width="1.5" stroke-dasharray="3,2"/>
            <!-- Explosion 1 -->
            <circle cx="125" cy="22" r="7" fill="#f59e0b" opacity="0.45"/>
            <circle cx="125" cy="22" r="3.5" fill="#fef08a"/>
            <!-- Explosion 2 -->
            <circle cx="182" cy="26" r="8" fill="#f59e0b" opacity="0.45"/>
            <circle cx="182" cy="26" r="4" fill="#fef08a"/>
            <!-- Drones -->
            <polygon points="116,18 130,22 120,25" fill="#94a3b8"/>
            <polygon points="175,22 189,26 179,29" fill="#94a3b8"/>
          </svg>
          <div class="art-cap">BAHRAIN · KUWAIT · THE GULF</div>
        </div>
        <div class="lead-head-row">
          <div class="lead-badge b-silver">2</div>
          <div class="lead-title-col">
            <div class="meta-line"><span class="c-me">MIDDLE EAST · IRAN WAR</span><span class="src-tag">AL JAZEERA</span></div>
            <div class="lead-h">Bahrain and Kuwait intercept Iran's drones</div>
          </div>
        </div>
        <div class="lead-p">Iran says it aimed at a US radar in Bahrain and Patriot batteries in Kuwait after a US strike on Qeshm. CENTCOM reports no damage.</div>
      </div>

      <!-- LEAD 3: VOYAGER 1 -->
      <div class="lead-card">
        <div class="lead-art">
          <svg viewBox="0 0 310 69">
            <rect width="310" height="69" fill="#091326"/>
            <circle cx="48" cy="14" r="1" fill="#fff"/>
            <circle cx="145" cy="11" r="1.2" fill="#fff"/>
            <circle cx="210" cy="18" r="1" fill="#fff"/>
            <circle cx="288" cy="14" r="1.2" fill="#fff"/>
            <!-- Earth -->
            <circle cx="28" cy="40" r="11" fill="#2563eb"/>
            <path d="M22,35 Q28,33 31,39 Q26,45 21,42 Z" fill="#22c55e"/>
            <text x="28" y="61" fill="#94a3b8" font-size="7.5" font-weight="700" text-anchor="middle">EARTH</text>
            <!-- Light-day beam -->
            <line x1="44" y1="40" x2="232" y2="40" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="5,3"/>
            <text x="138" y="33" fill="#fbbf24" font-size="9.5" font-weight="800" text-anchor="middle" letter-spacing="0.8">1 LIGHT-DAY</text>
            <text x="138" y="53" fill="#cbd5e1" font-size="8.5" text-anchor="middle">25.9 billion km</text>
            <!-- Voyager 1 Dish & Boom -->
            <ellipse cx="262" cy="36" rx="13" ry="6.5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="258" y="41" width="8" height="7" fill="#64748b"/>
            <line x1="262" y1="36" x2="288" y2="20" stroke="#cbd5e1" stroke-width="1.4"/>
            <line x1="258" y1="46" x2="236" y2="58" stroke="#cbd5e1" stroke-width="1.4"/>
            <line x1="266" y1="46" x2="285" y2="57" stroke="#cbd5e1" stroke-width="1.4"/>
            <text x="266" y="62" fill="#94a3b8" font-size="7.5" font-weight="700" text-anchor="middle">VOYAGER 1</text>
          </svg>
          <div class="art-cap">INTERSTELLAR SPACE · NASA</div>
        </div>
        <div class="lead-head-row">
          <div class="lead-badge b-bronze">3</div>
          <div class="lead-title-col">
            <div class="meta-line"><span class="c-gl">SPACE · SCIENCE</span><span class="src-tag">NASA</span></div>
            <div class="lead-h">Voyager 1 reaches one light-day from Earth</div>
          </div>
        </div>
        <div class="lead-p">NASA's probe is the first craft to get 25.9 billion km away, a record for any human-made object: a command sent today arrives tomorrow.</div>
      </div>

    </div>

    <!-- ROW 2: MID CARDS 4 TO 7 -->
    <div class="mid-grid">

      <!-- CARD 4: UKRAINE 141 DRONES -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#10203a"/>
            <!-- Pylon -->
            <path d="M24,52 L34,20 L44,52 M20,28 L48,28 M23,37 L45,37" stroke="#64748b" stroke-width="1.5" fill="none"/>
            <!-- Intercept arcs -->
            <path d="M74,48 Q98,26 116,18" stroke="#f59e0b" stroke-width="1.4" stroke-dasharray="3,2" fill="none"/>
            <circle cx="116" cy="18" r="4" fill="#fbbf24"/>
            <circle cx="148" cy="14" r="4" fill="#fbbf24"/>
            <!-- Badge -->
            <rect x="148" y="25" width="76" height="12" rx="2" fill="#1d4ed8"/>
            <text x="186" y="34" fill="#fff" font-size="7.5" font-weight="800" text-anchor="middle">141 FIRED</text>
            <rect x="148" y="39" width="76" height="12" rx="2" fill="#eab308"/>
            <text x="186" y="48" fill="#0f172a" font-size="7.5" font-weight="800" text-anchor="middle">126 DOWNED</text>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-eu">4</span><span class="c-eu">EUROPE · UKRAINE WAR</span></span>
          <span class="src-tag">AIR FORCE</span>
        </div>
        <div class="mid-h">Russia fires 141 drones at Ukraine; 126 downed</div>
        <div class="mid-p">Hits at seven sites overnight; attacks kill four in Donetsk region, its governor says.</div>
      </div>

      <!-- CARD 5: FED MINUTES -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#eef4ef"/>
            <!-- Fed Pillar Building -->
            <polygon points="14,22 44,10 74,22" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
            <rect x="18" y="22" width="52" height="26" fill="#f8fafc" stroke="#475569" stroke-width="1.2"/>
            <line x1="27" y1="22" x2="27" y2="48" stroke="#475569" stroke-width="1.5"/>
            <line x1="38" y1="22" x2="38" y2="48" stroke="#475569" stroke-width="1.5"/>
            <line x1="50" y1="22" x2="50" y2="48" stroke="#475569" stroke-width="1.5"/>
            <line x1="61" y1="22" x2="61" y2="48" stroke="#475569" stroke-width="1.5"/>
            <!-- Minutes Page -->
            <rect x="86" y="10" width="32" height="38" rx="2" fill="#fff" stroke="#64748b" stroke-width="1.2"/>
            <text x="102" y="19" fill="#0f172a" font-size="6" font-weight="800" text-anchor="middle">MINUTES</text>
            <line x1="91" y1="25" x2="113" y2="25" stroke="#94a3b8" stroke-width="1.2"/>
            <line x1="91" y1="31" x2="113" y2="31" stroke="#94a3b8" stroke-width="1.2"/>
            <line x1="91" y1="37" x2="108" y2="37" stroke="#94a3b8" stroke-width="1.2"/>
            <!-- Green Rate Up Arrow -->
            <polygon points="142,10 156,23 148,23 148,46 136,46 136,23 128,23" fill="#15803d"/>
            <text x="192" y="18" fill="#15803d" font-size="7.5" font-weight="800" text-anchor="middle">MORE</text>
            <text x="192" y="27" fill="#15803d" font-size="7.5" font-weight="800" text-anchor="middle">HIKES</text>
            <rect x="163" y="33" width="58" height="14" rx="2" fill="#b91c1c"/>
            <text x="192" y="43" fill="#fff" font-size="7.5" font-weight="800" text-anchor="middle">DOW -1.1%</text>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-am">5</span><span class="c-am">AMERICAS · MARKETS</span></span>
          <span class="src-tag">FED · AP</span>
        </div>
        <div class="mid-h">Fed minutes: almost all officials see more hikes</div>
        <div class="mid-p">A couple float a bigger December rise; the Dow falls 1.1%, the Nasdaq gains.</div>
      </div>

      <!-- CARD 6: CYCLONE AKVAN -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#1e3a4c"/>
            <!-- India East Coastline -->
            <polygon points="0,0 92,0 64,26 42,55 0,55" fill="#d6c7a9"/>
            <text x="34" y="15" fill="#7c5e3c" font-size="7.5" font-weight="800" text-anchor="middle">ODISHA</text>
            <!-- Cyclone Swirl -->
            <circle cx="168" cy="31" r="16" fill="none" stroke="#bae6fd" stroke-width="2.2" stroke-dasharray="14,5"/>
            <circle cx="168" cy="31" r="8" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-dasharray="8,4"/>
            <circle cx="168" cy="31" r="3" fill="#ffffff"/>
            <!-- Track Arrow -->
            <path d="M150,27 Q115,15 76,22" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,2"/>
            <polygon points="75,22 83,18 82,26" fill="#fbbf24"/>
            <text x="95" y="49" fill="#e2e8f0" font-size="7.5" font-weight="800" text-anchor="middle">LANDFALL 20 NOV</text>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-as">6</span><span class="c-as">ASIA · WEATHER</span></span>
          <span class="src-tag">IMD</span>
        </div>
        <div class="mid-h">Cyclone Akvan veers north toward Odisha</div>
        <div class="mid-p">Landfall due between Puri and Narsapur on 20 Nov; evacuations begin.</div>
      </div>

      <!-- CARD 7: SUDAN RSF DRONES -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#f5ead6"/>
            <text x="64" y="13" fill="#b91c1c" font-size="8" font-weight="800" text-anchor="middle">9 STRIKES · 37 KILLED</text>
            <!-- El Obeid Buildings -->
            <rect x="18" y="34" width="24" height="16" fill="#a68966"/>
            <rect x="48" y="30" width="26" height="20" fill="#a68966"/>
            <path d="M48,30 A13,9 0 0,1 74,30 Z" fill="#8c6f4e"/>
            <rect x="80" y="35" width="24" height="15" fill="#a68966"/>
            <rect x="110" y="32" width="28" height="18" fill="#a68966"/>
            <!-- Drone & Strike -->
            <polygon points="142,10 164,10 153,15" fill="#334155"/>
            <line x1="153" y1="16" x2="128" y2="31" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="3,2"/>
            <circle cx="128" cy="31" r="3.5" fill="#dc2626"/>
            <!-- Justice Scale -->
            <line x1="185" y1="22" x2="215" y2="18" stroke="#475569" stroke-width="1.5"/>
            <line x1="200" y1="16" x2="200" y2="48" stroke="#475569" stroke-width="1.5"/>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-af">7</span><span class="c-af">AFRICA · SUDAN WAR</span></span>
          <span class="src-tag">AMNESTY</span>
        </div>
        <div class="mid-h">Amnesty: RSF drones killed 37 in El Obeid</div>
        <div class="mid-p">It urges a war-crimes inquiry; the RSF blames Sudan's army for the deaths.</div>
      </div>

    </div>

    <!-- ROW 3: MID CARDS 8 TO 11 -->
    <div class="mid-grid">

      <!-- CARD 8: EU 45BN LOAN -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#162a4a"/>
            <!-- EU Stars Circle -->
            <circle cx="44" cy="27" r="17" fill="none" stroke="#facc15" stroke-width="2" stroke-dasharray="3,5.8"/>
            <!-- Euro Coins -->
            <circle cx="88" cy="24" r="6" fill="#eab308"/><text x="88" y="27" fill="#0f172a" font-size="7.5" font-weight="900" text-anchor="middle">€</text>
            <circle cx="110" cy="20" r="6" fill="#eab308"/><text x="110" y="23" fill="#0f172a" font-size="7.5" font-weight="900" text-anchor="middle">€</text>
            <circle cx="132" cy="24" r="6" fill="#eab308"/><text x="132" y="27" fill="#0f172a" font-size="7.5" font-weight="900" text-anchor="middle">€</text>
            <text x="110" y="45" fill="#cbd5e1" font-size="7.5" font-weight="700" text-anchor="middle">FOR 2027</text>
            <!-- Ukraine Flag -->
            <rect x="172" y="16" width="38" height="11" fill="#2563eb"/>
            <rect x="172" y="27" width="38" height="11" fill="#facc15"/>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-eu">8</span><span class="c-eu">EUROPE · UKRAINE AID</span></span>
          <span class="src-tag">EU</span>
        </div>
        <div class="mid-h">EU proposes a €45bn loan to fund Ukraine in 2027</div>
        <div class="mid-p">Two-thirds of a €70bn gap, repaid only once Russia pays reparations.</div>
      </div>

      <!-- CARD 9: UK INFLATION 3.6% -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#eef2f6"/>
            <!-- Shopping Basket -->
            <polygon points="22,26 68,26 61,46 29,46" fill="none" stroke="#334155" stroke-width="1.8"/>
            <line x1="34" y1="26" x2="41" y2="14" stroke="#334155" stroke-width="1.8"/>
            <line x1="56" y1="26" x2="49" y2="14" stroke="#334155" stroke-width="1.8"/>
            <line x1="39" y1="31" x2="39" y2="42" stroke="#334155" stroke-width="1.5"/>
            <line x1="45" y1="31" x2="45" y2="42" stroke="#334155" stroke-width="1.5"/>
            <line x1="51" y1="31" x2="51" y2="42" stroke="#334155" stroke-width="1.5"/>
            <!-- CPI Bars -->
            <text x="132" y="18" fill="#475569" font-size="8" font-weight="800" text-anchor="middle">3.5%</text>
            <rect x="118" y="22" width="28" height="26" fill="#94a3b8"/>
            <text x="132" y="38" fill="#fff" font-size="7" font-weight="700" text-anchor="middle">SEP</text>
            <text x="174" y="14" fill="#1d4ed8" font-size="8.5" font-weight="900" text-anchor="middle">3.6%</text>
            <rect x="160" y="17" width="28" height="31" fill="#2563eb"/>
            <text x="174" y="36" fill="#fff" font-size="7" font-weight="700" text-anchor="middle">OCT</text>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-eu">9</span><span class="c-eu">EUROPE · ECONOMY</span></span>
          <span class="src-tag">ONS</span>
        </div>
        <div class="mid-h">UK inflation climbs to 3.6%, a one-year high</div>
        <div class="mid-p">Fuel prices and an earlier tobacco tax rise pushed October CPI up from 3.5%.</div>
      </div>

      <!-- CARD 10: GAZA NUSEIRAT -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#efe6d5"/>
            <polygon points="0,0 56,0 38,55 0,55" fill="#93c5fd"/>
            <text x="20" y="28" fill="#1e3a8a" font-size="7.5" font-weight="800" text-anchor="middle">SEA</text>
            <!-- Nuseirat Buildings -->
            <rect x="74" y="16" width="16" height="16" fill="#c2b29b"/>
            <rect x="94" y="13" width="18" height="19" fill="#c2b29b"/>
            <rect x="116" y="18" width="14" height="14" fill="#c2b29b"/>
            <text x="96" y="44" fill="#574c3f" font-size="7.5" font-weight="800" text-anchor="middle">NUSEIRAT</text>
            <!-- Yellow Line -->
            <line x1="158" y1="0" x2="158" y2="55" stroke="#eab308" stroke-width="2.5"/>
            <text x="194" y="11" fill="#a16207" font-size="7" font-weight="800" text-anchor="middle">YELLOW LINE</text>
            <!-- Tank moving across -->
            <line x1="132" y1="27" x2="180" y2="27" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
            <rect x="182" y="23" width="26" height="9" rx="2" fill="#57534e"/>
            <rect x="172" y="25" width="14" height="3" fill="#57534e"/>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-me">10</span><span class="c-me">MIDDLE EAST · GAZA</span></span>
          <span class="src-tag">REUTERS</span>
        </div>
        <div class="mid-h">Israeli tanks roll into central Gaza near Nuseirat</div>
        <div class="mid-p">The army says it is destroying a tunnel; three are killed, hospitals say.</div>
      </div>

      <!-- CARD 11: JEFFRIES SPEAKER NOD -->
      <div class="mid-card">
        <div class="mid-art">
          <svg viewBox="0 0 230 55">
            <rect width="230" height="55" fill="#f1f5f2"/>
            <!-- Capitol Podium -->
            <rect x="18" y="22" width="40" height="26" fill="#fff" stroke="#334155" stroke-width="1.5"/>
            <path d="M29,22 A9,8 0 0,1 47,22 Z" fill="none" stroke="#334155" stroke-width="1.5"/>
            <!-- Caucus Dot Grid (251-11) -->
            <g fill="#15803d">
              <rect x="78" y="12" width="84" height="34" rx="2" fill="#dcfce7" stroke="#15803d" stroke-width="1"/>
              <line x1="82" y1="18" x2="158" y2="18" stroke="#15803d" stroke-width="2.5" stroke-dasharray="3,2"/>
              <line x1="82" y1="24" x2="158" y2="24" stroke="#15803d" stroke-width="2.5" stroke-dasharray="3,2"/>
              <line x1="82" y1="30" x2="158" y2="30" stroke="#15803d" stroke-width="2.5" stroke-dasharray="3,2"/>
              <line x1="82" y1="36" x2="158" y2="36" stroke="#15803d" stroke-width="2.5" stroke-dasharray="3,2"/>
              <line x1="82" y1="42" x2="142" y2="42" stroke="#15803d" stroke-width="2.5" stroke-dasharray="3,2"/>
            </g>
            <text x="196" y="27" fill="#0f172a" font-size="11.5" font-weight="900" text-anchor="middle">251–11</text>
            <text x="196" y="38" fill="#475569" font-size="6.8" font-weight="800" text-anchor="middle">CAUCUS VOTE</text>
          </svg>
        </div>
        <div class="mid-meta">
          <span class="mid-meta-left"><span class="num-dot bg-am">11</span><span class="c-am">AMERICAS · US POLITICS</span></span>
          <span class="src-tag">NPR · CBS</span>
        </div>
        <div class="mid-h">Jeffries wins Democrats' nod for House Speaker</div>
        <div class="mid-p">A 251–11 caucus vote puts him on course to be the first Black Speaker in January.</div>
      </div>

    </div>

    <!-- BOTTOM SECTION -->
    <div class="bottom-row">

      <!-- LEFT COLUMN: DOTTED MAP + 4 KPI CARDS -->
      <div class="left-col">
        <div class="sec-hdr">
          <span>WHERE IT HAPPENED</span>
          <span style="font-size:8.5px; color:#475569; font-weight:700;">PINS 1–11 · DOTS 12–38</span>
        </div>
        <div class="map-box">
          <svg viewBox="0 0 314 162">
            <!-- Dot-Matrix World Atlas Continents -->
            ${mapDotsSvg}
            <!-- Brief Dots -->
            <g opacity="0.85">
              <circle cx="58" cy="40" r="2.2" fill="#15803d"/>
              <circle cx="84" cy="96" r="2.2" fill="#15803d"/>
              <circle cx="78" cy="112" r="2.2" fill="#15803d"/>
              <circle cx="88" cy="126" r="2.2" fill="#15803d"/>
              <circle cx="148" cy="36" r="2.2" fill="#1d4ed8"/>
              <circle cx="164" cy="42" r="2.2" fill="#1d4ed8"/>
              <circle cx="152" cy="78" r="2.2" fill="#b45309"/>
              <circle cx="174" cy="94" r="2.2" fill="#b45309"/>
              <circle cx="162" cy="124" r="2.2" fill="#b45309"/>
              <circle cx="230" cy="58" r="2.2" fill="#7e22ce"/>
              <circle cx="268" cy="46" r="2.2" fill="#7e22ce"/>
              <circle cx="264" cy="68" r="2.2" fill="#7e22ce"/>
              <circle cx="272" cy="122" r="2.2" fill="#0f766e"/>
            </g>
            <!-- Numbered Pins 1-11 -->
            <g font-size="7.5" font-weight="800" fill="#fff" text-anchor="middle">
              <!-- 11 US House -->
              <circle cx="74" cy="52" r="6" fill="#15803d"/><text x="74" y="54.5">11</text>
              <!-- 5 US Fed -->
              <circle cx="62" cy="60" r="6" fill="#15803d"/><text x="62" y="62.5">5</text>
              <!-- 9 UK -->
              <circle cx="138" cy="34" r="6" fill="#1d4ed8"/><text x="138" y="36.5">9</text>
              <!-- 8 EU -->
              <circle cx="152" cy="30" r="6" fill="#1d4ed8"/><text x="152" y="32.5">8</text>
              <!-- 4 Ukraine -->
              <circle cx="175" cy="34" r="6" fill="#1d4ed8"/><text x="175" y="36.5">4</text>
              <!-- 10 Gaza -->
              <circle cx="176" cy="58" r="6" fill="#b91c1c"/><text x="176" y="60.5">10</text>
              <!-- 2 Gulf -->
              <circle cx="195" cy="64" r="6" fill="#b91c1c"/><text x="195" y="66.5">2</text>
              <!-- 7 Sudan -->
              <circle cx="168" cy="76" r="6" fill="#b45309"/><text x="168" y="78.5">7</text>
              <!-- 6 Odisha -->
              <circle cx="226" cy="72" r="6" fill="#7e22ce"/><text x="226" y="74.5">6</text>
              <!-- 1 Shenzhen -->
              <circle cx="254" cy="58" r="6" fill="#7e22ce"/><text x="254" y="60.5">1</text>
              <!-- 3 Voyager 1 -->
              <circle cx="164" cy="148" r="6" fill="#0f766e"/><text x="164" y="150.5">3</text>
              <line x1="172" y1="148" x2="212" y2="148" stroke="#0f766e" stroke-width="1.2" stroke-dasharray="3,2"/>
              <text x="192" y="143" fill="#0f766e" font-size="6.8" font-weight="700">to Voyager 1</text>
            </g>
            <!-- Mini Legend -->
            <rect x="4" y="102" width="58" height="56" rx="2" fill="#f6f2e9" opacity="0.92"/>
            <g font-size="6.8" fill="#334155" font-weight="700">
              <circle cx="10" cy="110" r="2.5" fill="#7e22ce"/><text x="16" y="112">Asia-Pacific</text>
              <circle cx="10" cy="118" r="2.5" fill="#b91c1c"/><text x="16" y="120">Middle East</text>
              <circle cx="10" cy="126" r="2.5" fill="#1d4ed8"/><text x="16" y="128">Europe</text>
              <circle cx="10" cy="134" r="2.5" fill="#b45309"/><text x="16" y="136">Africa</text>
              <circle cx="10" cy="142" r="2.5" fill="#15803d"/><text x="16" y="144">Americas</text>
              <circle cx="10" cy="150" r="2.5" fill="#0f766e"/><text x="16" y="152">Global · space</text>
            </g>
          </svg>
        </div>

        <!-- 4 KPI STAT CARDS -->
        <div class="kpi-grid">
          <div class="kpi-item">
            <div class="kpi-val">$3,792</div>
            <div class="kpi-lbl">Gold an ounce, its lowest in more than a year</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val">2,230</div>
            <div class="kpi-lbl">Sudan civilians killed in 2026, by the UN's count</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val">25.9bn km</div>
            <div class="kpi-lbl">Voyager 1 from Earth: one light-day</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val">14.9m</div>
            <div class="kpi-lbl">GTA VI digital pre-orders, Sensor Tower estimate</div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: 27 BRIEFS (12 TO 38) + DATE CHECK -->
      <div class="right-col">
        <div>
          <div class="sec-hdr">
            <span>ALSO ON WEDNESDAY 18 NOVEMBER</span>
            <span style="font-size:8.5px; color:#475569; font-weight:700;">27 MORE VERIFIED STORIES</span>
          </div>
          <div class="briefs-grid">
            <div class="brief-col">
              <div class="b-row"><span class="b-idx c-as">12</span><span class="b-lead">Manila:</span> Trump hails 'biggest' Philippine trade deal</div>
              <div class="b-row"><span class="b-idx c-as">13</span><span class="b-lead">Quad</span> leaders meet in Manila, first in over two years</div>
              <div class="b-row"><span class="b-idx c-as">14</span><span class="b-lead">Japan:</span> Takaichi makes first China visit as PM</div>
              <div class="b-row"><span class="b-idx c-am">15</span><span class="b-lead">Canada–China:</span> Carney and Xi agree tariff relief</div>
              <div class="b-row"><span class="b-idx c-as">16</span><span class="b-lead">South Korea:</span> Lee seeks Xi's help on the North</div>
              <div class="b-row"><span class="b-idx c-as">17</span><span class="b-lead">Bangladesh:</span> police tear-gas garment wage protests</div>
              <div class="b-row"><span class="b-idx c-me">18</span><span class="b-lead">Riyadh:</span> coalition downs a Houthi cruise missile</div>
              <div class="b-row"><span class="b-idx c-gl">19</span><span class="b-lead">Australia</span> sanctions settler leader Daniella Weiss</div>
              <div class="b-row"><span class="b-idx c-eu">20</span><span class="b-lead">Germany</span> pledges air defences, F-16 arms to Kyiv</div>
              <div class="b-row"><span class="b-idx c-eu">21</span><span class="b-lead">Kosovo:</span> ex-president Thaçi gets 17 months</div>
              <div class="b-row"><span class="b-idx c-eu">22</span><span class="b-lead">Russia:</span> 19 die in Kemerovo plane crash, media say</div>
              <div class="b-row"><span class="b-idx c-eu">23</span><span class="b-lead">UK</span> hands US Army spy suspect to US custody</div>
              <div class="b-row"><span class="b-idx c-af">24</span><span class="b-lead">Mozambique:</span> opposition leader Mondlane on trial</div>
              <div class="b-row"><span class="b-idx c-af">25</span><span class="b-lead">Guinea</span> jails 224 over illegal gold mining</div>
            </div>
            <div class="brief-col">
              <div class="b-row"><span class="b-idx c-af">26</span><span class="b-lead">Mauritius</span> sets UK a December Chagos deadline</div>
              <div class="b-row"><span class="b-idx c-af">27</span><span class="b-lead">Ethiopia–Eritrea:</span> artillery fire near Badme</div>
              <div class="b-row"><span class="b-idx c-af">28</span><span class="b-lead">South Africa</span> reprimands Nigeria's new envoy</div>
              <div class="b-row"><span class="b-idx c-af">29</span><span class="b-lead">DR Congo:</span> Ebola adds 400–500 cases a week, WHO</div>
              <div class="b-row"><span class="b-idx c-am">30</span><span class="b-lead">Anthropic</span> prices IPO at $83, above its range</div>
              <div class="b-row"><span class="b-idx c-am">31</span><span class="b-lead">Rubio:</span> no sign of cyberattack behind outages</div>
              <div class="b-row"><span class="b-idx c-am">32</span><span class="b-lead">Venezuela:</span> unions call 24-hour strike over pay</div>
              <div class="b-row"><span class="b-idx c-am">33</span><span class="b-lead">Colombia:</span> economy shrinks 0.8% in Q3</div>
              <div class="b-row"><span class="b-idx c-am">34</span><span class="b-lead">Paraguay:</span> attorney general quits before impeachment</div>
              <div class="b-row"><span class="b-idx c-am">35</span><span class="b-lead">Peru:</span> Tumbes River passes red alert</div>
              <div class="b-row"><span class="b-idx c-gl">36</span><span class="b-lead">GTA VI</span> goes on sale, with New Zealand first</div>
              <div class="b-row"><span class="b-idx c-gl">37</span><span class="b-lead">COP31:</span> ministers weigh a divided draft in Antalya</div>
              <div class="b-row"><span class="b-idx c-eu">38</span><span class="b-lead">FIFA:</span> France's Diallo to challenge Infantino</div>
            </div>
          </div>
        </div>

        <!-- DATE CHECK BOX -->
        <div class="date-check">
          <strong>DATE CHECK</strong> Left out as Tuesday 17 November news: Nvidia's results · the AP's Alaska Senate call · the Board of Peace's Gaza report · the Knesset speaker vote · Mongolia's president's offer to quit · the Kerch Bridge collapse.
        </div>
      </div>

    </div>

  </div>

  <!-- FOOTER -->
  <div class="footer">
    <span>All 38 stories happened, or were first reported, on Wednesday 18 November 2026; claims are attributed. Original drawings.</span>
    <span>Sources: AP · Reuters · AFP · CNN · CNBC · NPR · Fed · ONS · IMD · NASA · Amnesty</span>
  </div>

</div>
</body>
</html>`;

writeFileSync(htmlPath, html, "utf8");
console.log("Wrote page.html for Wednesday 18 November 2026 v2");
