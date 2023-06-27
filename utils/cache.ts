/**
 * Set item in cache
 * @param key 
 * @param value 
 * @param expirationMinutes 
 */
export function setItem(key: string, value: string, expirationMinutes = 5) {
  const item = {
    value: value,
    expiration: Date.now() + expirationMinutes * 60 * 1000, // Convert minutes to milliseconds
	};

  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Get item from cache
 * @param key 
 * @returns 
 */
export function getItem(key: string) {
	const itemString = localStorage.getItem(key);

  if (itemString) {
    const item = JSON.parse(itemString);
    if (Date.now() < item.expiration) {
      return item.value;
    } else {
      localStorage.removeItem(key); // Remove expired item
    }
  }
  return null;
}
