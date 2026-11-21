import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

type SignInProps = { onSignIn: () => void };

export default function SignIn({ onSignIn }: SignInProps) {
  const [email, setEmail] = useState("owner@plyobox.ph");
  const [password, setPassword] = useState("");

  return (
    <main className="signin-shell">
      <div aria-hidden="true" className="signin-glow" />
      <section aria-labelledby="signin-title" className="signin-card">
        <img alt="Plyobox Performance Gym" className="signin-logo" height="667" src="/Logo.png" width="2000" />
        <span className="signin-icon"><ShieldCheck aria-hidden="true" size={22} /></span>
        <p className="eyebrow">STAFF PORTAL</p>
        <h1 id="signin-title">Welcome back.</h1>
        <p className="signin-description">Sign in to manage your gym workspace.</p>
        <form className="stacked-form" onSubmit={(event) => {
          event.preventDefault();
          onSignIn();
        }}>
          <label className="field-label">Work email<input autoComplete="username" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label>
          <label className="field-label">Password<input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label>
          <div className="signin-form-meta"><label><input type="checkbox" /> Remember me</label><span>Need access? Contact the gym owner.</span></div>
          <button className="button button-primary button-wide signin-submit" type="submit">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="signin-safety"><ShieldCheck size={14} /> Authorized personnel only. Activity is logged.</p>
        <p className="signin-demo">UI preview only · Authentication is not connected</p>
      </section>
    </main>
  );
}
