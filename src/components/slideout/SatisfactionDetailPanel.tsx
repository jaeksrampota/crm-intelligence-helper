import { TrendingUp, TrendingDown, Minus, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { SatisfactionScore } from '../../types';
import { RelativeDate } from '../shared/RelativeDate';
import { useTranslation } from '../../i18n';

const SURVEY_BADGE: Record<string, string> = {
  NPS: 'bg-blue-50 text-blue-700 border-blue-200',
  CSAT: 'bg-green-50 text-green-700 border-green-200',
  CES: 'bg-purple-50 text-purple-700 border-purple-200',
};

function getNpsLabel(score: number, t: ReturnType<typeof useTranslation>['t']) {
  if (score >= 9) return { label: t.satisfaction.promoter, color: 'text-green-600' };
  if (score >= 7) return { label: t.satisfaction.passive, color: 'text-amber-600' };
  return { label: t.satisfaction.detractor, color: 'text-red-600' };
}

export function SatisfactionDetailPanel({ scores }: { scores: SatisfactionScore[] }) {
  const { t } = useTranslation();

  if (scores.length === 0) {
    return <div className="text-xs text-gray-400 py-4 text-center">{t.satisfaction.noScores}</div>;
  }

  const sorted = [...scores].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const npsScores = sorted.filter((s) => s.survey_type === 'NPS');
  const withFeedback = sorted.filter((s) => s.verbatim_text);

  // Trend: compare newest vs oldest NPS
  let trendIcon = Minus;
  let trendColor = 'text-gray-400';
  if (npsScores.length >= 2) {
    const newest = npsScores[0].score;
    const oldest = npsScores[npsScores.length - 1].score;
    if (newest > oldest) { trendIcon = TrendingUp; trendColor = 'text-green-500'; }
    else if (newest < oldest) { trendIcon = TrendingDown; trendColor = 'text-red-500'; }
  }
  const TrendIcon = trendIcon;

  return (
    <div className="space-y-4">
      {/* NPS Overview */}
      {npsScores.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.satisfaction.latestNps}</span>
            <TrendIcon size={16} className={trendColor} />
          </div>
          <div className="flex items-center gap-3">
            <span className={cn('text-2xl font-bold', getNpsLabel(npsScores[0].score, t).color)}>
              {npsScores[0].score}
            </span>
            <span className={cn('text-xs font-medium', getNpsLabel(npsScores[0].score, t).color)}>
              {getNpsLabel(npsScores[0].score, t).label}
            </span>
          </div>
        </div>
      )}

      {/* Survey History */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.satisfaction.surveyHistory}</h3>
        <div className="divide-y divide-gray-100">
          {sorted.map((s) => {
            const npsInfo = s.survey_type === 'NPS' ? getNpsLabel(s.score, t) : null;
            return (
              <div key={s.score_id} className="flex items-center justify-between py-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className={cn('px-1.5 py-0.5 rounded border text-[9px] font-semibold', SURVEY_BADGE[s.survey_type])}>
                    {s.survey_type}
                  </span>
                  <RelativeDate date={s.timestamp} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={cn('font-bold', npsInfo?.color || 'text-gray-700')}>{s.score}</span>
                  {npsInfo && <span className={cn('text-[9px]', npsInfo.color)}>{npsInfo.label}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verbatim Feedback */}
      {withFeedback.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{t.satisfaction.verbatimFeedback}</h3>
          <div className="space-y-2">
            {withFeedback.map((s) => (
              <div key={s.score_id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-start gap-2">
                  <MessageSquare size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-700 italic">"{s.verbatim_text}"</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={cn('px-1.5 py-0.5 rounded border text-[9px] font-semibold', SURVEY_BADGE[s.survey_type])}>
                        {s.survey_type} {s.score}
                      </span>
                      <span className="text-[10px] text-gray-400"><RelativeDate date={s.timestamp} /></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
