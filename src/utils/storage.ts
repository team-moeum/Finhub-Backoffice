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

export function setLocalStorageItem(key: string, value: string) {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.setItem(key, value);
}

export function getLocalStorageItem(key: string) {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key: string) {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.removeItem(key);
}
