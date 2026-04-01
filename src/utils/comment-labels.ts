import type { Translations } from '../i18n/translations';
import type { CommentCategory, CommentStatus, CommentPriority, CommentTargetAudience, ZoneId } from '../types/comment';

type CommentTranslations = Translations['comments'];

const CATEGORY_KEYS: Record<CommentCategory, keyof CommentTranslations> = {
  business: 'catBusiness',
  customer_wording: 'catCustomerWording',
  data_limitation: 'catDataLimitation',
  it_feasibility: 'catItFeasibility',
  compliance_legal: 'catComplianceLegal',
  ux_ui: 'catUxUi',
  product_idea: 'catProductIdea',
};

const STATUS_KEYS: Record<CommentStatus, keyof CommentTranslations> = {
  open: 'statusOpen',
  resolved: 'statusResolved',
  rejected: 'statusRejected',
};

const PRIORITY_KEYS: Record<CommentPriority, keyof CommentTranslations> = {
  low: 'priorityLow',
  medium: 'priorityMedium',
  high: 'priorityHigh',
};

const AUDIENCE_KEYS: Record<CommentTargetAudience, keyof CommentTranslations> = {
  business: 'audienceBusiness',
  it: 'audienceIt',
  data: 'audienceData',
  compliance: 'audienceCompliance',
  product: 'audienceProduct',
};

const ZONE_KEYS: Record<ZoneId, keyof CommentTranslations> = {
  products: 'zoneProducts',
  activity: 'zoneActivity',
  behavior: 'zoneBehavior',
  sales: 'zoneSales',
  header: 'zoneHeader',
  alerts: 'zoneAlerts',
  general: 'zoneGeneral',
};

export function categoryLabel(tc: CommentTranslations, cat: CommentCategory): string {
  return tc[CATEGORY_KEYS[cat]] as string;
}

export function statusLabel(tc: CommentTranslations, status: CommentStatus): string {
  return tc[STATUS_KEYS[status]] as string;
}

export function priorityLabel(tc: CommentTranslations, priority: CommentPriority): string {
  return tc[PRIORITY_KEYS[priority]] as string;
}

export function audienceLabel(tc: CommentTranslations, audience: CommentTargetAudience): string {
  return tc[AUDIENCE_KEYS[audience]] as string;
}

export function zoneLabel(tc: CommentTranslations, zone: ZoneId): string {
  return tc[ZONE_KEYS[zone]] as string;
}

export { CATEGORY_KEYS };
