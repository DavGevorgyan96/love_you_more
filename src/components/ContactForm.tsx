import { useState } from 'react';
import { api } from '../api/client';

export function ContactForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    try {
      await api.sendMail({ to, subject, text });
      setStatus('success');
      setMessage('Письмо отправлено.');
      setTo('');
      setSubject('');
      setText('');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Ошибка отправки');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-medium text-slate-800">Отправить письмо (Nodemailer)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="to" className="mb-1 block text-sm font-medium text-slate-600">
            Кому (email)
          </label>
          <input
            id="to"
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1 block text-sm font-medium text-slate-600">
            Тема
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Тема письма"
          />
        </div>
        <div>
          <label htmlFor="text" className="mb-1 block text-sm font-medium text-slate-600">
            Текст
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Текст письма..."
          />
        </div>
        {message && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}
