-- WDIJS Funnel — Supabase Schema
-- Run this in Supabase SQL Editor to create all 6 tables

-- Lead Captures
CREATE TABLE lead_captures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  email TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('exit-intent', 'inline', 'footer', 'checkout')),
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_lead_captures_email ON lead_captures (email);
ALTER TABLE lead_captures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON lead_captures FOR INSERT TO anon WITH CHECK (true);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  stripe_session_id TEXT,
  offer_type TEXT NOT NULL CHECK (offer_type IN ('digital-starter', 'complete-package', 'workbook-digital', 'physical-bump-upgrade')),
  includes_bump BOOLEAN DEFAULT false,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'abandoned', 'refunded')),
  abandoned_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON orders FOR INSERT TO anon WITH CHECK (true);

-- Abandoned Checkouts
CREATE TABLE abandoned_checkouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  checkout_step TEXT NOT NULL CHECK (checkout_step IN ('email', 'bump', 'payment')),
  offer_type TEXT,
  recovery_email_sent BOOLEAN DEFAULT false,
  recovered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE abandoned_checkouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON abandoned_checkouts FOR INSERT TO anon WITH CHECK (true);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  page_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_analytics_session ON analytics_events (session_id);
CREATE INDEX idx_analytics_event ON analytics_events (event_name);
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON analytics_events FOR INSERT TO anon WITH CHECK (true);

-- Micro Question Responses
CREATE TABLE micro_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE micro_responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON micro_responses FOR INSERT TO anon WITH CHECK (true);

-- Risk Snapshot Results
CREATE TABLE risk_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE risk_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_insert" ON risk_snapshots FOR INSERT TO anon WITH CHECK (true);
