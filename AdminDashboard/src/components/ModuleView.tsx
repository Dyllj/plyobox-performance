import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  Ban,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  Ellipsis,
  Eye,
  Filter,
  Plus,
  QrCode,
  RotateCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  X,
} from "lucide-react";
import {
  attendanceToday,
  members,
  pendingPayments,
  weeklyRevenue,
  type SectionId,
} from "../data";
import { STAFF_ROLE_LABEL, QR_ROTATION_SECONDS, MEMBERSHIP_LABEL, MEMBERSHIP_SHORT } from "../shared/contract";
import { createSeed } from "../shared/seed";

type ModuleViewProps = {
  section: Exclude<SectionId, "overview">;
  search: string;
  onToast: (message: string) => void;
};

type MemberStatus = "All" | "Active" | "Expired" | "Suspended";
type PaymentStatus = "Pending" | "Verified" | "Rejected" | "All";

const trainerRows = [
  { name: "Kai Mendoza", services: "3 services", bookings: "12", profile: "Published", status: "Active" },
  { name: "Lia Ramos", services: "2 services", bookings: "8", profile: "Published", status: "Active" },
  { name: "Noah Bautista", services: "1 service", bookings: "4", profile: "Suspended", status: "Suspended" },
  { name: "Bea Cruz", services: "4 services", bookings: "16", profile: "Published", status: "Active" },
];

const bookingRows = [
  { trainer: "Kai Mendoza", member: "Mara Santos", service: "1-on-1 coaching", when: "Sat · 9:00 AM", status: "Pending" },
  { trainer: "Lia Ramos", member: "Eli Navarro", service: "Speed & agility", when: "Sat · 10:00 AM", status: "Confirmed" },
  { trainer: "Bea Cruz", member: "Jules Reyes", service: "Strength session", when: "Fri · 7:00 AM", status: "Completed" },
  { trainer: "Kai Mendoza", member: "Sam Dizon", service: "Movement screen", when: "Thu · 5:00 PM", status: "Cancelled" },
];

const inquiryRows = [
  { name: "Mara Santos", subject: "Membership question", time: "Today · 9:14 AM", status: "New" },
  { name: "Kai Mendoza", subject: "Trainer sign-up", time: "Today · 8:32 AM", status: "Replied" },
  { name: "Eli Navarro", subject: "Location & hours", time: "Yesterday", status: "Replied" },
];

const auditRows = [
  { time: "Today · 9:02 AM", user: "Alex Villanueva", action: "Verified payment", record: "PAY-0081", type: "Payments" },
  { time: "Today · 8:41 AM", user: "Jamie Flores", action: "Manual check-in", record: "PLY-0014", type: "Attendance" },
  { time: "Today · 8:16 AM", user: "Alex Villanueva", action: "Changed membership price", record: MEMBERSHIP_LABEL.monthly, type: "Pricing" },
  { time: "Today · 7:55 AM", user: "Alex Villanueva", action: "Added staff account", record: "Jamie Flores", type: "Accounts" },
  { time: "Yesterday · 5:24 PM", user: "Alex Villanueva", action: "Suspended trainer", record: "Noah Bautista", type: "Trainers" },
  { time: "Yesterday · 3:10 PM", user: "Jamie Flores", action: "Rejected payment", record: "PAY-0076", type: "Payments" },
];

const qrCells = Array.from({ length: 21 * 21 }, (_, index) => {
  const row = Math.floor(index / 21);
  const column = index % 21;
  const inFinder = (top: number, left: number) =>
    row >= top && row < top + 7 && column >= left && column < left + 7;

  for (const [top, left] of [[0, 0], [0, 14], [14, 0]]) {
    if (inFinder(top, left)) {
      const localRow = row - top;
      const localColumn = column - left;
      const onEdge = localRow === 0 || localRow === 6 || localColumn === 0 || localColumn === 6;
      const inCenter = localRow >= 2 && localRow <= 4 && localColumn >= 2 && localColumn <= 4;
      return onEdge || inCenter;
    }
  }

  return ((row * 17 + column * 13 + row * column) % 7) < 3;
});

function PageIntro({
  eyebrow,
  title,
  description,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="page-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="page-description">{description}</p>
      </div>
      {action && (
        <button className="button button-primary" onClick={onAction} type="button">
          <Plus aria-hidden="true" size={16} /> {action}
        </button>
      )}
    </div>
  );
}

function ActionNotice({ children }: { children: ReactNode }) {
  return <p className="demo-notice"><span /> {children}</p>;
}

function MembersView({ search, onToast }: { search: string; onToast: (message: string) => void }) {
  const [filter, setFilter] = useState<MemberStatus>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filteredMembers = useMemo(
    () =>
      members.filter((member) => {
        const matchesFilter = filter === "All" || member.status === filter;
        const query = search.trim().toLowerCase();
        const matchesSearch = !query || `${member.name} ${member.id} ${member.plan}`.toLowerCase().includes(query);
        return matchesFilter && matchesSearch;
      }),
    [filter, search],
  );
  const selectedMember = members.find((member) => member.id === selectedId);

  if (selectedMember) {
    return (
      <>
        <button className="back-link" onClick={() => setSelectedId(null)} type="button">
          <ArrowLeft aria-hidden="true" size={16} /> Back to members
        </button>
        <PageIntro eyebrow="MEMBER PROFILE" title={selectedMember.name} description={`${selectedMember.id} · ${selectedMember.plan} membership`} />
        <div className="detail-grid">
          <article className="panel member-profile-card">
            <div className="profile-avatar">{selectedMember.name.split(" ").map((part) => part[0]).join("")}</div>
            <h3>{selectedMember.name}</h3>
            <p>{selectedMember.id} <StatusPill value={selectedMember.status} /></p>
            <dl className="profile-facts">
              <div><dt>Email</dt><dd>{selectedMember.name.toLowerCase().replace(" ", ".")}@example.com</dd></div>
              <div><dt>Phone</dt><dd>+63 9•• ••• ••••</dd></div>
              <div><dt>Member since</dt><dd>Aug 12, 2026</dd></div>
              <div><dt>Emergency contact</dt><dd>On file</dd></div>
            </dl>
            <button className="button button-secondary button-wide" onClick={() => onToast("Profile editing is a prototype action; changes are not saved.")} type="button">
              Edit profile
            </button>
            <button className="button button-danger button-wide" onClick={() => onToast("Account suspension requires a connected backend.")} type="button">
              <Ban size={15} /> Suspend account
            </button>
          </article>
          <div className="detail-main">
            <article className="panel membership-progress">
              <div className="panel-heading">
                <div><p className="eyebrow">CURRENT ACCESS</p><h3>{selectedMember.plan} Membership</h3></div>
                <StatusPill value={selectedMember.status} />
              </div>
              <p>Activated Nov 1, 2026 <span>·</span> {selectedMember.expires === "Today" ? "expires today" : `expires ${selectedMember.expires}`}</p>
              <div className="progress-track"><span style={{ width: "68%" }} /></div>
              <small>20 of 30 days used</small>
            </article>
            <article className="panel">
              <div className="panel-heading"><div><p className="eyebrow">HISTORY</p><h3>Recent memberships</h3></div></div>
              <SimpleTable
                columns={["TYPE", "START", "ENDS", "STATUS"]}
                rows={[
                  [MEMBERSHIP_SHORT.monthly, "Nov 1, 2026", "Nov 30, 2026", selectedMember.status],
                  [MEMBERSHIP_SHORT.daily, "Oct 18, 2026", "Oct 18, 2026", "Expired"],
                  [MEMBERSHIP_SHORT.monthly, "Sep 1, 2026", "Sep 30, 2026", "Expired"],
                ]}
              />
              <button className="button button-primary detail-action" onClick={() => onToast("Payment entry is a prototype action; nothing was saved.")} type="button">
                <Plus size={15} /> Record payment
              </button>
            </article>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="MEMBER DIRECTORY"
        title="Members"
        description="Manage member profiles, membership status and gym access."
        action="Add member"
        onAction={() => onToast("Member registration is a prototype action; connect the API to save records.")}
      />
      <div className="mini-metric-grid">
        <MiniMetric label="Total members" value="214" hint="All time" />
        <MiniMetric label="Active" value="186" hint="+8 this month" tone="lime" />
        <MiniMetric label="Expired" value="21" hint="Across all plans" />
        <MiniMetric label="Suspended" value="07" hint="Needs review" tone="amber" />
      </div>
      <article className="panel table-panel">
        <div className="table-toolbar">
          <div className="filter-pills" role="group" aria-label="Filter members">
            {(["All", "Active", "Expired", "Suspended"] as const).map((item) => (
              <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">
                {item}{item === "All" && <span>214</span>}
              </button>
            ))}
          </div>
          <span className="table-result-count">{filteredMembers.length} shown</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead><tr><th>MEMBER</th><th>MEMBER NO.</th><th>MEMBERSHIP</th><th>STATUS</th><th>EXPIRES</th><th /></tr></thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td className="table-person">{member.name}</td><td>{member.id}</td><td>{member.plan}</td>
                  <td><StatusPill value={member.status} /></td><td>{member.expires}</td>
                  <td><button className="row-action" onClick={() => setSelectedId(member.id)} type="button">View <ArrowRight size={13} /></button></td>
                </tr>
              ))}
              {filteredMembers.length === 0 && <EmptyRow colSpan={6} text="No members match this search." />}
            </tbody>
          </table>
        </div>
        <div className="table-bottom"><span>Showing {filteredMembers.length} of 214 members</span><button className="button button-secondary button-small" onClick={() => onToast("Member export is a prototype action.")} type="button"><Download size={14} /> Export</button></div>
      </article>
      <ActionNotice>Sample member records for dashboard preview only.</ActionNotice>
    </>
  );
}

function PaymentsView({ search, onToast }: { search: string; onToast: (message: string) => void }) {
  const [filter, setFilter] = useState<PaymentStatus>("Pending");
  const [selectedId, setSelectedId] = useState(pendingPayments[0]?.id ?? "");
  const [verifiedIds, setVerifiedIds] = useState<string[]>([]);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);
  const rows = [...pendingPayments, { id: "PAY-0078", name: "Toni Garcia", plan: "Monthly membership", method: "Cash", amount: "₱1,500", time: "Nov 19" }];
  const visibleRows = rows.filter((row) => {
    const status = verifiedIds.includes(row.id) ? "Verified" : rejectedIds.includes(row.id) ? "Rejected" : "Pending";
    const matchesStatus = filter === "All" || filter === status;
    const query = search.trim().toLowerCase();
    return matchesStatus && (!query || `${row.name} ${row.id} ${row.method}`.toLowerCase().includes(query));
  });
  const selected = rows.find((row) => row.id === selectedId);
  const selectedStatus = selected && (verifiedIds.includes(selected.id) ? "Verified" : rejectedIds.includes(selected.id) ? "Rejected" : "Pending");

  return (
    <>
      <PageIntro eyebrow="PAYMENT REVIEW" title="Payments" description="Verify payment proof before activating a member’s access." />
      <div className="payment-summary-row">
        <MiniMetric label="Waiting for review" value="03" hint="Oldest · 1 day" tone="amber" />
        <MiniMetric label="Verified today" value="12" hint="₱8,460 collected" tone="lime" />
        <MiniMetric label="Rejected this week" value="02" hint="Members notified" />
      </div>
      <div className="payment-layout">
        <article className="panel table-panel">
          <div className="table-toolbar">
            <div className="filter-pills" role="group" aria-label="Filter payments">
              {(["Pending", "Verified", "Rejected", "All"] as const).map((item) => (
                <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}</button>
              ))}
            </div>
            <span className="table-result-count">{visibleRows.length} payments</span>
          </div>
          <div className="payment-queue">
            {visibleRows.map((payment) => {
              const status = verifiedIds.includes(payment.id) ? "Verified" : rejectedIds.includes(payment.id) ? "Rejected" : "Pending";
              return (
                <button aria-pressed={selectedId === payment.id} className={`payment-queue-row${selectedId === payment.id ? " is-selected" : ""}`} key={payment.id} onClick={() => setSelectedId(payment.id)} type="button">
                  <span className="person-initial">{payment.name.split(" ").map((part) => part[0]).join("")}</span>
                  <span className="compact-main"><strong>{payment.name}</strong><small>{payment.plan} · {payment.method} · {payment.id}</small></span>
                  <span className="payment-amount">{payment.amount}<small>{payment.time}</small></span>
                  <StatusPill value={status} />
                </button>
              );
            })}
            {visibleRows.length === 0 && <p className="empty-state">No payments found in this queue.</p>}
          </div>
        </article>
        <article className="panel proof-panel">
          {selected ? (
            <>
              <div className="panel-heading">
                <div><p className="eyebrow">PAYMENT PROOF</p><h3>{selected.name}</h3></div>
                <StatusPill value={selectedStatus ?? "Pending"} />
              </div>
              <p className="proof-meta">{selected.plan} <span>·</span> {selected.method} <span>·</span> {selected.id}</p>
              <div aria-label="Placeholder for submitted payment proof" className="proof-placeholder" role="img">
                <Eye aria-hidden="true" size={22} />
                <strong>Payment proof preview</strong>
                <span>Uploaded image appears here</span>
              </div>
              <p className="proof-caution"><ShieldAlert aria-hidden="true" size={15} /> Confirm the funds are received before activating access.</p>
              {selectedStatus === "Pending" ? (
                <div className="proof-actions">
                  <button className="button button-primary button-wide" onClick={() => {
                    setVerifiedIds((ids) => [...ids, selected.id]);
                    onToast(`${selected.id} marked verified in this preview.`);
                  }} type="button"><CheckCircle2 size={16} /> Verify &amp; activate</button>
                  <button className="button button-danger button-wide" onClick={() => {
                    setRejectedIds((ids) => [...ids, selected.id]);
                    onToast(`${selected.id} marked rejected in this preview.`);
                  }} type="button"><X size={15} /> Reject payment</button>
                </div>
              ) : (
                <ActionNotice>Payment status is {selectedStatus?.toLowerCase() ?? "pending"} in the local preview.</ActionNotice>
              )}
            </>
          ) : <p className="empty-state">Select a payment to review its details.</p>}
        </article>
      </div>
      <ActionNotice>Payment statuses are temporary preview state; nothing is sent to a payment provider.</ActionNotice>
    </>
  );
}

function AttendanceView({ search, onToast }: { search: string; onToast: (message: string) => void }) {
  const [memberSearch, setMemberSearch] = useState("");
  const rows = attendanceToday.filter((entry) => {
    const query = search.trim().toLowerCase();
    return !query || `${entry.name} ${entry.id} ${entry.access}`.toLowerCase().includes(query);
  });

  return (
    <>
      <PageIntro eyebrow="FRONT DESK" title="Attendance" description="See today’s gym activity and assist members with check-in." action="Export" onAction={() => onToast("Attendance export is a prototype action.")} />
      <div className="attendance-top-grid">
        <article className="panel chart-panel">
          <div className="panel-heading"><div><p className="eyebrow">WEEKLY ACTIVITY</p><h3>Check-ins this week</h3></div><strong className="chart-total">184 <small>total</small></strong></div>
          <MiniBarChart />
        </article>
        <article className="panel manual-checkin-panel">
          <span className="panel-icon"><UserPlus size={18} /></span>
          <p className="eyebrow">STAFF ASSISTED</p>
          <h3>Manual check-in</h3>
          <p>Find an eligible member and log their visit.</p>
          <form onSubmit={(event) => {
            event.preventDefault();
            onToast(memberSearch ? `${memberSearch} check-in is ready for staff review.` : "Enter a member name or number first.");
          }}>
            <label className="field-with-icon"><Search size={16} /><input onChange={(event) => setMemberSearch(event.target.value)} placeholder="Find member by name or no." value={memberSearch} /></label>
            <div className="eligible-note">Mara Santos · Monthly · eligible for check-in</div>
            <button className="button button-primary button-wide" type="submit">Check in member <ArrowRight size={15} /></button>
          </form>
        </article>
      </div>
      <article className="panel table-panel">
        <div className="panel-heading table-panel-heading"><div><p className="eyebrow">LIVE LOG</p><h3>Today’s check-ins <span className="inline-count">28</span></h3></div><span className="activity-live"><span className="live-pulse" /> LIVE</span></div>
        <div className="table-scroll"><table><thead><tr><th>TIME</th><th>MEMBER</th><th>MEMBER NO.</th><th>ACCESS</th><th>SOURCE</th></tr></thead><tbody>
          {rows.map((entry) => <tr key={entry.id}><td>{entry.time}</td><td className="table-person">{entry.name}</td><td>{entry.id}</td><td>{entry.access}</td><td><span className={`source-tag${entry.source === "Staff" ? " source-staff" : ""}`}>{entry.source}</span></td></tr>)}
          {rows.length === 0 && <EmptyRow colSpan={5} text="No check-ins match this search." />}
        </tbody></table></div>
      </article>
    </>
  );
}

function MiniBarChart({
  dual = false,
  labels,
  label,
}: {
  dual?: boolean;
  labels?: string[];
  label?: string;
}) {
  return (
    <div aria-label={label ?? (dual ? "Collections compared with expenses over six months" : "Check-ins over the last seven days")} className={`mini-bar-chart${dual ? " is-dual" : ""}`} role="img">
      {weeklyRevenue.slice(0, labels?.length ?? 7).map((item, index) => (
        <div className="mini-bar-group" key={item.day}>
          <div className="mini-bar-pair">
            <span className="mini-bar" style={{ height: `${item.value}%` }} />
            {dual && <span className="mini-bar mini-bar-secondary" style={{ height: `${Math.max(20, item.value * (0.42 + (index % 2) * 0.1))}%` }} />}
          </div>
          <small>{labels?.[index] ?? item.day}</small>
        </div>
      ))}
    </div>
  );
}

function PricingView({ onToast }: { onToast: (message: string) => void }) {
  const [daily, setDaily] = useState("180");
  const [monthly, setMonthly] = useState("1500");
  return (
    <>
      <PageIntro eyebrow="OWNER SETTINGS" title="Pricing" description="Update the two membership options available to members." />
      <div className="owner-banner"><ShieldCheck size={18} /><div><strong>Owner-only settings</strong><span>Changes apply to new purchases. Existing memberships keep their original price.</span></div></div>
      <div className="pricing-grid">
        {[{ name: MEMBERSHIP_LABEL.daily, value: daily, setter: setDaily, suffix: "per session", hint: "Access ends at midnight on the day your payment is verified." }, { name: MEMBERSHIP_LABEL.monthly, value: monthly, setter: setMonthly, suffix: "per 30 days", hint: "Valid for 30 calendar days from the verified Manila date." }].map((plan) => (
          <article className="panel pricing-card" key={plan.name}>
            <div className="panel-heading"><div><p className="eyebrow">MEMBERSHIP TYPE</p><h3>{plan.name}</h3></div><StatusPill value="Active" /></div>
            <label className="field-label">Price <span>PHP</span><div className="price-input"><span>₱</span><input inputMode="decimal" onChange={(event) => plan.setter(event.target.value)} value={plan.value} /></div></label>
            <p className="field-hint">{plan.hint}</p>
            <button className="button button-primary button-wide" onClick={() => onToast(`${plan.name} price is staged in this preview only.`)} type="button">Save price <Check size={15} /></button>
          </article>
        ))}
      </div>
      <ActionNotice>Packages, discounts and free trials are not enabled in the current project scope.</ActionNotice>
    </>
  );
}

function GymQrView({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="GYM ACCESS" title="Gym QR" description="The rotating check-in code refreshes automatically to help prevent replay." />
      <div className="qr-layout">
        <article className="panel qr-live-card">
          <div className="qr-status"><span className="live-pulse" /> LIVE CODE <span className="qr-expiry">Valid for 00:47</span></div>
          <div aria-label="Illustrative QR code preview. Not valid for scanning." className="qr-code-art" role="img">
            {qrCells.map((isDark, index) => <span className={isDark ? "qr-dark" : ""} key={index} />)}
          </div>
          <p className="qr-caption">Plyobox <span>·</span> Mahayag</p>
          <p className="qr-note">Rotates every {QR_ROTATION_SECONDS} seconds · Asia/Manila</p>
          <div className="qr-actions">
            <button className="button button-primary" onClick={() => onToast("Display mode is a prototype action.")} type="button"><QrCode size={16} /> Show on display</button>
            <button className="button button-secondary" onClick={() => onToast("QR code refresh is managed by the backend.")} type="button"><RotateCw size={15} /> Rotate now</button>
          </div>
        </article>
        <div className="qr-side-column">
          <article className="panel">
            <p className="eyebrow">ROTATION SETTINGS</p>
            <h3>Keep check-ins secure</h3>
            <p className="panel-copy">Tokens rotate automatically. No scheduled job is required for the code to refresh.</p>
            <div className="setting-row"><span>Rotation interval</span><strong>60 seconds</strong></div>
            <div className="setting-row"><span>Token status</span><StatusPill value="Active" /></div>
          </article>
          <article className="panel">
            <div className="panel-heading"><div><p className="eyebrow">RECENT CODES</p><h3>Rotation history</h3></div></div>
            <SimpleTable columns={["ISSUED", "EXPIRES", "STATUS"]} rows={[["9:15 AM", "9:16 AM", "Active"], ["9:14 AM", "9:15 AM", "Expired"], ["9:13 AM", "9:14 AM", "Expired"]]} />
          </article>
          <ActionNotice>Illustrative QR only. Check-in tokens are not issued by this prototype.</ActionNotice>
        </div>
      </div>
    </>
  );
}

function TrainersView({ search, onToast }: { search: string; onToast: (message: string) => void }) {
  const [suspended, setSuspended] = useState<string[]>(["Noah Bautista"]);
  const [filter, setFilter] = useState("All");
  const rows = trainerRows.filter((trainer) => {
    const isSuspended = suspended.includes(trainer.name);
    const matchesFilter = filter === "All" || (filter === "Suspended" ? isSuspended : !isSuspended);
    return matchesFilter && (!search.trim() || `${trainer.name} ${trainer.services}`.toLowerCase().includes(search.trim().toLowerCase()));
  });
  return (
    <>
      <PageIntro eyebrow="COACH DIRECTORY" title="Trainers" description="Review trainer profiles and keep the public directory up to date." />
      <div className="trainer-summary"><span><strong>12</strong> published</span><span><strong>02</strong> suspended</span><span><strong>40</strong> bookings this month</span></div>
      <article className="panel table-panel">
        <div className="table-toolbar"><div className="filter-pills" role="group" aria-label="Filter trainers">{["All", "Published", "Suspended"].map((item) => <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}{item === "All" && <span>14</span>}</button>)}</div><span className="table-result-count">Public profiles</span></div>
        <div className="table-scroll"><table><thead><tr><th>TRAINER</th><th>SERVICES</th><th>BOOKINGS</th><th>PROFILE</th><th>ACTION</th></tr></thead><tbody>
          {rows.map((trainer) => {
            const isSuspended = suspended.includes(trainer.name);
            return <tr key={trainer.name}><td className="table-person">{trainer.name}</td><td>{trainer.services}</td><td>{trainer.bookings}</td><td><StatusPill value={isSuspended ? "Suspended" : "Published"} /></td><td><button className="row-action" onClick={() => {
              setSuspended((current) => isSuspended ? current.filter((name) => name !== trainer.name) : [...current, trainer.name]);
              onToast(`${trainer.name} profile ${isSuspended ? "restored" : "suspended"} in this preview.`);
            }} type="button">{isSuspended ? "Restore" : "Suspend"}</button></td></tr>;
          })}
          {rows.length === 0 && <EmptyRow colSpan={5} text="No trainers match this search." />}
        </tbody></table></div>
      </article>
      <article className="panel policy-note"><ShieldCheck size={18} /><div><strong>Published profiles are visible to the public.</strong><p>Suspended profiles are hidden from the directory and cannot receive new booking requests.</p></div></article>
    </>
  );
}

function BookingsView({ search }: { search: string }) {
  const [filter, setFilter] = useState("All");
  const rows = bookingRows.filter((row) => {
    const query = search.trim().toLowerCase();
    return (filter === "All" || row.status === filter) && (!query || `${row.trainer} ${row.member} ${row.service}`.toLowerCase().includes(query));
  });
  return (
    <>
      <PageIntro eyebrow="TRAINER MARKETPLACE" title="Bookings" description="Track member requests and confirmed trainer sessions." />
      <div className="booking-summary"><MiniMetric label="Pending" value="04" hint="Needs trainer response" tone="amber" /><MiniMetric label="Confirmed" value="18" hint="Upcoming sessions" tone="lime" /><MiniMetric label="This week" value="32" hint="Across all trainers" /></div>
      <article className="panel table-panel"><div className="table-toolbar"><div className="filter-pills" role="group" aria-label="Filter bookings">{["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((item) => <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}</div><span className="table-result-count">{rows.length} bookings</span></div>
        <div className="table-scroll"><table><thead><tr><th>TRAINER</th><th>MEMBER</th><th>SERVICE</th><th>WHEN</th><th>STATUS</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.member}-${row.service}`}><td>{row.trainer}</td><td className="table-person">{row.member}</td><td>{row.service}</td><td>{row.when}</td><td><StatusPill value={row.status} /></td></tr>)}{rows.length === 0 && <EmptyRow colSpan={5} text="No bookings match this filter." />}</tbody></table></div>
      </article>
      <p className="inline-policy"><Clock3 size={15} /> Overlapping confirmed sessions for one trainer are blocked. Cancellations and refunds follow owner policy.</p>
    </>
  );
}

function ReportsView({ onToast }: { onToast: (message: string) => void }) {
  const [report, setReport] = useState<"Revenue" | "Attendance" | "Memberships">("Revenue");
  const reportData = {
    Revenue: {
      eyebrow: "JAN — NOV 2026",
      title: "Collections vs expenses",
      keys: ["Collections", "Expenses"],
      dual: true,
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      metrics: [
        ["Collections", "₱184,500", "+8.4% this month", "lime"],
        ["Expenses", "₱42,800", "12 entries", "neutral"],
        ["Net", "₱141,700", "After expenses", "lime"],
        ["New members", "24", "+5 vs last month", "neutral"],
      ],
    },
    Attendance: {
      eyebrow: "THIS WEEK",
      title: "Daily gym check-ins",
      keys: ["QR check-ins", "Staff-assisted"],
      dual: true,
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      metrics: [
        ["Check-ins", "184", "+12% vs last week", "lime"],
        ["QR check-ins", "162", "88% of visits", "neutral"],
        ["Staff-assisted", "22", "Today · 3", "neutral"],
        ["Unique members", "136", "This week", "lime"],
      ],
    },
    Memberships: {
      eyebrow: "MEMBERSHIP HEALTH",
      title: "New members vs renewals",
      keys: ["New members", "Renewals"],
      dual: true,
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
      metrics: [
        ["Active members", "186", "+8 this month", "lime"],
        ["New members", "24", "This month", "neutral"],
        ["Renewals", "18", "This month", "lime"],
        ["Expiring soon", "07", "Next 7 days", "amber"],
      ],
    },
  }[report];

  return (
    <>
      <PageIntro eyebrow="BUSINESS HEALTH" title="Reports" description="A clear picture of gym revenue, attendance and membership growth." action="Export report" onAction={() => onToast("Report export is a prototype action.")} />
      <div className="report-tabs filter-pills" role="group" aria-label="Report type">{(["Revenue", "Attendance", "Memberships"] as const).map((item) => <button aria-pressed={report === item} className={`filter-pill${report === item ? " is-active" : ""}`} key={item} onClick={() => setReport(item)} type="button">{item}</button>)}</div>
      <div className="report-metric-grid">{reportData.metrics.map(([label, value, hint, tone]) => <MiniMetric key={label} label={label} value={value} hint={hint} tone={tone as "neutral" | "lime" | "amber"} />)}</div>
      <article className="panel report-chart-panel"><div className="panel-heading"><div><p className="eyebrow">{reportData.eyebrow}</p><h3>{reportData.title}</h3></div><div className="chart-key"><span>{reportData.keys[0]}</span><span>{reportData.keys[1]}</span></div></div><MiniBarChart dual labels={reportData.labels} label={`${report} report: ${reportData.title}`} /><div className="chart-caption">{report === "Revenue" ? "Monthly totals · Philippine peso (PHP)" : report === "Attendance" ? "Daily visits · all check-in methods" : "Monthly member activity · active records"}</div></article>
      <div className="report-insight"><span className="insight-icon">✦</span><p><strong>{report === "Revenue" ? "Memberships are driving growth." : report === "Attendance" ? "Member visits are trending upward." : "Member renewals remain healthy."}</strong> {report === "Revenue" ? "Monthly plans make up 68% of collections this period." : report === "Attendance" ? "Saturday is the busiest day in this preview." : "Monthly plans account for most active memberships."}</p><span className="insight-trend">↗ 8.4%</span></div>
    </>
  );
}

function ExpensesView({ onToast }: { onToast: (message: string) => void }) {
  const [expenses, setExpenses] = useState([
    { date: "Nov 20, 2026", category: "Utilities", amount: "₱4,800", by: "Alex Villanueva" },
    { date: "Nov 18, 2026", category: "Maintenance", amount: "₱2,200", by: "Jamie Flores" },
    { date: "Nov 15, 2026", category: "Rent", amount: "₱18,000", by: "Alex Villanueva" },
    { date: "Nov 12, 2026", category: "Supplies", amount: "₱1,450", by: "Jamie Flores" },
  ]);
  const [category, setCategory] = useState("Rent, utilities, maintenance");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-11-21");

  return (
    <>
      <PageIntro eyebrow="OWNER FINANCIALS" title="Expenses" description="Record gym operating costs and keep receipts attached to each entry." />
      <div className="expense-grid">
        <article className="panel expense-form-panel"><div className="panel-heading"><div><p className="eyebrow">NEW RECORD</p><h3>Add expense</h3></div></div>
          <form className="stacked-form" onSubmit={(event) => {
            event.preventDefault();
            if (!amount || Number(amount) <= 0) {
              onToast("Enter an amount greater than zero.");
              return;
            }
            setExpenses((current) => [{ date: new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" }), category, amount: `₱${Number(amount).toLocaleString("en-PH")}`, by: "Alex Villanueva" }, ...current]);
            setAmount("");
            onToast("Expense added to this preview.");
          }}>
            <label className="field-label">Category<select onChange={(event) => setCategory(event.target.value)} value={category}><option>Rent, utilities, maintenance</option><option>Rent</option><option>Utilities</option><option>Maintenance</option><option>Supplies</option><option>Other</option></select></label>
            <label className="field-label">Amount<input inputMode="decimal" onChange={(event) => setAmount(event.target.value)} placeholder="₱ 0.00" value={amount} /></label>
            <label className="field-label">Date<input onChange={(event) => setDate(event.target.value)} type="date" value={date} /></label>
            <label className="receipt-upload"><ArrowDownToLine size={17} /><span><strong>Attach receipt</strong><small>PDF, JPG or PNG · up to 10 MB</small></span><input accept=".pdf,.jpg,.jpeg,.png" type="file" /></label>
            <button className="button button-primary button-wide" type="submit">Save expense <Check size={15} /></button>
          </form>
        </article>
        <article className="panel table-panel"><div className="panel-heading table-panel-heading"><div><p className="eyebrow">NOVEMBER 2026</p><h3>Recent expenses</h3></div><strong className="expense-total">₱26,450</strong></div>
          <div className="table-scroll"><table><thead><tr><th>DATE</th><th>CATEGORY</th><th>AMOUNT</th><th>ADDED BY</th></tr></thead><tbody>{expenses.map((item, index) => <tr key={`${item.date}-${item.category}-${index}`}><td>{item.date}</td><td>{item.category}</td><td className="table-person">{item.amount}</td><td>{item.by}</td></tr>)}</tbody></table></div>
        </article>
      </div>
    </>
  );
}

function InquiriesView({ onToast }: { onToast: (message: string) => void }) {
  const [selected, setSelected] = useState(0);
  const [reply, setReply] = useState("");
  const inquiry = inquiryRows[selected];
  return (
    <>
      <PageIntro eyebrow="PUBLIC WEBSITE" title="Inquiries" description="Keep up with questions from prospective members and trainers." />
      <div className="inquiry-layout">
        <div className="inquiry-list" aria-label="Inquiry list">
          {inquiryRows.map((item, index) => <button aria-pressed={selected === index} className={`inquiry-item${selected === index ? " is-selected" : ""}`} key={item.name} onClick={() => setSelected(index)} type="button"><span className="inquiry-item-top"><strong>{item.name}</strong><StatusPill value={item.status} /></span><span>{item.subject}</span><small>{item.time}</small></button>)}
        </div>
        <article className="panel inquiry-detail"><div className="panel-heading"><div><p className="eyebrow">INQUIRY DETAILS</p><h3>{inquiry.name}</h3></div><span className="inquiry-email">{inquiry.name.toLowerCase().replace(" ", ".")}@example.com</span></div>
          <p className="inquiry-subject">{inquiry.subject} <span>·</span> {inquiry.time}</p>
          <blockquote>Hi, I’d like to know more about memberships and what I need to bring for my first visit. Thank you!</blockquote>
          <form className="stacked-form" onSubmit={(event) => {
            event.preventDefault();
            if (!reply.trim()) {
              onToast("Write a reply before sending.");
              return;
            }
            setReply("");
            onToast("Reply queued in this preview. Email delivery is not connected.");
          }}>
            <label className="field-label">Reply<textarea onChange={(event) => setReply(event.target.value)} placeholder="Write a helpful reply..." rows={4} value={reply} /></label>
            <button className="button button-primary" type="submit">Send reply <ArrowRight size={15} /></button>
          </form>
        </article>
      </div>
    </>
  );
}

function UsersView({ onToast }: { onToast: (message: string) => void }) {
  const [filter, setFilter] = useState("All");
  const users = createSeed(new Date()).staff;
  const roleLabels = ["Owner", "Admin", "Staff"] as const;
  return (
    <>
      <PageIntro eyebrow="ACCESS CONTROL" title="Staff & roles" description="Manage staff access with clear, role-based permissions." action="Add staff" onAction={() => onToast("Staff invitation is a prototype action; authentication is not connected.")} />
      <article className="panel table-panel"><div className="table-toolbar"><div className="filter-pills" role="group" aria-label="Filter dashboard users">{["All", ...roleLabels].map((item) => <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}{item === "All" && <span>{users.length}</span>}</button>)}</div><span className="table-result-count">{users.length} accounts</span></div>
        <div className="table-scroll"><table><thead><tr><th>USER</th><th>ROLE</th><th>STATUS</th><th /></tr></thead><tbody>{users.filter((user) => filter === "All" || STAFF_ROLE_LABEL[user.role] === filter).map((user) => <tr key={user.id}><td><span className="user-cell"><span className="person-initial">{user.name.split(" ").map((part) => part[0]).join("")}</span><span className="compact-main"><strong>{user.name}</strong><small>{user.email}</small></span></span></td><td><span className={`role-badge${user.role === "owner" ? " owner-role" : ""}`}>{STAFF_ROLE_LABEL[user.role]}</span></td><td><StatusPill value={user.accountStatus} /></td><td><button className="row-action" onClick={() => onToast(`Editing ${user.name} is a prototype action.`)} type="button">Edit <Ellipsis size={15} /></button></td></tr>)}</tbody></table></div>
      </article>
      <article className="panel permission-panel"><div className="panel-heading"><div><p className="eyebrow">ROLE MATRIX</p><h3>Permissions at a glance</h3></div><button className="text-action" onClick={() => onToast("Permission editing is a prototype action.")} type="button">Edit roles <ArrowRight size={14} /></button></div>
        <SimpleTable columns={["PERMISSION", "OWNER", "ADMIN", "STAFF"]} rows={[
          ["Pricing & settings", "✓", "—", "—"],
          ["Financial reports", "✓", "—", "—"],
          ["Members & trainers", "✓", "✓", "View"],
          ["Verify payments", "✓", "✓", "✓"],
          ["Manual check-in", "✓", "✓", "✓"],
          ["Audit log", "✓", "✓", "—"],
        ]} />
      </article>
    </>
  );
}

function AuditView({ search }: { search: string }) {
  const [filter, setFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("");
  const rows = auditRows.filter((row) => {
    const query = search.trim().toLowerCase();
    const userQuery = userFilter.trim().toLowerCase();
    const matchesText = !query || `${row.user} ${row.action} ${row.record}`.toLowerCase().includes(query);
    const matchesUser = !userQuery || row.user.toLowerCase().includes(userQuery);
    return (filter === "All" || row.type === filter) && matchesText && matchesUser;
  });
  return (
    <>
      <PageIntro eyebrow="ACCOUNTABILITY" title="Audit log" description="A time-stamped record of sensitive actions in the dashboard." />
      <article className="panel table-panel"><div className="table-toolbar"><div className="filter-pills" role="group" aria-label="Filter audit events">{["All", "Payments", "Pricing", "Accounts", "Attendance"].map((item) => <button aria-pressed={filter === item} className={`filter-pill${filter === item ? " is-active" : ""}`} key={item} onClick={() => setFilter(item)} type="button">{item}</button>)}</div><label className="audit-filter"><Filter size={14} /><input aria-label="Filter audit events by user" onChange={(event) => setUserFilter(event.target.value)} placeholder="Filter by user..." value={userFilter} /></label></div>
        <div className="table-scroll"><table><thead><tr><th>TIME</th><th>USER</th><th>ACTION</th><th>RECORD</th><th>MODULE</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.time}-${row.record}`}><td>{row.time}</td><td>{row.user}</td><td className="table-person">{row.action}</td><td>{row.record}</td><td><span className="type-tag">{row.type}</span></td></tr>)}{rows.length === 0 && <EmptyRow colSpan={5} text="No audit events match this filter." />}</tbody></table></div>
      </article>
      <p className="inline-policy"><ShieldCheck size={15} /> Audit records are retained for security and operational accountability.</p>
    </>
  );
}

function SettingsView({ onToast }: { onToast: (message: string) => void }) {
  return (
    <>
      <PageIntro eyebrow="OWNER SETTINGS" title="Settings" description="Keep gym contact details, notifications and operational preferences current." />
      <div className="settings-grid">
        <article className="panel settings-card"><div className="panel-heading"><div><p className="eyebrow">BUSINESS PROFILE</p><h3>Gym details</h3></div></div>
          <form className="stacked-form" onSubmit={(event) => { event.preventDefault(); onToast("Gym details staged in this preview only."); }}>
            <label className="field-label">Gym name<input defaultValue="Plyobox Performance Gym" /></label>
            <label className="field-label">Phone &amp; email<input defaultValue="+63 9•• ••• •••• · hello@plyobox.ph" /></label>
            <label className="field-label">Timezone<select defaultValue="Asia/Manila"><option>Asia/Manila</option><option>UTC</option></select></label>
            <fieldset className="payment-methods"><legend>Accepted payment methods</legend>{["GCash", "Maya", "Bank", "Cash"].map((method) => <label key={method}><input defaultChecked type="checkbox" /> {method}</label>)}</fieldset>
            <button className="button button-primary" type="submit">Save changes <Check size={15} /></button>
          </form>
        </article>
        <div className="settings-side">
          <article className="panel settings-card"><div className="panel-heading"><div><p className="eyebrow">COMMUNICATIONS</p><h3>Notifications</h3></div></div>
            <ToggleRow label="Push notifications" detail="Staff alerts on mobile" enabled />
            <ToggleRow label="Email notifications" detail="Receipts and account notices" enabled />
            <ToggleRow label="SMS notifications" detail="Not enabled in this plan" />
          </article>
          <article className="panel settings-card backup-card"><div className="panel-heading"><div><p className="eyebrow">DATA SAFETY</p><h3>Backups</h3></div><StatusPill value="Healthy" /></div>
            <div className="setting-row"><span>Last backup</span><strong>Nov 21, 2026</strong></div>
            <div className="setting-row"><span>Restore test</span><strong>Next · Dec 1</strong></div>
            <div className="progress-track"><span style={{ width: "84%" }} /></div>
            <button className="button button-secondary" onClick={() => onToast("Backup now is not available in the frontend prototype.")} type="button">Run backup now</button>
          </article>
        </div>
      </div>
    </>
  );
}

function ToggleRow({ label, detail, enabled = false }: { label: string; detail: string; enabled?: boolean }) {
  const [checked, setChecked] = useState(enabled);
  return <div className="toggle-row"><div><strong>{label}</strong><small>{detail}</small></div><button aria-checked={checked} aria-label={`${label} ${checked ? "on" : "off"}`} className={`toggle${checked ? " is-on" : ""}`} onClick={() => setChecked((value) => !value)} role="switch" type="button"><span /></button></div>;
}

function GenericDirectoryView({
  section,
  search,
  onToast,
}: {
  section: "bookings" | "trainers";
  search: string;
  onToast: (message: string) => void;
}) {
  return section === "bookings" ? <BookingsView search={search} /> : <TrainersView onToast={onToast} search={search} />;
}

export default function ModuleView({ section, search, onToast }: ModuleViewProps) {
  switch (section) {
    case "members":
      return <MembersView onToast={onToast} search={search} />;
    case "pricing":
      return <PricingView onToast={onToast} />;
    case "payments":
      return <PaymentsView onToast={onToast} search={search} />;
    case "gym-qr":
      return <GymQrView onToast={onToast} />;
    case "attendance":
      return <AttendanceView onToast={onToast} search={search} />;
    case "trainers":
    case "bookings":
      return <GenericDirectoryView onToast={onToast} search={search} section={section} />;
    case "reports":
      return <ReportsView onToast={onToast} />;
    case "expenses":
      return <ExpensesView onToast={onToast} />;
    case "inquiries":
      return <InquiriesView onToast={onToast} />;
    case "users":
      return <UsersView onToast={onToast} />;
    case "audit-log":
      return <AuditView search={search} />;
    case "settings":
      return <SettingsView onToast={onToast} />;
  }
}

export function StatusPill({ value }: { value: string }) {
  const tone = ["active", "verified", "published", "confirmed", "healthy"].includes(value.toLowerCase())
    ? "status-active"
    : ["pending", "new"].includes(value.toLowerCase())
      ? "status-pending"
      : ["suspended", "rejected", "cancelled", "expired"].includes(value.toLowerCase())
        ? "status-danger"
        : "status-neutral";
  return <span className={`status ${tone}`}>{value}</span>;
}

export function MiniMetric({ label, value, hint, tone = "neutral" }: { label: string; value: string; hint: string; tone?: "neutral" | "lime" | "amber" }) {
  return <article className={`mini-metric mini-metric-${tone}`}><span>{label}</span><strong>{value}</strong><small>{hint}</small></article>;
}

function SimpleTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return <div className="table-scroll"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td className={cellIndex === 0 ? "table-person" : ""} key={`${rowIndex}-${cellIndex}`}>{["Active", "Expired", "Pending", "Verified", "Rejected", "Suspended"].includes(cell) ? <StatusPill value={cell} /> : cell}</td>)}</tr>)}</tbody></table></div>;
}

function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return <tr><td className="empty-cell" colSpan={colSpan}>{text}</td></tr>;
}
