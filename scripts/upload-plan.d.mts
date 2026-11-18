export function isImmutableAsset(remotePath: string): boolean;

export function shouldSkipUpload(input: {
  remotePath: string;
  localSize: number;
  remoteStatus: number;
  remoteLength: number;
}): boolean;

export function describeFailure(
  label: string,
  response: { status: number; body?: { toString(): string } },
): string;
