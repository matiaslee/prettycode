---
title: Diseño de funciones
description: asdf
---

## Las funciones como método de organización

Las **funciones** son uno de los elementos esenciales en todo lenguaje de programación. Son *bloques de código que nos permiten agrupar un conjunto de instrucciones o sentencias bajo un mismo nombre para ejecutar tareas específicas*. Usarlas trae múltiples beneficios, siendo uno de los más evidentes la **reutilización de código**. Supongamos una aplicación web donde es necesario validar direcciones de correo electrónico, sería razonable contar con una función llamada `validate_email` que realice esta tarea. Dicha función se utilizaría siempre que sea necesaria la validación.

Cuando nos enseñan a programar, a menudo se nos explica que las funciones sólo existen para evitar la repetición de código. Pero rara vez se menciona que también son una herramienta que puede servir para la organización del mismo. Este propósito suele quedar en segundo plano porque explicarlo requiere de ejemplos más complejos, lo cuál no es siempre viable en un curso introductorio.

Lamentablemente, luego de los primeros cursos de programación, pocas veces se vuelve a estudiar el concepto de función en profundidad. Como resultado, muchos desarrolladores no llegan a comprender su verdadero potencial en la estructuración de código. En realidad, crear funciones incluso cuando no hay código repetido puede ser una estrategia importante para mejorar la legibilidad de un programa.

## Las funciones deben ser pequeñas

En el cuerpo de las funciones encontramos **sentencias**. Una sentencia en un lenguaje de programación es una *instrucción completa que indica a la computadora qué tarea ejecutar*. Son las unidades fundamentales de ejecución y, en general, están delimitadas por algún símbolo específico, como `;` en lenguajes como `C` o `JavaScript`, o por un salto de linea en `Python`.

Es importante notar la diferencia entre una sentencia y una línea de código. Aunque en muchos casos coincidan, una sentencia puede ocupar múltiples líneas si agregamos saltos de línea para mejorar la legibilidad. Del mismo modo, una línea puede contener múltiples sentencias si las escribimos en secuencia. En resumen: una sentencia es una unidad lógica de ejecución, mientras que una línea de código es sólo un aspecto visual del código de un programa.

> Los cuerpos de las funciones deberían tener idealmente unas 10 sentencias o menos.

El diseño de las funciones es clave para la organización del código. Mantener el cuerpo de las funciones corto puede parecer un límite innecesario para desarrolladores acostumbrados a escribir funciones largas que simplemente cumplen con su propósito. Sin embargo, reducir la cantidad de sentencias en una función trae ventajas importantes:

* **Reduce el número de responsabilidades**, idealmente a una sola.
* **Facilita la asignación de nombres descriptivos** que reflejen claramente su propósito.

Veamos un ejemplo de una función que contradice este principio. En el siguiente código observamos como se realizan varias tareas al mismo tiempo

```typescript
type Matrix = number[][];
function multiplyAndFormatMatrix(matrixA: Matrix, matrixB: Matrix): string {
  // Validate the input
  if (
    matrixA.length === 0 ||
    matrixA[0].length === 0 ||
    matrixB.length === 0 ||
    matrixB[0].length === 0
  )
    throw new Error("Invalid matrix, it must have at least one element");
  if (matrixA[0].length !== matrixB.length)
    throw new Error(
      "Invalid matrix, the number of columns of the first matrix must be equal to the number of rows of the second matrix"
    );

  // Multiply the matrices
  const multipliedMatrix = matrixA.map((row) =>
    matrixB[0].map((_, colIndex) =>
      row.reduce(
        (sum, item, rowIndex) => sum + item * matrixB[rowIndex][colIndex],
        0
      )
    )
  );

  // Pretty print the result
  const formattedRows = multipliedMatrix.map((row) => `| ${row.join("\t")} |`);
  return formattedRows.join("\n");
}
````

Esta función tiene demasiadas responsabilidades:

1.  Valida las matrices de entrada.
2.  Realiza la multiplicación.
3.  Le da un formato específico al resultado en una cadena de texto.

Para mejorarla, veamos como dividirla en funciones más pequeñas, asegurando que cada una tenga un único propósito.

```typescript
function multiplyAndFormatMatrix(matrixA: Matrix, matrixB: Matrix): string {
  validateMatrices(matrixA, matrixB);
  const multipliedMatrix = multiplyMatrices(matrixA, matrixB);
  return formatMatrix(multipliedMatrix);
}

function validateMatrices(matrixA: Matrix, matrixB: Matrix): void {
  validateMatrixHasElements(matrixA);
  validateMatrixHasElements(matrixB);
  validateMatrixDimensions(matrixA, matrixB);
}

function validateMatrixHasElements(matrix: Matrix): void {
  if (matrix.length === 0 || matrix[0].length === 0)
    throw new Error("Invalid matrix, it must have at least one element");
}

function validateMatrixDimensions(matrixA: Matrix, matrixB: Matrix): void {
  if (matrixA[0].length !== matrixB.length)
    throw new Error(
      "Invalid matrix, the number of columns of the first matrix must be equal to the number of rows of the second matrix"
    );
}

function multiplyMatrices(matrixA: Matrix, matrixB: Matrix): Matrix {
  return matrixA.map((row) =>
    matrixB[0].map((_, colIndex) =>
      row.reduce((sum, item, rowIndex) => sum + item * matrixB[rowIndex][colIndex], 0)
    )
  );
}

function formatMatrix(matrix: Matrix): string {
  return matrix.map((row) => `| ${row.join("\t")} |`).join("\n");
}
```

En esta nueva interpretación, la función principal `multiplyAndFormatMatrix` cuenta una historia fácil de seguir: primero se realiza la validación, luego la multiplicación y, finalmente, se da formato. A su vez, dentro de la validación también encontramos una secuencia lógica: primero se verifica cada matriz por separado y, luego, se validan las dimensiones de ambas.

El resto de las funciones no narran una historia, sino que realizan operaciones específicas, cada una reflejada claramente en su nombre. Además, este código no requiere de comentarios adicionales, ya que las funciones son lo suficientemente cortas y sus nombres están bien elegidos.

Seguramente, algunos lectores habrán notado que el segundo código es más extenso. **Esto no importa**. Más líneas de código o sentencias no implican necesariamente una mayor complejidad algorítmica (es decir, el segundo programa no es significativamente más costoso en términos de ejecución). A nivel humano, siempre es preferible trabajar con un código más extenso pero comprensible, en lugar de uno más compacto pero difícil de entender.

## Los requerimientos evolucionan

En cualquier proyecto, los requerimientos están en constante evolución. Supongamos que el cliente que solicitó la funcionalidad en `multiplyAndFormatMatrix` ahora necesita únicamente validar y multiplicar las matrices, sin dar un formato al resultado. Con el segundo enfoque, implementar este cambio sería tan sencillo como escribir lo siguiente:

```typescript
function multiplyMatrixes(matrixA: Matrix, matrixB: Matrix): string {
  validateMatrixes(matrixA, matrixB);
  return multiplyMatrixes(matrixA, matrixB);
}
```

En cambio, en el primer código, cumplir con este nuevo requerimiento implicaría refactorizar la función lo cual no siempre implica una tarea sencilla.

## El código crece horizontalmente

Ya hemos visto como el código puede crecer verticalmente y qué debemos hacer para reducir esta extensión. Sin embargo, el código también se expande horizontalmente y esto representa un problema para la legibilidad, y en consecuencia, el mantenimiento.

### Líneas demasiado largas

El primer culpable que contribuye al crecimiento horizontal son las **líneas demasiado largas**. Estas pueden surgir por diversas razones, como cadenas de texto extensas, nombres de variables o funciones excesivamente largos, expresiones aritméticas o lógicas complejas, y llamadas a funciones con numerosos parámetros.

Históricamente, se estableció un límite de 80 caracteres por línea, una convención que sigue siendo muy apoyada. Con este valor, ningún desarrollador debería tener problemas de visualización en su pantalla. De todos maneras, con la evolución de las mismas, de los editores y los lenguajes, algunos desarrolladores han ampliado este límite hasta 120 caracteres. Más allá del número exacto, lo importante es evitar líneas excesivamente largas que dificulten la lectura, y más importante aún, **prevenir el desplazamiento horizontal**, ya que esto afecta gravemente la navegabilidad en el código.

:::tip[Pro Tip]
Una línea de código jamás debe provocar desplazamiento horizontal.
:::

Para solucionar este problema, podemos aplicar varias estrategias. Por ejemplo:

#### Dividir expresiones en múltiples líneas


En lugar de una expresión larga en una sola línea:
```python
total_price = base_price + (base_price * tax_rate) - (base_price * discount) + shipping_fee
```

Podemos dividirla en varias lineas que mejoran la lectura:
```python
total_price = (
    base_price
    + (base_price * tax_rate)
    - (base_price * discount)
    + shipping_fee
)
```

Notar que esta solución si bien añade más lineas a nuestro código, no añade más sentencias. Por otro lado, todo editor moderno tiene la opción de colapsar sentencias, luego, usando esta opción uno vería más o menos lo siguiente:

```python
> total_price = (...
```

y podría expandir la sentencia cuando sea necesario.

#### Utilizar variables intermedias

Si tenemos una línea con múltiples operaciones, por ejemplo:

```python
final_value = (quantity * price_per_item) + (quantity * price_per_item * tax) - discount
```

Podemos descomponerla en variables intermedias

```python
subtotal = quantity * price_per_item
tax_amount = subtotal * tax
final_value = subtotal + tax_amount - discount
```

En este caso sí estamos añadiendo más sentencias a nuestra función, pero no está suponiendo ninguna complejidad visual al código.

#### Reestructurar funciones con muchos parámetros

La siguiente función posee muchos parámetros en una sola línea

```python
def send_email(receiver: str, subject: str, message: str, is_html: bool, attach_signature: bool, template: str) -> bool:
    # code ...
```

Podemos reescribirla de la siguiente forma:

```python
def send_email(
    receiver: str,
    subject: str,
    message: str,
    is_html: bool,
    attach_signature: bool,
    template: str
) -> bool:
    # code ...
```

En estos casos también se pueden la opción *colapsar sentencias*.

Esta estrategia también es aplicable en las llamadas a función.
Por ejemplo, en lugar de:

```python
# Código sin formatear, menos legible:
send_email(user.email, "Welcome!", "Hello, we are happy to have you.", True, False, "footer.html")
```

podemos escribir:

```python
send_email(
    user.email,
    "Welcome!",
    "Hello, we are happy to have you.",
    True,
    False,
    "footer.html"
)
```

Si bien no es recomendable que una función tenga demasiados parámetros, en algunos casos las librerías externas nos imponen esta estructura. Más adelante en este capítulo abordaremos esta problemática en detalle.

#### Reestructurar diccionarios u objetos

Un problema similar ocurre con los diccionarios de Python y los objetos de JavaScript. Estos se vuelven muy largos para definirlos en una única línea. La solución anteriormente presentada también se aplica a estos casos.

```python
# Cuando tenemos un diccionario con muchas claves
login_error = {"name": "Login error", "http_status": 400, "context": "...", "message": "The username or password is incorrect"}

# Podemos organizarlo en varias lineas
login_error = {
    "name": "Login error",
    "http_status": 400,
    "context": "...",
    "message": "The username or the password in incorrect"
}
```

### Muchos niveles de indentación

El exceso de niveles de indentación es otro factor que contribuye al crecimiento horizontal del código. La indentación, que consiste en agregar espacios al inicio de las líneas, se utiliza para reflejar la estructura jerárquica del programa y facilitar la lectura del flujo de ejecución. En lenguajes como Python, es parte obligatoria de la sintaxis, mientras que en otros cumple principalmente una función visual.

Si bien una buena indentación ayuda a entender la organización del código, cuando se acumulan demasiados niveles suele ser indicio de una lógica innecesariamente compleja. En estos casos, conviene reorganizar el código usando funciones auxiliares o instrucciones como `return`, `break` o `continue` para evitar bloques anidados y mejorar la claridad.

:::tip[Pro Tip]
Una función no debe tener más de 3 niveles de indentación.
:::

A continuación serán presentadas algunas estrategias simples para reducir la indentación en los programas.

#### Abstraer niveles de indentación en nuevas funciones

Observemos la siguiente función `process_nested_json()`, que se encarga de procesar una lista de objetos anidados:

```python
def process_nested_json(data: List) -> List:
    results = []

    for user in data.get("users", []):
        for order in user.get("orders", []):
            if order.get("status") == "completed":
                for item in order.get("items", []):
                    if item.get("type") == "special":
                        results.append({
                            "user_id": user.get("id"),
                            "order_id": order.get("id"),
                            "item_id": item.get("id"),
                        })

    return results
```

Claramente la función no sigue el lineamiento definido sobre 3 niveles máximos de indentación. Por esto mismo, comprender qué realiza el cuerpo de la función no es una tarea fácil. Comparemos esta implemetanción con una que modulariza mejor la tarea introduciendo funciones auxiliares:

```python
def process_nested_json(data):
    special_items = []
    for user in data.get("users", []):
        special_items += get_special_items_from_completed_orders(user)

    return special_items


def get_special_items_from_completed_orders(user):
    special_items = []
    for order in user.get("orders", []):
        if order.get("status") == "completed":
            special_items += get_special_items_in_order(order)

    return special_items


def get_special_items_in_order(order):
    special_items = []
    for item in order.get("items", []):
        if item.get("type") == "special":
            special_items.append({
                "user_id": user.get("id"),
                "order_id": order.get("id"),
                "item_id": item.get("id"),
            })

    return special_items
```

En este caso, la función principal `process_nested_json` se encarga exclusivamente de iterar sobre los usuarios y delegar tareas a otras funciones. Este enfoque mejora mucho la lectura del código, ya que no es necesario leer por completo toda la implementación. Basta con observar el ciclo `for` y la llamada a la función correspondiente para entender a grandes rasgos qué está ocurriendo: *la función devuelve todos los ítems especiales de las órdenes completadas para todos los usuarios*. Luego, en caso de querer comprender más a fondo, siempre se puede revisar las implementaciones de las funciones auxiliares.


:::note[Tipar no es gratis]
Unos de nuestros lienamientos dice que siempre debemos
tipar las funciones pero nosotros no estamos tipando el código del ejemplo.
Esto es para enfocarnos en el refactor del código, pues cuando uno no está acostrumbrado
los tipos puede dificultar la lectura del código.
:::

:::note[Ejercicio]
¿Cómo tiparías las funciones del último ejemplo? **Ayuda**: podes usar un *alias* para simplificar la tarea. Con los *alias* introducimos los siguientes tipos
- `SpecialItemInfo = Dict[str, int]`,
- `User = ...`,
- `ItemInfo = ...`,
- `SystemData = ...`
de forma tal que `process_nested_json` tenga tipo
`def process_nested_json(data: SystemData) -> List[SpecialItemInfo]`.

¿Cuál sería un mejor nombre para la función?
:::


#### Retornar valores de manera temprana

La discusión sobre si las funciones deben tener más de un punto de retorno no tiene una respuesta universalmente correcta, depende en gran medida de cómo el desarrollador implemente la lógica. Sin embargo, los retornos múltiples pueden ser útiles para simplificar la lógica, especialmente cuando queremos prevenir niveles de indentación excesivos. Veamos el siguiente ejemplo:

```typescript
type User = {
    isEmailVerified: boolean;
    age: number;
};

function isValidUser(user: User) {
    let isValid = false;
    if (user) {
        if (user.isEmailVerified) {
            if (user.age >= 18) {
                console.log("Valid user");
                isValid = true;
            } else {
                console.log("Underage user, not valid");
            }
        } else {
            console.log("User email not verified, not valid");
        }
    } else {
        console.log("No user provided, not valid");
    }
    return isValid;
}
```

Si bien es un ejemplo simple, en códigos más complejos podría dificultarse su lectura, principalmente debido a la cantidad de condiciones que hay que tener en mente. Ahora, comparemos con una versión mejorada de esta función que hace uso de retornos tempranos para reducir la anidación y mejorar la lectura:

```typescript
function isValidUser(user: User) {
    if (!user) {
        console.log("No user provided, not valid");
        return false;
    }

    if (!user.isEmailVerified) {
        console.log("User email not verified, not valid");
        return false;
    }

    if (user.age < 18) {
        console.log("Underage user, not valid");
        return false;
    }

    console.log("Valid user");
    return true;
}
```

En esta segunda versión, las condiciones que invalidan al usuario se manejan inmediatamente, dejando un flujo más claro y eliminando indentación innecesaria.

#### Hacer uso de `continue` en los ciclos

La estrategia de retornar valores tempranamente no siempre es posible, como en el caso de un ciclo. Su análogo para este caso es hacer uso de la sentencia `continue` para ejecutar la siguiente iteración y evitar anidar más lógica en un ciclo.

```python
def calculate_foo(value: int) -> int:
    ...

def process_values(values_to_compute: List[Optional[int]]) -> List[int]:
    computed_values = []
    for value in values_to_compute:
        if value is not None:
            print("Possible candidate: ", value)
            if value >= 0:
                computed_values.append(calculate_foo(value))
    return computed_values

values = [2, None, -16, 1, -1, None, 5]
process_values(values)
```

Para este simple ejemplo, vemos que el bucle tiene dos condiciones `if` anidadas. Cada una de ellas incluye una indentación nueva y una condición a tener en mente para el lector. Ahora observemos esta nueva versión:

```python
def process_values(values_to_compute: List[Optional[int]]) -> List[int]:
    computed_values = []
    for value in values_to_compute:
        if value is None:
            continue

        print("Possible candidate: ", value)
        if value < 0:
            continue

        computed_values.append(calculate_foo(value))
    return computed_values
```

En este código podemos observar que, al no cumplirse las condiciones del `if`, automáticamente se realiza un `continue`. Con esto no solo simplificamos la lógica y la lectura, sino que en casos extremos podríamos evitar cálculos costosos a nivel computacional.

## Espacios en blanco

Los espacios en blanco son cualquier tabulación, salto de línea o simplemente separaciones entre palabras claves, operadores o bloques de código. Si bien no aportan a la funcionalidad real del programa, los espacios en blanco son esenciales para que los programas o clases sean más legibles. Por lo que son un factor muy importante a la hora de reorganizar el código.

Así como en un texto literario el escritor utiliza signos de puntuación para que el lector comprenda el flujo del texto, los desarrolladores deben utilizar los espacios en blanco para permitir que el código respire. Es posible eliminar el desorden visual simplemente separando funcionalidades o acciones similares dentro de una función, o agregando espacios entre operadores. Consideremos el siguiente fragmento de código:

```typescript
interface Information {
    userId:number;
    message:string;
    codification:"hex"|"utf8";
}
function hexToString(toConvert:string) {
    return Buffer.from(toConvert,"hex").toString('utf8');
}
async function getUserById(id:number) {
    const user=db.select().from(db.users).where(eq(db.users.id,id));
    return user.name;
}
async function parseUserInformation(info:Information) {
    const userName=await getUserById(info.userId);
    let message=info.message;
    if (info.codification==="hex") {
        message=hexToString(info.message);
    }
    return `User ${userName} sent the message: ${message}`;
}
```

En este ejemplo, la falta de espacios en blanco hace que el código sea difícil de leer. No hay líneas en blanco entre funciones ni espacios entre operadores, lo que dificulta identificar las distintas secciones del código. Si este estilo desordenado se extiende a un archivo completo, el código se vuelve inmanejable.

:::tip[Pro Tip]
Utilizar espacios en blanco entre las diferentes partes del código.
:::

Veamos ahora la versión corregida:

```typescript
interface Information {
    userId: number;
    message: string;
    codification: "hex" | "utf8";
}

function hexToString(toConvert: string) {
    return Buffer.from(toConvert, "hex").toString('utf8');
}

async function getUserById(id: number) {
    const user = db.select()
        .from(db.users)
        .where(
            eq(db.users.id, id)
        );

    return user.name;
}

async function parseUserInformation(info: Information) {
    const userName = await getUserById(info.userId);
    let message = info.message;

    if (info.codification === "hex") {
        message = hexToString(info.message);
    }

    return `User ${userName} sent the message: ${message}`;
}
```

Este código es más legible, respira y permite que el desarrollador que lo lee pueda diferenciar más fácilmente cada una de las partes.

### ¿Cuándo incluir lineas en blanco?

Si observamos el ejemplo anterior como parte de un archivo más grande, podemos notar que existen diferentes *momentos* en el código:

  * **Definición de interfaces**: `Information`
  * **Funciones auxiliares**: `hexToString` y `getUserById`
  * **Función principal**: `parseUserInformation`

Dentro de esta función principal, también existen distintos *momentos*:

  * **Inicialización de variables**
  * **Controladores de flujo**: `if`
  * **Retorno del resultado**

Todos estos *momentos* son las partes de nuestro código, saber diferenciarlas es fundamental para hacer uso del espaciado entre ellas y mejorar la comprensión del código.

#### Reglas básicas para el uso de espacios en blanco

1.  **Separar funciones, clases, interfaces o tipos**
      * Esto facilita la identificación rápida de los principales componentes del código.
2.  **Agrupar lógicamente los bloques de código dentro de las funciones**
      * Separar secciones dentro de una función con lineas en blanco para distinguir:
          * Definiciones de variables
          * Llamadas a funciones
          * Bloques de control de flujo (`if`, `while` , `for` , ...)
          * Retorno del resultado
3.  **Agregar espacios alrededor de operadores y condiciones**
      * Agregar espacios entre operadores binarios o condiciones complejas dentro de estructuras de control ayuda tanto a quién escribe como a quién lee el código. Esto facilita distinguir los elementos y comprender la precedencia de las operaciones.
      * No es lo mismo leer `a + b` que `a+b`, y esta diferencia se vuelve aun más evidente a medida que las expresiones se vuelven más complejas o se añaden paréntesis. Veamos un ejemplo:


En una condición muy compleja, la falta de espacios dificulta
la comprensión de la precedencia de operadores

```typescript
while((isEven||(isOdd&&n%5!==0)&&errorStr===null)){
    // code ...
}
```

Al agregar espacios, la condición se vuelve un poco más clara

```typescript
while ((isEven || ( isOdd && n % 5 !== 0)) && errorStr === null) {
    // code ...
}
```

Aún así, esta condición no deja de ser imperfecta, es complicado leer y comprender que se esta verificando. Revisar y repensar este código debería ser una primera aproximación de cualquier desarrollador.

#### Uso de herramientas de formateo

Es posible automatizar el manejo de los espacios en blanco mediante *herramientas de formateo de código*, como [**Prettier**](https://prettier.io/) en JavaScript o [**Black**](https://black.readthedocs.io/en/stable/) en Python. Estas herramientas aplican reglas para que el código se mantenga con un estilo uniforme. Estas reglas pueden ser adaptadas al estilo que prefiera el desarrollador o requiera el proyecto mediante un archivo de configuración.

Algunos editores de código permiten configurar estas reglas de modo que se ejecuten automáticamente cada vez que se guarda un archivo. Lo que garantiza que todo el código del proyecto mantenga un estilo consistente y sea fácil de leer.

### Alineación vertical

Un último tipo de espaciado importante es la **alineación vertical** del código mediante tabulaciones o espacios. En esta estrategia, líneas contiguas son organizadas de modo que queden visualmente alineadas, lo que facilita la comprensión del código.

Comúnmente, utilizamos esta técnica en torno al símbolo de igualdad `=`, o al estructurar los elementos de un arreglo de manera que mejore la legibilidad. Aunque no es estrictamente necesario, la alineación vertical añade orden y claridad en fragmentos repetitivos, lo que ayuda a detectar errores de escritura u otros problemas en el código. Sin embargo, esta práctica puede entrar en conflicto con ciertas herramientas de formateo automático, que no siempre preservan la alineación y fuerzan un estilo diferente.

Consideremos el siguiente ejemplo:

```typescript
function configureEndpoints() {
    const userEp          = getEndpointUrl("user",    "v1", true);
    const paymentEndpoint = getEndpointUrl("payment", "v1", false);
    const orderEndpoint   = getEndpoitUrl("order",    "v1", true);
    // ...
}
```

Al alinear las asignaciones en torno al `=`, se facilita la detección de errores. En este caso, podemos notar rápidamente que en la tercera línea hay un error tipográfico: `getEndpoitUrl` en lugar de `getEndpointUrl`.

## Resumiendo lineamientos

Para mejorar la legibilidad de nuestras funciones debemos tener muy en cuenta los siguientes aspectos:

  * El cuerpo de las funciones debe mantenerse corto, 10 sentencias sería ideal. Funciones largas suelen realizar muchas acciones y esto no es deseable.
  * Es importante que las líneas de código no produzcan desplazamiento horizontal, ya que esto sólo entorpece el desarrollo y la lectura. Podemos hacer uso de diversas opciones para evitar esto:
      * Dividir expresiones en múltiples líneas
      * Utilizar variables intermedias
      * Reestructurar funciones con muchos parámetros
      * Reestructurar diccionarios u objetos
  * La indentación excesiva es un problema, dificulta seguir el flujo del código. Nuevamente existen diferentes soluciones:
      * Abstraer niveles de indentación en nuevas funciones
      * Retornar valores de manera temprana
      * Hacer uso de `continue` en los ciclos
  * Saber aprovechar los espacios en blanco para que el código respire. Cuando añadimos espacios entre bloques lógicamente similares, logramos que los lectores diferencien *momentos* en el código. Con esto es más simple seguir la idea principal.
