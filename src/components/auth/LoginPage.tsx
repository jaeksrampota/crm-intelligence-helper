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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col items-center gap-3 mb-8">
            <img
              src={import.meta.env.BASE_URL + 'rb-icon.svg'}
              alt="Raiffeisenbank"
              className="w-12 h-12"
            />
            <h1 className="text-lg font-bold text-gray-800">{t.app.title}</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-gray-600 mb-1">
                {t.login.username}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rb-yellow focus:border-transparent"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-600 mb-1">
                {t.login.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rb-yellow focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 text-center">{t.login.error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-rb-yellow text-rb-black font-semibold text-sm rounded-lg hover:brightness-95 transition-all"
            >
              {t.login.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
