const https = require("https");

function postJSON(url, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const parsed = new URL(url);

    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let chunks = "";
      res.on("data", (chunk) => (chunks += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(chunks));
        } catch {
          reject(new Error(chunks));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).json({ error: "missing code parameter" });
    return;
  }

  try {
    const data = await postJSON("https://github.com/login/oauth/access_token", {
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    });

    const token = data.access_token;
    const escapedToken = JSON.stringify(token);
    const provider = "github";

    const body = `<!doctype html>
<html>
<body>
<script>
(function() {
  var token = ${escapedToken};
  var provider = "github";
  var payload = JSON.stringify({ token: token, provider: provider });
  var message = "authorization:" + provider + ":success:" + payload;

  function receiveMessage(e) {
    window.opener.postMessage(message, e.origin);
  }

  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:" + provider, "*");
})();
</script>
</body>
</html>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.status(200).send(body);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
