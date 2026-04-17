export interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'converting' | 'completed' | 'error';
  progress?: number;
  result?: Blob;
  error?: string;
}

export interface ImageConvertOptions {
  format: 'png' | 'jpeg' | 'bmp' | 'gif' | 'tga' | 'qoi';
  quality?: number;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
}

export interface AudioExtractOptions {
  bitrate: '128k' | '192k' | '256k' | '320k';
  sampleRate: '44100' | '48000';
}

export type Theme = 'light' | 'dark';
