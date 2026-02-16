/*
  # Create Guests RSVP Table for Bianca's 15th Birthday

  1. New Tables
    - `guests`
      - `id` (uuid, primary key) - Unique identifier for each guest
      - `name` (text) - Guest's full name
      - `email` (text) - Guest's email address
      - `attending` (boolean) - Confirmation status (true = attending, false = not attending)
      - `message` (text, optional) - Optional message from the guest
      - `created_at` (timestamptz) - Timestamp of RSVP submission
  
  2. Security
    - Enable RLS on `guests` table
    - Add policy for anyone to submit RSVP (public form)
    - Add policy for anyone to read guest list (for display purposes)
  
  3. Important Notes
    - This is a public event form, so RLS policies allow public access
    - Email field is not unique to allow multiple RSVPs if needed
    - Created_at tracks when each guest responded
*/

CREATE TABLE IF NOT EXISTS guests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  attending boolean DEFAULT true,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit RSVP"
  ON guests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view guest list"
  ON guests
  FOR SELECT
  TO anon, authenticated
  USING (true);