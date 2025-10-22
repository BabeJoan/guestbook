// api/getMessages.js  (Node.js Vercel serverless)
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  const token = req.query.token;
  const adminToken = process.env.ADMIN_TOKEN;
  if (!token || token !== adminToken) {
    return res.status(403).json({ error: 'forbidden' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};
