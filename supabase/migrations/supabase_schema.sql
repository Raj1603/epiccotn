-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Categories Table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price integer not null, -- stored in cents
  compare_at_price integer,
  images text[] default '{}',
  category_id uuid references categories(id),
  stock_status text default 'in_stock',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Profiles Table (extends Auth Users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Orders Table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  status text default 'pending',
  total_amount integer not null,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Order Items Table
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  price_at_purchase integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Basic Setup)
alter table categories enable row level security;
alter table products enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public Read Access for Products & Categories
create policy "Public can view categories" on categories for select using (true);
create policy "Public can view products" on products for select using (true);

-- User Access for Profiles
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Order Access
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can create orders" on orders for insert with check (auth.uid() = user_id);

-- Order Items Access
create policy "Users can view own order items" on order_items for select using (
  exists ( select 1 from orders where id = order_items.order_id and user_id = auth.uid() )
);

-- Insert Dummy Categories
insert into categories (name, slug, image) values
('Best Sellers', 'best-sellers', '/images/base-one-max-black.jpg'),
('Cases', 'cases', '/images/modern-leather-case-brown.jpg'),
('Bands', 'bands', '/images/sport-band-orange.jpg'),
('Charging', 'charging', '/images/base-one-max-black.jpg'),
('Wallets', 'wallets', '/images/leather-folio-brown.jpg');

-- Insert Dummy Products (Sample)
insert into products (name, slug, price, category_id, images, description) 
select 
  'Base One Max', 
  'base-one-max', 
  15500, 
  id, 
  ARRAY['/images/base-one-max-black.jpg', '/images/base-one-max-silver.jpg'],
  'MagSafe & Apple Watch charging station.'
from categories where slug = 'charging';

insert into products (name, slug, price, category_id, images, description) 
select 
  'Modern Leather Case', 
  'modern-leather-case', 
  5500, 
  id, 
  ARRAY['/images/modern-leather-case-brown.jpg', '/images/modern-leather-case-black.jpg'],
  'Horween leather case for iPhone.'
from categories where slug = 'cases';
