import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AIResult } from '@/types';

const getGeminiClient = () => {
  const apiKey = localStorage.getItem('gemini_api_key');
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add it in settings.');
  }
  return new GoogleGenerativeAI(apiKey);
};

export const analyzeImage = async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<AIResult> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Analyze this image in detail and provide the following information in a structured format:

1. CAPTION: Write an engaging, professional caption for this image (2-3 sentences)
2. SEO TITLE: Create an SEO-optimized title (max 60 characters)
3. META DESCRIPTION: Write a compelling meta description (max 160 characters)
4. ALT TEXT: Write descriptive alt text for accessibility (max 125 characters)
5. HASHTAGS: Provide 10 relevant hashtags separated by commas
6. SOCIAL POST: Write a social media post with this image (include emojis, max 280 characters for X/Twitter)
7. COLOR PALETTE: Extract the dominant colors as hex codes (provide 5 colors)
8. IMAGE ANALYSIS: Describe what you see in the image, including objects, style, mood, and composition
9. ACCESSIBILITY: Provide 3-5 specific accessibility improvement suggestions

Format your response exactly like this:
CAPTION: [your caption]
SEO_TITLE: [your seo title]
META_DESCRIPTION: [your meta description]
ALT_TEXT: [your alt text]
HASHTAGS: [hashtag1, hashtag2, ...]
SOCIAL_POST: [your social post]
COLOR_1: #XXXXXX
COLOR_2: #XXXXXX
COLOR_3: #XXXXXX
COLOR_4: #XXXXXX
COLOR_5: #XXXXXX
IMAGE_ANALYSIS: [your analysis]
ACCESSIBILITY_1: [suggestion 1]
ACCESSIBILITY_2: [suggestion 2]
ACCESSIBILITY_3: [suggestion 3]`;

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    return parseAIResponse(text);
  } catch (error) {
    console.error('AI Analysis error:', error);
    return getFallbackResult();
  }
};

export const generateCaption = async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<string> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = 'Write an engaging, professional caption for this image. Keep it to 2-3 sentences. Be creative and compelling.';

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Caption generation error:', error);
    return 'A stunning visual asset for your brand. Elevate your presence with this professional design.';
  }
};

export const generateSEOContent = async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<{ seoTitle: string; metaDescription: string; altText: string }> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `For this image, provide:
1. SEO Title (max 60 characters)
2. Meta Description (max 160 characters)  
3. Alt Text (max 125 characters, descriptive for accessibility)

Format exactly as:
SEO_TITLE: [title]
META_DESCRIPTION: [description]
ALT_TEXT: [alt text]`;

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    const lines = text.split('\n');
    const seoTitle = lines.find(l => l.startsWith('SEO_TITLE:'))?.replace('SEO_TITLE:', '').trim() || 'Brand Asset';
    const metaDescription = lines.find(l => l.startsWith('META_DESCRIPTION:'))?.replace('META_DESCRIPTION:', '').trim() || 'Professional brand asset';
    const altText = lines.find(l => l.startsWith('ALT_TEXT:'))?.replace('ALT_TEXT:', '').trim() || 'Brand image';

    return { seoTitle, metaDescription, altText };
  } catch (error) {
    console.error('SEO generation error:', error);
    return {
      seoTitle: 'Professional Brand Asset | BrandForge AI',
      metaDescription: 'High-quality brand asset generated with BrandForge AI. Transform your visual identity.',
      altText: 'Professional brand asset image',
    };
  }
};

export const generateHashtags = async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<string[]> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = 'Generate 10 relevant, trending hashtags for this image. Return only the hashtags separated by commas, no extra text.';

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    return text.split(/[,\s]+/).filter(tag => tag.startsWith('#')).slice(0, 10);
  } catch (error) {
    console.error('Hashtag generation error:', error);
    return ['#branding', '#design', '#marketing', '#visual', '#creative', '#digital', '#brandidentity', '#graphicdesign', '#content', '#professional'];
  }
};

export const generateSocialPost = async (imageBase64: string, platform: string = 'general', mimeType: string = 'image/jpeg'): Promise<string> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const platformGuidelines: Record<string, string> = {
      twitter: 'max 280 characters',
      instagram: 'engaging with emojis, max 2200 characters',
      linkedin: 'professional tone, max 3000 characters',
      facebook: 'friendly and engaging',
      general: 'versatile for any platform, max 500 characters',
    };

    const prompt = `Write a social media post for ${platform} (${platformGuidelines[platform] || platformGuidelines.general}) featuring this image. Include relevant emojis and a call to action.`;

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Social post generation error:', error);
    return 'Check out this amazing brand asset! 🚀 Elevate your visual identity with professional designs. #branding #design';
  }
};

export const extractColorPalette = async (imageBase64: string, mimeType: string = 'image/jpeg'): Promise<string[]> => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Extract the 5 most dominant colors from this image. Return ONLY the hex codes, one per line, in this exact format:
COLOR_1: #XXXXXX
COLOR_2: #XXXXXX
COLOR_3: #XXXXXX
COLOR_4: #XXXXXX
COLOR_5: #XXXXXX`;

    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    };

    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    const text = response.text();

    const colors: string[] = [];
    const lines = text.split('\n');
    for (const line of lines) {
      const match = line.match(/#([A-Fa-f0-9]{6})/);
      if (match) {
        colors.push(`#${match[1]}`);
      }
    }

    return colors.length >= 3 ? colors.slice(0, 5) : ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#eaeaea'];
  } catch (error) {
    console.error('Color extraction error:', error);
    return ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#eaeaea'];
  }
};

const parseAIResponse = (text: string): AIResult => {
  const lines = text.split('\n');

  const getValue = (prefix: string): string => {
    const line = lines.find(l => l.trim().startsWith(prefix));
    return line ? line.replace(prefix, '').trim() : '';
  };

  const hashtagsText = getValue('HASHTAGS:');
  const hashtags = hashtagsText
    ? hashtagsText.split(/[,\s]+/).filter(tag => tag.startsWith('#') || tag.length > 0).map(tag => tag.startsWith('#') ? tag : `#${tag}`)
    : ['#branding', '#design', '#marketing'];

  const colors: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const color = getValue(`COLOR_${i}:`);
    if (color && color.match(/^#[0-9A-Fa-f]{6}$/)) {
      colors.push(color);
    }
  }

  const accessibility: string[] = [];
  for (let i = 1; i <= 5; i++) {
    const suggestion = getValue(`ACCESSIBILITY_${i}:`);
    if (suggestion) {
      accessibility.push(suggestion);
    }
  }

  return {
    caption: getValue('CAPTION:') || 'A stunning visual asset for your brand.',
    seoTitle: getValue('SEO_TITLE:') || 'Brand Asset',
    metaDescription: getValue('META_DESCRIPTION:') || 'Professional brand asset generated with AI.',
    altText: getValue('ALT_TEXT:') || 'Brand image',
    hashtags: hashtags.slice(0, 10),
    socialPost: getValue('SOCIAL_POST:') || 'Check out this amazing brand asset!',
    colorPalette: colors.length >= 3 ? colors : ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#eaeaea'],
    imageAnalysis: getValue('IMAGE_ANALYSIS:') || 'A professional brand image with strong visual elements.',
    accessibilitySuggestions: accessibility.length > 0 ? accessibility : [
      'Add descriptive alt text for screen readers',
      'Ensure sufficient color contrast for text elements',
      'Consider adding a subtle border for visual separation',
    ],
  };
};

const getFallbackResult = (): AIResult => ({
  caption: 'A stunning visual asset crafted for your brand. Make a lasting impression with professional design.',
  seoTitle: 'Professional Brand Asset | BrandForge AI',
  metaDescription: 'High-quality brand asset generated with BrandForge AI. Transform your visual identity today.',
  altText: 'Professional brand asset image with modern design elements',
  hashtags: ['#branding', '#design', '#marketing', '#visual', '#creative', '#digital', '#brandidentity', '#graphicdesign', '#contentcreation', '#professional'],
  socialPost: 'Elevate your brand with stunning visuals! ✨ Professional assets that make an impact. #branding #design',
  colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#eaeaea'],
  imageAnalysis: 'A professional brand image featuring modern design aesthetics with strong visual hierarchy and appealing color composition.',
  accessibilitySuggestions: [
    'Add descriptive alt text for screen reader compatibility',
    'Ensure color contrast ratio meets WCAG AA standards (4.5:1)',
    'Consider providing a text alternative for complex visual information',
    'Use semantic HTML when embedding this image on web pages',
    'Test with keyboard navigation to ensure interactive elements are accessible',
  ],
});

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
