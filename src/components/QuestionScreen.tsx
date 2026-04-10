import { useState, useEffect, useCallback } from 'react'
import { questions } from '../data/questions'

interface Props {
  onAnswer: (questionIndex: number, optionIndex: number) => void
  onComplete: () => void
}

const MODEL_NAMES = ['摸鱼玄学', '内卷经', '社畜魂', '表演术', '逃离计划', '精神状态']

// Per-model verdicts based on "intensity" (how many extreme answers)
// [low, medium, high] messages per model
const MODEL_VERDICTS: Record<string, [string, string, string]> = {
  '摸鱼玄学': [
    '你居然在认真上班？少见。',
    '摸鱼段位：黄金。还有提升空间。',
    '摸鱼段位：王者。你是带薪休假。',
  ],
  '内卷经': [
    '卷度检测：几乎为零。你很懂生活。',
    '选择性内卷。该卷的时候不含糊。',
    '检测到高危卷王基因。建议体检。',
  ],
  '社畜魂': [
    '社畜纯度偏低。你有自己的想法。',
    '标准打工人配置。不卑不亢。',
    '服从性拉满。老板看了都感动。',
  ],
  '表演术': [
    '你不太会演。但真诚也是竞争力。',
    '职场表演系进修中。有潜力。',
    '影帝级。建议转行当演员。',
  ],
  '逃离计划': [
    '你似乎没什么逃离的念头？可疑。',
    '一只脚在公司，一只脚在外面。',
    '逃离倒计时已启动。随时准备跑。',
  ],
  '精神状态': [
    '精神状态良好。请问你是怎么做到的。',
    '有一定程度的班味感染。正常水平。',
    '班味浓度超标。建议立刻休假。',
  ],
}

const OPTION_SCORES = [2, 3, 5, 6]

export default function QuestionScreen({ onAnswer, onComplete }: Props) {
  const [current, setCurrent] = useState(0)
  const [localAnswers, setLocalAnswers] = useState<(number | null)[]>(
    () => new Array(questions.length).fill(null)
  )
  const [shuffledOrders] = useState<number[][]>(() =>
    questions.map(() => {
      const order = [0, 1, 2, 3]
      for (let i = 3; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]]
      }
      return order
    })
  )
  const [isLocked, setIsLocked] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'in' | 'out'>('in')
  const [transition, setTransition] = useState<{ model: string; verdict: string; index: number } | null>(null)
  const [shownTransitions] = useState(() => new Set<number>())

  const q = questions[current]
  const progress = (current / questions.length) * 100
  const currentAnswer = localAnswers[current]

  useEffect(() => {
    if (transition) return
    setDirection('in')
    setAnimating(true)
    const t = setTimeout(() => {
      setAnimating(false)
      setIsLocked(false)   // unlock only AFTER fade-in completes
    }, 300)
    return () => clearTimeout(t)
  }, [current, transition])

  // Compute model verdict based on intensity of answers
  const getModelVerdict = useCallback((modelIdx: number) => {
    const startQ = modelIdx * 6
    let highCount = 0
    for (let i = startQ; i < startQ + 6; i++) {
      const ans = localAnswers[i]
      if (ans !== null && OPTION_SCORES[ans] >= 5) highCount++
    }
    const model = MODEL_NAMES[modelIdx]
    const verdicts = MODEL_VERDICTS[model]
    if (highCount >= 4) return verdicts[2]
    if (highCount >= 2) return verdicts[1]
    return verdicts[0]
  }, [localAnswers])

  function handleSelect(idx: number) {
    if (isLocked) return
    setIsLocked(true)
    setLocalAnswers(prev => {
      const next = [...prev]
      next[current] = idx
      return next
    })
    onAnswer(current, idx)

    setTimeout(() => {
      setDirection('out')
      setAnimating(true)
      setTimeout(() => {
        const nextQ = current + 1

        // Check if we just completed a model (every 6 questions)
        if (nextQ < questions.length && nextQ % 6 === 0 && !shownTransitions.has(nextQ / 6)) {
          const modelIdx = nextQ / 6 - 1
          shownTransitions.add(nextQ / 6)
          const verdict = getModelVerdict(modelIdx)
          setTransition({
            model: MODEL_NAMES[modelIdx],
            verdict,
            index: modelIdx + 1,
          })
        } else if (nextQ >= questions.length && !shownTransitions.has(6)) {
          // All done — show last model transition then complete
          shownTransitions.add(6)
          const modelIdx = 5
          const verdict = getModelVerdict(modelIdx)
          setTransition({
            model: MODEL_NAMES[modelIdx],
            verdict,
            index: 6,
          })
        } else if (nextQ >= questions.length) {
          onComplete()
        } else {
          setCurrent(nextQ)
          // isLocked stays true — unlocked by fade-in useEffect
        }
      }, 250)
    }, 350)
  }

  // Auto-dismiss transition after delay
  useEffect(() => {
    if (!transition) return
    const t = setTimeout(() => {
      const nextQ = transition.index * 6
      if (nextQ >= questions.length) {
        onComplete()
      } else {
        setTransition(null)
        setCurrent(nextQ)
        // isLocked stays true — unlocked by fade-in useEffect
      }
    }, 2200)
    return () => clearTimeout(t)
  }, [transition, onComplete])

  function handleBack() {
    if (current === 0 || isLocked || transition) return
    setIsLocked(true)
    setDirection('out')
    setAnimating(true)
    setTimeout(() => {
      setCurrent(c => c - 1)
      // isLocked stays true — unlocked by fade-in useEffect
    }, 250)
  }

  const modelColors: Record<string, string> = {
    '摸鱼玄学': '#f0883e',
    '内卷经':   '#f47067',
    '社畜魂':   '#8b949e',
    '表演术':   '#d2a8ff',
    '逃离计划': '#3fb950',
    '精神状态': '#58a6ff',
  }

  // ── Transition interstitial ──
  if (transition) {
    const color = modelColors[transition.model] || '#f0883e'
    return (
      <div className="screen question-screen">
        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${(transition.index / 6) * 100}%` }} />
          </div>
          <span className="progress-label">{transition.index} / 6 模块</span>
        </div>

        <div className="transition-card fade-in">
          <div className="transition-check" style={{ borderColor: color, color }}>&#10003;</div>
          <div className="transition-model" style={{ color }}>{transition.model}</div>
          <div className="transition-status">数据采集完成</div>
          <div className="transition-verdict">{transition.verdict}</div>
          <div className="transition-dots">
            {MODEL_NAMES.map((_, i) => (
              <span
                key={i}
                className={`transition-dot ${i < transition.index ? 'done' : ''}`}
                style={i < transition.index ? { background: modelColors[MODEL_NAMES[i]] } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Normal question ──
  const color = modelColors[q.model] || '#f0883e'

  return (
    <div className="screen question-screen">
      <div className="progress-bar-wrap">
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-label">{current + 1} / {questions.length}</span>
      </div>

      <div className={`question-card ${animating ? (direction === 'in' ? 'fade-in' : 'fade-out') : ''}`}>
        <div className="question-meta">
          <button
            className="btn-prev"
            onClick={handleBack}
            disabled={current === 0 || isLocked}
            aria-label="上一题"
          >
            ← 反悔
          </button>
          <span className="model-badge" style={{ color, borderColor: color }}>
            {q.model}
          </span>
          <span className="dim-label">{q.dimension}</span>
        </div>

        <p className="question-number">Q{current + 1}</p>
        <p className="question-text">{q.text}</p>

        <div className="options-list">
          {shuffledOrders[current].map((origIdx, displayPos) => (
            <button
              key={origIdx}
              className={`option-btn ${currentAnswer === origIdx ? 'selected' : ''}`}
              onClick={() => handleSelect(origIdx)}
              disabled={isLocked}
            >
              <span className="option-letter">{String.fromCharCode(65 + displayPos)}</span>
              <span className="option-text">{q.options[origIdx]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
