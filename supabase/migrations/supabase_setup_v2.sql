-- Add parent_id to categories for nesting
alter table categories 
add column if not exists parent_id uuid references categories(id),
add column if not exists badge text,
add column if not exists sort_order integer default 0;

-- Create Notifications table
create table if not exists notifications (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  link text,
  active boolean default true
);

-- Enable RLS for notifications
alter table notifications enable row level security;
create policy "Public can view active notifications" on notifications for select using (active = true);

-- SEED DATA for Navigation Structure
-- We will use the 'slug' to identify them.

INSERT INTO categories (name, slug, parent_id, sort_order)
VALUES 
('Cases', 'cases-main', NULL, 10),
('Apple Watch', 'apple-watch-main', NULL, 20),
('Charging', 'charging-main', NULL, 30),
('Tracking & Wallets', 'tracking-wallets', NULL, 40),
('More Gear', 'more-gear', NULL, 50)
ON CONFLICT (slug) DO NOTHING;

-- This requires retrieving the IDs which is hard in pure SQL without PL/pgSQL or known UUIDs.
-- For simplicity, this script sets up the Schema. 
-- You can manually add the items or use a separate script that handles IDs.

-- SEED Notifications
INSERT INTO notifications (title, description, image, link) VALUES 
('The Wait''s Finally Over', 'Leather Mag Wallet attaches with MagSafe and works with Find My.', '/images/card_wallet_plus.jpg', '/products/leather-mag-wallet'),
('The Wallet Lineup''s Growing', 'All new Traditional Wallet and Limited Edition Shell Cordovan Wallet.', '/images/bifold.jpg', '/collections/wallets'),
('Never Lose Your Wallet Again', 'Add Apple Find My tracking technology to your wallet.', '/images/tracking-card-hero.jpg', '/products/tracking-card');
