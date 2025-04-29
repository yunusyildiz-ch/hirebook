const COOLDOWN_SECONDS = 60;
const STORAGE_KEY = "verifyCooldownStart";

/**
 * Start the cooldown timer and save the timestamp to localStorage.
 */
export function startCooldownTimer() {
  localStorage.setItem(STORAGE_KEY, Date.now().toString());
}

/**
 * Get the remaining cooldown time based on saved start time.
 * @returns {number} Remaining seconds
 */
export function getRemainingCooldown() {
  const start = localStorage.getItem(STORAGE_KEY);
  if (start) {
    const elapsed = Math.floor((Date.now() - parseInt(start, 10)) / 1000);
    const remaining = COOLDOWN_SECONDS - elapsed;
    return remaining > 0 ? remaining : 0;
  }
  return 0;
}

/**
 * Start countdown timer using setInterval, update cooldown every second.
 * @param {Function} setCooldown - React setState function
 * @returns {Function} clearTimer - Clear interval function
 */
export function startCooldownCountdown(setCooldown) {
  const timer = setInterval(() => {
    setCooldown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(timer);
}

export const COOLDOWN_TIME = COOLDOWN_SECONDS;