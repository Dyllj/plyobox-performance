import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";
import type { RefObject } from "react";
import { pendingPayments, type Role, type SectionId } from "../data";

type TopbarProps = {
  title: string;
  role: Role;
  search: string;
  searchRef: RefObject<HTMLInputElement | null>;
  onMenuClick: () => void;
  menuOpen: boolean;
  onRoleChange: (role: Role) => void;
  onSearchChange: (value: string) => void;
  onNavigate: (section: SectionId) => void;
};

export default function Topbar({
  title,
  role,
  search,
  searchRef,
  onMenuClick,
  menuOpen,
  onRoleChange,
  onSearchChange,
  onNavigate,
}: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button aria-expanded={menuOpen} aria-label="Open navigation" className="icon-button menu-button" onClick={onMenuClick} type="button">
          <Menu size={20} />
        </button>
        <div className="breadcrumbs">
          <span>Workspace</span>
          <span aria-hidden="true" className="breadcrumb-divider">/</span>
          <strong>{title}</strong>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          aria-expanded={mobileSearchOpen}
          aria-label={mobileSearchOpen ? "Close search" : "Open search"}
          className="icon-button mobile-search-toggle"
          onClick={() => setMobileSearchOpen((open) => !open)}
          type="button"
        >
          <Search size={18} />
        </button>
        <label className={`global-search${mobileSearchOpen ? " mobile-open" : ""}`}>
          <Search aria-hidden="true" size={17} />
          <span className="sr-only">Search members and payments</span>
          <input
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search members, payments..."
            ref={searchRef}
            type="search"
            value={search}
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="popover-wrap">
          <button
            aria-expanded={notificationsOpen}
            aria-label={`Notifications, ${pendingPayments.length} pending payments`}
            className={`icon-button notification-button${notificationsOpen ? " is-selected" : ""}`}
            onClick={() => setNotificationsOpen((open) => !open)}
            type="button"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>
          {notificationsOpen && (
            <div className="notification-popover">
              <div className="popover-heading">
                <strong>Notifications</strong>
                <span className="status status-pending">{pendingPayments.length} new</span>
              </div>
              <p>There are {pendingPayments.length} payments waiting for review.</p>
              <button
                className="text-action"
                onClick={() => {
                  onNavigate("payments");
                  setNotificationsOpen(false);
                }}
                type="button"
              >
                Review payments <span aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </div>

        <div className="role-picker-wrap">
          <button
            aria-expanded={roleMenuOpen}
            className="role-picker"
            onClick={() => setRoleMenuOpen((open) => !open)}
            type="button"
          >
            <span className={`role-dot ${role === "Owner" ? "role-owner" : "role-staff"}`} />
            <span>{role}</span>
            <ChevronDown aria-hidden="true" size={14} />
          </button>
          {roleMenuOpen && (
            <div className="role-menu">
              {(["Owner", "Staff"] as const).map((nextRole) => (
                <button
                  aria-pressed={role === nextRole}
                  key={nextRole}
                  onClick={() => {
                    onRoleChange(nextRole);
                    setRoleMenuOpen(false);
                  }}
                  type="button"
                >
                  {nextRole}
                  {role === nextRole && <span aria-hidden="true">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <span aria-hidden="true" className="avatar avatar-top">AV</span>
      </div>
    </header>
  );
}
