import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  imagePath: string;
  title: string;
}

const CertificateModal = ({ isOpen, onClose, imagePath, title }: CertificateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      // Add event listener for Escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 cursor-pointer"
      onClick={() => onClose()}
    >
      <div 
        className="relative max-w-[90vw] max-h-[90vh] cursor-default"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={imagePath}
          alt={title}
          width={1200}
          height={800}
          className="object-contain max-h-[90vh]"
          priority
        />
      </div>
    </div>
  );
};

export default CertificateModal;