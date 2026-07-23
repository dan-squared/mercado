'use client';

import React, { useState, useRef } from 'react';
import { HugeIcon } from './huge-icon';

interface UploadZoneProps {
  onFileSelect?: (file: File | null) => void;
  label?: string;
  className?: string;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  label = 'Upload Screenshot / Proof',
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setFileName(file.name);
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    if (onFileSelect) onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setFileName(null);
    if (onFileSelect) onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-xs font-semibold text-(--text-secondary)">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {previewUrl || fileName ? (
        <div className="relative p-3 rounded-xl border border-(--border) bg-(--surface) flex items-center gap-3">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Proof Preview"
              className="w-16 h-16 object-cover rounded-lg border border-(--border)"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-(--bg-secondary) flex items-center justify-center text-(--text-muted)">
              <HugeIcon name="upload" size={24} />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-(--text-primary) truncate">{fileName}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <HugeIcon name="check" size={12} /> Ready for submission
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-(--text-muted) hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <HugeIcon name="close" size={16} />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`p-6 rounded-xl border-2 border-dashed transition-colors duration-150 duration-200 cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
            dragActive
              ? 'border-(--blue) bg-(--blue-light)/20'
              : 'border-(--border) hover:border-(--blue) bg-(--bg-secondary)'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-(--surface) flex items-center justify-center text-(--blue) shadow-xs">
            <HugeIcon name="upload" size={20} />
          </div>
          <div>
            <p className="text-xs font-semibold text-(--text-primary)">
              Click to upload or drag & drop
            </p>
            <p className="text-[11px] text-(--text-muted) mt-0.5">
              PNG, JPG, WEBP or PDF up to 10MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
