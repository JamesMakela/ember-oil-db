import { helper } from '@ember/component/helper';
import { roundRelative } from './round-relative';


export function valueUnit([valueUnit, precision, ...rest]) {
  let v = roundRelative([valueUnit.value, precision]);
  let u = valueUnit.unit;
  let sep = ' ';

  let tempUnits = new Set(['F', 'C', 'K']);

  if (tempUnits.has(u)) {
    sep = '°';
  }

  return `${v}${sep}${u}`;
}

export default helper(valueUnit);
