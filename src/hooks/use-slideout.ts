import { useState, useCallback } from 'react';

export type SlideoutType = 'product' | 'interaction' | null;

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

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clearing content for animation
    setTimeout(() => {
      setContentType(null);
      setContentId(null);
    }, 300);
  }, []);

  return { isOpen, contentType, contentId, openProductDetail, openInteractionDetail, close };
}
