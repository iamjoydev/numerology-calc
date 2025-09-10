import { calculateReport } from '../../lib/numerology';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const payload = req.body || {};

  try {
    const report = calculateReport(payload);
    return res.status(200).json({ ok: true, report });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
