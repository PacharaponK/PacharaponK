const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = process.env.SITE_URL ?? (productionDomain ? `https://${productionDomain}` : undefined);
