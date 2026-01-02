---
title: De la sintaxis y semántica a la intención
description: asdf
---


Todos los lenguajes de programación comparten dos componentes esenciales, la sintaxis y la semántica. La sintaxis es el conjunto de reglas que definen cómo organizar los símbolos y palabras claves de un lenguaje para formar sentencias y expresiones válidas. Por otro lado, la semántica es cómo se deben interpretar esas expresiones. Esto se puede formalizar de distintas maneras, una de ellas es la semántica operacional, que describe el comportamiento de un programa en términos de cómo se ejecutan paso a paso sus instrucciones. Esta semántica se divide en dos ramas, la semántica *small step* y la semántica *big step*.

La semántica *small step* describe la ejecución de los programas dividiéndolos en pasos pequeños, es decir, evaluando cada instrucción de forma secuencial. Para ello, define una relación binaria que conecta cada estado del programa antes y después de realizar una instrucción. Esta semántica es útil para conocer cuál es el estado del programa en un momento dado.

Por otro lado, la semántica *big step*, describe los resultados finales de la computación, sin preocuparse por los estados intermedios. El objetivo de esta semántica es llegar directamente al resultado final sin detenerse en cada paso.

Existen otras semánticas, como la axiomática que describe el significado de los programas mediante pre y post-condiciones, o la semántica denotacional que describe el comportamiento de los programas haciendo uso de objetos matemáticos.


Estas semánticas resultan útiles porque proporcionan diferentes herramientas para analizar y comprender algunos aspectos de los lenguajes de programación, pero no se suelen utilizar directamente al momento de programar. Por esta razón, vamos a introducir una nueva noción de semántica: **la semántica en lenguaje natural**, que describe el programa según lo que el desarrollador entiende que el código hace. Esta semántica es imposible de definir formalmente porque la misma es subjetiva al desarrollador que lee el código, pero es importante darle entidad a su existencia. Pues la misma puede ser más o menos evidente según la calidad del código que se escribe.

Un código que aplica correctamente la semántica en lenguaje natural es un código bonito, y un código bonito sigue buenas prácticas de programación. Entre esas prácticas que vamos a ver en este trabajo, está la elección de buenos nombres de funciones: un buen nombre hace explícito lo que hace la función. Para ilustrar esta idea, consideremos un ejemplo clásico, una función que calcula la secuencia de Fibonacci.

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```

Ahora, analicemos las siguientes funciones que hacen uso de esta secuencia.

```python

def rabbit_population_growth(n_months: int) -> int:
	"""
	Computes the number of rabbit pairs after a given number of months.
	Params:
		n_months (int): The number of months to calculate.

	Returns:
		int: The total number of rabbit pairs after n_months.
	"""
  return fibonacci(n_months)

def count_drone_ancestors(n_generations: int) -> int:
	"""
	Computes the number of ancestors of a drone bee after a given
	number of generations.
	Params:
		n_generations(int): The number of generations to trace back.

	Returns:
		int: The total number of ancestors in n_generations.
	"""
  return fibonacci(n_generations)

````

Aunque `rabbit_population_growth` y `count_drone_ancestors` compartan implementación y semántica formal, su semántica en lenguaje natural difiere ya que realizan tareas distintas. La primera función comunica una historia sobre la reproducción de los conejos, mientras que la segunda se centra en los ancestros de los zánganos de una colmena. Esta diferencia nos permite entender la intención del desarrollador, porque con un simple vistazo al nombre de la función comprenderemos un poco más sobre el
contexto del código en general.


## El código cuenta una historia

Si un sistema de software es lo suficientemente complejo, estará compuesto por una gran cantidad de funciones, módulos y clases que interactúan entre sí (hablaremos simplemente de funciones en pos de mejorar la fluidez del texto). Si el código no es organizado correctamente, no sólo se hará muy difícil de entender, sino que también de extender y mantener. Para evitar estos problemas, es muy importante adoptar un enfoque de trabajo claro y estructurado, como el enfoque top-down.

Cuando hablamos del enfoque top-down decimos que debemos ir del nivel más general al más específico, descomponiendo el problema en partes más pequeñas y manejables. En otras palabras, el código que escribe un desarrollador debe contar una historia: la función principal o main debe actuar a modo de índice o resumen, presentando los ‘capítulos’ que no son más que las funciones dentro del programa. Cada función detalla una parte específica de la historia, mientras que los componentes como variables y controladores de flujo dentro de las funciones desarrollan el contenido. Observemos el siguiente código:

```python showLineNumbers
def nuclear_reactor_controller():
  for control in CONTROL_LIST:
    control_result = execute_control(control)
    if control_result.failed():
      trigger_alarm(control, control_result)
      execute_emergency_plan(control, control_result)
```

La mayoría de los lectores probablemente no entienda los detalles técnicos sobre reactores nucleares, pero este fragmento de código cuenta una historia lo suficientemente clara como para comprender a grandes rasgos lo que ocurre. Describe como un reactor realiza una serie de controles rutinarios y, si alguno de ellos falla, se activa una alarma y se ejecuta un plan de emergencia. Si bien hay muchos detalles que no conocemos, como cuáles son los controles o como se activan las alarmas, el diseño facilita explorar las funcionalidades internas y comprender la lógica detrás de estas acciones.

Entonces, para escribir una buena historia en código, primero debemos tener en cuenta conceptos fundamentales, como el uso adecuado de nombres de variables y funciones, escribir comentarios claros, seguir convenciones del lenguaje que se está utilizando y ser consistentes con el idioma a lo largo del código. Estos son los pilares para escribir un código bonito que comunique apropiadamente la intención del desarrollador, logrando que un proyecto complejo tenga una semántica en lenguaje natural evidente.


# El arte de nombrar

Todo código está compuesto por funciones y variables. Las funciones permiten abstraernos de un bloque de sentencias y reutilizarlo a lo largo de todo el programa. Mientras que las variables nos permiten almacenar y manipular datos. Tanto las funciones, como las variables tienen nombres que nos permiten identificarlas y utilizarlas. A nivel sintáctico, algunos lenguajes imponen restricciones, como exigir que los nombres de las funciones comiencen con minúscula o prohibir comenzar con un número. Pero más allá de esas reglas, el desarrollador es completamente libre de escoger cualquier nombre. El problema es que con frecuencia se utilizan nombres vagos, confusos o ambiguos, lo que dificulta la comprensión del código. Un nombre estará bien elegido si hace inequívoca su semántica en lenguaje natural.

Al nombrar incorrectamente una función, generamos malinterpretaciones, ya que otro desarrollador podría pensar que la función realiza acciones que realmente no ejecuta, o por el contrario, ocultamos funcionalidades que no se reflejan en el nombre. Lo mismo ocurre con las variables, nombres poco claros pueden dificultar comprender el tipo de dato que éstas almacenan o cómo es que ese dato está siendo utilizado en el sistema. Por ello es que debemos elegir cuidadosamente palabras específicas que describan con precisión el propósito de nuestros elementos, evitando términos genéricos o vacíos que puedan causar ambigüedad.

Imaginemos una función llamada `processData`, ¿qué es lo que pretende el desarrollador qué esta función haga? Comprender esto tan solo mirando el nombre se vuelve una tarea casi imposible. ¿Suma distintos valores? ¿Filtra elementos según alguna regla específica? En definitiva, no es algo claro. Por otro lado, nombres como `calculateTotalWithTaxes()` o `filterValidatedUsers()` brindan mucha más información sobre la finalidad de la función. Lo mismo ocurre con las variables, un caso recurrente es llamarlas `data` o `value`. Estos nombres no ofrecen nada de información sobre su propósito o contenido. Incluso, en lenguajes sin sistema de tipos como Python o JavaScript, ni siquiera se tiene información sobre el tipo de dato que contiene.


:::tip[Pro Tip]
Las funciones y variables deben tener nombres descriptivos que ayuden a comprender su significado.
:::

¿Cómo podemos elegir un buen nombre para nuestras funciones y variables? La clave está en usar palabras adecuadas para describir claramente lo que pretendemos con ellas. Una regla esencial es utilizar nombres fáciles de localizar y pronunciar. Proyectos grandes suelen contener múltiples archivos y carpetas, que a su vez poseen gran cantidad de variables y funciones, por lo que nombres descriptivos y fáciles de buscar mejoran la legibilidad y ahorran tiempo. Además, los nombres que se pueden decir con naturalidad también son más fáciles de recordar y compartir. En cambio, un nombre críptico que solo entiende su autor complica la comunicación y dificulta el trabajo en equipo.

## Lineamientos para nombrar funciones

Al momento de nombrar funciones, es fundamental utilizar verbos. Dado que las funciones realizan acciones, qué mejor que utilizar verbos que son perfectos para ello. Elegir el verbo correcto puede marcar una gran diferencia entre un nombre claro y uno ambiguo. Por ejemplo, usar `distribute` en lugar de `send`, o `identify` en lugar de `find` puede dar lugar a nombres mucho más precisos e informativos. Si no somos capaces de encontrar un verbo que describa precisamente la intención de nuestro código, entonces puede ser que la función en cuestión realice más de una acción y deba modularizarse. Asegurar que una función realice una única tarea es muy importante y por eso trataremos este tema en los siguientes capítulos.

Además, como nos enseñan desde los primeros años de escuela, los verbos suelen estar acompañados por otras palabras que brindan más contexto sobre la acción. En las funciones, esto es igual de importante. Necesitamos términos específicos que describan con claridad el alcance de la función. En nuestro ejemplo anterior `calculateTotalWithTaxes`, no solo nos indica que se está calculando un valor total, sino que además, se están considerando impuestos.

## Lineamientos para nombrar variables

Así como podemos dar nombres descriptivos a las funciones, existen algunas buenas prácticas al nombrar variables que hacen que sea más fácil entender el propósito del código. En este caso, el uso de sustantivos es ideal para las variables, ya que representan entidades dentro del programa. No obstante, el tipo de la variable también influye en cómo debería nombrarse. Para variables de tipo `bool`, es recomendado utilizar prefijos como `is`, `has` o `can`. Dado que estas palabras suelen iniciar las preguntas en inglés, nombres como `isVisible` o `hasAccess` resultan intuitivos y ayudan a comprender el significado de su valor en un momento dado. Es importante, sin embargo, evitar nombres con este formato que incluyan una negación, como `isNotOpen`, ya que, aunque se entiende su objetivo, puede generarse confusión al momento de su uso.

En el caso de arreglos, listas o conjuntos de valores, los nombres en plural son una buena práctica, como `adminCommands` o `validUsers` para reflejar la multiplicidad de elementos. Para variables numéricas, prefijos como `max`, `min` o `total` añaden contexto valioso si el valor implica algún tipo de rango o límite. Asimismo, si la variable representa alguna unidad medible (como tiempo, distancia o dinero), incluir una referencia a la unidad en el nombre aporta mucha claridad y reduce posibles errores de conversión innecesarios.

Otra buena práctica al nombrar constantes o variables es aprovechar el nombre de la función con la que las inicializamos. Si la función tiene un nombre adecuado, es decir, es descriptivo y no genera confusión, podemos usarlo como referencia para nombrar nuestra variable de manera coherente. Veamos un ejemplo donde esto no se respeta:

```python
new_product = self._get_product_basic_info(product)
```

El nombre `new_product` sugiere que la variable almacena un objeto de una clase, pero si observamos el nombre de la función, vemos que en realidad devuelve la información básica de un producto. Un nombre más preciso y alineado con su contenido sería:

```python
product_basic_info = self._get_product_basic_info(product)
```

## Longitud de los nombres

Muchas veces, al intentar ser específicos con nuestros nombres, surge un nuevo problema: la longitud de estos. Entonces ¿cuál es la longitud perfecta para un nombre? En general, nombres demasiado largos pueden ser difíciles de recordar y ocupan mucho espacio en pantalla, pero por otro lado, nombres cortos no ofrecen tanta información. La clave, como siempre, es encontrar un equilibrio, pero también existen algunas recomendaciones que podemos seguir:


- Si el alcance de la función o variable es pequeño, por ejemplo, una función que sólo se utiliza en el mismo archivo en la cual se define o una variable con vida útil de unas pocas líneas, entonces está bien optar por nombres cortos. Imaginemos que estamos creando un paquete con funciones matemáticas, y tenemos una función auxiliar para calcular la magnitud o norma de un vector, podríamos nombrar a nuestra función como `norm()` en lugar de `calculateVectorMagnitude()`.
- Intentaremos evitar el uso de acrónimos y abreviaciones siempre que sea posible. Los nuevos desarrolladores o aquellos con poco conocimiento del código podrían tener dificultades para comprender su significado. Por ejemplo, en lugar de `calcTtl()`, usar `calculateTotalPrice()`.
- Eliminar palabras que no aporten información relevante. Por ejemplo, usar `toString()` en lugar de `convertToString()`.

Siguiendo estas recomendaciones, lograremos nombres más claros y concisos que aportarán legibilidad y facilitarán la comprensión de las funciones y el código en general.

## Tipado en el código

### Tipos de dato, tipos de función y su comportamiento

Un **tipo de dato** (o simplemente tipo) define el conjunto de valores que una variable puede almacenar y las operaciones que se pueden realizar sobre esos valores. De forma similar, las funciones también poseen un tipo, conocido como **tipo de una función**, que describe el tipo de sus parámetros y su valor de retorno.

En la mayoría de los lenguajes de programación, los tipos de datos se pueden clasificar en tres categorías:

- **Primitivos**: Tipos básicos proporcionados por el lenguaje, como `int`, `float`, `char`, `boolean`.
- **Compuestos**: Estructuras que agrupan múltiples valores, como `array`, `tuple`, `struct`.
- **Personalizados**: Tipos definidos por el usuario a partir de tipos primitivos o compuestos. Estos se utilizan para representar entidades específicas.

Cada tipo de dato requiere distinta cantidad de memoria y permite realizar ciertas operaciones. Por ejemplo, una variable booleana sólo puede almacenar los valores `true` o `false`, lo que generalmente ocupa un solo byte en memoria. Por otro lado, los tipos numéricos pueden representar un rango mucho más amplio de valores, por lo que su tamaño en memoria es mayor.

:::note
Si bien conceptualmente, un valor booleano debería ocupar 1 bit, muchos lenguajes utilizan un byte al ser esto la unidad mínima direccionable de memoria
:::

Un caso reciente que demuestra la importancia de elegir los tipos adecuados se vio con la publicación del modelo de lenguaje de la empresa china **DeepSeek**. A diferencia de sus competidores, los desarrolladores de DeepSeek optaron por [utilizar menos bits para sus variables numéricas](https://www.inferless.com/learn/the-ultimate-guide-to-deepseek-models). Esta decisión permitió que su modelo ocupara significativamente menos memoria, logrando así un sistema más eficiente.

### Tipado estático vs tipado dinámico

Si bien todos los lenguajes de programación cuentan con algún sistema de tipos, no todos lo manejan de la misma manera. En algunos, el sistema de tipos es explícito y obligatorio, pero en otros casos, existe de forma implícita y sólo se verifica durante la ejecución. Estas diferencias nos llevan tener dos enfoques principales:

**Tipado estático.** En los lenguajes con **tipado estático** como `C`, `Java` o `Rust`, es necesario especificar el tipo de cada variable declarada. Una vez definido, este tipo no puede cambiar a lo largo del programa. El compilador se encarga de verificar que todas las operaciones y funciones respeten estos tipos, lo que permite detectar errores incluso antes de ejecutar el código.

**Tipado dinámico.** Lenguajes como `JavaScript` y `Python` utilizan **tipado dinámico**. En ellos, el tipo de una variable se determina durante la ejecución del programa, e incluso puede contener valores de distintos tipos de datos en diferentes momentos. Esta flexibilidad suele agilizar el desarrollo al comienzo, pero también incrementa el riesgo de cometer errores si no se tienen las precauciones suficientes.

### ¿Por qué queremos tipar?

Algunos desarrolladores consideran que la flexibilidad de tipos en el tipado dinámico es una de las principales virtudes de ciertos lenguajes, pero la verdad es que tipar el código va más allá de una simple formalidad. El tipado es una herramienta clave que mejora la calidad del código. En proyectos pequeños o funciones simples, puede parecer innecesario o incluso una pérdida de tiempo, pero adquirir el hábito de tipar desde el principio es beneficioso. En sistemas más complejos, los tipos permiten comprender rápidamente el propósito de las funciones con un simple vistazo, ya que definen claramente los tipos de entrada y salida. Además reducen errores y facilitan la mantenibilidad. Cuando combinamos un tipado explícito con buenos nombres de variables y funciones, obtenemos un código claro y fácil de entender.

:::tip[Pro Tip]
Tipar siempre las variables y las funciones.
:::



#### Tipado en JavaScript y Python

Aunque JavaScript y Python utilizan tipado dinámico por defecto, originalmente no contaban con un sistema de tipos formal. Con el tiempo, a medida que los proyectos en estos lenguajes se volvieron más complejos, se hizo evidente la necesidad de incorporar mecanismos de tipado que mejoraran la claridad del código. Esto dio lugar al desarrollo de lenguajes como TypeScript para JavaScript y herramientas como las anotaciones de tipo en Python, que permiten un mayor control sobre los tipos sin renunciar a la flexibilidad que caracteriza a ambos lenguajes.

Las **anotaciones de tipo** de Python en el módulo `typing`, son *ayudas visuales que se incluyen en las variables, parámetros y funciones*. Estas anotaciones no interfieren de ninguna manera con la ejecución del código pero sirven de guía tanto al desarrollador como a herramientas externas. En el siguiente fragmento de código, podemos observar una función que devuelve un `bool` con un parámetro de tipo `List[int]`.

```python
def all_positives(numbers: List[int]) -> bool:
	# code ...
```

Por otro lado, para JavaScript se desarrolló TypeScript, un superconjunto del lenguaje que agrega tipado estático opcional entre otras mejoras. A diferencia de Pyhton, TypeScript si detecta errores de tipos, esto lo hace al momento de *transpilar* el código a JavaScript, ya que TypeScript no se ejecuta directamente, sino que es convertido a un archivo `.js`. En el siguiente fragmento de código podemos observar una implementación de TypeScript.

```js
function allPositives(numbers: Array<number>): boolean {
	// code...
}
```

### Recomendaciones al tipar

Terminamos esta sección con algunas situaciones a evitar y recomendaciones al momento de trabajar con tipos en los lenguajes Python y TypeScript. Estas recomendaciones deberían adaptarse siempre que sea posible al lenguaje de programación con el que se este trabajando.

Si bien el tipado es una herramienta muy útil con la que podemos contar, existen malas prácticas que muchos desarrolladores suelen cometer.

- Abusar del tipo `any`: En TypeScript, el tipoany permite omitir la verificación de tipos en las variables donde se utiliza, lo que significa que el transpilador no aplicará comprobaciones de tipo sobre ellas. Entonces, ¿para qué usar un sistema de tipos si se ignora su principal ventaja? Esto no solo complica la lectura del código, sino que también aumenta el riesgo de errores. Si realmente no se conoce el tipo de una variable, es preferible usar `unknown`, que expresa explícitamente que el tipo es desconocido, pero mantiene la seguridad en tiempo de compilación. En Python ocurre algo similar: el uso del tipo `Any` simplemente dificulta la tarea de otros desarrolladores.
- Evitar el casteo de tipos: En TypeScript, el casteo de tipos nos permite forzar la interpretación de un dato como otro tipo sin modificar su valor real. A diferencia de Python, donde int() o str() transforma efectivamente un dato, en TypeScript simplemente se le dice al transpilador que confíe en el desarrollador. Esto puede ocultar errores, provocar inconsistencias y hacer que el código sea menos mantenible.

:::note
El casteo de tipos (*type casting* en inglés) es el proceso de convertir un tipo de dato en otro. En TypeScript, podemos realizar un casteo de un dato en otro tipo haciendo uso de la palabra `as`. Por ejemplo: `'2' as number;` le dirá al transpildor que interprete la cadena de texto que contiene al carácter 2 como un número.
:::

Por otro lado, con el tipado estático evitamos errores y hacemos nuestro código más claro y mantenible. Para aprovechar esta funcionalidad al máximo, es recomendable seguir algunas buenas prácticas:

- Definir tipos personalizados: Tanto en TypeScript como en Python, podemos crear nuestros propios tipos mediante interfaces, clases o alias. Esto promueve la reutilización de estructuras de datos bien definidas y mejora la claridad.
- Validar tipos de fuentes desconocidas: Al trabajar con APIs, librerías de terceros o datos de origen desconocido, es fundamental validar los tipos para evitar errores. En TypeScript, librerías como Zod permiten definir esquemas de validación robustos, mientras que en Python, herramientas como Pydantic facilitan la validación de datos en tiempo de ejecución. Si un dato no cumple con el formato esperado, estas herramientas permiten lanzar errores de manera controlada, evitando fallos más graves en el sistema.

## Otras recomendaciones

### Seguir las convenciones del lenguaje

Los desarrolladores son libres de escribir el código de la manera que ellos deseen siempre y cuando este funcione correctamente. Sin embargo cada lenguaje de programación cuenta con un conjunto de directrices que recomiendan estilos, prácticas y métodos para distintos aspectos del desarrollo. Estas convenciones buscan estandarizar la jerarquía y la arquitectura de archivos y carpetas, las reglas para comentarios, y el formato de nombres y espaciado, entre otros aspectos.

Seguir estas convenciones ayuda a mantener la uniformidad en los proyectos de *software*. Si el código luce consistente en todos los archivos y módulos, será más fácil comprender su estructura y funcionamiento. Como resultado, el mantenimiento y la colaboración se simplifican. Aunque no es obligatorio seguir estas normas, conocerlas y aplicarlas es esencial para dominar un lenguaje por completo.

A continuación se presentan las convenciones de nombres para funciones, variables, clases y otros elementos en Python y JavaScript.

Python:

* **Funciones:** en minúsculas, con palabras separadas por guión bajo (*snake_case*). Ejemplo `my_function`.
* **Variables:** siguen la misma convención que las funciones.
* **Clases:** cada palabra inicia con mayúscula y no se usan separadores (*PascalCase*). Ejemplo: `MyClass`.
* **Métodos:** igual que las funciones, en *snake_case*.
* **Constantes:** igual que las funciones, pero completamente en mayúsculas (*SCREAMING_SNAKE_CASE*). Ejemplo `THIS_CONSTANT`.
* **Paquetes:** en minúsculas, sin guiones bajos. Ejemplo `mypackage`.

JavaScript - [AirBnB Style Guide](https://github.com/airbnb/javascript):

* **Funciones:** la primera palabra en minúscula, las siguientes con mayúscula inicial y sin separadores (*camelCase*). Ejemplo `myFunction`.
* **Variables:** siguen la misma convención que las funciones.
* **Clases:** igual que en Python, usando *PascalCase*. Ejemplo: `MyClass`.
* **Métodos:** igual que las funciones y variables, en *camelCase*.
* **Constantes:** se escriben en mayúsculas con guión bajo (*SCREAMING_SNAKE_CASE*), como en Python. Ejemplo `THIS_CONSTANT`.
* **Paquetes:** depende del tipo de proyecto y de archivo, en general no hay una convencion definida salvo casos especiales.

### Ser consistentes en el uso del idioma

Elegir un idioma y mantenerlo a lo largo de un proyecto es fundamental para mantener la coherencia en el código. Si, por ejemplo, en un archivo utilizamos una variable `counter` y luego en otro una variable `contador`, estaremos creando una inconsistencia que puede generar confusión, especialmente en equipos de trabajos con hablantes de diferentes idiomas.

Por lo general, el inglés suele ser el idioma preferido para escribir código, ya que coincide con las palabras claves de la mayoría de los lengajes de programación y además facilita la comunicación e integración en equipos de trabajo multiculturales. Es importante evitar el uso de caracteres especiales como *ñ*, *á*, *ü* ya que pueden provocar errores de compatibilidad o dificultar la escritura y comprensión del código. Por otro lado, gran parte de la documentación de lenguajes, librerías y APIs están en inglés, por lo que al elegir este idioma también facilitamos el acceso a recursos y buenas prácticas.


## Resumiendo los lineamientos:

* La semántica en lenguaje natural tiene que ser evidente: Cuando alguien revisa cualquier código, debería ser capaz de explicar qué hace sin problemas.
* Al escribir código con un enfoque top-down: las funciones van desde lo más general a lo más concreto, siempre contando una historia, obteniendo así una semántica en lenguaje natural evidente.
* Es importante elegir buenos nombres de variables y funciones. Ambos tipos de nombres tienen que guardar coherencia.
* Tipar es importante para darle más claridad al código.
* Seguir las convenciones del lenguaje que uses.
* Ser consistente con el idioma.