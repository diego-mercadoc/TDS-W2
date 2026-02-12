"use strict";

function crearDatos(size) {
  const arr = new Array(size);
  for (let i = 0; i < size; i += 1) {
    arr[i] = i;
  }
  return arr;
}

function medirMs(fn) {
  const inicio = performance.now();
  const resultado = fn();
  const fin = performance.now();
  return { ms: fin - inicio, resultado };
}

function benchmark(size) {
  const data = crearDatos(size);
  console.log(`\nVolumen: ${size.toLocaleString()} elementos`);

  const filterMap = medirMs(() =>
    data.filter((n) => n % 2 === 0).map((n) => n * 2)
  );

  const reduce = medirMs(() =>
    data.reduce((acc, n) => {
      if (n % 2 === 0) acc.push(n * 2);
      return acc;
    }, [])
  );

  const forLoop = medirMs(() => {
    const out = [];
    for (let i = 0; i < data.length; i += 1) {
      const n = data[i];
      if (n % 2 === 0) out.push(n * 2);
    }
    return out;
  });

  console.log(`filter + map: ${filterMap.ms.toFixed(3)} ms`);
  console.log(`reduce      : ${reduce.ms.toFixed(3)} ms`);
  console.log(`for loop    : ${forLoop.ms.toFixed(3)} ms`);

  const min = Math.min(filterMap.ms, reduce.ms, forLoop.ms);
  console.log("Diferencia vs metodo mas rapido:");
  console.log(`filter + map: +${(filterMap.ms - min).toFixed(3)} ms`);
  console.log(`reduce      : +${(reduce.ms - min).toFixed(3)} ms`);
  console.log(`for loop    : +${(forLoop.ms - min).toFixed(3)} ms`);

  console.log(
    "Validacion largo salida:",
    filterMap.resultado.length,
    reduce.resultado.length,
    forLoop.resultado.length
  );
}

[10_000, 100_000, 500_000].forEach(benchmark);
