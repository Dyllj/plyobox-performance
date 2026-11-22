import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import ModuleView from "./components/ModuleView";
import Overview from "./components/Overview";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import Topbar from "./components/Topbar";
import { navigation, type Role, type SectionId } from "./data";
import { PERMISSIONS, STAFF_ROLE_LABEL } from "./shared/contract";
import { createSeed, gymInfo } from "./shared/seed";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [role, setRole] = useState<Role>("owner");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [signedIn, setSignedIn] = useState(import.meta.env.VITE_PREVIEW_SKIP_LOGIN === "true");
  const searchRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<number | null>(null);

  const activeNavigationItem = navigation.find((item) => item.id === activeSection);
  const title = activeNavigationItem?.label ?? "Overview";

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
  }, []);

  const notify = (message: string) => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(""), 3400);
  };

  const navigate = (section: SectionId) => {
    const target = navigation.find((item) => item.id === section);
    if (!target || PERMISSIONS[target.permission][role] === "none") {
      notify("Your role does not have access to this section.");
      return;
    }

    setActiveSection(section);
    setSearch("");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!signedIn) return <SignIn onSignIn={() => setSignedIn(true)} />;

  const seed = createSeed(new Date());
  const currentUser = seed.staff.find((user) => user.role === role) ?? seed.staff[0];
  const manilaHour = Number(new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: "Asia/Manila",
  }).format(new Date()));
  const greeting = manilaHour < 12 ? "Good morning" : manilaHour < 18 ? "Good afternoon" : "Good evening";
  const today = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  }).format(new Date());

  return (
    <div className="dashboard-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Sidebar
        activeSection={activeSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={navigate}
        onSignOut={() => setSignedIn(false)}
        role={role}
      />
      <div className="workspace">
        <Topbar
          menuOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen(true)}
          onNavigate={navigate}
          onRoleChange={(nextRole) => {
            setRole(nextRole);
            if (activeNavigationItem && PERMISSIONS[activeNavigationItem.permission][nextRole] === "none") setActiveSection("overview");
            notify(`Previewing ${nextRole.toLowerCase()} permissions.`);
          }}
          onSearchChange={(value) => {
            setSearch(value);
            if (value.trim() && activeSection === "overview") {
              setActiveSection(/pay|pay-|gcash|maya/i.test(value) ? "payments" : "members");
            }
          }}
          role={role}
          search={search}
          searchRef={searchRef}
          title={title}
        />
        <main className="dashboard-content" id="main">
          <div className="welcome-row">
            <div>
              <p className="welcome-date">{today} <span>·</span> {gymInfo.locality}, {gymInfo.region}</p>
                  <h1>{activeSection === "overview" ? `${greeting}, ${currentUser.name.split(" ")[0]}` : title}<span className="heading-period">.</span></h1>
              <p className="welcome-subtitle">
                {activeSection === "overview"
                  ? "Here’s what’s happening at your gym today."
                  : `Manage ${title.toLowerCase()} and keep your gym running smoothly.`}
              </p>
            </div>
            <div className="preview-badge"><span /> PREVIEW DATA</div>
          </div>

          {activeSection === "overview" ? (
            <Overview onNavigate={navigate} onToast={notify} />
          ) : (
            <ModuleView onToast={notify} search={search} section={activeSection} />
          )}

          <footer className="dashboard-footer">
            <span>{gymInfo.name} <i>·</i> {gymInfo.locality?.toUpperCase()}</span>
            <span>Admin workspace <i>·</i> {STAFF_ROLE_LABEL[role]} access</span>
          </footer>
        </main>
      </div>

      {toast && (
        <div aria-live="polite" className="toast" role="status">
          <span className="toast-icon"><Check size={15} /></span>
          <span>{toast}</span>
          <button aria-label="Dismiss notification" onClick={() => setToast("")} type="button"><X size={15} /></button>
        </div>
      )}
    </div>
  );
}
