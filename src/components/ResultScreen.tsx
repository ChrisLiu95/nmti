import type { Profile } from '../types'
import { MODELS } from '../utils/scoring'
import type { MatchResult } from '../utils/scoring'
import { Avatar } from '../data/avatars'

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
  const r = result.personality
  const isHidden = r.isSpecial

  const strengths = profile
    .map((tier, i) => ({ tier, tag: DIM_TAGS[i] }))
    .filter(d => d.tier === 'H')

  const lowDims = profile
    .map((tier, i) => ({ tier, tag: DIM_TAGS[i] }))
    .filter(d => d.tier === 'L')
    .slice(0, 4)

  function handleShare() {
    const text = `【NMTI 牛马型人格测试】\n我的牛马人格是 ${r.code}（${r.name}）· 匹配度 ${result.matchPct}%\n"${r.tagline}"\n来测测你是哪种牛马 →`
    if (navigator.share) {
      navigator.share({ title: 'NMTI 牛马型人格测试', text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text)
        .then(() => alert('已复制到剪贴板！发给你的同事看看吧'))
        .catch(() => alert('复制失败，请手动复制分享文案'))
    }
  }

  return (
    <div className="screen result-screen">
      <div className="result-content">
        {/* Report header */}
        <div className="report-header">
          <span className="report-stamp">NMTI</span>
          <span className="report-title">牛马绩效评定报告</span>
        </div>

        {isHidden && (
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
          <div className="result-match">匹配度 {result.matchPct}%</div>
        </div>

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

        {/* Growth */}
        <div className="growth-block">
          <div className="growth-label">HR 温馨提示</div>
          <p className="growth-text">{r.growth}</p>
        </div>

        {/* Top 3 matches */}
        {topMatches.length > 1 && (
          <div className="top-matches-block">
            <div className="analysis-label">你的牛马基因组成</div>
            {topMatches.map((m, i) => (
              <div key={m.personality.code} className={`top-match-row ${i === 0 ? 'top-match-primary' : ''}`}>
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
          <button className="btn-share" onClick={handleShare}>
            转发气同事
          </button>
          <button className="btn-restart" onClick={onRestart}>
            不服再测
          </button>
        </div>
      </div>
    </div>
  )
}
