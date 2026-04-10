// Abstract SVG avatars for each NMTI personality type
// Theme: office life, corporate objects, geometric metaphors

export function Avatar({ code, size = 80 }: { code: string; size?: number }) {
  const map: Record<string, () => React.JSX.Element> = {
    '996X': Type996X,
    FISH:   Fish,
    QUIT:   Quit,
    PPT:    Ppt,
    GRND:   Grnd,
    WOLF:   Wolf,
    PUNK:   Punk,
    FAKE:   Fake,
    SIDE:   Side,
    FLAT:   Flat,
    JUMP:   Jump,
    COPE:   Cope,
    BURN:   Burn,
    VIBE:   Vibe,
    MASK:   Mask,
    LEAN:   Lean,
    GOLD:   Gold,
    FREE:   Free,
    MONK:   Monk,
    ZOOM:   Zoom,
    FOMO:   Fomo,
    TOOL:   Tool,
    SLAV:   Slav,
    PLAN:   Plan,
    IDOL:   Idol,
    FIRE:   Fire,
    NEET:   Neet,
    AI:     Ai,
  }
  const Comp = map[code] ?? Fallback
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Comp />
    </svg>
  )
}

// ── 996X 卷王之王: burning clock ─────────────────────────────────
function Type996X() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f47067" opacity="0.1"/>
    <circle cx="50" cy="50" r="30" stroke="#f47067" strokeWidth="3" fill="#1a0a08"/>
    <line x1="50" y1="50" x2="50" y2="28" stroke="#f47067" strokeWidth="3" strokeLinecap="round"/>
    <line x1="50" y1="50" x2="68" y2="50" stroke="#f0883e" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="3" fill="#f47067"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
      const r = deg * Math.PI / 180
      return <line key={deg} x1={50+26*Math.cos(r)} y1={50+26*Math.sin(r)} x2={50+30*Math.cos(r)} y2={50+30*Math.sin(r)} stroke="#f47067" strokeWidth="1.5"/>
    })}
    {[[35,18],[65,18],[78,30]].map(([x,y],i) =>
      <path key={i} d={`M${x-4} ${y} Q${x} ${y-6} ${x+4} ${y}`} stroke="#f47067" strokeWidth="2" fill="none" opacity={0.7-i*0.15}/>
    )}
  </>
}

// ── FISH 摸鱼宗师: fish with tie ──────────────────────────────────
function Fish() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#58a6ff" opacity="0.1"/>
    <ellipse cx="48" cy="52" rx="28" ry="16" fill="#58a6ff" fillOpacity="0.3" stroke="#58a6ff" strokeWidth="2"/>
    <path d="M76 52 L90 38 L90 66 Z" fill="#58a6ff" fillOpacity="0.5"/>
    <circle cx="32" cy="48" r="4" fill="#58a6ff"/>
    <circle cx="31" cy="47" r="1.5" fill="#0f0f0f"/>
    <path d="M48 60 L48 75 L44 68 L52 68 Z" fill="#f0883e" opacity="0.8"/>
  </>
}

// ── QUIT 精神离职人: empty chair ──────────────────────────────────
function Quit() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#8b8685" opacity="0.08"/>
    <rect x="30" y="35" width="40" height="35" rx="3" fill="#2a2a2a" stroke="#555" strokeWidth="1.5"/>
    <rect x="34" y="28" width="32" height="12" rx="2" fill="#2a2a2a" stroke="#555" strokeWidth="1.5"/>
    <line x1="38" y1="70" x2="34" y2="85" stroke="#555" strokeWidth="2"/>
    <line x1="62" y1="70" x2="66" y2="85" stroke="#555" strokeWidth="2"/>
    <circle cx="50" cy="78" r="5" stroke="#555" strokeWidth="1.5" fill="none"/>
    <path d="M42 48 Q50 42 58 48" stroke="#555" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
  </>
}

// ── PPT 汇报型人才: presentation screen ──────────────────────────
function Ppt() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#d2a8ff" opacity="0.1"/>
    <rect x="15" y="20" width="70" height="48" rx="4" fill="#1a1a1a" stroke="#d2a8ff" strokeWidth="2"/>
    <rect x="15" y="20" width="70" height="10" rx="4" fill="#d2a8ff" fillOpacity="0.3"/>
    <line x1="50" y1="68" x2="50" y2="82" stroke="#d2a8ff" strokeWidth="2"/>
    <line x1="35" y1="82" x2="65" y2="82" stroke="#d2a8ff" strokeWidth="2"/>
    <rect x="22" y="38" width="24" height="3" rx="1" fill="#d2a8ff" opacity="0.7"/>
    <rect x="22" y="45" width="18" height="3" rx="1" fill="#d2a8ff" opacity="0.5"/>
    <rect x="22" y="52" width="28" height="3" rx="1" fill="#d2a8ff" opacity="0.3"/>
    {[[68,42],[72,50],[60,52],[76,46]].map(([x,y],i) =>
      <rect key={i} x={x} y={y} width="6" height={14-i*3} fill="#d2a8ff" fillOpacity={0.4+i*0.1} rx="1"/>
    )}
  </>
}

// ── GRND 老黄牛: ox silhouette ───────────────────────────────────
function Grnd() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f0883e" opacity="0.08"/>
    <ellipse cx="50" cy="55" rx="30" ry="18" fill="#f0883e" fillOpacity="0.2" stroke="#f0883e" strokeWidth="2"/>
    <path d="M22 48 Q18 35 25 30" stroke="#f0883e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M78 48 Q82 35 75 30" stroke="#f0883e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="38" cy="50" r="2.5" fill="#f0883e"/>
    <circle cx="48" cy="50" r="2.5" fill="#f0883e"/>
    <line x1="30" y1="70" x2="30" y2="82" stroke="#f0883e" strokeWidth="3" strokeLinecap="round"/>
    <line x1="70" y1="70" x2="70" y2="82" stroke="#f0883e" strokeWidth="3" strokeLinecap="round"/>
  </>
}

// ── WOLF 狼性战士: wolf fangs ────────────────────────────────────
function Wolf() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f47067" opacity="0.1"/>
    <path d="M20 65 L50 25 L80 65" stroke="#f47067" strokeWidth="3" fill="#f47067" fillOpacity="0.15"/>
    <path d="M20 65 L15 30" stroke="#f47067" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M80 65 L85 30" stroke="#f47067" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="42" cy="50" r="4" fill="#f47067"/>
    <circle cx="58" cy="50" r="4" fill="#f47067"/>
    <path d="M38 62 L42 70 L46 62" fill="#fff" fillOpacity="0.8"/>
    <path d="M54 62 L58 70 L62 62" fill="#fff" fillOpacity="0.8"/>
  </>
}

// ── PUNK 职场叛逆者: raised fist ─────────────────────────────────
function Punk() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#3fb950" opacity="0.1"/>
    <rect x="38" y="30" width="24" height="35" rx="6" fill="#3fb950" fillOpacity="0.3" stroke="#3fb950" strokeWidth="2.5"/>
    <rect x="38" y="65" width="24" height="12" rx="3" fill="#3fb950" fillOpacity="0.2" stroke="#3fb950" strokeWidth="2"/>
    <line x1="44" y1="42" x2="44" y2="55" stroke="#3fb950" strokeWidth="1.5" opacity="0.5"/>
    <line x1="50" y1="40" x2="50" y2="55" stroke="#3fb950" strokeWidth="1.5" opacity="0.5"/>
    <line x1="56" y1="42" x2="56" y2="55" stroke="#3fb950" strokeWidth="1.5" opacity="0.5"/>
    {[[30,22],[70,22],[50,15]].map(([x,y],i) =>
      <line key={i} x1="50" y1="30" x2={x} y2={y} stroke="#3fb950" strokeWidth="1.5" opacity={0.6-i*0.1}/>
    )}
  </>
}

// ── FAKE 装忙艺术家: mask ────────────────────────────────────────
function Fake() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#ffa657" opacity="0.1"/>
    <path d="M25 45 Q50 20 75 45 Q75 75 50 80 Q25 75 25 45 Z" fill="#ffa657" fillOpacity="0.15" stroke="#ffa657" strokeWidth="2"/>
    <circle cx="38" cy="48" r="5" fill="none" stroke="#ffa657" strokeWidth="2"/>
    <circle cx="62" cy="48" r="5" fill="none" stroke="#ffa657" strokeWidth="2"/>
    <path d="M38 65 Q50 73 62 65" stroke="#ffa657" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <line x1="36" y1="48" x2="40" y2="48" stroke="#ffa657" strokeWidth="2"/>
    <line x1="60" y1="48" x2="64" y2="48" stroke="#ffa657" strokeWidth="2"/>
  </>
}

// ── SIDE 副业达人: split screen ──────────────────────────────────
function Side() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#3fb950" opacity="0.1"/>
    <rect x="12" y="25" width="35" height="50" rx="3" fill="#2a2a2a" stroke="#555" strokeWidth="1.5"/>
    <rect x="53" y="25" width="35" height="50" rx="3" fill="#1f1510" stroke="#f0883e" strokeWidth="1.5"/>
    <line x1="18" y1="38" x2="38" y2="38" stroke="#555" strokeWidth="1.5"/>
    <line x1="18" y1="44" x2="32" y2="44" stroke="#555" strokeWidth="1.5"/>
    <line x1="60" y1="38" x2="78" y2="38" stroke="#f0883e" strokeWidth="1.5"/>
    <line x1="60" y1="44" x2="72" y2="44" stroke="#f0883e" strokeWidth="1.5"/>
    <circle cx="30" cy="58" r="5" fill="#555" fillOpacity="0.3"/>
    <text x="65" y="60" fill="#f0883e" fontSize="14" fontFamily="monospace">$</text>
  </>
}

// ── FLAT 躺平大师: horizontal figure ─────────────────────────────
function Flat() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#8b8685" opacity="0.08"/>
    <line x1="15" y1="55" x2="85" y2="55" stroke="#555" strokeWidth="1" strokeDasharray="4 4"/>
    <circle cx="25" cy="52" r="8" fill="#8b8685" fillOpacity="0.3" stroke="#8b8685" strokeWidth="1.5"/>
    <ellipse cx="55" cy="52" rx="25" ry="6" fill="#8b8685" fillOpacity="0.15" stroke="#8b8685" strokeWidth="1.5"/>
    <text x="42" y="72" fill="#555" fontSize="8" fontFamily="sans-serif">zzZ</text>
  </>
}

// ── JUMP 跳槽永动机: bouncing arrow ─────────────────────────────
function Jump() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#d2a8ff" opacity="0.1"/>
    {[20,40,60,80].map((x,i) =>
      <rect key={i} x={x-6} y="55" width="12" height="25" rx="2" fill="#d2a8ff" fillOpacity={0.15+i*0.08} stroke="#d2a8ff" strokeWidth="1"/>
    )}
    <path d="M20 50 Q30 20 40 45 Q50 15 60 40 Q70 10 80 35" stroke="#d2a8ff" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M76 30 L82 35 L78 40" stroke="#d2a8ff" strokeWidth="2" fill="none"/>
  </>
}

// ── COPE 内耗之王: tangled mind ──────────────────────────────────
function Cope() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#58a6ff" opacity="0.1"/>
    <circle cx="50" cy="45" r="22" fill="none" stroke="#58a6ff" strokeWidth="2"/>
    <path d="M35 45 Q42 30 50 45 Q58 60 65 45" stroke="#58a6ff" strokeWidth="2" fill="none"/>
    <path d="M30 50 Q45 35 50 55 Q55 35 70 50" stroke="#58a6ff" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M32 40 Q50 55 68 40" stroke="#58a6ff" strokeWidth="1.5" fill="none" opacity="0.3"/>
    <circle cx="50" cy="75" r="3" fill="#58a6ff" opacity="0.6"/>
    <line x1="50" y1="67" x2="50" y2="72" stroke="#58a6ff" strokeWidth="1.5" opacity="0.6"/>
  </>
}

// ── BURN 燃尽战士: dying flame ───────────────────────────────────
function Burn() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f47067" opacity="0.08"/>
    <path d="M50 80 Q35 55 42 40 Q45 30 50 20 Q55 30 58 40 Q65 55 50 80 Z" fill="#f47067" fillOpacity="0.15" stroke="#f47067" strokeWidth="2"/>
    <path d="M50 80 Q42 65 46 55 Q48 48 50 40" stroke="#f0883e" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <line x1="42" y1="70" x2="42" y2="78" stroke="#555" strokeWidth="1" opacity="0.5" strokeDasharray="2 2"/>
    <line x1="58" y1="70" x2="58" y2="78" stroke="#555" strokeWidth="1" opacity="0.5" strokeDasharray="2 2"/>
    <circle cx="50" cy="22" r="3" fill="#f47067" opacity="0.4"/>
  </>
}

// ── VIBE 氛围组组长: party hat ───────────────────────────────────
function Vibe() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#ffa657" opacity="0.1"/>
    <path d="M50 15 L30 60 L70 60 Z" fill="#ffa657" fillOpacity="0.25" stroke="#ffa657" strokeWidth="2"/>
    <circle cx="50" cy="15" r="4" fill="#ffa657"/>
    <ellipse cx="50" cy="62" rx="25" ry="5" fill="#ffa657" fillOpacity="0.2"/>
    {[[38,28,1],[55,35,0.7],[42,45,0.5]].map(([x,y,o],i) =>
      <circle key={i} cx={x} cy={y} r="2.5" fill="#f47067" opacity={o as number}/>
    )}
    {[[58,25,1],[45,40,0.6],[60,48,0.4]].map(([x,y,o],i) =>
      <circle key={`b${i}`} cx={x} cy={y} r="2" fill="#d2a8ff" opacity={o as number}/>
    )}
  </>
}

// ── MASK 职场变脸王: two-face ────────────────────────────────────
function Mask() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#d2a8ff" opacity="0.1"/>
    <line x1="50" y1="18" x2="50" y2="82" stroke="#2a2a2a" strokeWidth="1"/>
    <circle cx="50" cy="48" r="26" fill="none" stroke="#d2a8ff" strokeWidth="2"/>
    <circle cx="40" cy="42" r="3" fill="#3fb950"/>
    <path d="M34 56 Q40 62 46 56" stroke="#3fb950" strokeWidth="2" fill="none"/>
    <circle cx="60" cy="42" r="3" fill="#f47067"/>
    <path d="M54 56 Q60 50 66 56" stroke="#f47067" strokeWidth="2" fill="none"/>
  </>
}

// ── LEAN 极简牛马: minimal box ───────────────────────────────────
function Lean() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#8b8685" opacity="0.05"/>
    <rect x="30" y="30" width="40" height="40" rx="2" stroke="#8b8685" strokeWidth="2" fill="none"/>
    <line x1="38" y1="45" x2="52" y2="45" stroke="#8b8685" strokeWidth="2"/>
    <line x1="38" y1="52" x2="48" y2="52" stroke="#8b8685" strokeWidth="2" opacity="0.5"/>
    <circle cx="60" cy="60" r="3" fill="#3fb950" opacity="0.6"/>
  </>
}

// ── GOLD 镀金选手: trophy ────────────────────────────────────────
function Gold() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#ffa657" opacity="0.1"/>
    <path d="M35 25 L35 50 Q35 65 50 65 Q65 65 65 50 L65 25 Z" fill="#ffa657" fillOpacity="0.2" stroke="#ffa657" strokeWidth="2"/>
    <path d="M35 30 Q20 30 20 42 Q20 52 35 50" stroke="#ffa657" strokeWidth="2" fill="none"/>
    <path d="M65 30 Q80 30 80 42 Q80 52 65 50" stroke="#ffa657" strokeWidth="2" fill="none"/>
    <line x1="50" y1="65" x2="50" y2="75" stroke="#ffa657" strokeWidth="2.5"/>
    <rect x="38" y="75" width="24" height="6" rx="2" fill="#ffa657" fillOpacity="0.4"/>
  </>
}

// ── FREE 下班战神: door/exit ─────────────────────────────────────
function Free() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#3fb950" opacity="0.1"/>
    <rect x="30" y="18" width="30" height="64" rx="2" fill="#1a1a1a" stroke="#3fb950" strokeWidth="2"/>
    <circle cx="54" cy="50" r="2.5" fill="#3fb950"/>
    <path d="M62 40 L78 50 L62 60" stroke="#3fb950" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="66" y1="50" x2="85" y2="50" stroke="#3fb950" strokeWidth="2.5" strokeLinecap="round"/>
  </>
}

// ── MONK 佛系牛马: zen circle ────────────────────────────────────
function Monk() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#8b8685" opacity="0.05"/>
    <path d="M18 50 Q18 18 50 18 Q82 18 82 50 Q82 82 50 82 Q25 82 20 55" stroke="#8b8685" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="4" fill="#8b8685" fillOpacity="0.4"/>
  </>
}

// ── ZOOM 线上隐身人: camera off ──────────────────────────────────
function Zoom() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#555" opacity="0.08"/>
    <rect x="20" y="28" width="48" height="44" rx="4" fill="#1a1a1a" stroke="#555" strokeWidth="2"/>
    <path d="M68 40 L85 28 L85 72 L68 60 Z" fill="#555" fillOpacity="0.3" stroke="#555" strokeWidth="1.5"/>
    <line x1="25" y1="32" x2="63" y2="68" stroke="#f47067" strokeWidth="2.5"/>
    <circle cx="44" cy="50" r="8" stroke="#555" strokeWidth="1.5" fill="none" strokeDasharray="3 3"/>
  </>
}

// ── FOMO 焦虑打工人: exclamation marks ──────────────────────────
function Fomo() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#ffa657" opacity="0.1"/>
    {[30,50,70].map((x,i) => <>
      <line key={`l${i}`} x1={x} y1={25+i*5} x2={x} y2={55+i*3} stroke="#ffa657" strokeWidth={3-i*0.5} strokeLinecap="round" opacity={1-i*0.2}/>
      <circle key={`c${i}`} cx={x} cy={62+i*3} r={2.5-i*0.3} fill="#ffa657" opacity={1-i*0.2}/>
    </>)}
  </>
}

// ── TOOL 职场工具人: wrench ──────────────────────────────────────
function Tool() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#8b8685" opacity="0.08"/>
    <path d="M35 25 Q30 35 35 40 L60 65 Q65 70 72 70 Q82 70 82 60 Q82 53 75 53 L45 32 Q40 25 35 25 Z" fill="#8b8685" fillOpacity="0.2" stroke="#8b8685" strokeWidth="2"/>
    <circle cx="78" cy="62" r="6" fill="none" stroke="#8b8685" strokeWidth="2"/>
    <line x1="38" y1="28" x2="48" y2="35" stroke="#8b8685" strokeWidth="2.5"/>
  </>
}

// ── SLAV 驯服良马: harness/reins ────────────────────────────────
function Slav() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f0883e" opacity="0.08"/>
    <ellipse cx="50" cy="50" rx="28" ry="20" fill="none" stroke="#f0883e" strokeWidth="2"/>
    <line x1="22" y1="50" x2="8" y2="35" stroke="#f0883e" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="78" y1="50" x2="92" y2="35" stroke="#f0883e" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="50" cy="45" r="3" fill="#f0883e" opacity="0.6"/>
    <path d="M38 55 Q50 65 62 55" stroke="#f0883e" strokeWidth="1.5" fill="none" opacity="0.4"/>
  </>
}

// ── PLAN 永远在准备: checklist ───────────────────────────────────
function Plan() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#58a6ff" opacity="0.1"/>
    <rect x="25" y="18" width="50" height="64" rx="3" fill="#1a1a1a" stroke="#58a6ff" strokeWidth="1.5"/>
    {[30,42,54,66].map((y,i) => <>
      <rect key={`b${i}`} x="32" y={y} width="8" height="8" rx="1.5" stroke="#58a6ff" strokeWidth="1.5" fill="none" opacity={0.3+i*0.05}/>
      <line key={`l${i}`} x1="44" y1={y+4} x2={60+i*2} y2={y+4} stroke="#58a6ff" strokeWidth="1.5" opacity={0.3+i*0.05}/>
    </>)}
    <text x="60" y="82" fill="#555" fontSize="8" fontFamily="sans-serif">...</text>
  </>
}

// ── IDOL 团队顶梁柱: pillar ─────────────────────────────────────
function Idol() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#f0883e" opacity="0.1"/>
    <rect x="40" y="20" width="20" height="60" rx="2" fill="#f0883e" fillOpacity="0.2" stroke="#f0883e" strokeWidth="2"/>
    <line x1="15" y1="45" x2="40" y2="45" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <line x1="60" y1="45" x2="85" y2="45" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <line x1="15" y1="55" x2="40" y2="55" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <line x1="60" y1="55" x2="85" y2="55" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <path d="M35 20 L50 12 L65 20" stroke="#f0883e" strokeWidth="2" fill="none"/>
  </>
}

// ── FIRE 财务自由: wings/freedom ────────────────────────────────
function Fire() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#ffa657" opacity="0.1"/>
    <circle cx="50" cy="45" r="12" fill="#ffa657" fillOpacity="0.3" stroke="#ffa657" strokeWidth="2"/>
    <path d="M38 42 Q25 30 15 38 Q22 42 30 40" fill="#ffa657" fillOpacity="0.4"/>
    <path d="M62 42 Q75 30 85 38 Q78 42 70 40" fill="#ffa657" fillOpacity="0.4"/>
    <path d="M38 48 Q25 55 18 50 Q24 52 30 48" fill="#ffa657" fillOpacity="0.3"/>
    <path d="M62 48 Q75 55 82 50 Q76 52 70 48" fill="#ffa657" fillOpacity="0.3"/>
    <text x="44" y="49" fill="#ffa657" fontSize="12" fontFamily="monospace">$</text>
  </>
}

// ── NEET 根本没在上班: empty desk ───────────────────────────────
function Neet() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#555" opacity="0.05"/>
    <line x1="15" y1="55" x2="85" y2="55" stroke="#555" strokeWidth="2"/>
    <rect x="30" y="45" width="18" height="10" rx="2" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <rect x="55" y="42" width="14" height="13" rx="1" fill="none" stroke="#555" strokeWidth="1.5" strokeDasharray="3 3"/>
    <line x1="20" y1="55" x2="20" y2="75" stroke="#555" strokeWidth="2"/>
    <line x1="80" y1="55" x2="80" y2="75" stroke="#555" strokeWidth="2"/>
    <text x="38" y="38" fill="#555" fontSize="9" fontFamily="sans-serif">404</text>
  </>
}

// ── AI 被AI替代了: robot face ────────────────────────────────────
function Ai() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#58a6ff" opacity="0.1"/>
    <rect x="28" y="28" width="44" height="44" rx="10" fill="#1a1a1a" stroke="#58a6ff" strokeWidth="2"/>
    <rect x="36" y="40" width="8" height="8" rx="2" fill="#58a6ff"/>
    <rect x="56" y="40" width="8" height="8" rx="2" fill="#58a6ff"/>
    <line x1="40" y1="58" x2="60" y2="58" stroke="#58a6ff" strokeWidth="2"/>
    <line x1="44" y1="58" x2="44" y2="62" stroke="#58a6ff" strokeWidth="1.5"/>
    <line x1="50" y1="58" x2="50" y2="62" stroke="#58a6ff" strokeWidth="1.5"/>
    <line x1="56" y1="58" x2="56" y2="62" stroke="#58a6ff" strokeWidth="1.5"/>
    <line x1="50" y1="18" x2="50" y2="28" stroke="#58a6ff" strokeWidth="2"/>
    <circle cx="50" cy="16" r="3" fill="#58a6ff"/>
  </>
}

function Fallback() {
  return <>
    <circle cx="50" cy="50" r="44" fill="#555" opacity="0.08"/>
    <text x="50" y="56" textAnchor="middle" fill="#555" fontSize="14" fontFamily="monospace">?</text>
  </>
}
