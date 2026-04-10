import { useState, useRef } from 'react'
import type { Profile } from '../types'
import { MODELS } from '../utils/scoring'
import type { MatchResult } from '../utils/scoring'
import { Avatar } from '../data/avatars'
import ShareCard from './ShareCard'

interface Props {
  result: MatchResult
  topMatches: MatchResult[]
  profile: Profile
  onRestart: () => void
}

const TIER_LABEL: Record<string, string> = { L: '低', M: '中', H: '高' }
const TIER_CLASS: Record<string, string> = { L: 'tier-l', M: 'tier-m', H: 'tier-h' }
const modelColors = ['#f0883e', '#f47067', '#8b949e', '#d2a8ff', '#3fb950', '#58a6ff']

const DIM_TAGS = [
  '摸鱼技术', '摸鱼心安', '时间感知', '卷度', '加班意愿', '竞争意识',
  '服从性', 'PUA 抗性', '忍耐力', '向上管理', '会议表现', '人设经营',
  '跳槽冲动', '副业执念', '躺平指数', '班味浓度', '精神内耗', '下班仪式',
]

// Model-level one-liner summaries based on H/M/L averages
const MODEL_SUMMARIES: Record<string, Record<string, string>> = {
  '摸鱼玄学': { H: '摸鱼技术拉满，带薪休假实锤', M: '偶尔摸摸，还算有分寸', L: '你是真的在认真上班' },
  '内卷经':   { H: '卷到飞起，建议关注体检报告', M: '选择性内卷，该卷的时候卷', L: '躺得很平，心态很好' },
  '社畜魂':   { H: '老板最爱的那种员工', M: '正常打工人的服从度', L: '有反骨，不好忽悠' },
  '表演术':   { H: '会议影帝，汇报鬼才', M: '偶尔演一下，不算夸张', L: '不太会演，但至少真诚' },
  '逃离计划': { H: '一只脚已经在门外了', M: '在走与留之间反复横跳', L: '暂时没有逃跑计划' },
  '精神状态': { H: '班味浓度超标，建议休假', M: '有点疲惫但还扛得住', L: '精神状态出奇地好' },
}

function getModelLevel(profile: Profile, modelIdx: number): 'H' | 'M' | 'L' {
  let score = 0
  for (let i = 0; i < 3; i++) {
    const tier = profile[modelIdx * 3 + i]
    score += tier === 'H' ? 2 : tier === 'M' ? 1 : 0
  }
  if (score >= 4) return 'H'
  if (score >= 2) return 'M'
  return 'L'
}

export default function ResultScreen({ result, topMatches, profile, onRestart }: Props) {
  const [viewIdx, setViewIdx] = useState(0)
  const [showShareCard, setShowShareCard] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const viewing = topMatches[viewIdx] || result
  const r = viewing.personality
  const isHidden = r.isSpecial
  const isPrimary = viewIdx === 0

  const strengths = profile
    .map((tier, i) => ({ tier, tag: DIM_TAGS[i] }))
    .filter(d => d.tier === 'H')

  const lowDims = profile
    .map((tier, i) => ({ tier, tag: DIM_TAGS[i] }))
    .filter(d => d.tier === 'L')
    .slice(0, 4)

  function handleViewSwitch(idx: number) {
    setViewIdx(idx)
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <div className="screen result-screen">
      <div className="result-content" ref={topRef}>
        {/* Report header */}
        <div className="report-header">
          <span className="report-stamp">NMTI</span>
          <span className="report-title">牛马绩效评定报告</span>
        </div>

        {!isPrimary && (
          <button className="back-primary-btn" onClick={() => handleViewSwitch(0)}>
            ← 返回我的结果
          </button>
        )}

        {isHidden && isPrimary && (
          <div className="hidden-badge">隐藏牛马解锁</div>
        )}

        {/* Avatar */}
        <div className="result-avatar">
          <Avatar code={r.code} size={120} />
        </div>

        {/* Code + Name + Match */}
        <div className="result-code-wrap">
          <div className="result-code">{r.code}</div>
          <div className="result-name">{r.name}</div>
          <div className="result-match">匹配度 {viewing.matchPct}%</div>
        </div>

        {r.rarity != null && (
          <div className="rarity-badge">
            {r.rarity < 1 ? '隐藏款' : r.rarity < 3 ? '稀有款' : r.rarity < 5 ? '经典款' : '路人款'}
            {' · 仅 '}{r.rarity < 0.1 ? '<0.1' : r.rarity}{'% 的牛马是这种'}
          </div>
        )}

        <div className="result-tagline">"{r.tagline}"</div>

        {/* Description */}
        <div className="result-section">
          <div className="section-label">综合评价</div>
          <div className="result-desc">
            <p>{r.description}</p>
          </div>
        </div>

        {/* Model-level summaries */}
        <div className="model-summary-block">
          <div className="analysis-label">六维扫描结果</div>
          <div className="model-summary-list">
            {MODELS.map((model, mi) => {
              const level = getModelLevel(profile, mi)
              const summary = MODEL_SUMMARIES[model.name]?.[level] || ''
              return (
                <div key={model.name} className="model-summary-row">
                  <span className="model-summary-name" style={{ color: modelColors[mi] }}>{model.name}</span>
                  <span className="model-summary-text">{summary}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tags */}
        {strengths.length > 0 && (
          <div className="analysis-block">
            <div className="analysis-label">突出特征</div>
            <div className="tag-row">
              {strengths.map(d => (
                <span key={d.tag} className="tag-high">{d.tag}</span>
              ))}
            </div>
          </div>
        )}

        {lowDims.length > 0 && (
          <div className="analysis-block">
            <div className="analysis-label">完全不在乎</div>
            <div className="tag-row">
              {lowDims.map(d => (
                <span key={d.tag} className="tag-low">{d.tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* Workplace Relationships */}
        {(r.soulmate || r.nemesis) && (
          <div className="relations-block">
            <div className="analysis-label">职场关系</div>
            {r.soulmate && (
              <div className="relation-row">
                <div className="relation-icon">💚</div>
                <div className="relation-info">
                  <div className="relation-label">灵魂牛友</div>
                  <div className="relation-name">{r.soulmate}</div>
                  <div className="relation-reason">{r.soulmateReason}</div>
                </div>
              </div>
            )}
            {r.nemesis && (
              <div className="relation-row">
                <div className="relation-icon">🔥</div>
                <div className="relation-info">
                  <div className="relation-label">职场天敌</div>
                  <div className="relation-name">{r.nemesis}</div>
                  <div className="relation-reason">{r.nemesisReason}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Growth */}
        <div className="growth-block">
          <div className="growth-label">HR 温馨提示</div>
          <p className="growth-text">{r.growth}</p>
        </div>

        {/* Top 3 matches */}
        {topMatches.length > 1 && (
          <div className="top-matches-block">
            <div className="analysis-label">你的牛马基因组成</div>
            <div className="analysis-hint">点击查看完整分析</div>
            {topMatches.map((m, i) => (
              <div
                key={m.personality.code}
                className={`top-match-row ${i === viewIdx ? 'top-match-active' : ''}`}
                onClick={() => handleViewSwitch(i)}
              >
                <div className="top-match-rank">#{i + 1}</div>
                <div className="top-match-avatar">
                  <Avatar code={m.personality.code} size={32} />
                </div>
                <div className="top-match-info">
                  <span className="top-match-code">{m.personality.code}</span>
                  <span className="top-match-name">{m.personality.name}</span>
                </div>
                <div className="top-match-bar-wrap">
                  <div className="top-match-bar" style={{ width: `${m.matchPct}%` }} />
                </div>
                <div className="top-match-pct">{m.matchPct}%</div>
              </div>
            ))}
          </div>
        )}

        {/* Dimension grid */}
        <div className="profile-grid">
          <h3 className="profile-title">18 维牛马图谱</h3>
          {MODELS.map((model, mi) => (
            <div key={model.name} className="model-section">
              <div className="model-section-title" style={{ color: modelColors[mi] }}>
                {model.name}
              </div>
              <div className="dims-row">
                {model.dimensions.map((dim, di) => {
                  const dimIndex = mi * 3 + di
                  const tier = profile[dimIndex]
                  return (
                    <div key={dim} className="dim-item">
                      <span className="dim-name">{dim}</span>
                      <span className={`dim-tier ${TIER_CLASS[tier]}`}>{TIER_LABEL[tier]}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="report-disclaimer">
          以上报告纯属虚构，如有雷同说明你确实是这种牛马
        </div>

        {/* Actions */}
        <div className="result-actions">
          <button className="btn-share" onClick={() => setShowShareCard(true)}>
            生成分享卡片
          </button>
          <button className="btn-restart" onClick={onRestart}>
            不服再测
          </button>
        </div>

        {showShareCard && (
          <ShareCard result={result} profile={profile} onClose={() => setShowShareCard(false)} />
        )}
      </div>
    </div>
  )
}
