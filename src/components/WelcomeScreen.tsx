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
            <div className="email-from">人力摸鱼资源部</div>
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
          <span className="email-urgent">【紧急】</span>
          关于开展 2026 年度牛马人格普查的通知
        </div>

        {/* Email body */}
        <div className="email-body">
          <p className="email-greeting">各位牛马好：</p>

          <p>
            为配合集团「牛马画像精准化」战略部署，深入贯彻落实
            <span className="email-highlight">「让每一头牛马都能被正确归类」</span>
            的核心方针，经研究决定，现面向全体牛马开展 <b>NMTI 牛马型人格测试</b>。
          </p>

          <div className="email-specs">
            <div className="email-spec-row">
              <span className="email-spec-label">测试内容</span>
              <span className="email-spec-value">36 道灵魂拷问</span>
            </div>
            <div className="email-spec-row">
              <span className="email-spec-label">评估维度</span>
              <span className="email-spec-value">18 个牛马指标</span>
            </div>
            <div className="email-spec-row">
              <span className="email-spec-label">可能结局</span>
              <span className="email-spec-value">28 种牛马命运</span>
            </div>
            <div className="email-spec-row">
              <span className="email-spec-label">预计耗时</span>
              <span className="email-spec-value">5 分钟（摸鱼时间足够）</span>
            </div>
          </div>

          <div className="email-scope">
            <span className="email-scope-label">覆盖领域：</span>
            <div className="email-tags">
              {['摸鱼玄学', '内卷经', '社畜魂', '表演术', '逃离计划', '精神状态'].map(m => (
                <span key={m} className="model-tag">{m}</span>
              ))}
            </div>
          </div>

          <p className="email-deadline">请各位牛马于今日内完成测试。逾期未测者，视为自愿放弃被归类的权利。</p>

          <p className="email-sign">
            此通知。
            <br/>
            <br/>
            <span className="email-sign-dept">人力摸鱼资源部</span>
            <br/>
            <span className="email-sign-system">牛马绩效评估系统 NMTI v2.0</span>
          </p>
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
