SELECT * FROM platzi.alumnos FETCH FIRST 5 ROWS ONLY;

SELECT *
  FROM (
    SELECT ROW_NUMBER() OVER() AS row_id, * FROM platzi.alumnos
  ) as rowsid
  where rowsid.row_id <= 5;

SELECT * FROM platzi.alumnos LIMIT 5;

-- Ejercicio 2 
SELECT *
  FROM (
    SELECT ROW_NUMBER() OVER() AS row_id, * FROM platzi.alumnos
  ) as rowsid
  where rowsid.row_id >= (SELECT COUNT(*) FROM platzi.alumnos)/2;
SELECT * Where id => (SELECT COUNT(*) FROM platzi.alumnos)/2;
SELECT * from platzi.alumnos Where id >= (SELECT COUNT(*) FROM platzi.alumnos)/2;
SELECT * FROM platzi.alumnos OFFSET ( SELECT (COUNT(id)/2) FROM platzi.alumnos );
SELECT ROW_NUMBER() OVER() AS row_id, *
FROM platzi.alumnos
OFFSET (
  SELECT COUNT(*)/2
  FROM platzi.alumnos
);

-- Ejercicio 3
SELECT 
  EXTRACT(YEAR FROM fecha_incorporacion) AS anio_incorporacion,
  EXTRACT(MONTH FROM fecha_incorporacion) AS mes_incorporacion,
  EXTRACT(DAY FROM fecha_incorporacion) AS dia_incorporacion,
  EXTRACT(HOUR FROM fecha_incorporacion) AS hora_incorporacion,
  EXTRACT(MINUTE FROM fecha_incorporacion) AS minuto_incorporacion,
  EXTRACT(SECOND FROM fecha_incorporacion) AS segundo_incorporacion
FROM platzi.alumnos;

SELECT 
  DATE_PART('YEAR', fecha_incorporacion) AS anio_incorporacion,
  DATE_PART('MONTH', fecha_incorporacion) AS mes_incorporacion,
  DATE_PART('DAY', fecha_incorporacion) AS dia_incorporacion,
  DATE_PART('HOUR', fecha_incorporacion) AS hora_incorporacion,
  DATE_PART('MINUTE', fecha_incorporacion) AS minuto_incorporacion,
  DATE_PART('SECOND', fecha_incorporacion) AS segundo_incorporacion
  FROM platzi.alumnos;

-- Ejercicio 4
SELECT 
  *
FROM platzi.alumnos
WHERE EXTRACT(YEAR FROM fecha_incorporacion) = 2019 AND
  EXTRACT(MONTH FROM fecha_incorporacion) = 5;

-- Ejercicio 5
-- registro duplicado
insert into platzi.alumnos (id, nombre, apellido, email, colegiatura, fecha_incorporacion, carrera_id, tutor_id) values (1001, 'Pamelina', null, 'pmylchreestrr@salon.com', 4800, '2020-04-26 10:18:51', 12, 16)
-- consulta
SELECT (
  platzi.alumnos.nombre,
  platzi.alumnos.apellido,
  platzi.alumnos.email,
  platzi.alumnos.colegiatura,
  platzi.alumnos.fecha_incorporacion,
  platzi.alumnos.carrera_id,
  platzi.alumnos.tutor_id
)::text, COUNT(*) as conteo
FROM platzi.alumnos
GROUP BY (
  platzi.alumnos.nombre,
  platzi.alumnos.apellido,
  platzi.alumnos.email,
  platzi.alumnos.colegiatura,
  platzi.alumnos.fecha_incorporacion,
  platzi.alumnos.carrera_id,
  platzi.alumnos.tutor_id
) HAVING COUNT(*) > 1;

SELECT * 
FROM (
  SELECT id,
  ROW_NUMBER() OVER(
    PARTITION BY 
      nombre,
      apellido,
      email,
      colegiatura,
      fecha_incorporacion,
      carrera_id,
      tutor_id
    ORDER BY id ASC
  ) AS row,
  * FROM platzi.alumnos
) AS duplicados
WHERE duplicados.row > 1;

DELETE 
FROM platzi.alumnos
WHERE id IN (
  SELECT id
  FROM (
      SELECT id,
      ROW_NUMBER() OVER(
        PARTITION BY 
          nombre,
          apellido,
          email,
          colegiatura,
          fecha_incorporacion,
          carrera_id,
          tutor_id
        ORDER BY id ASC
      ) AS row
       FROM platzi.alumnos
   ) AS duplicados
   WHERE duplicados.row > 1
);

SELECT *
FROM (
  SELECT
  ROW_NUMBER() OVER(
    PARTITION BY 
      nombre,
      apellido,
      email,
      colegiatura,
      fecha_incorporacion,
      carrera_id,
      tutor_id
    ORDER BY id ASC
  ) AS row, * FROM platzi.alumnos
) AS duplicados
WHERE duplicados.row > 1;

-- Ejercicio 6 - selectores de rango

-- Mi solucion para unir las tablas
SELECT distinct carrera_id * tutor_id as interseccion from platzi.alumnos order by interseccion asc;

--La solucion del profesor
SELECT INT8RANGE(MIN(tutor_id), MAX(tutor_id)) * INT8RANGE(MIN(carrera_id), MAX(carrera_id))
    FROM platzi.alumnos;

-- Ejercicio 7 - Minimos 

--Obtiene solo el nombre
SELECT MIN(nombre) FROM platzi.alumnos;
--Obtiene toda la fila minima
SELECT * FROM platzi.alumnos ORDER BY nombre limit 1;
--Obtiene el nombre minimo alfabeticamente de cada nombre
SELECT tutor_id, MIN(nombre) FROM platzi.alumnos GROUP BY tutor_id ORDER BY tutor_id;

-- Ejercicio 8 - promedio 
SELECT round(avg(count),0)
FROM (
  SELECT CONCAT(b.nombre, ' ', b.apellido) as tutor, COUNT(*) as count
  FROM platzi.alumnos as a
  INNER JOIN platzi.alumnos as b ON a.tutor_id = b.id
  GROUP BY tutor
);

-- Ejercicio 9 - Left join 
Select alumno.nombre, alumno.apellido, carrera.id, carrera.carrera
FROM platzi.alumnos as alumno
LEFT JOIN platzi.carreras as carrera ON alumno.carrera_id = carrera.id;