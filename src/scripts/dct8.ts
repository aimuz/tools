// Orthonormal 8x8 DCT-II and IDCT for use as an invertible transform on
// luminance blocks. Basis vectors are precomputed; transform is implemented
// as two matrix multiplications (row pass + column pass).

const N = 8;

// M[k][n] = 0.5 * C(k) * cos((2n+1)k*pi/16), with C(0) = 1/sqrt(2), C(k>0) = 1.
// For an orthonormal basis, DCT(x) = M x M^T and IDCT(X) = M^T X M.
const M: Float64Array[] = (() => {
  const rows: Float64Array[] = [];
  for (let k = 0; k < N; k++) {
    const row = new Float64Array(N);
    const ck = k === 0 ? 1 / Math.SQRT2 : 1;
    for (let n = 0; n < N; n++) {
      row[n] = 0.5 * ck * Math.cos(((2 * n + 1) * k * Math.PI) / 16);
    }
    rows.push(row);
  }
  return rows;
})();

// Scratch buffer reused across every dct8/idct8 call. JS is single-threaded
// and these functions never recurse, so one suffices. Hot-loop callers should
// also pass a reusable `out` buffer to avoid per-block allocation.
const TEMP = new Float64Array(64);

export function dct8(block: Float64Array, out: Float64Array = new Float64Array(64)): Float64Array {
  for (let k = 0; k < N; k++) {
    const mk = M[k];
    for (let j = 0; j < N; j++) {
      let s = 0;
      for (let x = 0; x < N; x++) s += mk[x] * block[x * N + j];
      TEMP[k * N + j] = s;
    }
  }
  for (let k = 0; k < N; k++) {
    for (let l = 0; l < N; l++) {
      const ml = M[l];
      let s = 0;
      for (let j = 0; j < N; j++) s += TEMP[k * N + j] * ml[j];
      out[k * N + l] = s;
    }
  }
  return out;
}

export function idct8(coef: Float64Array, out: Float64Array = new Float64Array(64)): Float64Array {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let s = 0;
      for (let u = 0; u < N; u++) s += M[u][i] * coef[u * N + j];
      TEMP[i * N + j] = s;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let s = 0;
      for (let v = 0; v < N; v++) s += TEMP[i * N + v] * M[v][j];
      out[i * N + j] = s;
    }
  }
  return out;
}
