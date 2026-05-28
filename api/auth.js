const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";
const scopes = "public_repo";

module.exports = (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).json({ error: "missing GITHUB_OAUTH_CLIENT_ID env var" });
    return;
  }

  const redirectUrl =
    `${GITHUB_AUTH_URL}?client_id=${clientId}` +
    `&scope=${scopes}` +
    `&redirect_uri=${process.env.GITHUB_OAUTH_REDIRECT_URI || `${req.headers["x-forwarded-proto"]}://${req.headers.host}/api/callback`}`;

  res.writeHead(301, { Location: redirectUrl });
  res.end();
};
