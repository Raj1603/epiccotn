-- Create missing categories for the Homepage sections
-- We use DO NOTHING to avoid errors if they exist, but we need their IDs for products.

INSERT INTO categories (name, slug, parent_id, sort_order)
VALUES 
('Vehicle', 'vehicle', NULL, 60),
('Passport Wallets', 'passport-wallets', NULL, 70),
('Wallets', 'wallets', NULL, 80)
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
-- Using sub-selects to get Category IDs dynamically

-- Vehicle Products
INSERT INTO products (name, slug, description, price, images, category_id, stock_status)
VALUES 
('30W Car Charger', '30w-car-charger', 'Fast charging for your road trips.', 30, ARRAY['/images/base-one-max-black.jpg'], (SELECT id FROM categories WHERE slug = 'vehicle'), 'in_stock'),
('MagSafe Mount', 'magsafe-mount', 'Secure mount for your iPhone.', 40, ARRAY['/images/base-one-max-silver.jpg'], (SELECT id FROM categories WHERE slug = 'vehicle'), 'in_stock'),
('Kevlar Cable 3M', 'kevlar-cable-3m', 'Extra long rugged cable.', 35, ARRAY['/images/kevlar-cable-black.jpg'], (SELECT id FROM categories WHERE slug = 'vehicle'), 'in_stock');

-- Passport Wallets
INSERT INTO products (name, slug, description, price, images, category_id, stock_status)
VALUES 
('Modern Passport Wallet', 'modern-passport-wallet', 'Carry your essentials in style.', 80, ARRAY['/images/leather-folio-black.jpg'], (SELECT id FROM categories WHERE slug = 'passport-wallets'), 'in_stock'),
('Rugged Archive Wallet', 'rugged-archive-wallet', 'Built for adventure.', 70, ARRAY['/images/leather-folio-brown.jpg'], (SELECT id FROM categories WHERE slug = 'passport-wallets'), 'in_stock'),
('Travel Organizer', 'travel-organizer', 'Keep everything in one place.', 60, ARRAY['/images/leather-folio-brown.jpg'], (SELECT id FROM categories WHERE slug = 'passport-wallets'), 'in_stock');

-- Wallets
INSERT INTO products (name, slug, description, price, images, category_id, stock_status)
VALUES 
('Card Wallet Plus', 'card-wallet-plus', 'Minimalist carry.', 50, ARRAY['/images/card_wallet_plus.jpg'], (SELECT id FROM categories WHERE slug = 'wallets'), 'in_stock'),
('Bifold Wallet', 'bifold-wallet', 'Traditional capacity, modern materials.', 80, ARRAY['/images/bifold.jpg'], (SELECT id FROM categories WHERE slug = 'wallets'), 'in_stock'),
('Stand Wallet', 'stand-wallet', 'Wallet that doubles as a stand.', 60, ARRAY['/images/card_wallet_plus.jpg'], (SELECT id FROM categories WHERE slug = 'wallets'), 'in_stock');

-- Best Sellers (Adding some more to Cases/Charging/etc to fill the Best Sellers grid)
INSERT INTO products (name, slug, description, price, images, category_id, stock_status)
VALUES 
('Modern Leather Case', 'modern-leather-case-17', 'Horween Leather for iPhone 17.', 50, ARRAY['/images/modern-leather-case-brown.jpg'], (SELECT id FROM categories WHERE slug = 'cases-main'), 'in_stock'),
('Titanium Band', 'titanium-band-pro', 'Grade 2 Titanium.', 200, ARRAY['/images/titanium-band-silver.jpg'], (SELECT id FROM categories WHERE slug = 'apple-watch-main'), 'in_stock'),
('Sport Band', 'sport-band-orange', 'FKM rubber for active lifestyles.', 60, ARRAY['/images/sport-band-orange.jpg'], (SELECT id FROM categories WHERE slug = 'apple-watch-main'), 'in_stock'),
('Base One Max', 'base-one-max-mag', 'MagSafe charging station.', 150, ARRAY['/images/base-one-max-black.jpg'], (SELECT id FROM categories WHERE slug = 'charging-main'), 'in_stock');

-- Update existing 2 items to have better images if they exist
UPDATE products SET images = ARRAY['/images/modern-leather-case-black.jpg'] WHERE slug LIKE '%case%';
UPDATE products SET images = ARRAY['/images/base-one-max-silver.jpg'] WHERE slug LIKE '%base%';
