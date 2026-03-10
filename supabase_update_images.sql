-- Update Navigation Column Images with High Quality Assets
-- Using names to target specific categories since we don't know the IDs

-- CASES
UPDATE categories SET image = '/images/modern-leather-case-brown.jpg' WHERE name = 'Cases for iPhone';
UPDATE categories SET image = '/images/leather-folio-black.jpg' WHERE name = 'iPad';
UPDATE categories SET image = '/images/modern-leather-case-black.jpg' WHERE name = 'Screen Protectors';

-- APPLE WATCH
UPDATE categories SET image = '/images/titanium-band-black.jpg' WHERE name = 'Leather';
UPDATE categories SET image = '/images/titanium-band-silver.jpg' WHERE name = 'Metal';
UPDATE categories SET image = '/images/sport-band-orange.jpg' WHERE name = 'Sport & Rugged';

-- CHARGING
UPDATE categories SET image = '/images/base-one-max-black.jpg' WHERE name = 'Wireless';
UPDATE categories SET image = '/images/base-one-max-silver.jpg' WHERE name = 'Apple Watch' AND parent_id IS NOT NULL; -- careful with top level
UPDATE categories SET image = '/images/kevlar-cable-black.jpg' WHERE name = 'Cables & Adapters';

-- TRACKING & WALLETS
UPDATE categories SET image = '/images/tracking-card-hero.jpg' WHERE name = 'Find My Tracking';
UPDATE categories SET image = '/images/leather-folio-brown.jpg' WHERE name = 'Wallets';
UPDATE categories SET image = '/images/00_Mobile_Navigation_Cards_Wrist_Strap_1.jpg' WHERE name = 'Minimalist Wallets';

-- MORE GEAR
UPDATE categories SET image = '/images/rugged-case-orange.jpg' WHERE name = 'Lifestyle Gear';
UPDATE categories SET image = '/images/modern-leather-case-black.jpg' WHERE name = 'Pixel';
UPDATE categories SET image = '/images/sweater_9cdfe997-2872-4026-be6f-fecff822a86c.jpg' WHERE name = 'Apparel';


-- Update Notifications with High Quality Assets
UPDATE notifications SET image = '/images/tracking-card-hero.jpg' WHERE title LIKE '%Wait%';
UPDATE notifications SET image = '/images/leather-folio-brown.jpg' WHERE title LIKE '%Wallet Lineup%';
UPDATE notifications SET image = '/images/tracking-card-hero.jpg' WHERE title LIKE '%Never Lose%';
