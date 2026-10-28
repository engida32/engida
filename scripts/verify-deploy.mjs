const base = (process.argv[2] || process.env.DEPLOY_URL || "https://engida.devs.et").replace(/\/*$/, "/");
const attempts = 6;

if (!base.startsWith("https://")) {
  throw new Error("Deployment URL must use https://");
}

const checks = [
  { path: "", contains: "Engida Lishan", label: "home" },
  { path: "about/", contains: "About", label: "about" },
  { path: "work/che/", contains: "Che", label: "case study" },
  { path: "robots.txt", contains: "Sitemap:", label: "robots" },
  { path: "sitemap.xml", contains: "<urlset", label: "sitemap" },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, expectedStatus, contains) {
  let lastDetail = "";

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(15_000),
        headers: { "Cache-Control": "no-cache" },
      });
      const body = expectedStatus === 200 ? await response.text() : "";
      const statusMatches = response.status === expectedStatus;
      const contentMatches = !contains || body.includes(contains);

      if (statusMatches && contentMatches) return;

      lastDetail = `HTTP ${response.status}${contentMatches ? "" : `, missing ${JSON.stringify(contains)}`}`;
    } catch (error) {
      lastDetail = error instanceof Error ? error.message : String(error);
    }

    if (attempt < attempts) {
      await sleep(2000 * attempt);
    }
  }

  throw new Error(`${url} did not become ready (${lastDetail})`);
}

for (const check of checks) {
  const url = new URL(check.path, base).toString();
  await fetchWithRetry(url, 200, check.contains);
  console.log(`OK ${check.label}: ${url}`);
}

const missingUrl = new URL(`missing-${Date.now()}/`, base).toString();
await fetchWithRetry(missingUrl, 404);
console.log(`OK 404: ${missingUrl}`);

console.log(`Deployment checks passed for ${base}`);
