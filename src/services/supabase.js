import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://arevxibxxxbxaxxvjfoo.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZXZ4aWJ4eHhieGF4eHZqZm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2OTg4MDUsImV4cCI6MjA0MzI3NDgwNX0.HDulvei2mSxnpB7m-pLtf36r5L-iHeJfS6Rfcf1wym4`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
