export function toOrigin(urlInput: string): string {
  const s = urlInput.trim();

  // Require http/https as you mentioned
  if (!/^https?:\/\//i.test(s)) {
    throw new Error('URL must start with http:// or https://');
  }

  const u = new URL(s);
  // u.origin === `${u.protocol}//${u.host}` with no trailing slash
  return u.origin;
}