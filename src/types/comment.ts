export type CommentCategory =
  | 'business'
  | 'customer_wording'
  | 'data_limitation'
  | 'it_feasibility'
  | 'compliance_legal'
  | 'ux_ui'
  | 'product_idea';

export type CommentStatus = 'open' | 'resolved' | 'rejected';

export type CommentPriority = 'low' | 'medium' | 'high';

export type CommentTargetAudience = 'business' | 'it' | 'data' | 'compliance' | 'product';

export type ZoneId = 'products' | 'activity' | 'behavior' | 'sales' | 'header' | 'alerts' | 'general';

export interface Comment {
  id: string;
  zoneId: ZoneId;
  elementId?: string;
  elementLabel?: string;
  text: string;
  author: string;
  timestamp: string;
  category: CommentCategory;
  status: CommentStatus;
  priority?: CommentPriority;
  targetAudience?: CommentTargetAudience;
}
