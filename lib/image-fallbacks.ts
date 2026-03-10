export const DEFAULT_PLACEHOLDER = 'https://cdn.shopify.com/s/files/1/0384/6721/files/856504014742_A_LOGO_162057a5-e74b-4a6e-95ab-7994957346d4.jpg?v=1750191396'

export const CATEGORY_FALLBACKS: Record<string, string> = {
  'cases-main': 'https://cdn.shopify.com/s/files/1/0384/6721/files/856504014049_B_iPhone.jpg?v=1758036362',
  'charging-main': 'https://cdn.shopify.com/s/files/1/0384/6721/files/856504014940_B.jpg?v=1737647869',
  'tracking-wallets': 'https://cdn.shopify.com/s/files/1/0384/6721/files/856504014995_E_385e49a5-0327-4c05-8f55-a5a53c9f0225.jpg?v=1763412254',
  'apple-watch-main': 'https://cdn.shopify.com/s/files/1/0384/6721/files/sport-band-45mm-black-back.jpg?v=1762975245',
}

export const PRODUCT_FALLBACKS: Record<string, string> = {
  'tracking-card-pro': 'https://cdn.shopify.com/s/files/1/0384/6721/files/856504014995_E_385e49a5-0327-4c05-8f55-a5a53c9f0225.jpg?v=1763412254',
}

export function resolveCategoryImage(categorySlug?: string, columnImage?: string) {
  if (columnImage) return columnImage
  if (categorySlug && CATEGORY_FALLBACKS[categorySlug]) return CATEGORY_FALLBACKS[categorySlug]
  return DEFAULT_PLACEHOLDER
}

export function resolveProductImage(productSlug?: string, image?: string) {
  if (productSlug && PRODUCT_FALLBACKS[productSlug]) return PRODUCT_FALLBACKS[productSlug]
  if (image) return image
  return DEFAULT_PLACEHOLDER
}
