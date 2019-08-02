import { helper } from '@ember/component/helper';
import { valueUnit } from './value-unit';
import { convertUnit } from './convert-unit';
import { roundRelative } from './round-relative';


export function valueUnitRange([valueUnitMin, valueUnitMax,
                                tol,
                                ...rest]) {  // eslint-disable-line no-unused-vars
  let min, max, unit;

  if (valueUnitMin) {
    min = valueUnitMin.value;
    unit = valueUnitMin.unit;
  }

  if (valueUnitMax) {
    if (unit && unit !== valueUnitMax.unit) {
      max = convertUnit([valueUnitMax, unit]).value;  // make it same unit as min
    }
    else {
      max = valueUnitMax.value;
    }
  }

  if (min && max && min === max) {
    return valueUnit([valueUnitMin, tol]);
  }
  else if (min && max) {
    return (`[${roundRelative([valueUnitMin.value, tol])}` +
            `\u2192` +
            `${roundRelative([valueUnitMax.value, tol])}]` +
            ` ${unit}`);
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
