import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuestionScreen from './components/QuestionScreen'
import ResultScreen from './components/ResultScreen'
import GalleryScreen from './components/GalleryScreen'
import { buildProfile, findPersonality, findTopMatches } from './utils/scoring'
import type { MatchResult } from './utils/scoring'
import type { Profile } from './types'
import './App.css'

type Screen = 'welcome' | 'questions' | 'calculating' | 'result' | 'gallery'

const CALC_MESSAGES = [
  '正在提取你的剩余价值...',
  '正在与 HR 数据库交叉比对...',
  '正在计算你的摸鱼段位...',
  '正在评估你的班味浓度...',
  '正在匹配 28 种牛马基因...',
  '报告生成中，请勿关闭页面...',
]

function CalcScreen() {
  const [msgIdx, setMsgIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => (i + 1) % CALC_MESSAGES.length), 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="screen calculating-screen">
      <div className="calculating-content">
        <div className="spinner" />
        <p className="calc-text">{CALC_MESSAGES[msgIdx]}</p>
        <p className="calc-sub">牛马绩效评定系统 v2.0</p>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<MatchResult | null>(null)
  const [topMatches, setTopMatches] = useState<MatchResult[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)

  function handleStart() {
    setAnswers([])
    setScreen('questions')
  }

  function handleGallery() { setScreen('gallery') }
  function handleBackFromGallery() { setScreen('welcome') }

  function handleAnswer(questionIndex: number, optionIndex: number) {
    setAnswers(prev => {
      const next = [...prev]
      next[questionIndex] = optionIndex
      return next
    })
  }

  function handleComplete() {
    setScreen('calculating')
    setTimeout(() => {
      const finalAnswers = [...answers]
      const p = buildProfile(finalAnswers)
      const r = findPersonality(p, finalAnswers)
      const top = findTopMatches(p, finalAnswers, 3)
      setProfile(p)
      setResult(r)
      setTopMatches(top)
      setScreen('result')
    }, 2800)
  }

  function handleRestart() {
    setScreen('welcome')
    setResult(null)
    setTopMatches([])
    setProfile(null)
    setAnswers([])
  }

  return (
    <div className="app">
      {screen === 'welcome' && <WelcomeScreen onStart={handleStart} onGallery={handleGallery} />}
      {screen === 'gallery' && <GalleryScreen onBack={handleBackFromGallery} />}
      {screen === 'questions' && (
        <QuestionScreen
          onAnswer={handleAnswer}
          onComplete={handleComplete}
        />
      )}
      {screen === 'calculating' && <CalcScreen />}
      {screen === 'result' && result && profile && (
        <ResultScreen
          result={result}
          topMatches={topMatches}
          profile={profile}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}
