-- SCHEMA FOR ACRIZAM WEB PLATFORM

-- 1. Profiles (Extends Supabase Auth)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  company_name text,
  phone text,
  role text default 'client' check (role in ('client', 'admin')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products
create table products (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references categories(id) on delete set null,
  name text not null,
  description text,
  price decimal(10,2) not null,
  image_url text,
  features jsonb default '[]'::jsonb,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Quotes
create table quotes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  configuration jsonb not null, -- Stores color, size, material details
  quantity integer not null,
  total_amount decimal(12,2),
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'expired')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Orders
create table orders (
  id uuid default gen_random_uuid() primary key,
  quote_id uuid references quotes(id) on delete set null,
  user_id uuid references profiles(id) on delete cascade,
  order_number text not null unique,
  status text default 'diseño' check (status in ('diseño', 'corte', 'pulido', 'terminado', 'entregado')),
  total_amount decimal(12,2) not null,
  shipping_address text,
  estimated_delivery_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Order Status History (Timeline)
create table order_status_history (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade,
  status text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) Policies

alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table quotes enable row level security;
alter table orders enable row level security;
alter table order_status_history enable row level security;

-- Public read access for categories and products
create policy "Public can read categories" on categories for select using (true);
create policy "Public can read products" on products for select using (true);

-- Profiles: Users can read/update/insert their own profile
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Quotes: Users can see their own quotes
create policy "Users can see own quotes" on quotes for select using (auth.uid() = user_id);
create policy "Users can create own quotes" on quotes for insert with check (auth.uid() = user_id);

-- Orders: Users can see their own orders
create policy "Users can see own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can see status history of own orders" on order_status_history for select using (
  exists (select 1 from orders where orders.id = order_id and orders.user_id = auth.uid())
);
