function sendResponse(res, { data, error }, notFoundMessage) {
  if (error) return res.status(500).json({ error: `${error.message}` });
  if (!data || data.length === 0) {
    return res.status(404).json({ error: notFoundMessage });
  }
  res.json(data);
}

module.exports = { sendResponse };
