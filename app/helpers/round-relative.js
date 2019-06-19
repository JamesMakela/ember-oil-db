import { helper } from '@ember/component/helper';

export function roundRelative([num, tol, ...rest]) {
  if (num > 1.0) {
    return Math.floor(num * 10 ** tol) / 10 ** tol;
  }
  else {
    let scale = 10 ** (tol - Math.floor(Math.log10(Math.abs(num))));
    return Math.floor(num * scale) / scale;
  }
}

export default helper(roundRelative);
