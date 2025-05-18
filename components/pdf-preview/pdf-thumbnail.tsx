'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import Image from 'next/image';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type PdfThumbnailProps = {
  pdfUrl: string;
  onError?: () => void;
};

export const PdfThumbnail = ({ pdfUrl, onError }: PdfThumbnailProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewportDimensions, setViewportDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const generateThumbnail = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: `${pdfUrl}?timestamp=${Date.now()}`,
          withCredentials: false,
        });

        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context || !mounted) return;
        
        setViewportDimensions({ width: viewport.width, height: viewport.height });
        if (!context || !mounted) return;

        // Set canvas dimensions (full width but half height)
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Only render the top half of the page
        const renderContext = {
          canvasContext: context,
          viewport: page.getViewport({
            scale: 1.5,
            offsetY: 0, // Start from top
            dontFlip: false,
          }),
        };

        await page.render(renderContext).promise;

        if (mounted) {
          setThumbnail(canvas.toDataURL('image/jpeg', 0.8));
        }
      } catch (error) {
        console.error('Error generating thumbnail:', error);
        if (mounted) {
          setThumbnail(null);
          onError?.();
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    generateThumbnail();

    return () => {
      mounted = false;
    };
  }, [pdfUrl, onError]);

  return (
    <div className="relative w-full h-40 bg-gray-50 rounded-md overflow-hidden border border-gray-200">
      {loading ? (
        <div className="flex h-full items-center justify-center">
          <FileText className="h-8 w-8 text-gray-300 animate-pulse" />
        </div>
      ) : thumbnail ? (
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={thumbnail}
            width={viewportDimensions.width}
            height={viewportDimensions.height}
            loading="lazy"
            alt=''
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-white/70 to-transparent" />
        </div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-4 text-center">
          <FileText className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-xs text-gray-500">Preview not available</p>
        </div>
      )}
    </div>
  );
};