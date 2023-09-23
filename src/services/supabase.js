import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lzfpyxmekuhhbpsrvsqj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6ZnB5eG1la3VoaGJwc3J2c3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUzNjY1NzgsImV4cCI6MjAxMDk0MjU3OH0.t1CkNkCpcXvFepvTwC9BZ4WmgfBzSXCHD0nZPGz4-DI";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
