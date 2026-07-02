import type { TransformationPreset, GeneratedAsset } from '@/types';

// Default cloud name - user will configure their own
const DEFAULT_CLOUD_NAME = 'your-cloud-name';

export const getCloudinaryUrl = (publicId: string, transformations: string = ''): string => {
  const cloudName = localStorage.getItem('cloudinary_cloud_name') || DEFAULT_CLOUD_NAME;
  if (!publicId) return '';

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  if (transformations) {
    return `${baseUrl}/${transformations}/${publicId}`;
  }
  return `${baseUrl}/${publicId}`;
};

export const getOptimizedUrl = (publicId: string): string => {
  return getCloudinaryUrl(publicId, 'f_auto,q_auto');
};

export const getTransformedUrl = (
  publicId: string,
  width: number,
  height: number,
  crop: string = 'fill',
  format?: string,
  quality?: string
): string => {
  let transformation = `w_${width},h_${height},c_${crop}`;
  if (format) {
    transformation += `,f_${format}`;
  }
  if (quality) {
    transformation += `,q_${quality}`;
  }
  return getCloudinaryUrl(publicId, transformation);
};

export const generateReactSdkCode = (publicId: string, width: number, height: number): string => {
  return `import { CldImage } from 'next-cloudinary';

<CldImage
  src="${publicId}"
  width={${width}}
  height={${height}}
  alt="Brand asset"
  crop="fill"
  quality="auto"
  format="auto"
/>`;
};

export const generateHtmlCode = (url: string, width: number, height: number): string => {
  return `<img
  src="${url}"
  width="${width}"
  height="${height}"
  alt="Brand asset"
  loading="lazy"
/>`;
};

export const transformationPresets: TransformationPreset[] = [
  // Social Media Presets
  {
    name: 'LinkedIn Banner',
    width: 1584,
    height: 396,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'Professional LinkedIn profile banner',
    icon: 'Linkedin',
  },
  {
    name: 'YouTube Thumbnail',
    width: 1280,
    height: 720,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'Eye-catching YouTube video thumbnail',
    icon: 'Youtube',
  },
  {
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'Square Instagram feed post',
    icon: 'Instagram',
  },
  {
    name: 'Instagram Story',
    width: 1080,
    height: 1920,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'Full-screen Instagram story',
    icon: 'Instagram',
  },
  {
    name: 'X (Twitter) Banner',
    width: 1500,
    height: 500,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'X profile header banner',
    icon: 'Twitter',
  },
  {
    name: 'Facebook Cover',
    width: 820,
    height: 312,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'social',
    description: 'Facebook page cover photo',
    icon: 'Facebook',
  },
  // Web Presets
  {
    name: 'Website Hero',
    width: 1920,
    height: 1080,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'web',
    description: 'Full-width website hero image',
    icon: 'Monitor',
  },
  {
    name: 'Blog Cover',
    width: 1200,
    height: 630,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'web',
    description: 'Blog post featured image',
    icon: 'FileText',
  },
  {
    name: 'Open Graph',
    width: 1200,
    height: 630,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'web',
    description: 'Social sharing preview image',
    icon: 'Share2',
  },
  // Optimized Formats
  {
    name: 'Optimized WebP',
    width: 1200,
    height: 800,
    crop: 'fill',
    format: 'webp',
    quality: 'auto:good',
    category: 'optimized',
    description: 'WebP format for modern browsers',
    icon: 'Zap',
  },
  {
    name: 'Optimized AVIF',
    width: 1200,
    height: 800,
    crop: 'fill',
    format: 'avif',
    quality: 'auto:good',
    category: 'optimized',
    description: 'AVIF format for best compression',
    icon: 'Zap',
  },
  {
    name: 'Transparent PNG',
    width: 800,
    height: 800,
    crop: 'fill',
    format: 'png',
    quality: 'auto',
    category: 'optimized',
    description: 'PNG with transparency support',
    icon: 'Image',
  },
  {
    name: 'Square Thumbnail',
    width: 400,
    height: 400,
    crop: 'thumb',
    format: 'auto',
    quality: 'auto',
    category: 'optimized',
    description: 'Small square thumbnail preview',
    icon: 'Square',
  },
  // Banner Presets
  {
    name: 'Mobile Banner',
    width: 320,
    height: 100,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'banner',
    description: 'Mobile ad banner',
    icon: 'Smartphone',
  },
  {
    name: 'Desktop Banner',
    width: 728,
    height: 90,
    crop: 'fill',
    format: 'auto',
    quality: 'auto',
    category: 'banner',
    description: 'Desktop leaderboard banner',
    icon: 'Monitor',
  },
];

export const generateAllAssets = (publicId: string): GeneratedAsset[] => {
  return transformationPresets.map((preset, index) => {
    const transformationUrl = getTransformedUrl(
      publicId,
      preset.width,
      preset.height,
      preset.crop,
      preset.format,
      preset.quality
    );

    const downloadUrl = getTransformedUrl(
      publicId,
      preset.width,
      preset.height,
      preset.crop,
      preset.format === 'auto' ? 'png' : preset.format,
      'best'
    );

    return {
      id: `asset-${index}-${Date.now()}`,
      name: preset.name,
      previewUrl: transformationUrl,
      transformationUrl,
      downloadUrl,
      width: preset.width,
      height: preset.height,
      format: preset.format || 'auto',
      category: preset.category,
      description: preset.description,
      reactSdkCode: generateReactSdkCode(publicId, preset.width, preset.height),
      htmlCode: generateHtmlCode(transformationUrl, preset.width, preset.height),
    };
  });
};

export const downloadImage = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: open in new tab
    window.open(url, '_blank');
  }
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Copy failed:', error);
    return false;
  }
};

export const uploadToCloudinary = async (
  file: File
): Promise<{ publicId: string; url: string }> => {
  const cloudName = localStorage.getItem('cloudinary_cloud_name');
  const uploadPreset = localStorage.getItem('cloudinary_upload_preset') || 'brandforge_unsigned';

  if (!cloudName) {
    throw new Error('Cloudinary cloud name not configured. Please add it in settings.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    publicId: data.public_id,
    url: data.secure_url,
  };
};
