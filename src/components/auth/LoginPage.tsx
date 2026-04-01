import { useState } from 'react';
import { useTranslation } from '../../i18n';

interface LoginPageProps {
  onLogin: (username: string, password: string) => boolean;
  error: string | null;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  const insetInput: React.CSSProperties = {
    width: '100%',
    background: '#ffffff',
    borderTop: '2px solid #808080',
    borderLeft: '2px solid #808080',
    borderRight: '2px solid #ffffff',
    borderBottom: '2px solid #ffffff',
    outline: '1px solid #404040',
    padding: '3px 6px',
    fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
    fontSize: 11,
    color: '#000',
    boxSizing: 'border-box' as const,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#008080',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      {/* Win2k dialog window */}
      <div
        style={{
          background: '#d4d0c8',
          borderTop: '2px solid #ffffff',
          borderLeft: '2px solid #ffffff',
          borderRight: '2px solid #404040',
          borderBottom: '2px solid #404040',
          outline: '1px solid #000',
          width: 300,
          fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
          fontSize: 11,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #0a246a, #a6caf0)',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 11,
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            userSelect: 'none',
          }}
        >
          <img src={import.meta.env.BASE_URL + 'rb-icon.svg'} alt="" style={{ width: 14, height: 14 }} />
          {t.app.title} — {t.login.submit}
        </div>

        {/* Body */}
        <div style={{ padding: 16 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <img src={import.meta.env.BASE_URL + 'rb-logo.svg'} alt="Raiffeisenbank" style={{ height: 36, display: 'inline-block' }} />
          </div>

          {/* Separator */}
          <div style={{ height: 1, background: '#808080', boxShadow: '0 1px 0 #ffffff', marginBottom: 14 }} />

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 10 }}>
              <label
                htmlFor="username"
                style={{ display: 'block', marginBottom: 3, fontSize: 11, fontWeight: 'bold' }}
              >
                {t.login.username}:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={insetInput}
                autoFocus
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label
                htmlFor="password"
                style={{ display: 'block', marginBottom: 3, fontSize: 11, fontWeight: 'bold' }}
              >
                {t.login.password}:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={insetInput}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  fontSize: 11,
                  color: '#c00000',
                  background: '#ffeeee',
                  border: '1px solid #cc0000',
                  padding: '3px 6px',
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                {t.login.error}
              </div>
            )}

            {/* Separator */}
            <div style={{ height: 1, background: '#808080', boxShadow: '0 1px 0 #ffffff', marginBottom: 10 }} />

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
              <button type="submit" className="win2k-btn" style={{ minWidth: 80, justifyContent: 'center' }}>
                {t.login.submit}
              </button>
              <button
                type="button"
                className="win2k-btn"
                style={{ minWidth: 80, justifyContent: 'center' }}
                onClick={() => { setUsername(''); setPassword(''); }}
              >
                {t.login.logout}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
