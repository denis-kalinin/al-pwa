import router from '@/router';

const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function getNonce(length?: number): string {
  const nonceLength = length ?? 10;
  if (nonceLength < 1) throw new Error('Nonce\'s length should be at least 1');
  let text = '';
  for (let i = 0; i < nonceLength; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function dummy(): void {}
export { getNonce, dummy };
