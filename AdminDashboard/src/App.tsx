import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import ModuleView from "./components/ModuleView";
import Overview from "./components/Overview";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import Topbar from "./components/Topbar";
import { navigation, type Role, type SectionId } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [role, setRole] = useState<Role>("Owner");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [signedIn, setSignedIn] = useState(true);
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
    if (target?.ownerOnly && role === "Staff") {
      notify("This section is available to the owner role only.");
      return;
    }

    setActiveSection(section);
    setSearch("");
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!signedIn) return <SignIn onSignIn={() => setSignedIn(true)} />;

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
            if (nextRole === "Staff" && activeNavigationItem?.ownerOnly) setActiveSection("overview");
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
              <p className="welcome-date">{today} <span>·</span> Mahayag, Zamboanga del Sur</p>
              <h1>{activeSection === "overview" ? "Good morning, Alex" : title}<span className="heading-period">.</span></h1>
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
            <span>PLY OBOX PERFORMANCE <i>·</i> MAHAYAG</span>
            <span>Admin workspace <i>·</i> {role} access</span>
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
