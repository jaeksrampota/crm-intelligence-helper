import { useState, useCallback } from 'react';

export type SlideoutType = 'product' | 'interaction' | 'behavior' | 'satisfaction' | null;

export function useSlideout() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentType, setContentType] = useState<SlideoutType>(null);
  const [contentId, setContentId] = useState<string | null>(null);

  const openProductDetail = useCallback((productId: string) => {
    setContentType('product');
    setContentId(productId);
    setIsOpen(true);
  }, []);

  const openInteractionDetail = useCallback((interactionId: string) => {
    setContentType('interaction');
    setContentId(interactionId);
    setIsOpen(true);
  }, []);

  const openBehaviorDetail = useCallback((signalKey: string) => {
    setContentType('behavior');
    setContentId(signalKey);
    setIsOpen(true);
  }, []);

  const openSatisfactionDetail = useCallback(() => {
    setContentType('satisfaction');
    setContentId('satisfaction');
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setContentType(null);
      setContentId(null);
    }, 300);
  }, []);

  return { isOpen, contentType, contentId, openProductDetail, openInteractionDetail, openBehaviorDetail, openSatisfactionDetail, close };
}
