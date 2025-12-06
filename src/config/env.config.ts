export const AppConfig = {
  apiEnabled: process.env.NEXT_PUBLIC_ENABLE_API === "true",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};

// export const AnalyticsConfig = {
//   enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
//   googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "",
// };

// export const GoogleTagManagerConfig = {
//   enabled: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_TAG_MANAGER === "true",
//   googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID ?? "",
// };
