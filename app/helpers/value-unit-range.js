import { helper } from '@ember/component/helper';
import { valueUnit } from './value-unit';

export function valueUnitRange([valueUnitMin, valueUnitMax,
                                tol,
                                ...rest]) {  // eslint-disable-line no-unused-vars
  let min, max;
  if (valueUnitMin) {min = valueUnitMin.value;}
  if (valueUnitMax) {max = valueUnitMax.value;}

  if (min && max && min === max) {
    return valueUnit([valueUnitMin, tol]);
  }
  else if (min && max) {
    return `[${valueUnit([valueUnitMin, tol])}, \u2026 ${valueUnit([valueUnitMax, tol])}]`;
  }
  else if (min) {
    return `>${valueUnit([valueUnitMin, tol])}`;
  }
  else if (max) {
    return `<${valueUnit([valueUnitMax, tol])}`;
  }

  return null;
}

export default helper(valueUnitRange);
