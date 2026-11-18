const immutablePrefix = "/_next/";
const failureBodyLimit = 200;

export function isImmutableAsset(remotePath) {
  return remotePath.startsWith(immutablePrefix);
}

export function shouldSkipUpload({ remotePath, localSize, remoteStatus, remoteLength }) {
  if (!isImmutableAsset(remotePath)) return false;
  if (remoteStatus !== 200) return false;
  return Number.isFinite(remoteLength) && remoteLength === localSize;
}

export function describeFailure(label, response) {
  const detail = response.body
    ?.toString("utf8")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, failureBodyLimit);

  return detail ? `${label} failed: HTTP ${response.status} (${detail})` : `${label} failed: HTTP ${response.status}`;
}
