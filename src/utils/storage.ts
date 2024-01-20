export function setStorageItem(key: string, value: string) {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.setItem(key, value);
}

export function getStorageItem(key: string) {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.getItem(key);
}

export function removeStorageItem(key: string) {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.removeItem(key);
}
