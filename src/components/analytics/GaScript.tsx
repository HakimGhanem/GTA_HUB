import { GA_MEASUREMENT_ID, USE_DIRECT_GA4 } from "@/lib/analytics/env";

/** Consent Mode v2 defaults — must run before gtag config or GTM load. */
export function ConsentDefaultsScript() {
  if (!USE_DIRECT_GA4 && !process.env.NEXT_PUBLIC_GTM_ID?.trim()) return null;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'security_storage': 'granted',
  'wait_for_update': 500
});
`,
      }}
    />
  );
}

/**
 * Direct GA4 gtag (when no GTM container). Loads after ConsentDefaultsScript.
 */
export function GaScript() {
  if (!USE_DIRECT_GA4 || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', {
  send_page_view: true,
  anonymize_ip: true
});
`,
        }}
      />
    </>
  );
}
