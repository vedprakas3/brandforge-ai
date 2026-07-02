export interface BrandAsset {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  publicId: string;
  transformationUrl: string;
  downloadUrl: string;
  format: string;
  category: 'social' | 'web' | 'optimized' | 'banner';
  description: string;
}

export interface GeneratedAsset {
  id: string;
  name: string;
  previewUrl: string;
  transformationUrl: string;
  downloadUrl: string;
  width: number;
  height: number;
  format: string;
  category: 'social' | 'web' | 'optimized' | 'banner';
  description: string;
  reactSdkCode: string;
  htmlCode: string;
}

export interface AIResult {
  caption: string;
  seoTitle: string;
  metaDescription: string;
  altText: string;
  hashtags: string[];
  socialPost: string;
  colorPalette: string[];
  imageAnalysis: string;
  accessibilitySuggestions: string[];
}

export interface UploadState {
  file: File | null;
  preview: string;
  publicId: string;
  isUploading: boolean;
  error: string | null;
}

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  uploadPreset: string;
}

export interface TransformationPreset {
  name: string;
  width: number;
  height: number;
  crop: string;
  format?: string;
  quality?: string;
  category: 'social' | 'web' | 'optimized' | 'banner';
  description: string;
  icon: string;
}

export interface AppState {
  currentView: string;
  uploadedImage: UploadState;
  generatedAssets: GeneratedAsset[];
  aiResults: AIResult | null;
  isGenerating: boolean;
  cloudinaryConfig: CloudinaryConfig | null;
}
