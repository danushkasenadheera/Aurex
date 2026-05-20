-- Collections table
create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  cover_image_url text not null default '',
  created_at timestamptz default now()
);

alter table public.collections enable row level security;

create policy "Public can view collections"
  on public.collections for select
  using (true);

create policy "Staff can manage collections"
  on public.collections for all
  using (exists (select 1 from public.staff where id = auth.uid()));

-- Add collection_id to products (nullable — products can exist without a collection)
alter table public.products
  add column collection_id uuid references public.collections(id) on delete set null;
