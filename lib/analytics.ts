declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number | boolean>) => void;
    };
  }
}

export const AnalyticsEvents = {
  SOCIAL_CLICK: 'social-click',
  NAV_CLICK: 'nav-click',
  ARTICLE_CLICK: 'article-click',
} as const;

type AnalyticsEventName = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

export interface SocialClickData {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  href: string;
}

export interface NavClickData {
  destination: 'home' | 'work' | 'writing' | 'contact';
  href: string;
}

export interface ArticleClickData {
  title: string;
  slug: string;
  isExternal: boolean;
  platform?: string;
}

export function trackEvent(
  eventName: AnalyticsEventName,
  eventData?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return;

  if (!window.umami) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, eventData);
    }
    return;
  }

  try {
    window.umami.track(eventName, eventData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics] Error:', error);
    }
  }
}

export function trackSocialClick(data: SocialClickData): void {
  trackEvent(AnalyticsEvents.SOCIAL_CLICK, { platform: data.platform, href: data.href });
}

export function trackNavClick(data: NavClickData): void {
  trackEvent(AnalyticsEvents.NAV_CLICK, { destination: data.destination, href: data.href });
}

export function trackArticleClick(data: ArticleClickData): void {
  trackEvent(AnalyticsEvents.ARTICLE_CLICK, {
    title: data.title,
    slug: data.slug,
    isExternal: String(data.isExternal),
    ...(data.platform && { platform: data.platform }),
  });
}
