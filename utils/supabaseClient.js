"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://famrqbiknsplumoszlam.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbXJxYmlrbnNwbHVtb3N6bGFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNjE1MTgsImV4cCI6MjA3MDczNzUxOH0.js1Uw25ucEpaGrALWA90MP6-bKW7aL-sGqgMYhliFZM"; 


export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;



