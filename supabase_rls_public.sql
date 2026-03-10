-- Enable RLS and add public read policies
alter table "products" enable row level security;
drop policy if exists "Public products are viewable by everyone" on "products";
create policy "Public products are viewable by everyone" on "products" for select using (true);

alter table "categories" enable row level security;
drop policy if exists "Public categories are viewable by everyone" on "categories";
create policy "Public categories are viewable by everyone" on "categories" for select using (true);

alter table "notifications" enable row level security;
drop policy if exists "Public notifications are viewable by everyone" on "notifications";
create policy "Public notifications are viewable by everyone" on "notifications" for select using (true);
