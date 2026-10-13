CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  division TEXT NOT NULL,
  applied_at DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) - Basic setup for dev
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public access" ON applications FOR ALL USING (true);
