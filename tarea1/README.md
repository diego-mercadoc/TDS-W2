# Tarea 1 - JS (modelos, patrones y soluciones)

Esta tarea trae 5 ejercicios cortos para practicar casos reales de backend con JavaScript.
La idea fue resolverlos de forma clara, simple y facil de correr con `node`.

## Archivos

- `1-normalizacion-datos.js`
Descripcion breve: recibe users repetidos, hace merge por `id`, junta roles y quita duplicados.

- `2-counter-closure.js`
Descripcion breve: contador con closure para tener estado privado (`total`) y exponer solo metodos (`incrementar`, `disminuir`, `reset`, `obtenerCuenta`).

- `3-logger-modular.js`
Descripcion breve: modulo logger con patron modular para no contaminar scope global. Soporta niveles (`info`, `warn`, `error`) y output configurable (`console` o `file`).

- `4-benchmark-metodos-arreglos.js`
Descripcion breve: compara tiempos entre `filter+map`, `reduce` y `for`, en distintos volumenes de datos.

- `5-busqueda-arreglos-objetos.js`
Descripcion breve: compara busqueda por ciclo, `find` e indice con `Map`, y cierra con recomendacion segun volumen de consultas.

## Nota final (ejercicio 5)
- Si vas a buscar pocas veces, `find` o ciclo estan bien por simplicidad.
- Si vas a buscar muchas veces, conviene preprocesar e indexar con `Map` porque reduce mucho el tiempo.
