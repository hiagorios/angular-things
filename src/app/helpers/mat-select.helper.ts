// used to determine whether the value is an array with p or p
export function determineP(p: any) {
  // this is needed because mat-select may use arrays to hold selected value
  if (p.constructor.name === 'array' && p.length > 0) {
    return p[0];
  }
  return p;
}
