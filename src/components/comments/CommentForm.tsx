import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Comment, CommentCategory, CommentPriority, CommentTargetAudience } from '../../types/comment';
import { useTranslation } from '../../i18n';
import { categoryLabel, priorityLabel, audienceLabel } from '../../utils/comment-labels';

const CATEGORIES: CommentCategory[] = [
  'business', 'customer_wording', 'data_limitation', 'it_feasibility',
  'compliance_legal', 'ux_ui', 'product_idea',
];

const PRIORITIES: CommentPriority[] = ['low', 'medium', 'high'];
const AUDIENCES: CommentTargetAudience[] = ['business', 'it', 'data', 'compliance', 'product'];

const AUTHOR_STORAGE_KEY = 'crm-comment-author';

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
  compact?: boolean;
}

function getSavedAuthor(): string {
  try {
    return localStorage.getItem(AUTHOR_STORAGE_KEY) || 'admin';
  } catch {
    return 'admin';
  }
}

function saveAuthor(name: string) {
  try {
    localStorage.setItem(AUTHOR_STORAGE_KEY, name);
  } catch { /* ignore */ }
}

export function CommentForm({ onSave, onCancel, initialData, compact }: CommentFormProps) {
  const { t } = useTranslation();
  const tc = t.comments;
  const [text, setText] = useState(initialData?.text ?? '');
  const [author, setAuthor] = useState(initialData?.author ?? getSavedAuthor());
  const [category, setCategory] = useState<CommentCategory>(initialData?.category ?? 'business');
  const [priority, setPriority] = useState<CommentPriority | ''>(initialData?.priority ?? '');
  const [audience, setAudience] = useState<CommentTargetAudience | ''>(initialData?.targetAudience ?? '');
  const [showMore, setShowMore] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    saveAuthor(author.trim() || 'admin');
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

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={inputClass + ' min-h-[48px] resize-y text-xs'}
          rows={2}
          placeholder={tc.commentText + '...'}
          autoFocus
        />
        <div className="flex items-center gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value as CommentCategory)} className={selectClass + ' text-xs flex-1'}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel(tc, c)}</option>)}
          </select>
          <button type="button" onClick={onCancel} className="px-2 py-1.5 text-[11px] font-medium text-gray-500 hover:text-gray-700">
            {tc.cancel}
          </button>
          <button type="submit" disabled={!text.trim()} className="px-2.5 py-1.5 text-[11px] font-semibold bg-rb-yellow text-rb-black rounded-md hover:brightness-95 disabled:opacity-40">
            {tc.save}
          </button>
        </div>

        {/* More options toggle */}
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          {showMore ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          {tc.moreOptions || 'More options'}
        </button>

        {showMore && (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">{tc.author}</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass + ' text-xs'} />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-500 mb-0.5">{tc.priority}</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value as CommentPriority | '')} className={selectClass + ' text-xs'}>
                  <option value="">{tc.priorityNone}</option>
                  {PRIORITIES.map((p) => <option key={p} value={p}>{priorityLabel(tc, p)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-gray-500 mb-0.5">{tc.targetAudience}</label>
              <select value={audience} onChange={(e) => setAudience(e.target.value as CommentTargetAudience | '')} className={selectClass + ' text-xs'}>
                <option value="">{tc.audienceNone}</option>
                {AUDIENCES.map((a) => <option key={a} value={a}>{audienceLabel(tc, a)}</option>)}
              </select>
            </div>
          </div>
        )}
      </form>
    );
  }

  // Full mode (sidebar / summary)
  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 rounded-lg p-3 bg-gray-50 space-y-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">{tc.commentText} *</label>
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
          <label className="block text-xs font-medium text-gray-600 mb-1">{tc.author}</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{tc.category} *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as CommentCategory)} className={selectClass}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{categoryLabel(tc, c)}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{tc.priority}</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as CommentPriority | '')} className={selectClass}>
            <option value="">{tc.priorityNone}</option>
            {PRIORITIES.map((p) => <option key={p} value={p}>{priorityLabel(tc, p)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{tc.targetAudience}</label>
          <select value={audience} onChange={(e) => setAudience(e.target.value as CommentTargetAudience | '')} className={selectClass}>
            <option value="">{tc.audienceNone}</option>
            {AUDIENCES.map((a) => <option key={a} value={a}>{audienceLabel(tc, a)}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">
          {tc.cancel}
        </button>
        <button type="submit" disabled={!text.trim()} className="px-3 py-1.5 text-xs font-semibold bg-rb-yellow text-rb-black rounded-md hover:brightness-95 disabled:opacity-40">
          {tc.save}
        </button>
      </div>
    </form>
  );
}
