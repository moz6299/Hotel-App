import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tytdgsmuvaxyacljgphy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5dGRnc211dmF4eWFjbGpncGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MjY4NjMsImV4cCI6MjAzOTMwMjg2M30.EOTbu5-T7iUZcYrOii9SrZWdTHt_6c542X4X1staB_c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;