export function ensureBookSessionStore() {
  if (typeof window === 'undefined') return null;

  if (!window.__keenkeeper_session) {
    window.__keenkeeper_session = {
      borrowed: {},
      wishlist: {},
      available: {},
    };
  }

  if (!window.__keenkeeper_session.available) {
    window.__keenkeeper_session.available = {};
  }

  return window.__keenkeeper_session;
}

export function getSessionItemIds(storeKey, userEmail) {
  const session = ensureBookSessionStore();
  const list = session?.[storeKey]?.[userEmail];
  return Array.isArray(list) ? list : [];
}

export function addBookToSession(storeKey, userEmail, bookId) {
  const session = ensureBookSessionStore();
  if (!session || !userEmail) return;

  if (!session[storeKey][userEmail]) session[storeKey][userEmail] = [];
  const list = session[storeKey][userEmail];
  if (!list.includes(bookId)) list.push(bookId);
}

export function isBookInSession(storeKey, userEmail, bookId) {
  const ids = getSessionItemIds(storeKey, userEmail);
  return ids.some((item) => String(item) === String(bookId));
}

export function getAvailableCount(bookId, fallbackCount) {
  const session = ensureBookSessionStore();
  const storedCount = session?.available?.[bookId];

  if (typeof storedCount === 'number' && Number.isFinite(storedCount)) {
    return storedCount;
  }

  return fallbackCount ?? 0;
}

export function setAvailableCount(bookId, count) {
  const session = ensureBookSessionStore();
  if (!session) return;

  session.available[bookId] = Math.max(0, count);
}

export function decrementAvailableCount(bookId, fallbackCount) {
  const nextCount = Math.max(0, getAvailableCount(bookId, fallbackCount) - 1);
  setAvailableCount(bookId, nextCount);
  return nextCount;
}
