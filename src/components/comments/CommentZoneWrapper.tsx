import type { ReactNode } from 'react';
import type { ZoneId } from '../../types/comment';

interface CommentZoneWrapperProps {
  zoneId: ZoneId;
  children: ReactNode;
}

/**
 * Thin pass-through wrapper that provides the zone id attribute
 * for scrollToZone navigation. Comment affordances are now handled
 * by CommentableElement at the individual card/element level.
 */
export function CommentZoneWrapper({ children }: CommentZoneWrapperProps) {
  return <>{children}</>;
}
