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

// ── Utility ────────────────────────────────────────────────────
function rand(arr)         { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randIP()          { return `${randInt(10,254)}.${randInt(0,254)}.${randInt(0,254)}.${randInt(1,254)}`; }
function randHex(n)        { return [...Array(n)].map(() => randInt(0,15).toString(16)).join(''); }
function makeBar(pct)      { const f = Math.round(pct / 5); return '█'.repeat(f) + '░'.repeat(20 - f); }
function pad(s, n)         { return String(s).padEnd(n); }

// ── Threat Pool ────────────────────────────────────────────────
const THREAT_POOL = [
    { name: 'Moscow',       lat:  55.75, lng:  37.61 },
    { name: 'Beijing',      lat:  39.91, lng: 116.39 },
    { name: 'Tehran',       lat:  35.69, lng:  51.42 },
    { name: 'Pyongyang',    lat:  39.03, lng: 125.75 },
    { name: 'Lagos',        lat:   6.52, lng:   3.38 },
    { name: 'São Paulo',    lat: -23.55, lng: -46.63 },
    { name: 'Bucharest',    lat:  44.43, lng:  26.10 },
    { name: 'Minsk',        lat:  53.90, lng:  27.57 },
    { name: 'Bangalore',    lat:  12.97, lng:  77.59 },
    { name: 'Toronto',      lat:  43.65, lng: -79.38 },
    { name: 'Kyiv',         lat:  50.45, lng:  30.52 },
    { name: 'Shanghai',     lat:  31.23, lng: 121.47 },
    { name: 'Caracas',      lat:  10.49, lng: -66.88 },
    { name: 'Nairobi',      lat:  -1.28, lng:  36.82 },
    { name: 'Jakarta',      lat:  -6.21, lng: 106.85 },
    { name: 'Ankara',       lat:  39.93, lng:  32.86 },
    { name: 'Hanoi',        lat:  21.03, lng: 105.83 },
    { name: 'Bogotá',       lat:   4.71, lng: -74.07 },
    { name: 'Mexico City',  lat:  19.43, lng: -99.13 },
    { name: 'Cairo',        lat:  30.06, lng:  31.25 },
    { name: 'Baku',         lat:  40.41, lng:  49.87 },
    { name: 'Dhaka',        lat:  23.72, lng:  90.41 },
    { name: 'Almaty',       lat:  43.22, lng:  76.85 },
    { name: 'Riyadh',       lat:  24.69, lng:  46.72 },
];

const THREAT_GROUPS = [
    { name: 'APT28',           color: '#ff3b3b' },
    { name: 'APT41',           color: '#ff3b3b' },
    { name: 'LAZARUS GROUP',   color: '#ff3b3b' },
    { name: 'COZY BEAR',       color: '#ff3b3b' },
    { name: 'FANCY BEAR',      color: '#ff3b3b' },
    { name: 'COBALT ILLUSION', color: '#ff8800' },
    { name: 'DARKSIDE',        color: '#ff8800' },
    { name: 'RANSOMWARE-X',    color: '#ff8800' },
    { name: 'C2 BOTNET',       color: '#ff8800' },
    { name: 'BEC CAMPAIGN',    color: '#ffd000' },
    { name: 'PHISHING NET',    color: '#ffd000' },
    { name: 'FINANCIAL TTP',   color: '#ffd000' },
    { name: 'ZERO-DAY',        color: '#ff3b3b' },
    { name: 'SUPPLY CHAIN',    color: '#ff3b3b' },
    { name: 'APT3',            color: '#ff3b3b' },
];

// ── Static Commands ────────────────────────────────────────────
const COMMANDS = {
    help: () => [
        { k: 'hdr', v: '┌─ COMMAND REFERENCE ───────────────────────┐' },
        { k: 'out', v: '  whoami       display operator profile' },
        { k: 'out', v: '  experience   show operational history' },
        { k: 'out', v: '  skills       list technical capabilities' },
        { k: 'out', v: '  certs        display certifications' },
        { k: 'out', v: '  projects     view project portfolio' },
        { k: 'out', v: '  threat-map   launch global threat map' },
        { k: 'out', v: '  scan         run network scan' },
        { k: 'out', v: '  hunt         initiate threat hunt' },
        { k: 'out', v: '  status       CSIRT system status' },
        { k: 'out', v: '  ioc          indicators of compromise' },
        { k: 'out', v: '  decode <b64> decode a base64 string' },
        { k: 'out', v: '  ssh <target> connect to remote host' },
        { k: 'out', v: '  cv           open LinkedIn profile' },
        { k: 'out', v: '  contact      display contact intel' },
        { k: 'out', v: '  clear        clear terminal' },
        { k: 'blk' },
        { k: 'dim', v: '  // Hint: this is a real shell. Try ls, ps, neofetch...' },
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
        { k: 'out', v: '  [ACTIVE]  BTL1  — Blue Team Level 1' },
        { k: 'out', v: '  [ACTIVE]  BSc Computer Science — Univ. of Lincoln' },
        { k: 'out', v: '  [------]  Additional certifications in progress...' },
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

    projects: () => [
        { k: 'hdr', v: '┌─ PROJECTS.GIT ─────────────────────────────┐' },
        { k: 'blk' },
        { k: 'out', v: '  >> samhoughton.github.io' },
        { k: 'out', v: '     Cyber-ops themed interactive portfolio' },
        { k: 'out', v: '     Terminal engine, live threat map, Canvas API animations' },
        { k: 'dim', v: '     Stack: HTML · CSS · Vanilla JS · Canvas API' },
        { k: 'dim', v: '     [ github.com/SamHoughton/SamHoughton.github.io ]' },
        { k: 'blk' },
        { k: 'out', v: '  >> dyslexia-extension  [BSc Dissertation]' },
        { k: 'out', v: '     Chrome extension improving readability for users with dyslexia' },
        { k: 'out', v: '     University of Lincoln — BSc Computer Science, 2019' },
        { k: 'dim', v: '     Stack: Chrome Extension API · JavaScript · CSS' },
        { k: 'dim', v: '     [ github.com/SamHoughton ]' },
        { k: 'blk' },
        { k: 'dim', v: '  // More at: github.com/SamHoughton' },
        { k: 'blk' },
    ],

    cv: () => 'CV',
    clear:        () => 'CLEAR',
    'threat-map': () => 'THREAT_MAP',
    scan:         () => 'ASYNC',
    hunt:         () => 'ASYNC',
    status:       () => 'ASYNC',
    ioc:          () => 'ASYNC',
    decode:       () => 'ASYNC',
    ssh:          () => 'ASYNC',

    // ── Shell Easter Eggs ──────────────────────────────────────
    sudo: () => [
        { k: 'out',  v: '  [sudo] password for sam: ' },
        { k: 'out',  v: '  ·······' },
        { k: 'warn', v: '  [!] Privilege escalation attempt detected' },
        { k: 'warn', v: '  [!] CrowdStrike alert raised — Incident #IR-2026-0042 opened' },
        { k: 'dim',  v: '  // Nice try.' },
        { k: 'blk' },
    ],
    pwd:  () => [{ k: 'out', v: '  /home/sam/defence/operations' }, { k: 'blk' }],
    date: () => [{ k: 'out', v: `  ${new Date().toUTCString()}` }, { k: 'blk' }],
    cd:   () => [
        { k: 'out', v: "  cd: can't navigate away — you're already at the core." },
        { k: 'dim', v: '  // Location: /home/sam/defence/operations' },
        { k: 'blk' },
    ],
    exit: () => [
        { k: 'dim', v: '  logout' },
        { k: 'dim', v: '  [Connection to sam@defence closed]' },
        { k: 'blk' },
        { k: 'out', v: '  ...' },
        { k: 'out', v: '  Just kidding. The terminal persists.' },
        { k: 'blk' },
    ],
    ps:  () => [
        { k: 'out', v: `  ${'PID'.padEnd(7)} ${'USER'.padEnd(15)} ${'CPU'.padEnd(6)} ${'MEM'.padEnd(6)} COMMAND` },
        { k: 'out', v: '  ' + '─'.repeat(56) },
        { k: 'out', v: '  1       root            0.0    0.1    /sbin/init' },
        { k: 'out', v: '  411     root            0.0    0.2    sshd' },
        { k: 'out', v: '  844     crowdstrike     2.1    1.4    falcond  [EDR ACTIVE]' },
        { k: 'out', v: '  912     sam             0.3    0.5    siem-agent' },
        { k: 'out', v: '  1024    sam             0.1    0.2    bash' },
        { k: 'out', v: '  1337    sam             0.0    0.1    threat-hunt-daemon' },
        { k: 'out', v: '  2048    sam             0.5    0.8    csirt-terminal' },
        { k: 'dim', v: '  [204 processes hidden by security policy]' },
        { k: 'blk' },
    ],
    ifconfig: () => [
        { k: 'out', v: '  eth0    inet 10.0.0.42       netmask 255.255.255.0  [UP]' },
        { k: 'out', v: '          ether aa:bb:cc:dd:ee:ff  mtu 1500' },
        { k: 'blk' },
        { k: 'out', v: '  lo      inet 127.0.0.1       netmask 255.0.0.0     [LOOPBACK]' },
        { k: 'blk' },
        { k: 'out', v: '  vpn0    inet 172.16.0.1      netmask 255.255.255.0  [ENCRYPTED]' },
        { k: 'out', v: '          tunnel: AES-256-GCM   status: ACTIVE' },
        { k: 'blk' },
    ],
    history:  () => 'HISTORY',
    reboot:   () => 'REBOOT',
    ls:       () => 'ASYNC',
    cat:      () => 'ASYNC',
    uname:    () => 'ASYNC',
    ping:     () => 'ASYNC',
    vim:      () => 'ASYNC',
    neofetch: () => 'ASYNC',
    man:      () => 'ASYNC',
    ip:       () => 'ASYNC',
};

// ── Async Command Runner ────────────────────────────────────────
async function runAsyncCmd(baseCmd, args, term) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function tl(type, text = '', ms = 45) {
        term.addLine(type, text);
        term.scroll();
        if (ms > 0) await sleep(ms);
    }

    switch (baseCmd) {

    case 'scan': {
        const a = args[0] || `10.${randInt(0,9)}.0.0/24`;
        const base = a.split('.').slice(0, 2).join('.');
        const suspiciousIP = `${base}.0.${randInt(100, 220)}`;
        const hosts = [
            { ip: `${base}.0.1`,                 os: 'Windows Server 2022',  ports: '80/http  443/https  3389/rdp',       sus: false },
            { ip: `${base}.0.${randInt(11,49)}`,  os: 'Ubuntu 22.04 LTS',     ports: '22/ssh  8080/http-alt',              sus: false },
            { ip: `${base}.0.${randInt(50,99)}`,  os: 'Windows 11 Pro',        ports: '135/msrpc  445/smb  49152/dynamic', sus: false },
            { ip: suspiciousIP,                   os: '[!] UNKNOWN OS',        ports: `4444/OPEN  ${randInt(1025,9999)}/OPEN`, sus: true },
        ];

        await tl('out', `  [*] CSIRT Scanner v2.4.1 — target: ${a}`, 200);
        await tl('out',  '  [*] Scanning...', 800);
        await tl('blk',  '', 100);
        await tl('out', `  ${'IP'.padEnd(18)} ${'OS'.padEnd(24)} PORTS`, 0);
        await tl('out',  '  ' + '─'.repeat(64), 50);

        for (const h of hosts) {
            await tl(h.sus ? 'warn' : 'out',
                `  ${h.sus ? '[!]' : '[+]'} ${pad(h.ip, 16)} ${pad(h.os, 22)} ${h.ports}`,
                h.sus ? 700 : randInt(200, 400));
        }

        await tl('blk', '', 100);
        await tl('warn', `  [!] ANOMALY: Port 4444 on ${suspiciousIP} — known C2 port`, 200);
        await tl('warn', `  [!] ACTION : Isolate ${suspiciousIP} and investigate immediately`, 0);
        await tl('blk');
        break;
    }

    case 'hunt': {
        const ep    = `ENDPOINT-0${randInt(10,99)}`;
        const ep2   = `ENDPOINT-0${randInt(10,99)}`;
        const hash1 = randHex(12) + '...' + randHex(6);
        const hash2 = randHex(12) + '...' + randHex(6);

        await tl('hdr', '┌─ THREAT HUNT INITIATED ───────────────────┐', 0);
        await tl('blk');
        await tl('out', '  [*] Querying EDR telemetry across all endpoints...', 400);
        await tl('out', '  [*] Cross-referencing MITRE ATT&CK framework...', 500);
        await tl('out', '  [*] Scanning for lateral movement indicators...', 600);
        await tl('out', '  [*] Analysing PowerShell execution history...', 400);
        await tl('blk');

        await tl('warn', `  [!] ANOMALY — ${ep}`, 100);
        await tl('warn', `      Process : svchost.exe → powershell.exe -enc ${randHex(32)}`, 50);
        await tl('warn',  '      MITRE   : T1059.001 — Command & Scripting (PowerShell)', 50);
        await tl('warn',  '      Hash    : ' + hash1, 50);
        await tl('warn',  '      Severity: HIGH', 300);
        await tl('blk');

        await tl('warn', `  [!] ANOMALY — ${ep2}`, 100);
        await tl('warn',  '      Artefact: HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run', 50);
        await tl('warn', `      Value   : WindowsUpdate_${randHex(8)}.exe [SUSPICIOUS]`, 50);
        await tl('warn',  '      MITRE   : T1547.001 — Boot/Logon Autostart Execution', 50);
        await tl('warn',  '      Hash    : ' + hash2, 50);
        await tl('warn',  '      Severity: MEDIUM', 300);
        await tl('blk');

        await tl('out', '  [*] Pivoting on IOCs...', 400);
        await tl('out', '  [+] No confirmed C2 beaconing', 200);
        await tl('out', '  [+] No lateral movement chains confirmed', 200);
        await tl('blk');
        await tl('out', '  [HUNT COMPLETE] 2 anomalies flagged — open incident recommended', 0);
        await tl('blk');
        break;
    }

    case 'status': {
        const now     = new Date();
        const upDays  = randInt(30, 90);
        const upHours = randInt(0, 23);
        const eps     = randInt(200, 300);
        const updated = randInt(2, 30);

        await tl('hdr', '┌─ CSIRT SYSTEM STATUS ──────────────────────┐', 0);
        await tl('blk');
        await tl('out', `  ${'SERVICE'.padEnd(22)} ${'STATUS'.padEnd(14)} DETAIL`, 50);
        await tl('out', '  ' + '─'.repeat(56), 50);

        const services = [
            { name: 'CrowdStrike Falcon',  status: 'RUNNING',   detail: 'v7.14.0' },
            { name: 'SIEM Pipeline',        status: 'STREAMING', detail: `${eps} events/sec` },
            { name: 'Threat Intel Feed',    status: 'LIVE',      detail: `updated ${updated}s ago` },
            { name: 'IR Playbook',          status: 'READY',     detail: 'v3.2' },
            { name: 'Firewall',             status: 'ACTIVE',    detail: `${randInt(1500,2500)} blocks/hr` },
            { name: 'VPN Tunnel',           status: 'SECURE',    detail: 'AES-256-GCM' },
            { name: 'EDR Coverage',         status: '100%',      detail: 'all endpoints' },
        ];

        for (const s of services) {
            await tl('out', `  ${pad(s.name, 22)} [${pad(s.status, 12)}] ${s.detail}`, 80);
        }

        await tl('blk');
        await tl('out', `  Uptime          : ${upDays}d ${upHours}h`, 50);
        await tl('out', `  Open Incidents  : 0`, 50);
        await tl('out', `  Alerts (24h)    : ${randInt(10,20)} HIGH   ${randInt(25,45)} MEDIUM   ${randInt(150,250)} LOW`, 50);
        await tl('out', `  Last IR Action  : ${randInt(3,14)} days ago`, 50);
        await tl('out', `  Time            : ${now.toUTCString()}`, 50);
        await tl('blk');
        break;
    }

    case 'ioc': {
        const ips = [randIP(), randIP(), randIP()];
        const hash1 = randHex(16) + '...' + randHex(8);
        const hash2 = randHex(16) + '...' + randHex(8);

        await tl('hdr', '┌─ INDICATORS OF COMPROMISE ────────────────┐', 0);
        await tl('blk');
        await tl('out', `  ${'TYPE'.padEnd(10)} ${'INDICATOR'.padEnd(36)} CONFIDENCE`, 50);
        await tl('out', '  ' + '─'.repeat(60), 50);

        const iocs = [
            { type: 'IP',     indicator: ips[0],                        conf: 'HIGH' },
            { type: 'IP',     indicator: ips[1],                        conf: 'HIGH' },
            { type: 'IP',     indicator: ips[2],                        conf: 'MEDIUM' },
            { type: 'DOMAIN', indicator: `update-${randHex(4)}-cdn.ru`, conf: 'CRITICAL' },
            { type: 'DOMAIN', indicator: `micros0ft-${randHex(4)}.com`, conf: 'HIGH' },
            { type: 'HASH',   indicator: hash1,                         conf: 'HIGH' },
            { type: 'HASH',   indicator: hash2,                         conf: 'MEDIUM' },
            { type: 'UA',     indicator: `Mozilla/5.0 [C2-sig-${randHex(4)}]`, conf: 'MEDIUM' },
        ];

        for (const ioc of iocs) {
            const isCrit = ioc.conf === 'CRITICAL' || ioc.conf === 'HIGH';
            await tl(isCrit ? 'warn' : 'out',
                `  ${pad(ioc.type, 10)} ${pad(ioc.indicator, 36)} ${ioc.conf}`,
                randInt(60, 120));
        }

        await tl('blk');
        await tl('out', `  Source: CSIRT Threat Intel Feed — updated ${randInt(2,20)}m ago`, 0);
        await tl('blk');
        break;
    }

    case 'decode': {
        const b64 = args.join(' ').trim();
        if (!b64) {
            await tl('err', '  Usage: decode <base64string>', 0);
            await tl('err', '  Example: decode SGVsbG8gV29ybGQ=', 0);
            await tl('blk');
            break;
        }
        await tl('out', '  [*] Decoding...', 300);
        try {
            const decoded = atob(b64);
            await tl('out', `  [+] ${decoded}`, 0);
        } catch (e) {
            await tl('err', '  [!] Error: Invalid base64 string', 0);
        }
        await tl('blk');
        break;
    }

    case 'ssh': {
        const target = args[0] || `${randInt(10,192)}.${randInt(0,254)}.${randInt(0,254)}.${randInt(1,254)}`;
        await tl('out', `  [*] Initiating SSH connection to ${target}...`, 200);
        await tl('out',  '  [*] Resolving hostname...', 400);
        await tl('out', `  [*] Connecting to ${target} port 22...`, 500);
        await tl('out',  '  [*] SSH-2.0-OpenSSH_9.3p1 Ubuntu-1ubuntu3.6', 300);
        await tl('out',  '  [*] Negotiating key exchange (curve25519-sha256)...', 600);
        await tl('out',  '  [*] Host key fingerprint: SHA256:' + randHex(43), 400);
        await tl('out',  '  [*] Authentication: public key...', 500);
        await tl('out', `  [+] Connection established.`, 200);
        await tl('blk');
        await tl('out', `  Last login: ${new Date().toDateString()} from 10.0.0.1`, 100);
        await tl('out', `  sam@${target.replace(/\./g,'-')}:~$ _`, 1500);
        await tl('blk');
        await tl('dim', '  [Session timeout — connection closed]', 0);
        await tl('blk');
        break;
    }

    // ── Easter Eggs ──────────────────────────────────────────────

    case 'ls': {
        const longFlag = args.includes('-la') || args.includes('-l') || args.includes('-a');
        await tl('out', '  .', 0);
        if (longFlag) {
            const files = [
                'drwxr-x---  sam  defence  .',
                'drwxr-x---  root root     ..',
                '-rw-r-----  sam  defence  about.txt',
                '-rw-r-----  sam  defence  certs.json',
                '-rw-------  sam  defence  flag.txt',
                '-rwxr-x---  sam  defence  deploy.sh',
                'drwx------  sam  defence  incidents/',
                '-rw-------  sam  defence  ioc_feed.json',
                'drwxr-x---  sam  defence  playbooks/',
                '-rw-r-----  sam  defence  skills.json',
                'drwx------  sam  defence  .ssh/',
            ];
            await tl('out', `  ${'PERM'.padEnd(18)} ${'USER'.padEnd(6)} ${'GROUP'.padEnd(10)} NAME`, 0);
            await tl('out', '  ' + '─'.repeat(52), 50);
            for (const f of files) await tl('out', `  ${f}`, 40);
        } else {
            const items = ['about.txt', 'certs.json', 'deploy.sh', 'flag.txt', 'incidents/', 'ioc_feed.json', 'playbooks/', 'skills.json'];
            await tl('out', '  ' + items.join('   '), 0);
        }
        await tl('blk');
        break;
    }

    case 'cat': {
        const file = args[0] || '';
        if (!file) {
            await tl('err', '  cat: missing file argument', 0);
            await tl('dim', '  // Try: cat flag.txt  |  cat about.txt  |  cat /etc/passwd', 0);
            await tl('blk');
            break;
        }
        if (file === 'flag.txt') {
            await tl('out', '  [*] Reading flag.txt...', 300);
            await tl('blk');
            await tl('hdr', '  flag{y0u_f0und_th3_h1dd3n_t3rm1nal_g00d_hunt}', 0);
            await tl('blk');
            await tl('dim', '  // Achievement unlocked: Terminal Explorer', 0);
            await tl('blk');
        } else if (file === 'about.txt') {
            await tl('out', '  Samuel Houghton — Staff CSIRT Engineering Manager', 0);
            await tl('out', '  OVO Energy // London, England', 0);
            await tl('out', '  Expert in Incident Response, CrowdStrike EDR, SIEM operations.', 0);
            await tl('out', '  5+ years defending enterprise infrastructure.', 0);
            await tl('blk');
        } else if (file === 'skills.json' || file === 'certs.json') {
            await tl('out', `  [*] cat ${file}`, 200);
            await tl('out', '  [!] File encrypted — use CSIRT keystore to access', 0);
            await tl('dim', '  // Use the skills command instead.', 0);
            await tl('blk');
        } else if (file === '/etc/passwd' || file === 'ioc_feed.json') {
            await tl('out', `  [*] cat ${file}`, 100);
            await tl('warn', '  [!] Access denied — file contains classified material', 0);
            await tl('warn', '  [!] Unauthorised read attempt logged', 0);
            await tl('dim', '  // CrowdStrike Falcon: file access policy triggered', 0);
            await tl('blk');
        } else {
            await tl('err', `  cat: ${file}: No such file or directory`, 0);
            await tl('blk');
        }
        break;
    }

    case 'uname': {
        const aFlag = args.includes('-a') || args.includes('-all');
        if (aFlag) {
            await tl('out', '  CSIRT-Linux sam-defence 4.2.0-crowdstrike-falcon #1 SMP ' + new Date().toDateString() + ' x86_64 GNU/Linux', 0);
        } else {
            await tl('out', '  CSIRT-Linux', 0);
        }
        await tl('blk');
        break;
    }

    case 'ping': {
        const host = args[0] || 'localhost';
        await tl('out', `  PING ${host}: 56 data bytes`, 200);
        await tl('out', `  Request timeout for icmp_seq 0`, 700);
        await tl('out', `  Request timeout for icmp_seq 1`, 700);
        await tl('out', `  Request timeout for icmp_seq 2`, 700);
        await tl('blk');
        await tl('dim', `  // Outbound ICMP blocked by perimeter firewall.`, 0);
        await tl('dim', `  // Try: threat-map for a visual network view.`, 0);
        await tl('blk');
        break;
    }

    case 'vim': {
        await tl('out', '  Opening vim...', 300);
        await tl('blk');
        await tl('out', '  -- INSERT --', 400);
        await tl('out', '  ^C^C:q!:wq!^D^D:x!ZZQ', 800);
        await tl('blk');
        await tl('out', '  Still in vim? Perfectly understandable.', 400);
        await tl('out', '  Type :q! to exit. Or :wq. Or just wait.', 400);
        await tl('out', "  We've got time.", 800);
        await tl('blk');
        await tl('dim', '  [vim process terminated by CrowdStrike EDR]', 0);
        await tl('blk');
        break;
    }

    case 'neofetch': {
        const logo = [
            '  ╔═══════════════╗',
            '  ║               ║',
            '  ║   >_ CSIRT    ║',
            '  ║   ENGINEERING ║',
            '  ║               ║',
            '  ╚═══════════════╝',
            '                   ',
        ];
        const info = [
            'sam@defence',
            '─'.repeat(28),
            'OS      : CSIRT Linux 5.0 LTS',
            'Host    : Samuel Houghton',
            'Kernel  : 4.2.0-crowdstrike-falcon',
            'Uptime  : 5+ years in security',
            'Shell   : bash 5.2.15',
            'CPU     : CSIRT_CORE @ 4.2GHz (x8)',
            'Memory  : 65536 MiB DDR5 ECC',
            'Disk    : /dev/nvme0 [AES-256]',
            'EDR     : CrowdStrike Falcon [ACTIVE]',
            'SIEM    : [STREAMING]',
            'VPN     : AES-256-GCM [SECURE]',
        ];
        await tl('blk');
        const rows = Math.max(logo.length, info.length);
        for (let i = 0; i < rows; i++) {
            const l = (logo[i] || '                   ').padEnd(20);
            const r = info[i] || '';
            await tl(i < 2 ? 'out' : i === 2 ? 'hdr' : 'out', l + '  ' + r, 55);
        }
        await tl('blk');
        break;
    }

    case 'man': {
        const topic = args[0] || '';
        if (!topic) {
            await tl('err', '  man: what manual page do you want?', 0);
            await tl('blk');
            break;
        }
        await tl('hdr', `  MAN(1)            CSIRT Terminal Manual Pages            MAN(1)`, 0);
        await tl('blk');
        await tl('out', `  NAME`, 0);
        await tl('out', `       ${topic} — CSIRT command`, 0);
        await tl('blk');
        await tl('out', `  DESCRIPTION`, 0);
        await tl('out', `       This is a CSIRT operations terminal. Commands are purpose-built`, 0);
        await tl('out', `       for cyber defence and are not documented in standard man pages.`, 0);
        await tl('blk');
        await tl('out', `  BUGS`, 0);
        await tl('out', `       You're not in Kansas anymore.`, 0);
        await tl('blk');
        await tl('out', `  SEE ALSO`, 0);
        await tl('out', `       help(1), whoami(1), threat-map(1), neofetch(1)`, 0);
        await tl('blk');
        break;
    }

    case 'ip': {
        const sub = args[0];
        if (sub === 'a' || sub === 'addr') {
            await tl('out', '  1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536', 0);
            await tl('out', '      inet 127.0.0.1/8 scope host lo', 0);
            await tl('blk');
            await tl('out', '  2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500', 0);
            await tl('out', '      link/ether aa:bb:cc:dd:ee:ff', 0);
            await tl('out', '      inet 10.0.0.42/24 brd 10.0.0.255 scope global eth0', 0);
            await tl('blk');
            await tl('out', '  3: vpn0: <POINTOPOINT,UP,LOWER_UP> mtu 1420', 0);
            await tl('out', '      inet 172.16.0.1/24 scope global vpn0  [AES-256-GCM]', 0);
            await tl('blk');
        } else {
            await tl('err', `  ip: unknown subcommand '${sub || ''}'`, 0);
            await tl('dim', '  // Try: ip a', 0);
            await tl('blk');
        }
        break;
    }

    }
}

// ── Terminal Class ─────────────────────────────────────────────
class Terminal {
    constructor() {
        this.outputEl = document.getElementById('terminal-output');
        this.inputEl  = document.getElementById('terminal-input');
        this.bodyEl   = document.getElementById('terminal-body');
        this.history  = [];
        this.histIdx  = -1;
        this.busy     = false;

        this.inputEl.addEventListener('keydown', e => this.onKey(e));
        this.bodyEl.addEventListener('click', () => this.inputEl.focus());
    }

    onKey(e) {
        if (this.busy && e.key !== 'Tab') return;

        if (e.key === 'Enter') {
            const raw   = this.inputEl.value.trim();
            const parts = raw.toLowerCase().split(/\s+/);
            const cmd   = parts[0];
            const args  = parts.slice(1);
            if (cmd) {
                this.history.unshift(raw);
                this.histIdx = -1;
                this.run(cmd, raw, args);
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
            this.autocomplete(this.inputEl.value.trim().toLowerCase().split(/\s+/)[0]);
        }
    }

    autocomplete(partial) {
        if (!partial) return;
        const match = Object.keys(COMMANDS).find(k => k.startsWith(partial));
        if (match) this.inputEl.value = match;
    }

    run(cmd, raw, args = []) {
        this.addLine('cmd', `sam@defence:~$ ${raw}`);

        // echo handled inline — needs raw args
        if (cmd === 'echo') {
            this.addLine('out', '  ' + args.join(' '));
            this.addLine('blk');
            this.scroll();
            return;
        }

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
        if (result === 'CV') {
            this.addLine('out', '  Opening LinkedIn profile...');
            this.addLine('blk');
            this.scroll();
            setTimeout(() => window.open('https://www.linkedin.com/in/sam-houghton-31274150/', '_blank', 'noopener'), 400);
            return;
        }
        if (result === 'HISTORY') {
            const h = [...this.history].reverse();
            if (h.length === 0) {
                this.addLine('out', '  No commands in history.');
            } else {
                h.forEach((c, i) => this.addLine('out', `  ${String(i + 1).padStart(4)}  ${c}`));
            }
            this.addLine('blk');
            this.scroll();
            return;
        }

        if (result === 'REBOOT') {
            this.addLine('out', '  [*] Initiating system reboot...');
            this.addLine('dim', '  Broadcast message from sam@defence: system is going down NOW');
            this.scroll();
            setTimeout(() => {
                this.outputEl.innerHTML = '';
                const screen = document.getElementById('boot-screen');
                const bootText = document.getElementById('boot-text');
                bootText.innerHTML = '';
                screen.style.display = 'flex';
                screen.style.opacity = '1';
                screen.classList.remove('fade-out');
                runBoot();
            }, 1000);
            return;
        }

        if (result === 'ASYNC') {
            this.busy = true;
            this.inputEl.style.opacity = '0.3';
            runAsyncCmd(cmd, args, this).finally(() => {
                this.busy = false;
                this.inputEl.style.opacity = '1';
                this.inputEl.focus();
            });
            return;
        }

        result.forEach(r => {
            if (r.k === 'hdr') this.addLine('hdr', r.v);
            else if (r.k === 'out') this.addLine('out', r.v);
            else if (r.k === 'blk') this.addLine('blk');
            else if (r.k === 'bar') this.addLine('bar', `  ${r.v} [${makeBar(r.p)}] ${r.p}%`);
        });

        this.scroll();
    }

    addLine(type, text = '') {
        const span = document.createElement('span');
        span.className = `t-line t-${type}`;
        span.textContent = text;
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
            "  Try: whoami  |  threat-map  |  neofetch  |  hunt",
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
                setTimeout(() => { screen.style.display = 'none'; initSite(); }, 650);
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
    const canvas   = document.getElementById('matrix-canvas');
    const ctx      = canvas.getContext('2d');
    const chars    = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ∑∆≠≈';
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
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const b = e.target;
                setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 150);
                obs.unobserve(b);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.sk-fill').forEach(b => obs.observe(b));
}

// ── World Map ──────────────────────────────────────────────────
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
        if (g.type === 'Polygon')      drawRing(g.coordinates[0]);
        else if (g.type === 'MultiPolygon') g.coordinates.forEach(p => drawRing(p[0]));
    });
    ctx.restore();
}

// ── Threat Map ─────────────────────────────────────────────────
const TARGET = { name: 'LONDON', lat: 51.51, lng: -0.12 };
let tmRunning = false;
let tmRaf     = null;
let tmBlockedCount = 1893;

function ll2xy(lat, lng, w, h) {
    return { x: (lng + 180) * (w / 360), y: (90 - lat) * (h / 180) };
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
    const startBlocked  = tmBlockedCount;
    const startThreats  = 247;
    const elsT = document.getElementById('s-threats');
    const elsB = document.getElementById('s-blocked');
    let t = 0;
    function tick() {
        t++;
        if (t <= 80) {
            elsT.textContent = Math.round((t / 80) * startThreats);
            elsB.textContent = Math.round((t / 80) * startBlocked);
            requestAnimationFrame(tick);
        } else {
            elsT.textContent = startThreats;
            elsB.textContent = startBlocked;
        }
    }
    tick();
}

function animateThreatMap(canvas) {
    const ctx = canvas.getContext('2d');
    const w   = canvas.width;
    const h   = canvas.height;
    const tgt = ll2xy(TARGET.lat, TARGET.lng, w, h);

    const MAX_ARCS = 7;
    const MIN_ARCS = 3;

    function makeArc(node) {
        const g = rand(THREAT_GROUPS);
        return {
            src:      ll2xy(node.lat, node.lng, w, h),
            color:    g.color,
            name:     node.name,
            group:    g.name,
            progress: Math.random(),
            speed:    0.002 + Math.random() * 0.0025,
            opacity:  0,
        };
    }

    // Start with 5 random arcs from a shuffled pool
    const shuffled = [...THREAT_POOL].sort(() => Math.random() - 0.5);
    const arcs = shuffled.slice(0, 5).map(n => { const a = makeArc(n); a.opacity = 1; return a; });

    const flashes = [];

    // Spawn timer — fires every 5-10 seconds
    let lastSpawn    = Date.now();
    let nextSpawnIn  = randInt(5000, 10000);

    function spawnNewThreat() {
        const usedNames = new Set(arcs.map(a => a.name));
        const available = THREAT_POOL.filter(n => !usedNames.has(n.name));
        if (!available.length) return;

        const node = rand(available);

        // If at max, intercept + remove a random existing arc first
        if (arcs.length >= MAX_ARCS) {
            const idx  = randInt(0, arcs.length - 1);
            const gone = arcs.splice(idx, 1)[0];
            flashes.push({ text: `>> INTERCEPTED: ${gone.name}`, life: 1.0, x: tgt.x + 12, y: tgt.y + randInt(-40, 40), color: '#00ff41' });
            tmBlockedCount += randInt(1, 4);
            document.getElementById('s-blocked').textContent = tmBlockedCount;
        }

        const arc = makeArc(node);
        arcs.push(arc);

        // Flash near new source city
        flashes.push({ text: `>> NEW THREAT: ${node.name}`, life: 1.2, x: arc.src.x + 7, y: arc.src.y - 12, color: arc.color });

        // Bump threat counter
        if (Math.random() > 0.35) {
            const el = document.getElementById('s-threats');
            el.textContent = parseInt(el.textContent) + randInt(1, 3);
        }

        lastSpawn   = Date.now();
        nextSpawnIn = randInt(5000, 10000);
    }

    // Dot grid
    const dotGrid = [];
    for (let gx = 0; gx < w; gx += 22)
        for (let gy = 0; gy < h; gy += 22)
            dotGrid.push({ x: gx, y: gy });

    function quadPoint(t, sx, sy, cx, cy, tx, ty) {
        const mt = 1 - t;
        return { x: mt*mt*sx + 2*mt*t*cx + t*t*tx, y: mt*mt*sy + 2*mt*t*cy + t*t*ty };
    }

    function frame() {
        if (!tmRunning) return;

        // Spawn check
        if (Date.now() - lastSpawn >= nextSpawnIn) spawnNewThreat();
        if (arcs.length < MIN_ARCS) spawnNewThreat();

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

        // Grid lines
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

        drawLand(ctx, w, h);

        // Arcs
        arcs.forEach(arc => {
            // Fade in new arcs
            if (arc.opacity < 1) arc.opacity = Math.min(1, arc.opacity + 0.025);

            arc.progress += arc.speed;

            if (arc.progress >= 1) {
                arc.progress -= 1;
                // Intercept flash on each arrival
                flashes.push({ text: `>> INTERCEPTED: ${arc.name}`, life: 1.0, x: tgt.x + 12, y: tgt.y + randInt(-40, 40), color: '#00ff41' });
                tmBlockedCount += randInt(1, 4);
                document.getElementById('s-blocked').textContent = tmBlockedCount;
            }

            const sx = arc.src.x, sy = arc.src.y;
            const tx = tgt.x,     ty = tgt.y;
            const cx = (sx + tx) / 2;
            const cy = Math.min(sy, ty) - Math.abs(tx - sx) * 0.28;

            const end   = arc.progress;
            const start = Math.max(0, end - 0.25);

            // Trail
            ctx.beginPath();
            for (let s = 0; s <= 50; s++) {
                const t = start + (end - start) * (s / 50);
                const p = quadPoint(t, sx, sy, cx, cy, tx, ty);
                s === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = arc.color;
            ctx.globalAlpha = 0.6 * arc.opacity;
            ctx.lineWidth   = 1;
            ctx.stroke();
            ctx.globalAlpha = arc.opacity;

            // Head
            const head = quadPoint(end, sx, sy, cx, cy, tx, ty);
            ctx.beginPath();
            ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle   = arc.color;
            ctx.shadowBlur  = 10;
            ctx.shadowColor = arc.color;
            ctx.fill();
            ctx.shadowBlur  = 0;

            // Source dot
            ctx.beginPath();
            ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
            ctx.fillStyle   = arc.color;
            ctx.shadowBlur  = 8;
            ctx.shadowColor = arc.color;
            ctx.fill();
            ctx.shadowBlur  = 0;

            // Labels
            ctx.font      = '9px Share Tech Mono';
            ctx.fillStyle = arc.color;
            ctx.fillText(arc.name,  sx + 7, sy - 4);
            ctx.fillStyle = 'rgba(200,220,200,0.45)';
            ctx.fillText(arc.group, sx + 7, sy + 7);
            ctx.globalAlpha = 1;
        });

        // Flashes
        for (let i = flashes.length - 1; i >= 0; i--) {
            const f = flashes[i];
            f.life -= 0.016;
            if (f.life <= 0) { flashes.splice(i, 1); continue; }
            ctx.save();
            ctx.globalAlpha = Math.min(1, f.life * 2);
            ctx.fillStyle   = f.color || '#00ff41';
            ctx.font        = 'bold 9px Share Tech Mono';
            ctx.shadowBlur  = 6;
            ctx.shadowColor = f.color || '#00ff41';
            ctx.fillText(f.text, f.x, f.y);
            ctx.restore();
        }

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
        ctx.fillStyle   = '#00ff41';
        ctx.shadowBlur  = 20;
        ctx.shadowColor = '#00ff41';
        ctx.fill();
        ctx.shadowBlur  = 0;

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
            Object.assign(links.style, {
                flexDirection: 'column',
                position:      'absolute',
                top:           '52px',
                right:         '20px',
                background:    'rgba(8,8,8,0.97)',
                border:        '1px solid rgba(0,255,65,0.2)',
                padding:       '12px 24px',
                gap:           '14px',
            });
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
