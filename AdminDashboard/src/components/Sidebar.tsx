import { LogOut, X } from "lucide-react";
import { navigation, type Role, type SectionId } from "../data";

type SidebarProps = {
  activeSection: SectionId;
  isOpen: boolean;
  role: Role;
  onNavigate: (section: SectionId) => void;
  onClose: () => void;
  onSignOut: () => void;
};

export default function Sidebar({
  activeSection,
  isOpen,
  role,
  onNavigate,
  onClose,
  onSignOut,
}: SidebarProps) {
  const visibleNavigation = navigation.filter((item) => role === "Owner" || !item.ownerOnly);

  return (
    <>
      <button
        aria-label="Close navigation"
        aria-hidden={!isOpen}
        className={`sidebar-scrim${isOpen ? " is-visible" : ""}`}
        disabled={!isOpen}
        onClick={onClose}
        tabIndex={isOpen ? 0 : -1}
        type="button"
      />
      <aside aria-label="Dashboard sidebar" className={`sidebar${isOpen ? " is-open" : ""}`}>
        <div className="sidebar-brand">
          <a
            aria-label="Plyobox Performance Gym dashboard"
            href="#overview"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("overview");
            }}
          >
            <img alt="" className="sidebar-logo" height="667" src="/Logo.png" width="2000" />
          </a>
          <button aria-label="Close navigation" className="icon-button sidebar-close" onClick={onClose} type="button">
            <X size={18} />
          </button>
        </div>

        <p className="nav-caption">WORKSPACE</p>
        <nav aria-label="Dashboard navigation" className="sidebar-nav">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;

            return (
              <button
                aria-current={active ? "page" : undefined}
                className={`sidebar-link${active ? " is-active" : ""}`}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{item.label}</span>
                {item.ownerOnly && <span className="owner-tag">OWNER</span>}
                {item.id === "payments" && <span className="nav-count">3</span>}
                {item.id === "inquiries" && <span className="nav-count nav-count-muted">2</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-gym">
            <span className="gym-status-dot" />
            <span>PLYBOX PERFORMANCE</span>
          </div>
          <div className="staff-card">
            <div aria-hidden="true" className="avatar avatar-small">AV</div>
            <div className="staff-meta">
              <strong>Alex Villanueva</strong>
              <span>{role} · Mahayag</span>
            </div>
            <button aria-label="Sign out" className="icon-button signout-button" onClick={onSignOut} type="button">
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
