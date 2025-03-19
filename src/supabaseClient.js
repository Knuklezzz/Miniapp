import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yvxuohkkftrkkfnzsphf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2eHVvaGtrZnRya2tmbnpzcGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMDY4NjIsImV4cCI6MjA1Njc4Mjg2Mn0.VXs9z5eYxTJucPH_18fEeKNQd_KuMT7i-JSLdP7LvS8'
export const supabase = createClient(supabaseUrl, supabaseKey)