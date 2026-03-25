-- Force update all product images to unique High-Res assets to fix duplicates and blurry placeholders.

-- Vehicle
UPDATE products SET images = ARRAY['/images/base-one-max-black.jpg'] WHERE slug = '30w-car-charger';
UPDATE products SET images = ARRAY['/images/base-one-max-silver.jpg'] WHERE slug = 'magsafe-mount';
UPDATE products SET images = ARRAY['/images/kevlar-cable-black.jpg'] WHERE slug = 'kevlar-cable-3m';

-- Passport Wallets
UPDATE products SET images = ARRAY['/images/leather-folio-black.jpg'] WHERE slug = 'modern-passport-wallet';
UPDATE products SET images = ARRAY['/images/rugged-case-orange.jpg'] WHERE slug = 'rugged-archive-wallet';
UPDATE products SET images = ARRAY['/images/leather-folio-brown.jpg'] WHERE slug = 'travel-organizer';

-- Wallets
UPDATE products SET images = ARRAY['/images/tracking-card-hero.jpg'] WHERE slug = 'card-wallet-plus';
UPDATE products SET images = ARRAY['/images/modern-leather-case-tan.jpg'] WHERE slug = 'bifold-wallet';
UPDATE products SET images = ARRAY['/images/modern-leather-case-black.jpg'] WHERE slug = 'stand-wallet';

-- Best Sellers
UPDATE products SET images = ARRAY['/images/modern-leather-case-brown.jpg'] WHERE slug LIKE 'modern-leather-case%';
UPDATE products SET images = ARRAY['/images/titanium-band-silver.jpg'] WHERE slug = 'titanium-band-pro';
UPDATE products SET images = ARRAY['/images/sport-band-orange.jpg'] WHERE slug = 'sport-band-orange';
UPDATE products SET images = ARRAY['/images/base-one-max-black.jpg'] WHERE slug LIKE 'base-one-max%';
UPDATE products SET images = ARRAY['/images/sport-band-black.jpg'] WHERE slug = 'sport-band';

-- Ensure no nulls
UPDATE products SET images = ARRAY['/images/modern-leather-case-black.jpg'] WHERE images IS NULL;
