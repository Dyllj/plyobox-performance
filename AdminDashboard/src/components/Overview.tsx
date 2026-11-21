import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  UserPlus,
} from "lucide-react";
import {
  activities,
  attendanceToday,
  expiringMembers,
  pendingPayments,
  weeklyRevenue,
  type SectionId,
} from "../data";

type OverviewProps = {
  onNavigate: (section: SectionId) => void;
  onToast: (message: string) => void;
};

const metrics = [
  { label: "Check-ins today", value: "28", change: "+12%", icon: CalendarDays, tone: "lime" },
  { label: "Active members", value: "186", change: "+8 this month", icon: UserPlus, tone: "violet" },
  { label: "Pending payments", value: "03", change: "Needs attention", icon: CircleDollarSign, tone: "amber" },
  { label: "Expiring this week", value: "07", change: "2 due today", icon: Clock3, tone: "blue" },
] as const;

export default function Overview({ onNavigate, onToast }: OverviewProps) {
  return (
    <>
      <section aria-label="Key gym metrics" className="metric-grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = index === 2 || index === 3 ? ArrowDownRight : ArrowUpRight;

          return (
            <article className={`metric-card metric-${metric.tone}`} key={metric.label}>
              <div className="metric-top">
                <span className="metric-icon"><Icon aria-hidden="true" size={18} /></span>
                <span className="metric-trend"><TrendIcon aria-hidden="true" size={13} /> {metric.change}</span>
              </div>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              {index === 0 && <span className="metric-footnote">Across QR + staff check-ins</span>}
            </article>
          );
        })}
      </section>

      <section aria-label="Weekly revenue and quick actions" className="overview-primary-grid">
        <article className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">THIS WEEK</p>
              <h2>Revenue overview</h2>
            </div>
            <div className="revenue-total">
              <strong>₱92,400</strong>
              <span><ArrowUpRight aria-hidden="true" size={14} /> 8.4% vs last week</span>
            </div>
          </div>
          <div aria-label="Revenue chart, Monday through Sunday" className="revenue-chart" role="img">
            <div className="chart-y-labels" aria-hidden="true">
              <span>₱20k</span><span>₱15k</span><span>₱10k</span><span>₱5k</span><span>₱0</span>
            </div>
            <div className="chart-plot">
              <div className="chart-grid-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <div className="chart-bars">
                {weeklyRevenue.map((bar) => (
                  <div className="chart-bar-group" key={bar.day} title={`${bar.day}: ${bar.amount}`}>
                    <div className={`chart-bar${bar.day === "Sat" ? " is-highlight" : ""}`} style={{ height: `${bar.value}%` }} />
                    <span>{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="chart-legend"><span /> Daily collections <small>Updated just now</small></div>
        </article>

        <article className="panel quick-actions-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">SHORTCUTS</p>
              <h2>Quick actions</h2>
            </div>
            <span className="sparkle-mark" aria-hidden="true">✦</span>
          </div>
          <div className="quick-actions">
            <button className="quick-action primary-action" onClick={() => onNavigate("members")} type="button">
              <span className="quick-action-icon"><UserPlus aria-hidden="true" size={17} /></span>
              <span>Register a member</span>
              <ArrowRight aria-hidden="true" className="quick-arrow" size={16} />
            </button>
            <button className="quick-action" onClick={() => onNavigate("payments")} type="button">
              <span className="quick-action-icon"><Check aria-hidden="true" size={17} /></span>
              <span>Review payments <i className="action-count">3</i></span>
              <ArrowRight aria-hidden="true" className="quick-arrow" size={16} />
            </button>
            <button
              className="quick-action"
              onClick={() => {
                onNavigate("attendance");
                onToast("Staff-assisted check-in is ready.");
              }}
              type="button"
            >
              <span className="quick-action-icon"><CalendarDays aria-hidden="true" size={17} /></span>
              <span>Manual check-in</span>
              <ArrowRight aria-hidden="true" className="quick-arrow" size={16} />
            </button>
          </div>
          <div className="actions-note">
            <span className="live-pulse" />
            Your gym is open <span>·</span> 6:00 AM – 10:00 PM
          </div>
        </article>
      </section>

      <section aria-label="Pending payments and expiring memberships" className="overview-secondary-grid">
        <article className="panel list-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ACTION REQUIRED</p>
              <h2>Pending payments <span className="inline-count">03</span></h2>
            </div>
            <button className="text-action" onClick={() => onNavigate("payments")} type="button">
              View all <ArrowRight aria-hidden="true" size={14} />
            </button>
          </div>
          <div className="compact-list">
            {pendingPayments.map((payment) => (
              <button
                className="compact-row payment-row"
                key={payment.id}
                onClick={() => onNavigate("payments")}
                type="button"
              >
                <span className="person-initial">{payment.name.split(" ").map((part) => part[0]).join("")}</span>
                <span className="compact-main">
                  <strong>{payment.name}</strong>
                  <small>{payment.plan} <i>·</i> {payment.method}</small>
                </span>
                <span className="compact-value">
                  <strong>{payment.amount}</strong>
                  <small>{payment.time}</small>
                </span>
                <span className="status status-pending">Pending</span>
              </button>
            ))}
          </div>
          <button className="panel-footer-action" onClick={() => onNavigate("payments")} type="button">
            Open verification queue <ArrowRight aria-hidden="true" size={14} />
          </button>
        </article>

        <article className="panel list-panel expiring-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">MEMBERSHIPS</p>
              <h2>Expiring soon</h2>
            </div>
            <button className="text-action" onClick={() => onNavigate("members")} type="button">
              All members <ArrowRight aria-hidden="true" size={14} />
            </button>
          </div>
          <div className="compact-list">
            {expiringMembers.map((member, index) => (
              <button
                className="compact-row"
                key={member.name}
                onClick={() => onNavigate("members")}
                type="button"
              >
                <span className={`person-initial person-tone-${index + 1}`}>{member.name.split(" ").map((part) => part[0]).join("")}</span>
                <span className="compact-main">
                  <strong>{member.name}</strong>
                  <small>{member.plan} plan <i>·</i> ends {member.date}</small>
                </span>
                <span className={`expiry-pill${member.days === "Today" ? " is-today" : ""}`}>{member.days}</span>
              </button>
            ))}
          </div>
          <div className="membership-note">
            <span aria-hidden="true">↗</span>
            <span>Friendly reminder: reach out before access expires.</span>
          </div>
        </article>
      </section>

      <section aria-label="Recent activity" className="panel activity-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">LIVE FEED</p>
            <h2>Recent activity</h2>
          </div>
          <span className="activity-live"><span className="live-pulse" /> LIVE</span>
        </div>
        <div className="activity-list">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div className="activity-row" key={activity.title}>
                <span className={`activity-icon activity-${activity.color}`}><Icon aria-hidden="true" size={16} /></span>
                <div><strong>{activity.title}</strong><span>{activity.detail}</span></div>
                <time>{activity.time}</time>
              </div>
            );
          })}
        </div>
        <button className="activity-open" onClick={() => onNavigate("audit-log")} type="button">
          View audit log <ArrowRight aria-hidden="true" size={14} />
        </button>
      </section>

      <section aria-label="Today's check-ins" className="panel today-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">FRONT DESK</p>
            <h2>Today at a glance</h2>
          </div>
          <button className="text-action" onClick={() => onNavigate("attendance")} type="button">
            Attendance <ArrowRight aria-hidden="true" size={14} />
          </button>
        </div>
        <div className="today-summary">
          <span><strong>28</strong> check-ins</span>
          <span><strong>09:02 AM</strong> latest entry</span>
          <span><strong>3</strong> staff-assisted</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>TIME</th><th>MEMBER</th><th>MEMBER NO.</th><th>ACCESS</th><th>SOURCE</th></tr></thead>
            <tbody>
              {attendanceToday.slice(0, 3).map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.time}</td><td className="table-person">{entry.name}</td><td>{entry.id}</td>
                  <td>{entry.access}</td><td><span className={`source-tag${entry.source === "Staff" ? " source-staff" : ""}`}>{entry.source}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
