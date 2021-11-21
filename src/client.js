import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://rafdiwhsioofcbrmvtqd.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzUyNzAyOCwiZXhwIjoxOTUzMTAzMDI4fQ.LALyNw9tt9n3Zx21dnRsNGvEn6XMUmAiJCsS0Gt4xn0')