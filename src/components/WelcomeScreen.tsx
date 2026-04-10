interface Props {
  onStart: () => void
  onGallery: () => void
}

export default function WelcomeScreen({ onStart, onGallery }: Props) {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })

  return (
    <div className="screen welcome-screen">
      <div className="email-container">
        {/* Fake status bar */}
        <div className="status-bar">
          <span className="status-time">{timeStr}</span>
          <span className="status-icons">
            <span className="status-wifi">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
            </span>
            <span className="status-battery">87%</span>
          </span>
        </div>

        {/* Email header */}
        <div className="email-header">
          <div className="email-badge">
            <span className="email-badge-icon">NM</span>
          </div>
          <div className="email-meta">
            <div className="email-from">牛马资源部</div>
            <div className="email-addr">hr@niuma.corp</div>
          </div>
          <div className="email-date">{dateStr}</div>
        </div>

        <div className="email-to">
          <span className="email-to-label">收件人：</span>
          <span className="email-to-value">全体牛马</span>
          <span className="email-unread">未读</span>
        </div>

        <div className="email-subject">
          马年到了，测测你是什么品种的牛马
        </div>

        {/* Email body */}
        <div className="email-body">
          <p>
            有人是卷王之王，有人是摸鱼宗师，有人已经精神离职了。
            <span className="email-highlight">你呢？</span>
          </p>

          <div className="email-stats">
            <div className="email-stat">
              <span className="email-stat-num">36</span>
              <span className="email-stat-label">道灵魂拷问</span>
            </div>
            <div className="email-stat">
              <span className="email-stat-num">28</span>
              <span className="email-stat-label">种牛马命运</span>
            </div>
            <div className="email-stat">
              <span className="email-stat-num">5</span>
              <span className="email-stat-label">分钟出结果</span>
            </div>
          </div>

          <p className="email-deadline">温馨提示：测试全程可摸鱼完成，不计入考勤，不影响年终。</p>
        </div>

        {/* CTA */}
        <button className="btn-start" onClick={onStart}>
          立即参加评估
        </button>

        <button className="btn-gallery" onClick={onGallery}>
          偷看花名册（我先看看有哪 28 种牛马）
        </button>

        {/* Email footer */}
        <div className="email-footer">
          <p>本邮件由系统自动发送，回复无效</p>
          <p>就算回复了也没人看</p>
          <p className="email-footer-disclaimer">（纯属娱乐，请勿用于裁员、调岗、相亲、算命）</p>
        </div>
      </div>
    </div>
  )
}
