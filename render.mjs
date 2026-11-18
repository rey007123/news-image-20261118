import { writeFileSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(here, "page.html");
const pngPath = resolve(here, "entry.png");

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
    background: #fcfaf5;
    color: #111827;
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 8px 12px 6px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* MASTHEAD */
  .masthead {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-bottom: 2.5px solid #0f172a;
    padding-bottom: 5px;
    gap: 10px;
  }
  .date-badge {
    width: 68px;
    background: #0f172a;
    color: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3px 4px;
    flex-shrink: 0;
    border: 1.5px solid #0f172a;
  }
  .date-badge .m {
    background: #dc2626;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 1px;
    width: 100%;
    text-align: center;
    border-radius: 2px;
    padding: 1px 0;
  }
  .date-badge .d {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 26px;
    font-weight: 900;
    line-height: 1.05;
    margin-top: 1px;
  }
  .date-badge .y {
    font-size: 8.5px;
    font-weight: 700;
    color: #cbd5e1;
    letter-spacing: 0.6px;
  }
  .mast-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .kicker-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    color: #334155;
  }
  .kicker-row .left-k { color: #b91c1c; }
  .kicker-row .right-k { color: #0f172a; }
  .title-h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 45px;
    font-weight: 900;
    line-height: 0.98;
    letter-spacing: -0.8px;
    color: #0f172a;
    text-align: center;
    margin: 1px 0 2px 0;
  }
  .region-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3px;
    height: 14px;
  }
  .r-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.5px;
    border-radius: 2px;
    text-transform: uppercase;
  }

  /* COLORS BY REGION */
  .bg-me { background: #dc2626; }
  .bg-as { background: #d97706; }
  .bg-am { background: #16a34a; }
  .bg-eu { background: #2563eb; }
  .bg-af { background: #9333ea; }
  .bg-gl { background: #0d9488; }

  .tx-me { color: #dc2626; }
  .tx-as { color: #b45309; }
  .tx-am { color: #15803d; }
  .tx-eu { color: #1d4ed8; }
  .tx-af { color: #7e22ce; }
  .tx-gl { color: #0f766e; }

  .bd-me { border-top: 3px solid #dc2626; }
  .bd-as { border-top: 3px solid #d97706; }
  .bd-am { border-top: 3px solid #16a34a; }
  .bd-eu { border-top: 3px solid #2563eb; }
  .bd-af { border-top: 3px solid #9333ea; }
  .bd-gl { border-top: 3px solid #0d9488; }

  /* ROW 1: 3 LEAD CARDS */
  .row-lead {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    height: 222px;
  }
  .card {
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 3px;
    padding: 4px 6px 5px 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  }
  .art-lead {
    width: 100%;
    height: 86px;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 4px;
    border: 1px solid #e5e7eb;
    flex-shrink: 0;
  }
  .art-mid {
    width: 100%;
    height: 60px;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 3px;
    border: 1px solid #e5e7eb;
    flex-shrink: 0;
  }
  .meta-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8.2px;
    font-weight: 800;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .meta-left {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .num-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    color: #fff;
    font-size: 8.5px;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .src-tag {
    font-size: 7.5px;
    font-weight: 700;
    color: #64748b;
  }
  .h-lead {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 14.2px;
    font-weight: 800;
    line-height: 1.13;
    color: #0f172a;
    margin-bottom: 3px;
  }
  .p-lead {
    font-size: 9.7px;
    line-height: 1.24;
    color: #334155;
  }

  /* ROW 2 & ROW 3: 5 MID CARDS EACH */
  .row-mid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    height: 196px;
  }
  .h-mid {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11.7px;
    font-weight: 800;
    line-height: 1.12;
    color: #0f172a;
    margin-bottom: 2.5px;
  }
  .p-mid {
    font-size: 8.7px;
    line-height: 1.21;
    color: #334155;
  }

  /* ROW 4: MAP + 35 BRIEFS */
  .row-bottom {
    display: grid;
    grid-template-columns: 332px 1fr;
    gap: 8px;
    height: 266px;
    border-top: 2px solid #0f172a;
    padding-top: 4px;
  }
  .sec-head {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 2px;
    margin-bottom: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sec-head span.sub {
    font-size: 7.8px;
    font-weight: 700;
    color: #475569;
  }
  .map-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .map-box {
    width: 100%;
    height: 162px;
    background: #e0f2fe;
    border: 1px solid #bae6fd;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
  }
  .legend-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 7.8px;
    font-weight: 700;
    color: #334155;
    margin: 2px 0;
    align-items: center;
  }
  .leg-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 2px;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 3px;
    padding: 3px 4px;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  .stat-val {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12px;
    font-weight: 900;
    color: #0f172a;
    line-height: 1.05;
  }
  .stat-lbl {
    font-size: 7.2px;
    line-height: 1.12;
    color: #475569;
    font-weight: 600;
  }

  /* BRIEFS */
  .briefs-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .briefs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 8px;
    row-gap: 1.6px;
  }
  .b-line {
    font-size: 8.2px;
    line-height: 1.21;
    color: #1e293b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 3px;
  }
  .b-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 13px;
    height: 10.5px;
    border-radius: 2px;
    color: #fff;
    font-size: 7.3px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .b-loc {
    font-weight: 800;
    color: #0f172a;
  }

  /* FOOTER & DATE VERIFICATION */
  .date-verify {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-left: 3.5px solid #dc2626;
    border-radius: 2px;
    padding: 2.5px 6px;
    font-size: 7.8px;
    line-height: 1.2;
    color: #7f1d1d;
  }
  .date-verify strong {
    color: #991b1b;
    font-weight: 900;
    letter-spacing: 0.3px;
  }
  .footer-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 7.6px;
    font-weight: 600;
    color: #475569;
    border-top: 1px solid #cbd5e1;
    padding-top: 2px;
  }
</style>
</head>
<body>
<div class="page">

  <!-- MASTHEAD -->
  <div class="masthead">
    <div class="date-badge">
      <div class="m">NOV 2026</div>
      <div class="d">18</div>
      <div class="y">WEDNESDAY</div>
    </div>
    <div class="mast-main">
      <div class="kicker-row">
        <span class="left-k">THE DAY IN WORLD NEWS · GLOBAL EDITION</span>
        <span>EVERY STORY HAPPENED OR WAS FIRST REPORTED ON 18 NOV 2026</span>
        <span class="right-k">49 STORIES · 6 CONTINENTS · ONE PAGE</span>
      </div>
      <div class="title-h1">Wednesday 18 November 2026</div>
      <div class="region-strip">
        <div class="r-pill bg-me">MIDDLE EAST · 8 STORIES</div>
        <div class="r-pill bg-as">ASIA-PACIFIC · 12 STORIES</div>
        <div class="r-pill bg-am">AMERICAS · 10 STORIES</div>
        <div class="r-pill bg-eu">EUROPE · 9 STORIES</div>
        <div class="r-pill bg-af">AFRICA · 5 STORIES</div>
        <div class="r-pill bg-gl">GLOBAL · SPACE &amp; CLIMATE · 5</div>
      </div>
    </div>
  </div>

  <!-- ROW 1: 3 LEAD STORIES -->
  <div class="row-lead">
    <!-- CARD 1: MIDDLE EAST -->
    <div class="card bd-me">
      <div class="art-lead">
        <svg viewBox="0 0 310 86" width="100%" height="100%">
          <rect width="310" height="86" fill="#bae6fd"/>
          <!-- Iran landmass top/right -->
          <path d="M110,0 L310,0 L310,55 L265,50 L235,62 L195,46 L145,42 L115,18 Z" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
          <!-- Arabian peninsula bottom/left -->
          <path d="M0,0 L95,0 L108,24 L132,52 L175,65 L225,75 L255,64 L310,72 L310,86 L0,86 Z" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>
          <!-- Bahrain & Qeshm islands -->
          <circle cx="148" cy="56" r="4" fill="#fbbf24" stroke="#b45309"/>
          <ellipse cx="242" cy="56" rx="8" ry="3.5" fill="#fcd34d" stroke="#b45309"/>
          <!-- Drone trajectories from Iran to Kuwait & Bahrain -->
          <path d="M195,22 Q145,12 88,26" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,2"/>
          <path d="M215,28 Q180,38 150,53" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="4,2"/>
          <!-- Intercept bursts -->
          <polygon points="88,20 90,24 95,24 91,27 93,32 88,29 83,32 85,27 81,24 86,24" fill="#ef4444" stroke="#fff" stroke-width="0.6"/>
          <polygon points="150,47 152,51 157,51 153,54 155,59 150,56 145,59 147,54 143,51 148,51" fill="#ef4444" stroke="#fff" stroke-width="0.6"/>
          <!-- Hormuz Tanker -->
          <g transform="translate(238,63)">
            <polygon points="0,6 28,6 24,11 4,11" fill="#1e293b"/>
            <rect x="6" y="2" width="12" height="4" fill="#475569"/>
            <circle cx="19" cy="4" r="4.5" fill="#f97316"/>
            <circle cx="19" cy="4" r="2.2" fill="#fef08a"/>
          </g>
          <!-- Labels -->
          <text x="14" y="15" font-size="8" font-weight="900" fill="#0f172a">KUWAIT</text>
          <text x="14" y="24" font-size="6.8" font-weight="700" fill="#475569">Ali Al Salem Base</text>
          <text x="208" y="16" font-size="8.5" font-weight="900" fill="#7c2d12">IRAN</text>
          <text x="108" y="72" font-size="7.5" font-weight="800" fill="#0f172a">BAHRAIN</text>
          <text x="248" y="48" font-size="7" font-weight="800" fill="#991b1b">QESHM</text>
          <text x="228" y="82" font-size="7.2" font-weight="900" fill="#dc2626">HORMUZ · SHIP HIT</text>
          <rect x="70" y="34" width="56" height="11" rx="2" fill="#0f172a"/>
          <text x="98" y="42" font-size="6.8" font-weight="800" fill="#fff" text-anchor="middle">INTERCEPTED</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-me">1</span><span class="tx-me">MIDDLE EAST · IRAN WAR</span></div>
        <span class="src-tag">REUTERS · AL JAZEERA · CENTCOM</span>
      </div>
      <div class="h-lead">Kuwait, Bahrain intercept Iranian drones aimed at US bases; tanker hit in Hormuz</div>
      <div class="p-lead">Iran says it targeted US radar in Bahrain and Patriot batteries at Kuwait's Ali Al Salem base after Tuesday's US strike on Qeshm; CENTCOM reports no US damage. ADNOC says its ship was hit near Hormuz (1 missing, 11 injured).</div>
    </div>

    <!-- CARD 2: ASIA APEC -->
    <div class="card bd-as">
      <div class="art-lead">
        <svg viewBox="0 0 310 86" width="100%" height="100%">
          <rect width="310" height="86" fill="#eff6ff"/>
          <!-- Skyline silhouette -->
          <rect x="15" y="34" width="16" height="36" fill="#cbd5e1"/>
          <rect x="35" y="22" width="20" height="48" fill="#cbd5e1"/>
          <rect x="60" y="40" width="18" height="30" fill="#cbd5e1"/>
          <rect x="255" y="25" width="18" height="45" fill="#cbd5e1"/>
          <rect x="278" y="36" width="18" height="34" fill="#cbd5e1"/>
          <rect x="0" y="68" width="310" height="18" fill="#e2e8f0"/>
          <!-- Red carpet -->
          <polygon points="105,86 138,68 172,68 205,86" fill="#dc2626"/>
          <!-- Plane nose left -->
          <path d="M0,42 L72,42 C86,42 96,48 96,53 L0,53 Z" fill="#ffffff" stroke="#64748b" stroke-width="1.2"/>
          <rect x="0" y="48" width="88" height="3" fill="#2563eb"/>
          <path d="M68,44 L82,44 L86,47 L68,47 Z" fill="#0f172a"/>
          <!-- Summit table & leaders -->
          <rect x="112" y="49" width="86" height="14" rx="3" fill="#b45309"/>
          <!-- 3 Leaders -->
          <circle cx="130" cy="36" r="5.5" fill="#1e293b"/>
          <rect x="122" y="42" width="16" height="8" rx="2" fill="#1e293b"/>
          <circle cx="155" cy="34" r="5.5" fill="#1e293b"/>
          <rect x="147" y="40" width="16" height="9" rx="2" fill="#1e3a8a"/>
          <circle cx="180" cy="36" r="5.5" fill="#1e293b"/>
          <rect x="172" y="42" width="16" height="8" rx="2" fill="#334155"/>
          <!-- 3 Flags: China, USA, Russia -->
          <!-- China -->
          <rect x="208" y="24" width="26" height="17" fill="#dc2626" stroke="#fff" stroke-width="0.8"/>
          <circle cx="214" cy="30" r="2.2" fill="#facc15"/>
          <!-- USA -->
          <rect x="238" y="24" width="26" height="17" fill="#dc2626" stroke="#fff" stroke-width="0.8"/>
          <rect x="238" y="27" width="26" height="2.5" fill="#fff"/>
          <rect x="238" y="32" width="26" height="2.5" fill="#fff"/>
          <rect x="238" y="37" width="26" height="2.5" fill="#fff"/>
          <rect x="238" y="24" width="12" height="9" fill="#1d4ed8"/>
          <!-- Russia -->
          <rect x="268" y="24" width="26" height="17" fill="#fff" stroke="#94a3b8" stroke-width="0.6"/>
          <rect x="268" y="29.6" width="26" height="5.6" fill="#1d4ed8"/>
          <rect x="268" y="35.2" width="26" height="5.8" fill="#dc2626"/>
          <text x="251" y="51" font-size="7.2" font-weight="800" fill="#0f172a" text-anchor="middle">XI · TRUMP · PUTIN</text>
          <rect x="8" y="7" width="96" height="13" rx="2" fill="#0f172a"/>
          <text x="56" y="16" font-size="7.5" font-weight="800" fill="#fff" text-anchor="middle">APEC · SHENZHEN</text>
          <rect x="208" y="56" width="88" height="12" rx="2" fill="#d97706"/>
          <text x="252" y="64.5" font-size="7.2" font-weight="800" fill="#fff" text-anchor="middle">3-WAY TALKS THU</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-as">2</span><span class="tx-as">ASIA · APEC DIPLOMACY</span></div>
        <span class="src-tag">REUTERS · AP · CNBC</span>
      </div>
      <div class="h-lead">Xi greets Trump on Shenzhen tarmac as APEC opens on eve of Putin summit</div>
      <div class="p-lead">Xi Jinping gives Trump a rare airport welcome as 21 Pacific economies convene. Putin joins Xi's banquet toast after vowing to lead a "multipolar world"; Trump–Xi talks and a trilateral with Putin are set for Thursday.</div>
    </div>

    <!-- CARD 3: GLOBAL COP31 -->
    <div class="card bd-gl">
      <div class="art-lead">
        <svg viewBox="0 0 310 86" width="100%" height="100%">
          <rect width="310" height="86" fill="#ecfdf5"/>
          <!-- Document: COP31 Draft -->
          <rect x="14" y="10" width="88" height="66" rx="3" fill="#ffffff" stroke="#0f766e" stroke-width="1.4"/>
          <text x="58" y="23" font-size="8" font-weight="900" fill="#0f172a" text-anchor="middle">COP31 DRAFT</text>
          <text x="58" y="32" font-size="6.8" font-weight="700" fill="#64748b" text-anchor="middle">18 pages · Australia</text>
          <line x1="22" y1="38" x2="94" y2="38" stroke="#cbd5e1" stroke-width="1.5"/>
          <line x1="22" y1="44" x2="86" y2="44" stroke="#cbd5e1" stroke-width="1.5"/>
          <rect x="20" y="51" width="76" height="16" rx="2" fill="#fef2f2" stroke="#dc2626" stroke-width="1.2"/>
          <text x="58" y="61.5" font-size="7.2" font-weight="900" fill="#dc2626" text-anchor="middle">FOSSIL PHASE-OUT</text>
          <!-- Center split badges -->
          <rect x="112" y="12" width="90" height="22" rx="3" fill="#0f766e"/>
          <text x="157" y="22" font-size="7.2" font-weight="800" fill="#fff" text-anchor="middle">NET ZERO 2030</text>
          <text x="157" y="30" font-size="6.5" font-weight="600" fill="#ccfbf1" text-anchor="middle">for wealthy nations</text>
          <rect x="112" y="38" width="90" height="22" rx="3" fill="#1e3a8a"/>
          <text x="157" y="48" font-size="7.2" font-weight="800" fill="#fff" text-anchor="middle">EU: "UNTENABLE"</text>
          <text x="157" y="56" font-size="6.5" font-weight="600" fill="#dbeafe" text-anchor="middle">Hoekstra warns</text>
          <text x="157" y="73" font-size="7.2" font-weight="800" fill="#0f766e" text-anchor="middle">ANTALYA, TÜRKİYE</text>
          <!-- Right: 35x35 pledge globe -->
          <circle cx="256" cy="36" r="22" fill="#86efac" stroke="#15803d" stroke-width="1.5"/>
          <path d="M242,26 Q254,32 248,46 M262,20 Q270,34 264,50" fill="none" stroke="#15803d" stroke-width="1.5"/>
          <text x="256" y="39" font-size="11" font-weight="900" fill="#064e3b" text-anchor="middle">35×35</text>
          <rect x="214" y="62" width="84" height="14" rx="2" fill="#15803d"/>
          <text x="256" y="71.5" font-size="7.2" font-weight="800" fill="#fff" text-anchor="middle">75 NATIONS BACK</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-gl">3</span><span class="tx-gl">GLOBAL · CLIMATE · COP31</span></div>
        <span class="src-tag">REUTERS · ANADOLU</span>
      </div>
      <div class="h-lead">COP31 splits on fossil phase-out draft; 75 nations back "35×35" power goal</div>
      <div class="p-lead">Co-host Australia's 18-page draft in Antalya seeks net zero by 2030 in rich nations (EU envoy Hoekstra calls it untenable). Meanwhile 75 countries sign Türkiye's "35×35" goal: 35% clean electricity in energy use by 2035.</div>
    </div>
  </div>

  <!-- ROW 2: 5 ILLUSTRATED CARDS (4 TO 8) -->
  <div class="row-mid">
    <!-- CARD 4: US CONGRESS -->
    <div class="card bd-am">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#f0fdf4"/>
          <!-- Capitol dome -->
          <path d="M16,52 L54,52 L54,42 L16,42 Z" fill="#1e293b"/>
          <path d="M22,42 C22,26 48,26 48,42 Z" fill="#334155"/>
          <line x1="35" y1="16" x2="35" y2="27" stroke="#1e293b" stroke-width="2"/>
          <!-- Senate bar -->
          <text x="70" y="16" font-size="8.5" font-weight="900" fill="#1d4ed8">56 DEM</text>
          <text x="140" y="16" font-size="8.5" font-weight="900" fill="#dc2626">44 REP</text>
          <rect x="70" y="20" width="60" height="8" fill="#2563eb"/>
          <rect x="130" y="20" width="44" height="8" fill="#dc2626"/>
          <text x="122" y="38" font-size="7.5" font-weight="800" fill="#15803d" text-anchor="middle">ALASKA CALL · +9 SEATS</text>
          <rect x="70" y="43" width="104" height="12" rx="2" fill="#15803d"/>
          <text x="122" y="51.5" font-size="7.2" font-weight="800" fill="#fff" text-anchor="middle">JEFFRIES 251/262 SPEAKER</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-am">4</span><span class="tx-am">AMERICAS · US POLITICS</span></div>
        <span class="src-tag">AP</span>
      </div>
      <div class="h-mid">Peltola wins Alaska for 56–44 Senate; House Democrats pick Jeffries</div>
      <div class="p-mid">AP calls Alaska (144,302 to Sullivan's 131,844), a 9th Democratic gain (most since 1958). House Democrats vote 251–262 to nominate Hakeem Jeffries for Speaker.</div>
    </div>

    <!-- CARD 5: UKRAINE WAR & EU LOAN -->
    <div class="card bd-eu">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#eff6ff"/>
          <!-- Pylon & drones -->
          <path d="M26,54 L34,26 L42,54 M28,38 L40,38 M25,46 L43,46" fill="none" stroke="#1e293b" stroke-width="1.5"/>
          <path d="M12,16 L24,19 L18,22 Z M50,14 L62,17 L56,20 Z" fill="#dc2626"/>
          <text x="42" y="12" font-size="7.5" font-weight="900" fill="#dc2626">141 DRONES</text>
          <!-- EU Loan badge right -->
          <rect x="86" y="8" width="90" height="44" rx="3" fill="#1e3a8a"/>
          <text x="131" y="23" font-size="11" font-weight="900" fill="#facc15" text-anchor="middle">€45bn</text>
          <text x="131" y="34" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">EU 2027 UKRAINE LOAN</text>
          <rect x="96" y="39" width="70" height="8" rx="1.5" fill="#facc15"/>
          <text x="131" y="45.5" font-size="6.3" font-weight="900" fill="#0f172a" text-anchor="middle">BERLIN TALKS THU</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-eu">5</span><span class="tx-eu">EUROPE · UKRAINE WAR</span></div>
        <span class="src-tag">AP · EU</span>
      </div>
      <div class="h-mid">Russia fires 141 drones at Ukraine; EU proposes €45bn loan for 2027</div>
      <div class="p-mid">Air force downs 126 drones (5 killed, 15 hurt; 80+ Rivne towns lose power). EU proposes a €45bn loan tied to Russian reparations ahead of Berlin peace talks.</div>
    </div>

    <!-- CARD 6: GAZA TRUCE & FLOODS -->
    <div class="card bd-me">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#fff1f2"/>
          <!-- Flooded tents -->
          <rect x="0" y="45" width="184" height="15" fill="#38bdf8"/>
          <polygon points="18,45 32,27 46,45" fill="#475569"/>
          <polygon points="52,45 66,27 80,45" fill="#475569"/>
          <polygon points="86,45 100,27 114,45" fill="#475569"/>
          <!-- Rain lines -->
          <line x1="25" y1="10" x2="20" y2="22" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="45" y1="10" x2="40" y2="22" stroke="#0284c7" stroke-width="1.2"/>
          <line x1="65" y1="10" x2="60" y2="22" stroke="#0284c7" stroke-width="1.2"/>
          <rect x="114" y="10" width="64" height="28" rx="3" fill="#dc2626"/>
          <text x="146" y="22" font-size="7.2" font-weight="900" fill="#fff" text-anchor="middle">TRUCE AT RISK</text>
          <text x="146" y="31" font-size="6.5" font-weight="700" fill="#fecaca" text-anchor="middle">UN Security Council</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-me">6</span><span class="tx-me">MIDDLE EAST · GAZA</span></div>
        <span class="src-tag">AP · WHO</span>
      </div>
      <div class="h-mid">Board of Peace warns Gaza truce may collapse as winter floods hit tents</div>
      <div class="p-mid">First report to UN Security Council faults Israel and Hamas and says civil rule is blocked; WHO urges open aid routes as winter storms flood displaced camps.</div>
    </div>

    <!-- CARD 7: CYCLONE AKVAN -->
    <div class="card bd-as">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#bae6fd"/>
          <path d="M0,0 L78,0 L68,20 L52,38 L38,60 L0,60 Z" fill="#fde68a" stroke="#d97706" stroke-width="1.2"/>
          <text x="10" y="18" font-size="8" font-weight="900" fill="#7c2d12">INDIA</text>
          <text x="8" y="30" font-size="6.8" font-weight="800" fill="#92400e">ODISHA / AP</text>
          <!-- Cyclone spiral -->
          <circle cx="122" cy="32" r="16" fill="none" stroke="#0f172a" stroke-width="2.2" stroke-dasharray="18,6"/>
          <circle cx="122" cy="32" r="5" fill="#dc2626"/>
          <path d="M108,28 Q84,22 64,24" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,2"/>
          <polygon points="62,24 68,20 68,28" fill="#dc2626"/>
          <text x="128" y="12" font-size="7.5" font-weight="900" fill="#0f172a" text-anchor="middle">145 KM/H</text>
          <text x="126" y="56" font-size="7" font-weight="800" fill="#0369a1" text-anchor="middle">BAY OF BENGAL · FRI</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-as">7</span><span class="tx-as">SOUTH ASIA · DISASTER</span></div>
        <span class="src-tag">IMD</span>
      </div>
      <div class="h-mid">Cyclone Akvan strengthens in Bay of Bengal; 204,070 set to evacuate</div>
      <div class="p-mid">IMD forecasts Friday landfall between Puri and Narsapur in Andhra Pradesh and Odisha with gusts to 145 km/h; mass coastal evacuations begin.</div>
    </div>

    <!-- CARD 8: SUDAN WAR -->
    <div class="card bd-af">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#faf5ff"/>
          <path d="M14,10 L76,10 L86,26 L74,52 L20,52 L10,34 Z" fill="#fde68a" stroke="#b45309" stroke-width="1.2"/>
          <text x="26" y="23" font-size="7.8" font-weight="900" fill="#78350f">SUDAN</text>
          <circle cx="48" cy="36" r="4" fill="#dc2626"/>
          <text x="22" y="47" font-size="6.8" font-weight="800" fill="#991b1b">EL OBEID</text>
          <rect x="96" y="10" width="80" height="20" rx="2" fill="#7e22ce"/>
          <text x="136" y="19" font-size="7.5" font-weight="900" fill="#fff" text-anchor="middle">37 KILLED</text>
          <text x="136" y="27" font-size="6.3" font-weight="700" fill="#f3e8ff" text-anchor="middle">9 RSF drone strikes</text>
          <rect x="96" y="34" width="80" height="18" rx="2" fill="#1e293b"/>
          <text x="136" y="45" font-size="7.2" font-weight="800" fill="#facc15" text-anchor="middle">UN: 2,230 IN 2026</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-af">8</span><span class="tx-af">AFRICA · SUDAN WAR</span></div>
        <span class="src-tag">AMNESTY · UN</span>
      </div>
      <div class="h-mid">Amnesty: RSF drones killed 37 civilians in El Obeid; UN cites 2,230 toll</div>
      <div class="p-mid">Amnesty demands a war-crimes probe into El Obeid strikes (RSF denies blame), as the UN human rights office reports 2,230 Sudan civilians killed Jan–Oct.</div>
    </div>
  </div>

  <!-- ROW 3: 5 ILLUSTRATED CARDS (9 TO 13) -->
  <div class="row-mid">
    <!-- CARD 9: VOYAGER 1 -->
    <div class="card bd-gl">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#0f172a"/>
          <circle cx="22" cy="32" r="10" fill="#38bdf8"/>
          <path d="M17,27 Q23,30 20,38" fill="none" stroke="#22c55e" stroke-width="2.5"/>
          <text x="22" y="52" font-size="6.8" font-weight="800" fill="#94a3b8" text-anchor="middle">EARTH</text>
          <line x1="36" y1="32" x2="138" y2="32" stroke="#facc15" stroke-width="1.6" stroke-dasharray="4,3"/>
          <text x="88" y="21" font-size="8" font-weight="900" fill="#facc15" text-anchor="middle">1 LIGHT-DAY</text>
          <text x="88" y="45" font-size="7.2" font-weight="700" fill="#e2e8f0" text-anchor="middle">25.9 billion km</text>
          <!-- Voyager probe -->
          <ellipse cx="152" cy="32" rx="5" ry="9" fill="#e2e8f0"/>
          <rect x="156" y="29" width="8" height="6" fill="#94a3b8"/>
          <line x1="152" y1="23" x2="168" y2="12" stroke="#cbd5e1" stroke-width="1.3"/>
          <line x1="152" y1="41" x2="168" y2="50" stroke="#cbd5e1" stroke-width="1.3"/>
          <text x="154" y="55" font-size="6.8" font-weight="800" fill="#38bdf8" text-anchor="middle">VOYAGER 1</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-gl">9</span><span class="tx-gl">SPACE · SCIENCE</span></div>
        <span class="src-tag">NASA JPL</span>
      </div>
      <div class="h-mid">Voyager 1 is the first craft to reach one light-day from Earth</div>
      <div class="p-mid">NASA's 1977 probe passes 25.9 billion km away in interstellar space, a record for any human-made object: a radio signal now takes 24 hours each way.</div>
    </div>

    <!-- CARD 10: UK INFLATION & GOLD / NVIDIA -->
    <div class="card bd-eu">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#eff6ff"/>
          <!-- UK CPI -->
          <rect x="12" y="24" width="20" height="24" fill="#93c5fd"/>
          <rect x="36" y="16" width="20" height="32" fill="#1d4ed8"/>
          <text x="22" y="21" font-size="6.8" font-weight="800" fill="#1e3a8a" text-anchor="middle">3.5%</text>
          <text x="46" y="13" font-size="7.5" font-weight="900" fill="#1e3a8a" text-anchor="middle">3.6%</text>
          <text x="34" y="56" font-size="7" font-weight="800" fill="#1e293b" text-anchor="middle">UK CPI · 1-YR HIGH</text>
          <line x1="82" y1="8" x2="82" y2="52" stroke="#cbd5e1" stroke-width="1"/>
          <!-- Gold bar right -->
          <polygon points="94,38 134,38 128,26 100,26" fill="#eab308" stroke="#a16207" stroke-width="1"/>
          <text x="136" y="22" font-size="8" font-weight="900" fill="#dc2626">$3,792</text>
          <text x="136" y="31" font-size="6.8" font-weight="800" fill="#991b1b">GOLD -1.5%</text>
          <text x="134" y="52" font-size="6.6" font-weight="800" fill="#334155" text-anchor="middle">NVDA: NO HUANG RETURN</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-eu">10</span><span class="tx-eu">ECONOMY &amp; MARKETS</span></div>
        <span class="src-tag">ONS · CNBC</span>
      </div>
      <div class="h-mid">UK inflation hits 3.6% high; gold drops below $3,800; Nvidia rules out Huang</div>
      <div class="p-mid">Record diesel lifts UK October CPI to 3.6% (ONS). Spot gold falls 1.5% to $3,792/oz on Fed rate cues, while Nvidia's board rules out a Jensen Huang return.</div>
    </div>

    <!-- CARD 11: GTA VI -->
    <div class="card bd-gl">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#1e1b4b"/>
          <circle cx="38" cy="30" r="16" fill="#f43f5e"/>
          <rect x="22" y="34" width="32" height="14" fill="#1e1b4b"/>
          <!-- Controller -->
          <rect x="64" y="16" width="52" height="28" rx="10" fill="#e2e8f0"/>
          <line x1="76" y1="26" x2="76" y2="34" stroke="#0f172a" stroke-width="2.5"/>
          <line x1="72" y1="30" x2="80" y2="30" stroke="#0f172a" stroke-width="2.5"/>
          <circle cx="102" cy="27" r="2.3" fill="#dc2626"/>
          <circle cx="107" cy="32" r="2.3" fill="#2563eb"/>
          <rect x="124" y="14" width="50" height="32" rx="3" fill="#0f172a" stroke="#facc15" stroke-width="1"/>
          <text x="149" y="28" font-size="9" font-weight="900" fill="#facc15" text-anchor="middle">00:00</text>
          <text x="149" y="39" font-size="6.8" font-weight="800" fill="#fff" text-anchor="middle">14.9M SOLD</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-gl">11</span><span class="tx-gl">GLOBAL · CULTURE</span></div>
        <span class="src-tag">SENSOR TOWER</span>
      </div>
      <div class="h-mid">Grand Theft Auto VI goes on sale after a 13-year wait, starting in NZ</div>
      <div class="p-mid">Midnight launches roll west across time zones from New Zealand; Sensor Tower estimates 14.9m–15m+ digital pre-orders worth about $1.45bn.</div>
    </div>

    <!-- CARD 12: ECDC SUPERBUGS & EBOLA -->
    <div class="card bd-eu">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#f0fdf4"/>
          <!-- Pill capsule -->
          <g transform="translate(18,22) rotate(-22)">
            <rect x="0" y="0" width="22" height="14" rx="7" fill="#2563eb"/>
            <rect x="18" y="0" width="22" height="14" rx="7" fill="#ffffff" stroke="#2563eb" stroke-width="1.5"/>
          </g>
          <text x="92" y="24" font-size="12" font-weight="900" fill="#dc2626" text-anchor="middle">+72%</text>
          <text x="92" y="34" font-size="6.8" font-weight="800" fill="#1e293b" text-anchor="middle">EU SUPERBUG SURGE</text>
          <rect x="128" y="12" width="48" height="36" rx="3" fill="#991b1b"/>
          <text x="152" y="25" font-size="7.5" font-weight="900" fill="#fff" text-anchor="middle">EBOLA</text>
          <text x="152" y="35" font-size="6.5" font-weight="700" fill="#fecaca" text-anchor="middle">DR CONGO</text>
          <text x="152" y="43" font-size="6.2" font-weight="700" fill="#fef08a" text-anchor="middle">WHO ALERT</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-eu">12</span><span class="tx-eu">HEALTH · ECDC &amp; WHO</span></div>
        <span class="src-tag">ECDC · WHO</span>
      </div>
      <div class="h-mid">Europe off track on antibiotic resistance (+72%); WHO keeps Ebola alert</div>
      <div class="p-mid">Carbapenem-resistant K. pneumoniae bloodstream infections rose 72% since 2019 (ECDC). WHO keeps DR Congo's Ebola outbreak (400–500 cases/wk) an emergency.</div>
    </div>

    <!-- CARD 13: BANGLADESH LABOUR & AUSTRALIA SANCTIONS -->
    <div class="card bd-as">
      <div class="art-mid">
        <svg viewBox="0 0 184 60" width="100%" height="100%">
          <rect width="184" height="60" fill="#fffbeb"/>
          <!-- Factory -->
          <polygon points="12,48 12,26 28,18 28,26 44,18 44,26 60,18 60,48" fill="#475569"/>
          <rect x="20" y="33" width="32" height="11" rx="1.5" fill="#facc15"/>
          <text x="36" y="41" font-size="7" font-weight="900" fill="#0f172a" text-anchor="middle">55 SHUT</text>
          <!-- Bangladesh flag small -->
          <rect x="66" y="14" width="18" height="11" fill="#065f46"/>
          <circle cx="74" cy="19.5" r="3" fill="#dc2626"/>
          <text x="75" y="36" font-size="7" font-weight="900" fill="#78350f" text-anchor="middle">Tk 30k</text>
          <line x1="94" y1="8" x2="94" y2="52" stroke="#fde68a" stroke-width="1.5"/>
          <!-- Australia sanctions right -->
          <rect x="102" y="12" width="74" height="36" rx="3" fill="#0f766e"/>
          <text x="139" y="24" font-size="7.2" font-weight="900" fill="#fff" text-anchor="middle">AUSTRALIA</text>
          <text x="139" y="34" font-size="6.8" font-weight="800" fill="#ccfbf1" text-anchor="middle">SANCTIONS WEISS</text>
          <text x="139" y="43" font-size="6.2" font-weight="700" fill="#fef08a" text-anchor="middle">&amp; 4 SETTLER GROUPS</text>
        </svg>
      </div>
      <div class="meta-line">
        <div class="meta-left"><span class="num-circle bg-as">13</span><span class="tx-as">ASIA &amp; OCEANIA · POLICY</span></div>
        <span class="src-tag">AFP · ABC</span>
      </div>
      <div class="h-mid">Bangladesh garment protests shut 55 factories; Australia sanctions Weiss</div>
      <div class="p-mid">Workers seeking a Tk 30,000 minimum wage block Dhaka-Mymensingh highway. Australia sanctions settler leader Daniella Weiss, Nachala and Amana.</div>
    </div>
  </div>

  <!-- ROW 4: WORLD MAP + 35 BRIEFS -->
  <div class="row-bottom">
    <!-- LEFT: WORLD MAP & KEY NUMBERS -->
    <div class="map-col">
      <div class="sec-head">
        <span>WHERE IT HAPPENED · 6 CONTINENTS</span>
        <span class="sub">PINS 1–13 · DOTS 14–49</span>
      </div>
      <div class="map-box">
        <svg viewBox="0 0 332 162" width="100%" height="100%">
          <rect width="332" height="162" fill="#dbeafe"/>
          <!-- Equator & tropics grid -->
          <line x1="0" y1="86" x2="332" y2="86" stroke="#bfdbfe" stroke-width="0.8" stroke-dasharray="3,3"/>
          <line x1="0" y1="46" x2="332" y2="46" stroke="#bfdbfe" stroke-width="0.6" stroke-dasharray="2,3"/>
          <line x1="0" y1="126" x2="332" y2="126" stroke="#bfdbfe" stroke-width="0.6" stroke-dasharray="2,3"/>
          <!-- North America -->
          <path d="M14,22 L54,18 L92,22 L106,36 L88,58 L72,72 L58,68 L44,52 L28,38 Z" fill="#d1fae5" stroke="#6ee7b7" stroke-width="1"/>
          <!-- Greenland -->
          <path d="M104,12 L128,10 L132,24 L112,26 Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.8"/>
          <!-- South America -->
          <path d="M78,78 L104,84 L116,104 L102,146 L88,152 L82,124 L74,96 Z" fill="#d1fae5" stroke="#6ee7b7" stroke-width="1"/>
          <!-- Europe -->
          <path d="M142,22 L178,18 L198,22 L196,48 L174,52 L148,48 L140,36 Z" fill="#dbeafe" stroke="#60a5fa" stroke-width="1"/>
          <path d="M142,22 L178,18 L198,22 L196,48 L174,52 L148,48 L140,36 Z" fill="#eff6ff" stroke="#93c5fd" stroke-width="1"/>
          <!-- Africa -->
          <path d="M144,54 L178,54 L198,68 L202,94 L188,134 L170,136 L158,104 L140,76 Z" fill="#f3e8ff" stroke="#c084fc" stroke-width="1"/>
          <!-- Middle East & Asia -->
          <path d="M198,20 L296,18 L314,36 L296,68 L272,82 L244,78 L224,68 L194,68 L196,46 Z" fill="#fef3c7" stroke="#fbbf24" stroke-width="1"/>
          <!-- SE Asia / Indonesia / Japan -->
          <path d="M262,84 L294,88 L302,102 L268,100 Z" fill="#fef3c7" stroke="#fbbf24" stroke-width="0.8"/>
          <!-- Australia & NZ -->
          <path d="M268,110 L306,110 L312,136 L284,142 L266,128 Z" fill="#ccfbf1" stroke="#5eead4" stroke-width="1"/>
          <path d="M318,138 L326,148 L320,152 Z" fill="#ccfbf1" stroke="#5eead4" stroke-width="1"/>

          <!-- Brief dots (14-48) -->
          <circle cx="64" cy="48" r="2.3" fill="#16a34a"/>
          <circle cx="72" cy="44" r="2.3" fill="#16a34a"/>
          <circle cx="68" cy="34" r="2.3" fill="#16a34a"/>
          <circle cx="58" cy="64" r="2.3" fill="#16a34a"/>
          <circle cx="78" cy="106" r="2.3" fill="#16a34a"/>
          <circle cx="94" cy="136" r="2.3" fill="#16a34a"/>
          <circle cx="88" cy="116" r="2.3" fill="#16a34a"/>
          <circle cx="158" cy="36" r="2.3" fill="#2563eb"/>
          <circle cx="166" cy="40" r="2.3" fill="#2563eb"/>
          <circle cx="176" cy="44" r="2.3" fill="#2563eb"/>
          <circle cx="212" cy="32" r="2.3" fill="#2563eb"/>
          <circle cx="198" cy="62" r="2.3" fill="#dc2626"/>
          <circle cx="204" cy="68" r="2.3" fill="#dc2626"/>
          <circle cx="192" cy="82" r="2.3" fill="#9333ea"/>
          <circle cx="152" cy="84" r="2.3" fill="#9333ea"/>
          <circle cx="178" cy="130" r="2.3" fill="#9333ea"/>
          <circle cx="234" cy="54" r="2.3" fill="#d97706"/>
          <circle cx="282" cy="68" r="2.3" fill="#d97706"/>
          <circle cx="296" cy="46" r="2.3" fill="#d97706"/>
          <circle cx="268" cy="88" r="2.3" fill="#d97706"/>
          <circle cx="302" cy="132" r="2.3" fill="#0d9488"/>

          <!-- Numbered Pins 1-13 -->
          <!-- 1 Gulf -->
          <circle cx="212" cy="63" r="5.5" fill="#dc2626" stroke="#fff" stroke-width="1"/>
          <text x="212" y="65.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">1</text>
          <!-- 2 Shenzhen -->
          <circle cx="278" cy="58" r="5.5" fill="#d97706" stroke="#fff" stroke-width="1"/>
          <text x="278" y="60.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">2</text>
          <!-- 3 Antalya COP31 -->
          <circle cx="186" cy="49" r="5.5" fill="#0d9488" stroke="#fff" stroke-width="1"/>
          <text x="186" y="51.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">3</text>
          <!-- 4 Alaska / US -->
          <circle cx="26" cy="24" r="5.5" fill="#16a34a" stroke="#fff" stroke-width="1"/>
          <text x="26" y="26.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">4</text>
          <!-- 5 Ukraine -->
          <circle cx="184" cy="35" r="5.5" fill="#2563eb" stroke="#fff" stroke-width="1"/>
          <text x="184" y="37.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">5</text>
          <!-- 6 Gaza -->
          <circle cx="194" cy="61" r="5.5" fill="#dc2626" stroke="#fff" stroke-width="1"/>
          <text x="194" y="63.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">6</text>
          <!-- 7 Bay of Bengal -->
          <circle cx="244" cy="69" r="5.5" fill="#d97706" stroke="#fff" stroke-width="1"/>
          <text x="244" y="71.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">7</text>
          <!-- 8 Sudan -->
          <circle cx="182" cy="79" r="5.5" fill="#9333ea" stroke="#fff" stroke-width="1"/>
          <text x="182" y="81.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">8</text>
          <!-- 9 Voyager 1 (Deep space badge) -->
          <rect x="6" y="142" width="114" height="14" rx="7" fill="#0f172a" stroke="#fff" stroke-width="0.8"/>
          <text x="63" y="151.5" font-size="6.5" font-weight="800" fill="#38bdf8" text-anchor="middle">9 VOYAGER 1 · 25.9bn km →</text>
          <!-- 10 UK -->
          <circle cx="148" cy="32" r="5.5" fill="#2563eb" stroke="#fff" stroke-width="1"/>
          <text x="148" y="34.5" font-size="6.8" font-weight="900" fill="#fff" text-anchor="middle">10</text>
          <!-- 11 NZ GTA VI -->
          <circle cx="322" cy="144" r="5.5" fill="#0d9488" stroke="#fff" stroke-width="1"/>
          <text x="322" y="146.5" font-size="6.5" font-weight="900" fill="#fff" text-anchor="middle">11</text>
          <!-- 12 Europe / Congo Health -->
          <circle cx="172" cy="98" r="5.5" fill="#2563eb" stroke="#fff" stroke-width="1"/>
          <text x="172" y="100.5" font-size="6.5" font-weight="900" fill="#fff" text-anchor="middle">12</text>
          <!-- 13 Bangladesh / Australia -->
          <circle cx="256" cy="58" r="5.5" fill="#d97706" stroke="#fff" stroke-width="1"/>
          <text x="256" y="60.5" font-size="6.5" font-weight="900" fill="#fff" text-anchor="middle">13</text>
          <circle cx="294" cy="126" r="5.5" fill="#d97706" stroke="#fff" stroke-width="1"/>
          <text x="294" y="128.5" font-size="6.5" font-weight="900" fill="#fff" text-anchor="middle">13</text>
        </svg>
      </div>
      <div class="legend-row">
        <span><i class="leg-dot bg-me"></i>Middle East</span>
        <span><i class="leg-dot bg-as"></i>Asia</span>
        <span><i class="leg-dot bg-am"></i>Americas</span>
        <span><i class="leg-dot bg-eu"></i>Europe</span>
        <span><i class="leg-dot bg-af"></i>Africa</span>
        <span><i class="leg-dot bg-gl"></i>Global/Oceania</span>
      </div>
      <div class="stats-grid">
        <div class="stat-item"><span class="stat-val">141</span><span class="stat-lbl">Russian drones; 126 downed</span></div>
        <div class="stat-item"><span class="stat-val">25.9bn km</span><span class="stat-lbl">Voyager 1: 1 light-day out</span></div>
        <div class="stat-item"><span class="stat-val">204,070</span><span class="stat-lbl">India cyclone evacuations</span></div>
        <div class="stat-item"><span class="stat-val">14.9m</span><span class="stat-lbl">GTA VI pre-orders ($1.45bn)</span></div>
      </div>
    </div>

    <!-- RIGHT: 36 WORLD BRIEFS (14 TO 49) -->
    <div class="briefs-col">
      <div class="sec-head">
        <span>ALSO ON WEDNESDAY 18 NOVEMBER 2026 · 36 MORE WORLD STORIES</span>
        <span class="sub">BY REGION &amp; BEAT</span>
      </div>
      <div class="briefs-grid">
        <div class="b-line"><span class="b-num bg-me">14</span><span class="b-loc">Riyadh &amp; Yemen:</span> Saudi coalition downs Houthi missile, hits 60 sites</div>
        <div class="b-line"><span class="b-num bg-as">32</span><span class="b-loc">Manila:</span> Quad leaders meet; Trump hails trade deal (Manila: none signed)</div>
        <div class="b-line"><span class="b-num bg-me">15</span><span class="b-loc">Jerusalem:</span> Knesset repeals media law 63–49, elects Kahana &amp; 9 deputies</div>
        <div class="b-line"><span class="b-num bg-as">33</span><span class="b-loc">Shenzhen:</span> China's Xi &amp; South Korea's Lee conclude FTA services talks</div>
        <div class="b-line"><span class="b-num bg-me">16</span><span class="b-loc">Jordan &amp; Iraq:</span> Authorities block Telegram app over security concerns</div>
        <div class="b-line"><span class="b-num bg-as">34</span><span class="b-loc">Tokyo:</span> Japan posts 6th monthly trade deficit as PM Takaichi visits China</div>
        <div class="b-line"><span class="b-num bg-af">17</span><span class="b-loc">Horn of Africa:</span> Ethiopia &amp; Eritrea mass troops on border; Badme shelling</div>
        <div class="b-line"><span class="b-num bg-as">35</span><span class="b-loc">Seoul:</span> Court acquits Daegu mayor in martial-law prosecution</div>
        <div class="b-line"><span class="b-num bg-af">18</span><span class="b-loc">The Hague (ICJ):</span> UN court sets Thursday for Rohingya genocide ruling</div>
        <div class="b-line"><span class="b-num bg-as">36</span><span class="b-loc">China Markets:</span> Tencent Q3 revenue +8% (misses forecast); Kospi +2%</div>
        <div class="b-line"><span class="b-num bg-af">19</span><span class="b-loc">Guinea &amp; Senegal:</span> Guinea jails 224 gold miners; Senegal qualify for AFCON</div>
        <div class="b-line"><span class="b-num bg-as">37</span><span class="b-loc">Singapore &amp; Bangkok:</span> Princess Aiko visits; Chinese director jailed over tower</div>
        <div class="b-line"><span class="b-num bg-af">20</span><span class="b-loc">South Africa:</span> CPI hits 5.2% high; Pretoria rebukes Nigeria's new envoy</div>
        <div class="b-line"><span class="b-num bg-as">38</span><span class="b-loc">Lahore &amp; Kuala Lumpur:</span> Lahore AQI hits 339 (#1 polluted); Ringgit 5-mo low</div>
        <div class="b-line"><span class="b-num bg-af">21</span><span class="b-loc">Mauritius &amp; Sudan:</span> Chagos Dec deadline set; Old Dongola church floor found</div>
        <div class="b-line"><span class="b-num bg-as">39</span><span class="b-loc">South Asia Sport:</span> Pakistan bowl out SL for 98; Dhoni retires; India win SAFF</div>
        <div class="b-line"><span class="b-num bg-eu">22</span><span class="b-loc">Berlin:</span> Coalition cuts power tax, caps fuel, cites Russia chemical breaches</div>
        <div class="b-line"><span class="b-num bg-am">40</span><span class="b-loc">Wall Street:</span> Anthropic prices IPO tonight (trades Thu); BofA tech bets cut</div>
        <div class="b-line"><span class="b-num bg-eu">23</span><span class="b-loc">Cambridge &amp; UK:</span> "Human" named Word of Year; UK extradites US spy suspect</div>
        <div class="b-line"><span class="b-num bg-am">41</span><span class="b-loc">Washington:</span> NSA confirms maintenance network outage; Rubio: no cyberattack</div>
        <div class="b-line"><span class="b-num bg-eu">24</span><span class="b-loc">Paris:</span> Court suspends school-protest ban; Le Pen floats retirement at 60–62</div>
        <div class="b-line"><span class="b-num bg-am">42</span><span class="b-loc">US Health &amp; Fed:</span> US loses measles-free status (5,400 cases); Cook fights panel</div>
        <div class="b-line"><span class="b-num bg-eu">25</span><span class="b-loc">FIFA &amp; ATP:</span> France's Diallo to challenge Infantino; Alcaraz routs Tiafoe</div>
        <div class="b-line"><span class="b-num bg-am">43</span><span class="b-loc">Canada–China:</span> PM Carney &amp; Xi agree pork/seafood tariff relief at APEC</div>
        <div class="b-line"><span class="b-num bg-eu">26</span><span class="b-loc">Kemerovo &amp; Belgrade:</span> 19 die in Russian An-12 crash; Serbian MiG-29 crashes</div>
        <div class="b-line"><span class="b-num bg-am">44</span><span class="b-loc">Peru &amp; Ecuador:</span> Peru M5.9 quake &amp; Tumbes flood alert; Ecuador drone lawsuit</div>
        <div class="b-line"><span class="b-num bg-eu">27</span><span class="b-loc">Kosovo:</span> Ex-president Hashim Thaçi sentenced to 17 months in prison</div>
        <div class="b-line"><span class="b-num bg-am">45</span><span class="b-loc">Latin America:</span> Colombia Q3 GDP -0.8%; Argentina Malvinas bill; 99 Bolivia bats</div>
        <div class="b-line"><span class="b-num bg-gl">28</span><span class="b-loc">Cook Islands &amp; NZ:</span> Cyclone Xavier hits Cat 5; NZ lifts 60 cm tsunami alert</div>
        <div class="b-line"><span class="b-num bg-am">46</span><span class="b-loc">CONCACAF &amp; NBA:</span> USA 2–0 Haiti, Mexico beat Jamaica; Grimes 47 pts for Lakers</div>
        <div class="b-line"><span class="b-num bg-gl">29</span><span class="b-loc">Sydney:</span> Tame Impala sweeps ARIA Awards; Bancroft says team knew 2018 plot</div>
        <div class="b-line"><span class="b-num bg-gl">47</span><span class="b-loc">Cybersecurity:</span> Optimizely breach hits 178 firms; Visa traces Asian supplier leak</div>
        <div class="b-line"><span class="b-num bg-as">30</span><span class="b-loc">Myanmar:</span> Junta chief tells parliament to review ties with ASEAN bloc</div>
        <div class="b-line"><span class="b-num bg-gl">48</span><span class="b-loc">Energy &amp; Tech:</span> Brent crude $91.82 (-1.4%); Amazon pledges $7bn in India solar</div>
        <div class="b-line"><span class="b-num bg-as">31</span><span class="b-loc">Ulaanbaatar:</span> Mongolian MPs prepare vote on president's resignation offer</div>
        <div class="b-line"><span class="b-num bg-me">49</span><span class="b-loc">West Bank &amp; Gaza:</span> UK joins settler sanctions; Egypt-US author barred from US</div>
      </div>
    </div>
  </div>

  <!-- STRICT 18 NOV DATE VERIFICATION & FOOTER -->
  <div class="date-verify">
    <strong>DATE &amp; FACT CHECK (WEDNESDAY 18 NOV 2026):</strong> Every story happened or was first reported on 18 Nov 2026. Earlier 17 Nov reports are distinguished: Tuesday night's US strike on Qeshm is shown only as the trigger for today's Iranian drones on Kuwait/Bahrain; Nvidia's $115.8bn Q3 (17 Nov) is cited only for today's board ruling on Jensen Huang; Prague train crash (17 Nov) excluded.
  </div>
  <div class="footer-bar">
    <span>Disputed claims by warring sides are attributed to their sources. All 49 stories verified across 6 continents for Wednesday 18 November 2026.</span>
    <span>Sources: Reuters · AP · AFP · BBC · Al Jazeera · CNBC · ONS · IMD · ECDC · NASA · UN · WHO · Sensor Tower. Original vector drawings.</span>
  </div>

</div>
</body>
</html>`;

writeFileSync(htmlPath, html, "utf8");
console.log("Wrote page.html");
