-- Run this in your Supabase SQL Editor to permanently update images and prices
-- This script fixes the "cents vs dollars" issue (e.g. 50 -> 5000 for $50.00)

-- Pen
UPDATE products SET images = ARRAY['/images/modern_titanium_pen.png'], price = 4000 WHERE slug = 'pen';

-- Leather Mag Wallet (Find My)
UPDATE products SET images = ARRAY['/images/leather_mag_wallet.png'], price = 6000 WHERE slug = 'leather-mag-wallet-find-my-tracking';

-- Kevlar Cable 3M
UPDATE products SET images = ARRAY['/images/rugged_kevlar_cable.png'], price = 3500 WHERE slug = 'kevlar-cable-3m';

-- Modern Passport Wallet
UPDATE products SET images = ARRAY['/images/modern_passport_wallet.png'], price = 8000 WHERE slug = 'modern-passport-wallet';

-- Rugged Archive Wallet
UPDATE products SET images = ARRAY['/images/leather-folio-brown.jpg'], price = 7000 WHERE slug = 'rugged-archive-wallet';

-- Modern Leather Case (Generic)
UPDATE products SET images = ARRAY['/images/modern_leather_case_brown.png'], price = 5000 WHERE slug = 'modern-leather-case';

-- Card Wallet Plus
UPDATE products SET images = ARRAY['/images/card_wallet_plus.png'], price = 5000 WHERE slug = 'card-wallet-plus';

-- Bifold Wallet
UPDATE products SET images = ARRAY['/images/bifold.jpg'], price = 8000 WHERE slug = 'bifold-wallet';

-- Stand Wallet
UPDATE products SET images = ARRAY['/images/tracking_card.jpg'], price = 4500 WHERE slug = 'stand-wallet';

-- 30W Car Charger
UPDATE products SET images = ARRAY['/images/base-one-max-black.jpg'], price = 3000 WHERE slug = '30w-car-charger';

-- MagSafe Mount
UPDATE products SET images = ARRAY['/images/base-one-max-silver.jpg'], price = 4000 WHERE slug = 'magsafe-mount';
