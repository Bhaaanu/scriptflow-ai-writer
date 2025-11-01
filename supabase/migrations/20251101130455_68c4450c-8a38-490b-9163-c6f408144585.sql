-- Update profiles table to have 10 credits as default
ALTER TABLE public.profiles 
  ALTER COLUMN credits_remaining SET DEFAULT 10,
  ALTER COLUMN total_credits SET DEFAULT 10;

-- Update existing users to have 10 credits
UPDATE public.profiles 
SET credits_remaining = 10, 
    total_credits = 10;

-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;