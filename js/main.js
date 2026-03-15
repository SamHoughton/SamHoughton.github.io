/* ============================================================
   SAMUEL HOUGHTON — main.js
   ============================================================ */

// ── Boot Lines ─────────────────────────────────────────────────
const BOOT_LINES = [
    'BIOS v3.1.0  ................ [OK]',
    'CPU: CSIRT_CORE @ 4.2GHz  ... [OK]',
    'RAM: 65536MB DDR5 ECC  ...... [OK]',
    'DISK: /dev/nvme0 AES-256  ... [ENCRYPTED]',
    'NET: eth0  .................. [CONNECTED]',
    '',
    '> Loading kernel security modules ...',
    '> Initialising firewall subsystem ... [ACTIVE]',
    '> CrowdStrike Falcon agent ......... [RUNNING]',
    '> SIEM pipeline ................... [STREAMING]',
    '> Threat intel feeds .............. [LIVE]',
    '> VPN tunnel ...................... [SECURE]',
    '',
    'SYSTEM NOMINAL. ALL CHECKS PASSED.',
    '> Launching CSIRT terminal...',
    '',
];

// ── Terminal Command Definitions ───────────────────────────────
function makeBar(pct) {
    const filled = Math.round(pct / 5);
    return '█'.repeat(filled) + '░'.repeat(20 - filled);
}

const COMMANDS = {
    help: () => [
        { k: 'hdr', v: '┌─ COMMAND REFERENCE ───────────────────────┐' },
        { k: 'out', v: '  whoami       display operator profile' },
        { k: 'out', v: '  experience   show operational history' },
        { k: 'out', v: '  skills       list technical capabilities' },
        { k: 'out', v: '  certs        display certifications' },
        { k: 'out', v: '  threat-map   launch global threat map' },
        { k: 'out', v: '  contact      display contact intel' },
        { k: 'out', v: '  clear        clear terminal output' },
        { k: 'blk' },
    ],

    whoami: () => [
        { k: 'hdr', v: '┌─ OPERATOR PROFILE ────────────────────────┐' },
        { k: 'out', v: '  Name      : Samuel Houghton' },
        { k: 'out', v: '  Handle    : sam' },
        { k: 'out', v: '  Location  : London, England' },
        { k: 'out', v: '  Clearance : BTL1 | BSc Computer Science' },
        { k: 'blk' },
        { k: 'out', v: '  Role      : Staff CSIRT Engineering Manager' },
        { k: 'out', v: '  Unit      : Cyber Defence Operations' },
        { k: 'out', v: '  Employer  : OVO Energy' },
        { k: 'blk' },
        { k: 'out', v: '  Expert in CrowdStrike EDR, SIEM operations,' },
        { k: 'out', v: '  threat hunting, security automation, and' },
        { k: 'out', v: '  end-to-end incident response lifecycle.' },
        { k: 'blk' },
    ],

    experience: () => [
        { k: 'hdr', v: '┌─ OPERATIONAL HISTORY ─────────────────────┐' },
        { k: 'blk' },
        { k: 'out', v: '  >> OVO Energy' },
        { k: 'out', v: '     Staff CSIRT Engineering Manager' },
        { k: 'out', v: '     Feb 2025 — Present' },
        { k: 'out', v: '     ↳ Led Cyber Defence Operations unit' },
        { k: 'out', v: '     ↳ CrowdStrike EDR implementation & optimisation' },
        { k: 'out', v: '     ↳ SIEM config, threat correlation & anomaly detection' },
        { k: 'out', v: '     ↳ MSSP partnership management' },
        { k: 'out', v: '     ↳ ISO 27001 delivery' },
        { k: 'blk' },
        { k: 'out', v: '  >> OVO Energy' },
        { k: 'out', v: '     Senior Security Engineer' },
        { k: 'out', v: '     May 2023 — Feb 2025' },
        { k: 'out', v: '     ↳ Incident response & threat hunting' },
        { k: 'out', v: '     ↳ SIEM & EDR operations' },
        { k: 'blk' },
        { k: 'out', v: '  >> Accenture // MSS Transition  [2023]' },
        { k: 'out', v: '     ↳ Managed security services & SOC delivery' },
        { k: 'blk' },
        { k: 'out', v: '  >> Revolution Networks // Ottawa  [2019-2021]' },
        { k: 'out', v: '     ↳ Network admin, cyber incident response' },
        { k: 'blk' },
    ],

    skills: () => [
        { k: 'hdr', v: '┌─ CAPABILITY MATRIX ───────────────────────┐' },
        { k: 'blk' },
        { k: 'out', v: '  // INCIDENT RESPONSE' },
        { k: 'bar', v: 'IR Lifecycle Management', p: 95 },
        { k: 'bar', v: 'Threat Investigation    ', p: 90 },
        { k: 'bar', v: 'Threat Hunting         ', p: 88 },
        { k: 'bar', v: 'Security Automation    ', p: 82 },
        { k: 'blk' },
        { k: 'out', v: '  // PLATFORMS & TOOLS' },
        { k: 'bar', v: 'CrowdStrike EDR        ', p: 95 },
        { k: 'bar', v: 'SIEM Operations        ', p: 90 },
        { k: 'bar', v: 'MSSP Management        ', p: 85 },
        { k: 'blk' },
        { k: 'out', v: '  // LEADERSHIP' },
        { k: 'bar', v: 'Team Management        ', p: 90 },
        { k: 'bar', v: 'Stakeholder Engagement ', p: 88 },
        { k: 'blk' },
    ],

    certs: () => [
        { k: 'hdr', v: '┌─ CERTIFICATIONS & CREDENTIALS ────────────┐' },
        { k: 'blk' },
        { k: 'out', v: '  [ACTIVE]   BTL1  — Blue Team Level 1' },
        { k: 'out', v: '  [ACTIVE]   BSc Computer Science — Univ. of Lincoln' },
        { k: 'out', v: '  [------]   Additional certifications in progress...' },
        { k: 'blk' },
    ],

    contact: () => [
        { k: 'hdr', v: '┌─ CONTACT INTELLIGENCE ────────────────────┐' },
        { k: 'blk' },
        { k: 'out', v: '  Email    : samueljhoughton@gmail.com' },
        { k: 'out', v: '  GitHub   : github.com/SamHoughton' },
        { k: 'out', v: '  LinkedIn : linkedin.com/in/sam-houghton-31274150' },
        { k: 'out', v: '  Location : London, England' },
        { k: 'blk' },
    ],

    clear: () => 'CLEAR',
    'threat-map': () => 'THREAT_MAP',
};

// ── Terminal Class ─────────────────────────────────────────────
class Terminal {
    constructor() {
        this.outputEl = document.getElementById('terminal-output');
        this.inputEl  = document.getElementById('terminal-input');
        this.bodyEl   = document.getElementById('terminal-body');
        this.history  = [];
        this.histIdx  = -1;

        this.inputEl.addEventListener('keydown', e => this.onKey(e));
        this.bodyEl.addEventListener('click', () => this.inputEl.focus());
    }

    onKey(e) {
        if (e.key === 'Enter') {
            const raw = this.inputEl.value.trim();
            const cmd = raw.toLowerCase();
            if (cmd) {
                this.history.unshift(cmd);
                this.histIdx = -1;
                this.run(cmd, raw);
            }
            this.inputEl.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.histIdx < this.history.length - 1) {
                this.histIdx++;
                this.inputEl.value = this.history[this.histIdx];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.histIdx > 0) {
                this.histIdx--;
                this.inputEl.value = this.history[this.histIdx];
            } else {
                this.histIdx = -1;
                this.inputEl.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autocomplete(this.inputEl.value.trim().toLowerCase());
        }
    }

    autocomplete(partial) {
        if (!partial) return;
        const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
        if (match) this.inputEl.value = match;
    }

    run(cmd, raw) {
        this.addLine('cmd', `sam@defence:~$ ${raw}`);

        if (!(cmd in COMMANDS)) {
            this.addLine('err', `command not found: ${cmd} — type 'help' for available commands`);
            this.addLine('blk');
            this.scroll();
            return;
        }

        const result = COMMANDS[cmd]();

        if (result === 'CLEAR') {
            this.outputEl.innerHTML = '';
            return;
        }
        if (result === 'THREAT_MAP') {
            this.addLine('out', 'Launching threat intelligence map...');
            this.addLine('blk');
            this.scroll();
            setTimeout(openThreatMap, 500);
            return;
        }

        result.forEach(r => {
            if (r.k === 'hdr') this.addLine('hdr', r.v);
            else if (r.k === 'out') this.addLine('out', r.v);
            else if (r.k === 'blk') this.addLine('blk');
            else if (r.k === 'bar') {
                const bar = makeBar(r.p);
                this.addLine('bar', `  ${r.v} [${bar}] ${r.p}%`);
            }
        });

        this.scroll();
    }

    addLine(type, text = '') {
        const span = document.createElement('span');
        span.className = `t-line t-${type}`;
        span.textContent = text;
        this.outputEl.appendChild(span);
    }

    addHTML(html) {
        const span = document.createElement('span');
        span.className = 't-line t-out';
        span.innerHTML = html;
        this.outputEl.appendChild(span);
    }

    scroll() {
        this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
    }

    welcome() {
        const lines = [
            '╔══════════════════════════════════════════════════════╗',
            '║   CSIRT TERMINAL  //  SAMUEL HOUGHTON                ║',
            '║   Staff CSIRT Engineering Manager                    ║',
            '║   OVO Energy  //  Cyber Defence Operations           ║',
            '╚══════════════════════════════════════════════════════╝',
            '',
            "  Type 'help' for available commands.",
            "  Try: whoami  |  skills  |  threat-map",
            '',
        ];
        lines.forEach(l => this.addLine('out', l));
        this.scroll();
        this.inputEl.focus();
    }
}

// ── Boot Sequence ──────────────────────────────────────────────
function runBoot() {
    const el = document.getElementById('boot-text');
    let i = 0;

    function next() {
        if (i >= BOOT_LINES.length) {
            setTimeout(() => {
                const screen = document.getElementById('boot-screen');
                screen.classList.add('fade-out');
                setTimeout(() => {
                    screen.style.display = 'none';
                    initSite();
                }, 650);
            }, 300);
            return;
        }
        el.innerHTML += (BOOT_LINES[i] || '&nbsp;') + '<br>';
        el.scrollTop = el.scrollHeight;
        i++;
        setTimeout(next, i < 6 ? 110 : 70);
    }
    next();
}

// ── Matrix Rain ────────────────────────────────────────────────
function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');
    const chars  = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ∑∆≠≈';
    const fontSize = 13;
    let cols, drops;

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        cols  = Math.floor(canvas.width / fontSize);
        drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px Share Tech Mono`;
        drops.forEach((y, i) => {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, i * fontSize, y * fontSize);
            if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// ── Skill Bars ─────────────────────────────────────────────────
function initSkillBars() {
    const bars = document.querySelectorAll('.sk-fill');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const bar = e.target;
                setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 150);
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(b => obs.observe(b));
}

// ── Threat Map ─────────────────────────────────────────────────
const THREAT_NODES = [
    { name: 'Moscow',    lat: 55.75,  lng:  37.61, group: 'APT28',          color: '#ff3b3b' },
    { name: 'Beijing',   lat: 39.91,  lng: 116.39, group: 'APT41',          color: '#ff3b3b' },
    { name: 'Tehran',    lat: 35.69,  lng:  51.42, group: 'COBALT ILLUSION', color: '#ff8800' },
    { name: 'Pyongyang', lat: 39.03,  lng: 125.75, group: 'LAZARUS',         color: '#ff3b3b' },
    { name: 'Lagos',     lat:  6.52,  lng:   3.38, group: 'BEC CAMPAIGN',    color: '#ffd000' },
    { name: 'São Paulo', lat: -23.55, lng: -46.63, group: 'FINANCIAL TTP',   color: '#ffd000' },
    { name: 'Bucharest', lat: 44.43,  lng:  26.10, group: 'RANSOMWARE',      color: '#ff8800' },
    { name: 'Minsk',     lat: 53.90,  lng:  27.57, group: 'APT3',            color: '#ff3b3b' },
    { name: 'Bangalore', lat: 12.97,  lng:  77.59, group: 'PHISHING NET',    color: '#ffd000' },
    { name: 'Toronto',   lat: 43.65,  lng: -79.38, group: 'C2 NODE',         color: '#ff8800' },
];
const TARGET = { name: 'LONDON', lat: 51.51, lng: -0.12 };

// ── World Map (Natural Earth 110m via CDN) ─────────────────────
let geoLand = null;

async function preloadWorldMap() {
    try {
        const topo = await fetch(
            'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json'
        ).then(r => r.json());
        geoLand = topojson.feature(topo, topo.objects.land);
    } catch (e) {
        console.warn('World map failed to load', e);
    }
}

function drawLand(ctx, w, h) {
    if (!geoLand) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(0,255,65,0.5)';
    ctx.lineWidth   = 0.7;
    ctx.fillStyle   = 'rgba(0,255,65,0.04)';

    function project([lng, lat]) {
        return [(lng + 180) * (w / 360), (90 - lat) * (h / 180)];
    }

    function drawRing(ring) {
        ctx.beginPath();
        ring.forEach((pt, i) => {
            const [x, y] = project(pt);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    geoLand.features.forEach(f => {
        const g = f.geometry;
        if (!g) return;
        if (g.type === 'Polygon') {
            drawRing(g.coordinates[0]);
        } else if (g.type === 'MultiPolygon') {
            g.coordinates.forEach(poly => drawRing(poly[0]));
        }
    });

    ctx.restore();
}

let tmRunning = false;
let tmRaf     = null;

function ll2xy(lat, lng, w, h) {
    return {
        x: (lng + 180) * (w / 360),
        y: (90 - lat)  * (h / 180),
    };
}

function openThreatMap() {
    const overlay = document.getElementById('threat-map-overlay');
    overlay.classList.remove('hidden');

    const canvas = document.getElementById('threat-map');
    const w = Math.min(window.innerWidth - 48, 1200);
    const h = Math.min(window.innerHeight - 200, 560);
    canvas.width  = w;
    canvas.height = h;

    tmRunning = true;
    animateThreatMap(canvas);
    animateCounters();
}

function closeThreatMap() {
    document.getElementById('threat-map-overlay').classList.add('hidden');
    tmRunning = false;
    if (tmRaf) cancelAnimationFrame(tmRaf);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeThreatMap(); });
document.getElementById('tm-close').addEventListener('click', closeThreatMap);

function animateCounters() {
    const targets = { threats: 247, blocked: 1893 };
    const els     = { threats: document.getElementById('s-threats'), blocked: document.getElementById('s-blocked') };
    let t = 0;
    function tick() {
        t++;
        if (t <= 80) {
            els.threats.textContent = Math.round((t / 80) * targets.threats);
            els.blocked.textContent = Math.round((t / 80) * targets.blocked);
            requestAnimationFrame(tick);
        } else {
            els.threats.textContent = targets.threats;
            els.blocked.textContent = targets.blocked;
        }
    }
    tick();
}

function animateThreatMap(canvas) {
    const ctx = canvas.getContext('2d');
    const w   = canvas.width;
    const h   = canvas.height;
    const tgt = ll2xy(TARGET.lat, TARGET.lng, w, h);

    // Build arc objects
    const arcs = THREAT_NODES.map(n => ({
        src:      ll2xy(n.lat, n.lng, w, h),
        color:    n.color,
        name:     n.name,
        group:    n.group,
        progress: Math.random(),
        speed:    0.0018 + Math.random() * 0.003,
    }));

    // Dot grid
    const dotGrid = [];
    for (let gx = 0; gx < w; gx += 22) {
        for (let gy = 0; gy < h; gy += 22) {
            dotGrid.push({ x: gx, y: gy });
        }
    }

    function quadPoint(t, sx, sy, cx, cy, tx, ty) {
        const mt = 1 - t;
        return {
            x: mt * mt * sx + 2 * mt * t * cx + t * t * tx,
            y: mt * mt * sy + 2 * mt * t * cy + t * t * ty,
        };
    }

    function frame() {
        if (!tmRunning) return;

        // Clear
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        // Dot grid
        ctx.fillStyle = 'rgba(0,255,65,0.07)';
        dotGrid.forEach(d => {
            ctx.beginPath();
            ctx.arc(d.x, d.y, 0.6, 0, Math.PI * 2);
            ctx.fill();
        });

        // Lat/lng grid lines
        ctx.strokeStyle = 'rgba(0,255,65,0.04)';
        ctx.lineWidth   = 0.5;
        for (let lat = -60; lat <= 60; lat += 30) {
            const y = (90 - lat) * (h / 180);
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
        for (let lng = -180; lng <= 180; lng += 30) {
            const x = (lng + 180) * (w / 360);
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }

        // Continent outlines
        drawLand(ctx, w, h);

        // Draw arcs
        arcs.forEach(arc => {
            arc.progress += arc.speed;
            if (arc.progress > 1) arc.progress = 0;

            const sx = arc.src.x, sy = arc.src.y;
            const tx = tgt.x,     ty = tgt.y;
            const cx = (sx + tx) / 2;
            const cy = Math.min(sy, ty) - Math.abs(tx - sx) * 0.28;

            const end   = arc.progress;
            const start = Math.max(0, end - 0.25);
            const steps = 50;

            // Trail
            ctx.beginPath();
            for (let s = 0; s <= steps; s++) {
                const t = start + (end - start) * (s / steps);
                const p = quadPoint(t, sx, sy, cx, cy, tx, ty);
                s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = arc.color;
            ctx.globalAlpha = 0.55;
            ctx.lineWidth   = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Head
            const head = quadPoint(end, sx, sy, cx, cy, tx, ty);
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle  = arc.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = arc.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Source dot
            ctx.beginPath();
            ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle  = arc.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = arc.color;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Labels
            ctx.font      = '9px Share Tech Mono';
            ctx.fillStyle = arc.color;
            ctx.fillText(arc.name,  sx + 7, sy - 4);
            ctx.fillStyle = 'rgba(200,220,200,0.45)';
            ctx.fillText(arc.group, sx + 7, sy + 7);
        });

        // Target pulsing rings
        const pulse = (Math.sin(Date.now() / 280) + 1) / 2;
        [14, 9].forEach((r, i) => {
            ctx.beginPath();
            ctx.arc(tgt.x, tgt.y, r + pulse * (i === 0 ? 6 : 3), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,255,65,${(i === 0 ? 0.2 : 0.4) * pulse})`;
            ctx.lineWidth   = 1;
            ctx.stroke();
        });

        // Target dot
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle  = '#00ff41';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ff41';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Crosshairs
        ctx.strokeStyle = 'rgba(0,255,65,0.12)';
        ctx.lineWidth   = 0.5;
        ctx.beginPath(); ctx.moveTo(tgt.x, 0); ctx.lineTo(tgt.x, h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, tgt.y); ctx.lineTo(w, tgt.y); ctx.stroke();

        // Target label
        ctx.fillStyle = '#00ff41';
        ctx.font      = 'bold 10px Share Tech Mono';
        ctx.fillText('[ LONDON — DEFENDER ]', tgt.x + 10, tgt.y + 4);

        tmRaf = requestAnimationFrame(frame);
    }

    frame();
}

// ── Nav Hamburger ──────────────────────────────────────────────
function initHamburger() {
    const btn   = document.getElementById('nav-hamburger');
    const links = document.querySelector('.nav-links');
    btn.addEventListener('click', () => {
        const open = links.style.display === 'flex';
        links.style.display = open ? 'none' : 'flex';
        if (!open) {
            links.style.flexDirection = 'column';
            links.style.position      = 'absolute';
            links.style.top           = '52px';
            links.style.right         = '20px';
            links.style.background    = 'rgba(8,8,8,0.97)';
            links.style.border        = '1px solid rgba(0,255,65,0.2)';
            links.style.padding       = '12px 24px';
            links.style.gap           = '14px';
        }
    });
    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => { links.style.display = 'none'; });
    });
}

// ── Init ───────────────────────────────────────────────────────
function initSite() {
    const term = new Terminal();
    term.welcome();
    initMatrix();
    initSkillBars();
    initHamburger();
    preloadWorldMap();
}

document.addEventListener('DOMContentLoaded', runBoot);
