import type { DimScore, Profile } from '../types'
import { personalities } from '../data/personalities'

// A=2, B=3, C=5, D=6
const OPTION_SCORES = [2, 3, 5, 6]

// Build the display profile (L/M/H) for the result screen
export function buildProfile(answers: number[]): Profile {
  const profile: Profile = []
  for (let dim = 0; dim < 18; dim++) {
    const q1 = answers[dim * 2]
    const q2 = answers[dim * 2 + 1]
    const sum = OPTION_SCORES[q1] + OPTION_SCORES[q2]
    profile.push(scoreToTier(sum))
  }
  return profile
}

// Build a continuous profile (0-2 scale) for more precise matching
// This preserves finer granularity than L/M/H bucketing
// sum range: 4-12 → normalized to 0-2
function buildRawProfile(answers: number[]): number[] {
  const raw: number[] = []
  for (let dim = 0; dim < 18; dim++) {
    const q1 = answers[dim * 2]
    const q2 = answers[dim * 2 + 1]
    const sum = OPTION_SCORES[q1] + OPTION_SCORES[q2]
    raw.push((sum - 4) / 4) // 4→0, 8→1, 12→2
  }
  return raw
}

function scoreToTier(sum: number): DimScore {
  if (sum <= 5) return 'L'
  if (sum <= 8) return 'M'
  return 'H'
}

function tierToNum(t: DimScore): number {
  return t === 'L' ? 0 : t === 'M' ? 1 : 2
}

// Probability-weighted distance: normalizes by expected random distance per tier
// so that M-heavy profiles don't dominate just because M is statistically common.
//
// Under uniform answering (scores {2,3,5,6}):
//   E[|raw − 0|] = 1.0     (L target — far from center)
//   E[|raw − 1|] = 0.4375  (M target — near center, easy to match by chance)
//   E[|raw − 2|] = 1.0     (H target — far from center)
//
// Dividing by E[d] normalizes expected distance to 1.0 per dim for all tiers.
const TIER_WEIGHT: Record<DimScore, number> = { L: 1 / 1.0, M: 1 / 0.4375, H: 1 / 1.0 }

function continuousDistance(rawProfile: number[], typeProfile: Profile): number {
  return rawProfile.reduce(
    (sum, val, i) => {
      const tier = typeProfile[i]
      return sum + TIER_WEIGHT[tier] * Math.abs(val - tierToNum(tier))
    },
    0
  )
}

// Max weighted distance ≈ 18 * 2 * max(weight) ≈ 18 * 2 * 2.286 ≈ 82.3
// Use a representative max so matchPct stays meaningful
const MAX_DISTANCE = 18 * 2 * (1 / 0.4375)

// FIRE: financially free
function isFIRE(profile: Profile): boolean {
  return profile[12] === 'L' && profile[13] === 'L' && profile[14] === 'L'
      && profile[15] === 'L' && profile[16] === 'L' && profile[7] === 'H'
}

// NEET: not actually working
// Must also be 躺平H(14) to distinguish from FISH/SIDE/ZOOM who share H fishing + L grind
function isNEET(profile: Profile): boolean {
  return profile[0] === 'H' && profile[1] === 'H' && profile[15] === 'L'
      && profile[3] === 'L' && profile[4] === 'L' && profile[14] === 'H'
}

// AI: replaced by AI
function isAI(profile: Profile): boolean {
  return profile[14] === 'H' && profile[0] === 'H'
      && profile[9] === 'H' && profile[10] === 'H' && profile[13] === 'H'
}

export interface MatchResult {
  personality: typeof personalities[number]
  matchPct: number
}

export function findPersonality(profile: Profile, answers: number[]): MatchResult {
  // Check special types first (use L/M/H profile)
  if (isFIRE(profile)) {
    return { personality: personalities.find(p => p.code === 'FIRE')!, matchPct: 99 }
  }
  if (isNEET(profile)) {
    return { personality: personalities.find(p => p.code === 'NEET')!, matchPct: 99 }
  }
  if (isAI(profile)) {
    return { personality: personalities.find(p => p.code === 'AI')!, matchPct: 99 }
  }

  // Use continuous raw scores for more precise matching
  const rawProfile = buildRawProfile(answers)
  const standard = personalities.filter(p => !p.isSpecial)
  const ranked = standard
    .map(p => ({ p, d: continuousDistance(rawProfile, p.profile) }))
    .sort((a, b) => a.d - b.d)

  const best = ranked[0]
  const matchPct = Math.round((1 - best.d / MAX_DISTANCE) * 100)

  return { personality: best.p, matchPct }
}

export function findTopMatches(_profile: Profile, answers: number[], count = 3): MatchResult[] {
  const rawProfile = buildRawProfile(answers)
  const standard = personalities.filter(p => !p.isSpecial)
  const ranked = standard
    .map(p => ({ p, d: continuousDistance(rawProfile, p.profile) }))
    .sort((a, b) => a.d - b.d)

  return ranked.slice(0, count).map(r => ({
    personality: r.p,
    matchPct: Math.round((1 - r.d / MAX_DISTANCE) * 100),
  }))
}

export const MODELS = [
  { name: '摸鱼玄学', dimensions: ['摸鱼技术', '摸鱼心安度', '时间扭曲力'] },
  { name: '内卷经',   dimensions: ['卷度', '加班意愿', '竞争意识'] },
  { name: '社畜魂',   dimensions: ['服从性', 'PUA 抗性', '忍耐阈值'] },
  { name: '表演术',   dimensions: ['向上管理', '会议表演力', '人设经营'] },
  { name: '逃离计划', dimensions: ['跳槽冲动', '副业执念', '躺平指数'] },
  { name: '精神状态', dimensions: ['班味浓度', '精神内耗', '下班仪式感'] },
]
