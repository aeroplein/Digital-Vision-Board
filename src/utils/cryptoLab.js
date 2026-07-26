export function encryptText(text, key) {
  if (!text) return '';
  try {
    const b64 = btoa(unescape(encodeURIComponent(text)));
    return 'shield_v15_' + b64.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 2)).join('');
  } catch (e) {
    return text;
  }
}

export function decryptText(cipher, key) {
  if (!cipher) return '';
  if (!cipher.startsWith('shield_v15_')) return cipher;
  try {
    const stripped = cipher.substring(11);
    const unrotated = stripped.split('').map(c => String.fromCharCode(c.charCodeAt(0) - 2)).join('');
    return decodeURIComponent(escape(atob(unrotated)));
  } catch (e) {
    return cipher;
  }
}
