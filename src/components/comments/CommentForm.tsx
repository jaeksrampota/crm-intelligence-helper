import { useState } from 'react';
import type { Comment, CommentCategory, CommentPriority, CommentTargetAudience } from '../../types/comment';
import { useTranslation } from '../../i18n';

const CATEGORIES: CommentCategory[] = [
  'business', 'customer_wording', 'data_limitation', 'it_feasibility',
  'compliance_legal', 'ux_ui', 'product_idea',
];

const PRIORITIES: CommentPriority[] = ['low', 'medium', 'high'];
const AUDIENCES: CommentTargetAudience[] = ['business', 'it', 'data', 'compliance', 'product'];

interface CommentFormProps {
  onSave: (data: {
    text: string;
    author: string;
    category: CommentCategory;
    priority?: CommentPriority;
    targetAudience?: CommentTargetAudience;
  }) => void;
  onCancel: () => void;
  initialData?: Comment;
}

export function CommentForm({ onSave, onCancel, initialData }: CommentFormProps) {
  const { t } = useTranslation();
  const [text, setText] = useState(initialData?.text ?? '');
  const [author, setAuthor] = useState(initialData?.author ?? 'admin');
  const [category, setCategory] = useState<CommentCategory>(initialData?.category ?? 'business');
  const [priority, setPriority] = useState<CommentPriority | ''>(initialData?.priority ?? '');
  const [audience, setAudience] = useState<CommentTargetAudience | ''>(initialData?.targetAudience ?? '');

  const categoryLabel = (cat: CommentCategory) => {
    const key = `cat${cat.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}` as keyof typeof t.comments;
    return t.comments[key] as string;
  };

  const priorityLabel = (p: CommentPriority) => {
    const key = `priority${p.charAt(0).toUpperCase() + p.slice(1)}` as keyof typeof t.comments;
    return t.comments[key] as string;
  };

  const audienceLabel = (a: CommentTargetAudience) => {
    const key = `audience${a.charAt(0).toUpperCase() + a.slice(1)}` as keyof typeof t.comments;
    return t.comments[key] as string;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSave({
      text: text.trim(),
      author: author.trim() || 'admin',
      category,
      priority: priority || undefined,
      targetAudience: audience || undefined,
    });
  };

  const inputClass = 'w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-rb-yellow focus:border-transparent';
  const selectClass = 'w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-rb-yellow focus:border-transparent';

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{t.comments.commentText} *</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={inputClass + ' min-h-[60px] resize-y'}
          rows={3}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{t.comments.author}</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{t.comments.category} *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as CommentCategory)} className={selectClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel(c)}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{t.comments.priority}</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as CommentPriority | '')} className={selectClass}>
            <option value="">{t.comments.priorityNone}</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{priorityLabel(p)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{t.comments.targetAudience}</label>
          <select value={audience} onChange={(e) => setAudience(e.target.value as CommentTargetAudience | '')} className={selectClass}>
            <option value="">{t.comments.audienceNone}</option>
            {AUDIENCES.map((a) => <option key={a} value={a}>{audienceLabel(a)}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">
          {t.comments.cancel}
        </button>
        <button type="submit" disabled={!text.trim()} className="px-3 py-1.5 text-xs font-semibold bg-rb-yellow text-rb-black rounded-md hover:brightness-95 disabled:opacity-40">
          {t.comments.save}
        </button>
      </div>
    </form>
  );
}
