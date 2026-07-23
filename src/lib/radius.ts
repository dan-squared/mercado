/**
 * Concentric Corner Radius Utility
 * Based on the concentric corner algorithm:
 * R_inner = Math.max(0, outerRadius - padding)
 */
export function getInnerRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}

/**
 * Returns Tailwind or inline style object for concentric child container
 */
export function concentricStyle(outerRadius: number, padding: number) {
  const innerR = getInnerRadius(outerRadius, padding);
  return {
    borderRadius: `${innerR}px`,
  };
}
