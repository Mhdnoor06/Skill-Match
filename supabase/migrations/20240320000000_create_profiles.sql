-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  role text default 'Skill Exchange Member',
  avatar_url text,
  bio text,
  onboarding_completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for availability slots
create table availability_slots (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  days text[] not null, -- Array of days: ['monday', 'tuesday', etc.]
  start_time time not null,
  end_time time not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for social media links
create table social_links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  platform text not null check (platform in ('linkedin', 'github', 'twitter', 'instagram', 'facebook', 'youtube', 'medium', 'dribbble', 'behance', 'website')),
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, platform)
);

-- Create a table for user skills (combines teaching and learning skills)
create table user_skills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  skill_name text not null,
  skill_type text not null check (skill_type in ('teaching', 'learning')),
  proficiency_level text check (proficiency_level in ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, skill_name, skill_type)
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table availability_slots enable row level security;
alter table social_links enable row level security;
alter table user_skills enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can manage their own availability"
  on availability_slots for all
  using ( auth.uid() = user_id );

create policy "Users can manage their own social links"
  on social_links for all
  using ( auth.uid() = user_id );

create policy "Users can manage their own skills"
  on user_skills for all
  using ( auth.uid() = user_id );

-- Create triggers for updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_profiles_updated_at
  before update on profiles
  for each row
  execute procedure handle_updated_at();

create trigger handle_availability_slots_updated_at
  before update on availability_slots
  for each row
  execute procedure handle_updated_at();

create trigger handle_social_links_updated_at
  before update on social_links
  for each row
  execute procedure handle_updated_at();

create trigger handle_user_skills_updated_at
  before update on user_skills
  for each row
  execute procedure handle_updated_at();

-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create a profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 