const immutablePrefix = "/_next/";
const failureBodyLimit = 200;

export function isImmutableAsset(remotePath) {
  return remotePath.startsWith(immutablePrefix);
}

export function shouldSkipUpload(remotePath, previousManifest) {
  return isImmutableAsset(remotePath) && previousManifest.includes(remotePath);
}

export function describeFailure(label, response) {
  const detail = response.body
    ?.toString("utf8")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, failureBodyLimit);

  return detail ? `${label} failed: HTTP ${response.status} (${detail})` : `${label} failed: HTTP ${response.status}`;
}
