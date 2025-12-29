---
title: Documentación y comentarios
description: asdf
---


## El valor de los comentarios en el código

El código evoluciona constantemente: se modifica, se borra, se reescribe. Durante este proceso, los desarrolladores deben considerar múltiples factores, desde precondiciones y casos límite hasta suposiciones que no siempre pueden expresarse directamente en el código. Como resultado, cuando un nuevo desarrollador se une al equipo o revisa el código, surgen preguntas inevitables: *¿Por qué no se realizó este chequeo?* o *¿Cuál es la razón detrás de esta decisión?* Para evitar estas situaciones, es fundamental que el código exprese claramente esas consideraciones no triviales. En este capítulo trataremos este tema a través de la **documentación**.

Es importante aclarar que, aunque hablaremos de documentación, no nos referimos a la documentación externa de un proyecto, como planes de desarrollo o descripciones de una API. Documentar externamente puede ser costoso, ya que requiere un mantenimiento constante para mantenerse alineado con el código. Muchas veces, la realidad del sistema está en el código mismo, y la documentación externa tiende a quedarse atrás, lo que genera inconsistencias. Dado esto, los desarrolladores más experimentados siempre terminan revisando el código antes que la documentación. Es por todo esto que nos enfocaremos en la documentación interna que acompaña al código y lo enriquece, ayudando a desarrolladores a comprender más rápidamente la **semántica en lenguaje natural** del código.

Para hacer explícitas las consideraciones que influyen en el código, se emplean dos herramientas principales: los comentarios informativos y los comentarios de documentación interna. Los **comentarios informativos** son *anotaciones dentro del código, y explican decisiones, suposiciones o señalan momentáneamente aspectos a revisar*. Los **comentarios de documentación interna**, por otro lado, se refieren a los *docstrings* de Python o *JSDoc* de JavaScript, los cuales proporcionan descripciones a las funciones, clases y módulos.

Los comentarios también están presentes en la **semántica en lenguaje natural**, es decir, la *descripción del programa según lo que el desarrollador pretende que el código haga*. Un código bien escrito y legible no es suficiente si contiene suposiciones que sólo el desarrollador original conoce. Agregar un comentario preciso puede sumar mucho valor, ya que contextualiza decisiones y explica la *historia* del código. Del mismo modo que un narrador describe las motivaciones de los personajes en una novela, un buen comentario puede aclarar una línea de código que, a simple vista, podría parecer confusa.

En este capítulo analizaremos más a fondo los comentarios y documentación interna. Además daremos recomendaciones que diferencian a un comentario cualquiera de uno que realmente es útil.

## Tipos de documentación en el código

Como ya vimos, existen distintos tipos de comentarios, cada uno con un propósito específico dentro del código. Comprender sus diferencias es clave para utilizarlos de manera efectiva y evitar comentarios redundantes o innecesarios.

### Comentarios informativos

Los comentarios informativos explican aspectos del código que no son evidentes a simple vista. Su propósito es aclarar decisiones de diseño, suposiciones o detalles importantes que podrían no ser obvios para otros desarrolladores. Estos comentarios no siguen un formato rígido y pueden encontrarse tanto en una única línea como en un conjunto de estas (comentario en bloque). Al usarlos nos estamos anticipando a las dudas del lector, respondiendo preguntas que aún no se han formulado. Veamos un ejemplo:

```typescript
type Coordinates = {
    latitude: number;
    longitude: number;
};

function calculateDistanceBetweenSatellites(
    satellitePosition1: Coordinates,
    satellitePosition2: Coordinates
): number {
    // Code...

    // Calculate the distance between the satellites using the Haversine formula
    const partialHaversine =
        Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
        Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(longitudeDifference / 2) *
            Math.sin(longitudeDifference / 2);
    const centralAngleRadians =
        2 *
        Math.atan2(Math.sqrt(partialHaversine), Math.sqrt(1 - partialHaversine));

    // Code...
}
```

Sin el comentario, la operación matemática principal podría parecer un cálculo arbitrario. Sin embargo, busca responder una pregunta clave: *¿De donde proviene este cálculo?* Notar que este comentario podría no ser necesario si en su lugar escribimos una función con un nombre descriptivo que realice el cálculo de la distancia, dejando los comentarios sólo para aclaraciones que el código por sí solo no pueda transmitir.

Si un comentario hace referencia a varias sentencias, puede ser una señal de que esas líneas deberían ser encapsuladas en una función. Si a esa función le sumamos un nombre descriptivo, tenemos una función que puede explicarse por si misma, evitando así el uso de comentarios. Idealmente, **el código no debería depender de comentarios para su comprensión**. Aunque a veces es necesario aclarar aspectos que no se pueden expresar con el código, estos casos deberían ser la excepción y no la regla.

> Los comentarios informativos deben utilizarse excepcionalmente.

Existen situaciones donde los comentarios informativos pueden aportar un valor real al código y debemos asegurarnos de que esto realmente ocurra. Una sentencia y un comentario ocupan el mismo espacio en pantalla, por eso es que debemos saber cuando utilizarlos. Ahora bien, ¿qué debería incluir un comentario útil?

  * **El *por qué* más que el *qué*:** Un comentario debe aclarar la intención detrás de una sentencia, en lugar de describir lo que hace.
  * **Contexto adicional que el código no pueda expresar por sí mismo:** Por ejemplo, si hay una limitación técnica o una convención específica que seguir.
  * **Decisiones técnicas importantes:** Explicar por qué se eligió una estructura de datos sobre otra o por qué se implementó un algoritmo en particular.
  * **Explicación de soluciones no triviales:** Si se resolvió un problema de manera poco convencional, es útil documentarlo para futuros desarrolladores.

No sólo es importante saber cuándo y qué comentar, sino también cómo hacerlo. Un buen comentario debe ser claro y fácil de entender sin omitir detalles esenciales. Además, debe ser breve y directo, evitando cualquier aclaración innecesaria.

### Comentarios de marca

Dentro de los comentarios informativos, podemos encontrar una subcategoría: los **comentarios de marca**. A diferencia de los comentarios que explican el código, estos buscan comunicar información a los desarrolladores señalando posibles problemas, tareas pendientes o errores conocidos. Se distinguen porque comienzan con una *palabra de marca* escrita en mayúsculas lo que facilita su identificación en el código. Algunas de las marcas más comunes son:

  * **TODO**: Indica una tarea pendiente o alguna funcionalidad que necesita ser implementada.
  * **FIXME**: Indica un problema que necesita ser revisado.
  * **BUG**: Señala un error conocido que debe ser solucionado.
  * **HACK**: Marca una solución temporal o poco ideal que podría mejorarse.

Grandes equipos de trabajo o empresas suelen definir convenciones sobre cuándo y cómo utilizar estas marcas. En algunos casos, incluso crean sus propias *palabras de marca* para reflejar necesidades específicas dentro del proyecto.

No debemos olvidar que estos comentarios deben ser temporales y no permanecer indefinidamente en el código. Idealmente, si se está trabajando en código aledaño y es posible resolver el comentario es bueno hacerlo. Otra opción es, de manera periódica, realizar una búsqueda global en el proyecto para identificar estas anotaciones.

## Documentación interna

En la **semántica en lenguaje natural**, a veces un buen nombre de función o variable simplemente no alcanza para comunicar completamente la intención del desarrollador. Es por ello que es útil acompaññar el código con *docstrings*.

Un ***docstring*** no es más que *un comentario especial ubicado al inicio de una función, cuyo propósito es documentar brevemente su uso y servir como guía para los desarrolladores*. Generalmente se compone de tres partes:

1.  **Descripción de la función:** Explica su propósito y contexto de uso.
2.  **Descripción de los parámetros:** Detalla los argumentos de entrada, pudiendo incluir pre y post condiciones, así como información extra como los tipos de datos esperados.
3.  **Valor de retorno:** Indica qué devuelve la función, con una descripción opcional del resultado y su tipo.

Notar que los *docstrings* no sólo pueden aplicarse a funciones o clases, sino también a variables y otros elementos del código que requieran documentación estructurada.

:::note
*docstring* es el término utilizado en Python y otros lenguajes para este tipo de comentarios, pero la mayoría de los lenguajes modernos cuentan con formatos similares. Por ejemplo, JavaScript y TypeScript utilizan **JSDoc**, mientras que Java emplea **Javadoc**, entre otros estándares de documentación
:::

Muchos editores de código permiten visualizar los *docstrings* al colocar el cursor sobre el nombre de una función. Esto resulta especialmente útil al trabajar con librerías externas, ya que permite comprender mejor su uso sin necesidad de revisar la implementación o la documentación externa.

Al escribir el *docstring* de una función, debemos siempre comparar el nombre de la función con lo escrito. Si un *docstring* resulta redundante con respecto al nombre de la función, entonces el nombre está bien elegido. Por otro lado, si el *docstring* utiliza verbos o sustantivos que no surgen en el nombre de la función, esto puede ser indicio de que el nombre está mal elegido. Por esta razón introducimos el siguiente lineamiento:

:::tip[Pro Tip]
Siempre escribir *docstring* y compararlos con el nombre de la función.
:::

El docstring debe aportar información que el nombre de la función no puede expresar por sí solo, como las excepciones que maneja, las unidades de medida de las variables o el formato del valor de retorno. Veamos nuevamente el ejemplo de la función anterior y analicemos su descripción mediante la documentación interna de TypeScript:

```typescript
/**
 * Latitude and longitude in degrees.
 */
type Coordinates = {
    latitude: number;
    longitude: number;
};

/**
 * Calculate the distance between the satellites using the Haversine formula
 * @param {Coordinates} satellitePosition1 - Latitude and longitude of the first satellite in degrees.
 * @param {Coordinates} satellitePosition2 - Latitude and longitude of the second satellite in degrees.
 * @throws {ValueError} - If the latitude or longitude is a non valid number
 * (i.e. abs(latitude) > 90 or abs(longitude) > 180, NaN, Infinity, etc.)
 * @return {number} - The distance between the two satellites in kilometers
 */
function calculateDistanceBetweenSatellites(
    satellitePosition1: Coordinates,
    satellitePosition2: Coordinates
): number {
    // Code...

    const partialHaversine =
        Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
        Math.cos(lat1Rad) *
            Math.cos(lat2Rad) *
            Math.sin(longitudeDifference / 2) *
            Math.sin(longitudeDifference / 2);
    const centralAngleRadians =
        2 *
        Math.atan2(Math.sqrt(partialHaversine), Math.sqrt(1 - partialHaversine));

    // Code...
}
```

En primer lugar, podemos observar que hay un comentario en la definición del tipo `Coordinates`, que nos indica que si utilizamos este tipo, estamos tratando con valores de latitud y longitud en grados. Esto es crucial, porque previene errores inesperados relacionados con las unidades de medida.

Por otro lado, el comentario principal se encuentra en la función que calcula la distancia entre satélites. En este caso, se especifica que se utiliza la fórmula de *Haversine*, y se proporciona información sobre los tipos. Aunque en TypeScript la definición de tipos hace que esta parte sea redundante, en JavaScript puede ser muy útil. Por último, el comentario nos brinda información extra que no sabríamos sin leer la implementación, como que el tipo del valor de retorno es un número que expresa la distancia entre los dos satélites en **kilómetros**, o que la función lanzará una excepción en caso de valores inválidos para la latitud y la longitud.

A continuación se presenta el código traducido a Python con su correspondiente *docstring*:

```python
# Latitude and longitude in degrees
Coordinates = Tuple[float, float]


def calculate_distance_between_satellites(
    satellite_position1: Coordinates, satellite_position2: Coordinates
) -> float:
    """
    Calculate the distance between the satellites using the Haversine formula.

    Parameters:
    satellite_position1 (Coordinates): Latitude and longitude of the first satellite in degrees.
    satellite_position2 (Coordinates): Latitude and longitude of the second satellite in degrees.

    Raises:
    ValueError: If the latitude or longitude is an invalid number
                (i.e., abs(latitude) > 90 or abs(longitude) > 180, etc.)

    Returns:
    float: The distance between the two satellites in kilometers.
    """
    # Code...

    partial_haversine = (
        math.sin(latitude_difference / 2) ** 2
        + math.cos(lat1_rad)
        * math.cos(lat2_rad)
        * math.sin(longitude_difference / 2) ** 2
    )
    central_angle_radians = 2 * math.atan2(
        math.sqrt(partial_haversine), math.sqrt(1 - partial_haversine)
    )

    # Code...
```

En este código podemos notar algunas diferencias y similitudes entre **JSDoc** y **docstring**. Sin embargo, estas son solo las características principales de ellos, existen más detalles que pueden ser incluidos dependiendo del lenguaje y la implementación. Además, podemos encontrarnos con diversos formatos adicionales, como el utilizado en la librería `numpy` de Python, que tiene su propia convención para los *docstrings.* En general para Python es recomendable utilizar el formato propuesto por `PEP 257` o con modificaciones similares.