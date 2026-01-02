
---
title: Testing
description: Testing
---

Cuando escribimos código, una parte importante del trabajo es asegurarnos de que funcione tal como esperamos. Una
forma completa de abordar este problema es a través de la **verificación de programas**. La
verificación de programas busca *comprobar matemáticamente la corrección de un programa con respecto a su
especificación*. Existen herramientas diseñadas específicamente para esto, pero no es el
enfoque que tomaremos en este capítulo. Lo que buscamos, es algo mucho más accesible y
práctico: **realizar pruebas sobre nuestro código**.

La diferencia entre verificar y probar puede ser sutil en un comienzo, pero en la práctica están distanciados
. Como ya dijimos, la verificación corresponde a un enfoque mucho más formal. Mientras que las **pruebas** buscan *confirmar con algún grado de confianza que el código se
comporte como esperaríamos*. Es importante que durante la etapa de desarrollo de un sistema
de *software* dediquemos parte del tiempo a crear estas pruebas a las que llamamos tests.

Un **test** no es más que un fragmento de código que ejecuta de forma automática una función, módulo o flujo
completo de nuestro sistema con el objetivo de comprobar que el resultado sea el esperado.
Estas comprobaciones pueden ir desde algo tan simple como comprobar que un cálculo matemático devuelve el valor
correcto, hasta situaciones más complejas como simular el comportamiento de un usuario en una aplicación completa
. Al proceso de escribir y ejecutar estas pruebas lo llamamos **testing**.

Es importante comprender que el testing no nos garantiza que el programa esté completamente libre de errores. Que un conjunto de pruebas pase exitosamente sólo garantiza que en esos casos específicos el
sistema funciona como se esperaba. Pero siempre puede existir la posibilidad de casos no
contemplados, como los que ocurren con ciertas combinaciones de datos o condiciones específicas que no fueron
cubiertas. Es fundamental que, como desarrolladores, contemplemos esta posibilidad e
intentemos cubrir la mayor cantidad de casos posibles, pensando que esos casos excepcionales siempre pueden ocurrir
.

### Beneficios del testing

Realizar pruebas nos permite detectar errores de forma temprana y en entornos controlados.
Gracias a esto, no solo reducimos la cantidad de fallos en producción, sino que además mejoramos la calidad del
código. En muchos casos, es posible diseñar y escribir los tests sin mirar directamente la
implementación en el cuerpo del código, simplemente utilizamos su interfaz o especificación, este enfoque es
conocido como *caja negra* y es muy utilizado por equipos dedicados exclusivamente al testing. Esta etapa también es una oportunidad para revisar el código ya escrito, y muchas veces nos lleva
a notar funciones demasiado extensas, nombres poco claros o flujos muy complejos. Cuando
escribimos tests, también repensamos el código.

En lenguajes interpretados, como Python o JavaScript, el testing cumple una función adicional: nos ayuda a
identificar errores de sintaxis o de tipado que, de otro modo, podrían permanecer ocultos hasta el momento de su
ejecución en producción. Esto se debe a que, a diferencia de los lenguajes compilados (que
nos permiten detectar errores antes de ejecutar el código), en los lenguajes interpretados el código sólo es
analizado cuando está corriendo. Por eso, los tests, incluso los más simples, fuerzan la
interpretación del código y permiten que se lancen los errores adecuados en caso de que estos existan.

En definitiva, además de ayudar a escribir mejor y detectar errores rápidamente, el testing aporta beneficios
concretos:

* **Facilitar los cambios en el código**. Cuando tenemos un conjunto de pruebas confiables, podemos modificar el
sistema con tranquilidad. Si alguna parte del código se rompe, los tests deberían hacernos
notar estos errores.
* **Documentar el comportamiento esperado**. Los tests son una forma de documentar el código de manera no oficial, al
menos para un conjunto finito de casos. Los desarrolladores deberían ser capaces de entender
partes del sistema observando simplemente los tests.
* **Aumentar la confianza**. Si los tests implementados son exitosos, la confianza en el sistema crece y la
probabilidad de que ocurran errores disminuye. De todas maneras, como explicamos previamente,
no hay que tener fe ciega sobre las pruebas, siempre es posible que existan caminos no cubiertos o situaciones no
contempladas.

Además, el testing nos ofrece una retroalimentación inmediata sobre lo que estamos construyendo. Saber que una parte del sistema funciona como se espera, y tener esa confirmación instantánea
genera cierta satisfacción en el desarrollador, lo que refuerza su motivación en continuar el desarrollo.

### *Testing Bonito*

El código de *testing* no debe pensarse como algo externo al sistema, ambos trabajan juntos para construir un
*software* confiable. Por eso, todos los lineamientos y buenas prácticas nombrados en
capítulos anteriores deben ser respetados durante esta etapa.

:::tip[Pro Tip]
**Lineamiento:** El código de *testing* debe seguir las buenas prácticas de programación.
:::

Los tests se representan como funciones, y por ello deben tener nombres descriptivos que haga explícito lo que se
está probando. Por ejemplo: `test_product_endpoint_raises_error_on_bad_request`, si bien este
nombre podría parecer excesivamente largo, en este contexto no hay problema, lo importante es que sean precisos.

Otros lineamientos a tener en cuenta:

* Los tests deben enfocarse en un único comportamiento y tener una longitud adecuada. Muchas
sentencias en una prueba es un síntoma de estar realizando múltiples acciones.
* La indentación debe mantenerse baja.
* Aprovechar los espacios en blanco para mejorar la legibilidad y separar bloques lógicos.
* Los comentarios deben utilizarse únicamente cuando la intención del código no sea suficiente.

Cuando el código de un sistema es *feo*, también lo serán sus pruebas. Y cuando las pruebas
son *feas*, se pierde uno de sus propósitos fundamentales: aumentar la confiabilidad del sistema. Los lineamientos y buenas prácticas nos ayudan a que las pruebas, al igual que el resto del
código, sean claras, útiles y sostenibles.


## La pirámide del testing

Cuando queremos empezar a realizar las pruebas sobre nuestro código, es útil contar con una guía que nos ayude a
organizarnos, del mismo modo que lo hicimos al estructurar nuestro proyecto mediante capas en el capítulo anterior
. La **pirámide del testing** es una de las referencias que utilizaremos para este propósito
. Esta idea propone una estructura clara para clasificar las pruebas y decidir cuántas
escribir en cada nivel.

La pirámide se compone de tres capas:

* En la base se encuentran los **tests unitarios**, que verifican funciones pequeñas del código.
* En el medio están los **tests de integración**, que prueban cómo interactúan distintos módulos o componentes del
sistema entre sí.
* Finalmente, en la cima están los tests **end-to-end** (E2E), que simulan el comportamiento completo del sistema.

La clave de esta pirámide está en la proporción: deberíamos tener muchos tests unitarios, menos tests de integración
y pocos tests E2E. Esto se debe a que los tests unitarios son más rápidos, aislados y fáciles
de mantener, mientras que los test end-to-end son costosos (en tiempo y a veces en recursos), frágiles y más
difíciles de depurar.

Si bien en la práctica, estas proporciones no siempre se respetan al pie de la letra, la pirámide sigue
representando una muy buena referencia para los desarrolladores. Nos recuerda que existen
distintos niveles de granularidad en las pruebas y que todos ellos son igual de importantes para mantener un código
libre de errores.

Cada tipo de test posee sus propias estrategias de implementación, herramientas y objetivos que veremos a lo largo
de este capítulo. Sin embargo, todos comparten una estructura común al momento de
implementarlos: el patrón *Arrange, Act Assert*. Este patrón funciona como una mnemotecnia,
que nos ayuda a organizar la lógica del test:

1. En primer lugar, se prepara el escenario (*Arrange*), normalmente mediante funciones que se ejecutan antes de las
pruebas y configuran los datos y el entorno necesario para simular una situación real.
2. Luego, se ejecuta la acción que queremos probar (*Act*), se llama a la función con parámetros específicos. Este es el cuerpo de nuestra prueba.
3. Finalmente, se verifica el valor esperado (*Assert*). Por lo general, esta es la última línea
de la prueba, donde comparamos el resultado obtenido con el valor esperado. Si coinciden, la
prueba finaliza correctamente indicando éxito, si no, el sistema indica un fallo enseñando el valor que no
cumplió con la condición.

---

## Tipos de pruebas

Al igual que en el capítulo anterior, estaremos utilizando un código de ejemplo para guiar la lectura. En este caso realizaremos pruebas sobre la aplicación *backend* de productos y precios del
capítulo anterior.

Todo el código correspondiente lo encontramos en la carpeta `/testing` en la raíz del proyecto. Además contamos con un archivo `Makefile` para ejecutar más rápidamente las pruebas. En el archivo `README.md`, nuevamente en la raíz del proyecto encontramos las instrucciones para
ejecutar las pruebas desde el archivo `Makefile`.

Para esta sección incluimos dos nuevas tecnologías:

* [pytest](https://docs.pytest.org/en/stable/): *framework* que nos ayuda a escribir y ejecutar tests.
* [unittest](https://docs.python.org/3/library/unittest.html): módulo de la biblioteca estándar de Python.

Si bien ambas tecnologías son útiles para realizar testing, utilizamos `pytest` como base para nuestras pruebas, y
`unittest` como soporte con algunas herramientas que presentaremos más adelante.

A continuación revisaremos los tres tipos de tests que fueron nombrados con anterioridad. En
cada uno de ellos explicaremos su alcance, algunas herramientas que se utilizan, revisaremos una implementación real
y enseñaremos su ejecución y lectura de los resultados.

### Tests unitarios

Los tests unitarios corresponden al primer nivel de la pirámide del *testing* y deberían abundar en cualquier
proyecto de *software*. Su objetivo es verificar el comportamiento de unidades pequeñas del
código de forma aislada, generalmente son funciones o métodos de clases. Es importante que
estas pruebas sean rápidas y simples, ya que se ejecutan en gran cantidad. Además, no deben
depender de bases de datos o servicios de terceros reales.

Ahora bien, esto no significa que no podemos probar funciones que interactúan con servicios externos o bases de
datos. Lo que hacemos en estos casos es reemplazar temporalmente esas dependencias por
versiones simuladas controladas. Para ello existen los *mocks* y los *stubs*, conocidos como
*dobles de tests*. Ambos permiten reemplazar funciones reales por versiones falsas, cuyo
comportamiento es conocido. La diferencia principal, es que un *mock*, además de simular
comportamientos, pueden registrar mucha más información: cuantas veces se invocaron las funciones, con que
argumentos, entre otros.

Si bien es posible crear los dobles a mano, la mayoría de las librerías modernas de testing nos facilitan estas
tareas. En Python, el módulo `unittest.mock` ofrece utilidades como `MagicMock`, que permite
crear objetos simulados configurando qué deben devolver o cómo deben comportarse. Luego, la
función `patch` durante el test, nos permite reemplazar temporalmente los objetos del sistema por estos mocks.

#### Ejemplo en nuestro proyecto

En nuestro proyecto tenemos dos instancias de tests unitarios, la primera para la clase
`ProductWithDollarBluePrices` y la segunda para `BluelyticsConnector`, ambos dentro de la carpeta `/unit`. En este ejemplo, estudiaremos la segunda implementación.

Además, dentro de la carpeta `/mocks` encontraremos múltiples dobles que simulan esta clase de nuestro sistema
. A continuación se presentan dos funciones que generan *mocks* para simular el
comportamiento de una API que devuelve la cotización del dólar. Uno de ellos representa un
escenario exitoso y el otro una respuesta con error.

```python
def get_happy_mock_response(value_avg=1):
  mock_response = MagicMock()
  mock_response.raise_for_status.return_value = None
  mock_response.json.return_value = {
    "oficial": {"value_avg": 1, "value_sell": 1, "value_buy": 1},
    "blue": {"value_avg": value_avg, "value_sell": 1, "value_buy": 1},
    "oficial_euro": {"value_avg": 1, "value_sell": 1, "value_buy": 1},
    "blue_euro": {"value_avg": 1, "value_sell": 1, "value_buy": 1},
    "last_update": datetime.now(),
  }

  return mock_response

def get_bad_status_mock_response():
  mock_response = MagicMock()
  mock_response.raise_for_status.side_effect = HTTPError(
    "Bad status", response=mock_response
  )

  return mock_response

```

Ambos *mocks* son instancias de `MagicMock` lo que nos permite configurar el comportamiento. En el caso de `get_happy_mock_response`, se define explícitamente que el método `raise_for_status`
no haga nada (no produce ningún tipo de error), y, por otro lado que el método `json` devuelva un diccionario con
los datos esperados por el sistema.

Si observamos `get_bad_status_mock_response`, veremos un escenario fallido. Al llamar a
`raise_for_status`, se lanza una excepción `HTTPError`. Esto nos permite probar como
reaccionaría el sistema ante situaciones inesperadas, sin depender de que el servicio externo falle realmente en ese
momento.

Para complementar, hay que realizar efectivamente el test. Es por ello que definimos las
siguientes funciones que hacen uso de los *mocks*:

```python
def test_get_prices_return_avg_value_on_success():
  mock_response = get_happy_mock_response()
  with patch("requests.get", return_value=mock_response):
    connector = BluelyticsConnector()
    price = connector.get_price()
    assert price == 1

def test_get_prices_raises_http_error_on_bad_status():
  mock_response = get_bad_status_mock_response()
  with patch("requests.get", return_value=mock_response):
    connector = BluelyticsConnector()
    with pytest.raises(HTTPError):
      connector.get_price()

```

En el primer test, utilizamos `get_happy_mock_response()` para simular una respuesta válida de la API. Luego, con la función `patch`, reemplazamos temporalmente `requests.get` por nuestra versión
modificada. De este modo, cuando el método `get_price` de `BluelyticsConnector` intente
hacer una llamada HTTP, en realidad estará recibiendo la respuesta simulada. Finalmente,
usamos `assert` para verificar que el valor devuelto sea el esperado.

En el segundo test, usamos el *mock* `get_bad_status_mock_response()` para simular una respuesta fallida que lanza
una excepción. Nuevamente empleamos `patch` para reemplazar a `requests.get` dentro del
método `get_prices`. En este caso, la línea `with pytest.raises(HTTPError)` cumple el rol
del `assert`, asegurando que efectivamente se lance una excepción `HTTPError`.

Es importante destacar que los tests unitarios no sólo deben validar los valores de retorno correctos, sino también
cubrir otros aspectos como el comportamiento de una función: excepciones, efectos secundarios, e incluso detalles
como la cantidad de veces que se llamó a una función interna.

#### Ejecución y salida

Como ya mencionamos anteriormente, gracias al archivo `Makefile` podemos ejecutar las pruebas rápidamente. En este caso, al correr el comando `make run_unit_tests`, se ejecutarán todas las pruebas ubicadas
dentro de la carpeta `/unit`. Este comando, internamente, ejecuta:

```bash
poetry run pytest testing/unit/

```

A continuación se muestra un ejemplo de su salida en la terminal:

```bash
poetry run pytest testing/unit/
========================== test session starts ==========================
platform linux -- Python 3.12.3, pytest-8.3.5, pluggy-1.6.0
rootdir: /codigo-bonito-api-rest
configfile: pyproject.toml
plugins: cov-6.1.1, anyio-4.9.0
collected 13 items

testing/unit/test_bluelytics_connector.py ........ [ 61%]
testing/unit/test_product_with_dollar_blue.py ..... [100%]

========================== 13 passed in 0.19s ===========================

```

En esta salida se destacan varios elementos. Primero, la cabecera, que indica información
sobre la plataforma de ejecución, la versión de Python, los *plugins* activos y la cantidad de pruebas encontradas
(`collected 13 items`). Luego, se listan los archivos de test junto con una serie de puntos
(`.`) que representan tests que se ejecutaron con éxito y al final de la línea, un porcentaje que indica cuántas
pruebas representa cada archivo sobre el total. Finalmente, se resume la ejecución con el
total de pruebas pasadas y el tiempo tomó completarlas.

En el caso de que alguna prueba falle, el resumen cambia para incluir detalles del error. Por ejemplo:

```bash
testing/unit/test_bluelytics_connector.py F.......             [ 61%]
testing/unit/test_product_with_dollar_blue.py .....            [100%]

============================== FAILURES ===============================
_ test_get_prices_return_avg_value_on_success _

>           assert price == 2
E           assert 1.0 == 2

testing/unit/test_bluelytics_connector.py:20: AssertionError
======================== short test summary info ========================
FAILED testing/unit/test_bluelytics_connector.py::
    test_get_prices_return_avg_value_on_success - assert 1.0 == 2
======================== 1 failed, 12 passed in 0.22s ========================

```

Aquí podemos observar que una prueba falló (`F.......`), y el sistema muestra el detalle del error:

* En primer lugar, se nos informa cuál fue el caso de test que falló, `test_get_prices_return_avg_value_on_success`
.
* Luego, la línea que produjo el error `assert price == 2`, y a continuación, el valor obtenido contra el esperado,
`assert 1.0 == 2`. Finalmente, se menciona el archivo y la línea específica del fallo, junto
a la excepción ocurrida, `AssertError`.
* Por último se muestra un resumen de las pruebas que fallaron junto con las exitosas, y el tiempo empleado.

### Tests de integración

El segundo nivel de la pirámide corresponde a los tests de integración. A diferencia del
nivel anterior, donde se validaban simplemente piezas de código aisladas, los tests de integración se enfocan en
verificar cómo se relacionan e interactúan diferentes componentes del sistema. Su objetivo
es asegurarse de que las partes del sistema colaboran correctamente respetando el flujo de datos.

Una herramienta comúnmente utilizada en este tipos de pruebas son los *fixtures*, proporcionados en Python por
librerías como `pytest`. Los *fixtures* permiten definir un entorno de pruebas que se
prepara antes (y opcionalmente después) de ejecutar cada prueba. Esto los hace ideales para
inicializar datos, establecer conexiones o limpiar recursos, asegurando que cada prueba se ejecute en un contexto
controlado y repetible.

#### Ejemplo en nuestro proyecto

En este caso, en nuestro proyecto realizamos testing de integración para comprobar cómo se relacionan componentes de
las capas 0 y 1, es decir, la definición de datos y el acceso a ellos mediante repositorios. Como se explicó en el capítulo anterior, contamos con dos implementaciones de repositorios (una
basada en SQLAlchemy y otra en PonyORM), ambas respetando una misma interfaz.

Las pruebas de nuestro proyecto se encargan de verificar que ambas implementaciones satisfacen correctamente la
interfaz. En este ejemplo nos enfocaremos en las pruebas del repositorio de PonyORM, que se
encuentran en el archivo `test_ponyorm_product_repository.py` dentro de la carpeta `/integration`.

En la siguiente prueba podemos ver la implementación de un *fixture* para estos casos de test:

```python
@pytest.fixture()
def db_with_products():
  db.bind(provider="sqlite", filename=":memory:", create_db=True)
  db.generate_mapping(create_tables=True)

  with db_session:
    Product(name="Pretty shirt", price=7500.0)
    Product(name="Cool mug", price=4000.0)
    Product(name="TV 4K", price=1500000.0)
    commit()

  yield

  db.provider = None
  db.schema = None
  db.disconnect()

```

Este código representa un *fixture* que configura una base de datos en memoria utilizando SQLite. El decorador `@pytest.fixture()` sobre la definición de la función `db_with_products` indica a
`pytest` que esta función puede ejecutarse antes de cada prueba. Dentro del cuerpo del
*fixture*, se crea una base de datos limpia, se generan las tablas correspondientes y se insertan tres productos de
ejemplo.

El uso de la palabra clave `yield` permite suspender temporalmente la ejecución para correr un test. Una vez finalizado el mismo, se continúa con la desconexión y la limpieza de la base de datos
. Este patrón nos asegura que cada test se ejecute sobre una base de datos limpia, sin verse
afectado por efectos secundarios de la ejecución de pruebas anteriores.

Veamos ahora cómo se utiliza este *fixture* en casos concretos de testing:

```python
def test_get_by_id_returns_product(db_with_products):
  with db_session:
    repo = PonyProductRepository()

    product = repo.get_by_id(1)
    assert product.name == Product.get(id=1).name

def test_create_product(db_with_products):
  with db_session:
    repo = PonyProductRepository()
    product_count = count(p for p in Product)

    repo.create(CreateProductData(name="Candy bar", price=100.0))
    assert count(p for p in Product) == product_count + 1

```

En estas dos pruebas, el *fixture* `db_with_products` se incluye como parámetro en la definición de cada función
. Esto le indica a `pytest` que debe ejecutar el *fixture* antes de correr la prueba. Así, en el caso de tener múltiples *fixtures* en un mismo archivo, podríamos indicar precisamente
cual utilizar en cada caso.

La primer prueba verifica que, al buscar el producto con id 1 (insertado previamente por el *fixture*), el
repositorio devuelve un objeto válido. Para valida el resultado, se compara el nombre del
producto del repositorio con el obtenido directamente desde la base de datos. En la segunda
prueba, se comprueba que la creación de un nuevo producto funcione correctamente. Para ello,
se cuenta la cantidad de productos existentes antes de la operación, luego se crea un nuevo producto mediante el
repositorio, y finalmente se verifica que la cantidad de productos haya aumentado en uno.

#### Ejecución y salida

En este caso, la ejecución de las pruebas se realiza con el comando `make run_integrarion_tests` que internamente
realiza `poetry run pytest testing/integration`. Nuevamente, en la salida observamos los
archivos y las pruebas ejecutadas, ya sean exitosas o fallidas.

```bash
poetry run pytest testing/integration/
========================== test session starts ==========================
platform linux -- Python 3.12.3, pytest-8.3.5, pluggy-1.6.0
rootdir: /codigo-bonito-api-rest
configfile: pyproject.toml
plugins: cov-6.1.1, anyio-4.9.0
collected 18 items

testing/integration/test_ponyorm_product_repository.py ......... [ 50%]
testing/integration/test_sqlalchemy_product_repository.py ......... [100%]

========================== 18 passed in 0.38s ==========================

```

### Tests end-to-end (E2E)

Finalmente, en la cima de la pirámide, encontramos las pruebas *end-to-end*. Este tipo de
pruebas busca validar el funcionamiento de todo el sistema, desde los componentes pertenecientes a las capas
inferiores hasta las interfaces accesibles por los usuarios. En este nivel, es fundamental
que el entorno de pruebas se asemeja lo máximo posible al entorno de producción. Por
ejemplo, si bien en los niveles anteriores utilizamos una base de datos en memoria, eso no es aceptable en E2E, ya
que nuestro sistema real utiliza una base de datos persistente en archivo. El objetivo de
este nivel es responder a una pregunta clave: ¿el sistema completo se comporta correctamente de principio a fin?

#### Ejemplo en nuestro proyecto

Este nivel lo encontramos dentro de la carpeta `/e2e`, y en este caso contamos con un único archivo,
`test_endpoints`, que realizará las pruebas sobre los *endpoints* de nuestro *backend*.
Estas pruebas tienen una particularidad: como requieren que la aplicación esté en ejecución, es necesario preparar
el entorno antes de lanzarlas. Para eso, definimos un *script* en el archivo `Makefile`
. Este *script* establece variables de entorno para que el sistema utilice una base de datos
de prueba y el ORM SQLAlchemy, y luego se encarga de iniciar y detener automáticamente la aplicación antes y después
de correr las pruebas.

Observemos el *fixture* que utilizan estos tests:

```python
@pytest.fixture(autouse=True)
def clear_db():
  database_path = os.getenv("DATABASE_PATH", "./test_db.sqlite")
  database_url = f"sqlite:///{database_path}"

  engine = create_engine(database_url)
  Session = sessionmaker(bind=engine)
  session = Session()

  try:
    session.query(Product).delete()
    session.commit()

    products = [
      Product(name="Pretty shirt", price=7500.0),
      Product(name="Cool mug", price=4000.0),
      Product(name="TV 4K", price=1500000.0),
    ]
    session.add_all(products)
    session.commit()
  finally:
    session.close()

  yield

  session = Session()
  try:
    session.query(Product).delete()
    session.commit()
  finally:
    session.close()

```

Este *fixture* comparte muchas similitudes con el utilizado en la capa anterior, aunque con algunas diferencias
clave. Por un lado, aquí utilizamos SQLAlchemy en lugar de PonyORM, y por el otro, estamos
trabajando con una base de datos persistente, no en memoria, lo cual requiere que eliminemos los datos manualmente
antes y después de cada prueba. También es importante destacar el uso del parámetro
`autouse=True` en el decorador del *fixture*. Esto le indica a `pytest` que debe ejecutar
automáticamente la función antes de cada test, sin necesidad de pasarla como parámetro.

El único test que revisaremos en este nivel es el siguiente:

```python
def test_update_products_price_returns_422_if_the_factor_is_invalid():
  response = requests.put("http://localhost:8000/products?factor=NOTANUMBER")
  assert response.status_code == 422

```

Aquí podemos observar que se está realizando una llamada HTTP real a la aplicación mediante `requests.put`. En este caso, se llama al *endpoint* encargado de actualizar los precios de los productos, pero
con la particularidad de usar `NOTANUMBER` como factor multiplicativo. Ante esta situación,
la aplicación debería lanzar una excepción y responder con un código HTTP `422 Unprocessable Entity`, indicando un
error en el parámetro ingresado.

#### Ejecución y salida

Para el caso de las pruebas *end-to-end*, la ejecución es algo más compleja. Para correrlas,
utilizamos el comando `make run_e2e_tests`, que ejecuta una serie de pasos adicionales de forma secuencial:

```bash
DATABASE_PATH=./test_db.sqlite ORM=sqlalchemy \
poetry run uvicorn app.main:app > uvicorn.log 2>&1 & \
echo $! > uvicorn.pid; \
for i in $(seq 1 10); do curl -s http://localhost:8000; if [ $? -eq 0 ]; then break; fi; echo "Esperando que el backend inicie..."; sleep 1; done;  \
poetry run pytest testing/e2e/test_endpoints.py; \
TEST_EXIT_CODE=$?; \
kill `cat uvicorn.pid`; rm uvicorn.pid; \
unset DATABASE_PATH; unset ORM; \
exit $TEST_EXIT_CODE
Esperando que el backend inicie...
Esperando que el backend inicie...

```

No nos detendremos en explicar en detalle cada una de estas líneas, pero su propósito es el siguiente: arrancar el
*backend* en segundo plano, esperar a que esté disponible, ejecutar las pruebas y luego apagar el servidor. Este proceso asegura que el sistema esté corriendo al momento de realizar las pruebas, y al mismo
tiempo permite controlar el entorno con precisión mediante variables como la ruta de la base de datos y el ORM a
utilizar.

La salida generada por estas pruebas mantiene el mismo formato que vimos anteriormente: primero se imprime un
resumen del entorno de ejecución, y luego el resultado de los casos de prueba.

```bash
========================== test session starts ==========================
platform linux -- Python 3.12.3, pytest-8.3.5, pluggy-1.6.0
rootdir: /codigo-bonito-api-rest
configfile: pyproject.toml
plugins: cov-6.1.1, anyio-4.9.0
collected 13 items

testing/e2e/test_endpoints.py .............                       [100%]

========================== 13 passed in 2.19s ==========================

```

Observemos que en este caso, la ejecución tomó poco más de 2 segundos. Aunque esto sigue
siendo rápido, se nota una diferencia notable en comparación a las pruebas unitarias y de integración que apenas
sumaban un segundo entre las dos. Es por este motivo que debemos mantener una cantidad
razonable de pruebas *end-to-end* y evitar probar casos triviales en este nivel, ya que podrían ralentizar aún más el
proceso.

### Errores en nuestra aplicación

Durante el desarrollo de las pruebas para este capítulo, encontramos un error real en nuestra aplicación *backend*
. Al intentar crear un nuevo producto con un precio negativo, esperábamos que se arrojara un
error. Sin embargo el sistema aceptó el valor. Este comportamiento
quedó en evidencia a través del siguiente test, que en un sistema correcto debería haber pasado sin problemas:

```python
def test_create_product_with_negative_price_raises_error(session):
  repo = SQLAlchemyProductRepository(session)

  data = CreateProductData(name="Invalid Product", price=-100.0)
  with pytest.raises(ValueError):
    repo.create(data)

```

Podríamos haber corregido el repositorio agregando una validación sobre el precio del producto, pero decidimos
mantener el error y la prueba fallida para reforzar la importancia del testing. Este tipo
de errores son claves para construir un sistema confiable, a priori nunca conocemos a los usuarios de nuestra
aplicación, y en consecuencia, no sabemos como pueden llegar a hacer uso de ella. Un
conjunto de pruebas exhaustivas nos permite anticiparnos a estos escenarios inesperados y lograr una aplicación
robusta frente a errores.

---

## Unificando código y testing

Ahora cambiemos la mentalidad del testing: en lugar de realizarlo en una etapa posterior a la programación, lo
pensemos como algo complementario al momento de escribir el código. Una de las
estrategias más conocidas es *Test-Driven Development* (TDD).

En TDD, el desarrollador primero escribe una prueba para una función específica.
Luego implementa el código mínimo necesario para que esa prueba pase correctamente.
Este proceso se repite hasta que la funcionalidad quede completa, y finalmente se refactoriza el código si es
necesario. Siempre procurando que la prueba siga corriendo exitosamente. Las ventajas de este patrón son evidentes, todo el sistema queda probado desde el
inicio, y sólo se escribe el código estrictamente necesario, ni más ni menos.

Parecería todo ventajas, pero TDD tiene sus dificultades. El desarrollador
necesita una visión amplia y clara del sistema antes de construirlo, es decir que requiere conocer todo el sistema,
sus responsabilidades, flujos principales, secundarios y casos excepcionales. Esto
no siempre ocurre, especialmente en etapas tempranas del desarrollo. Así, forzar
un test previo antes de la etapa de programación del sistema, se convierte en un obstáculo más que en una guía.

Aun así, podemos realizar pruebas mientras escribimos el código sin utilizar TDD.
La mayoría de los lenguajes ofrecen herramientas externas de *debugging* (o depuración) que nos permiten inspeccionar
y experimentar con el código en tiempo de ejecución. En Python existe `ipdb`,
mientras que en JavaScript tenemos el depurador de `Node.js`, el cual suele estar integrado en editores como VS Code
. Esta herramienta permite detener la ejecución del programa en un punto
específico y realizar diversas acciones como:

* Examinar y modificar variables.
* Recorrer el código instrucción por instrucción.
* Inspeccionar la pila de llamadas (*stack*).
* Entre otras acciones útiles para entender el estado interno del sistema.

Consideramos que saber depurar código es muy importante, ya que nos ayuda a enfrentar errores difíciles de rastrear
o simplemente a observar el comportamiento de nuestro programa mientras lo desarrollamos. Sin embargo, profundizar en estas herramientas se escapa del alcance de este capítulo y
el trabajo.

---

## La importancia del buen testing

Escribir buenas pruebas no es una tarea trivial. Como cualquier otra habilidad en el
desarrollo, requiere de práctica y buen criterio para detectar problemas relevantes. Al
comienzo, es normal caer en pruebas demasiado simples que no verifican correctamente el comportamiento del sistema,
o en contraparte, pruebas demasiado estrictas, que se rompen ante el mínimo cambio. El
verdadero desafío es lograr escribir pruebas que actúen como un mecanismo de seguridad efectivo, es decir, que
detecten errores sutiles, pero que también logren probar los comportamientos importantes, los casos bordes e incluso
las situaciones inesperadas.

Un testing mal aplicado puede, de hecho, jugar en contra del sistema. Ralentizando el
desarrollo y generando una falsa sensación de seguridad. Es por eso que métricas como
cobertura en los tests no siempre aportan un valor real al testing. Podemos tener conjuntos
de tests que verifiquen cada una de las líneas y flujos en nuestro código, pero que sean pobres cuando hablamos de
calidad y confiabilidad.

En definitiva, el testing es una de las herramientas más poderosas del desarrollo. Y cuando
se tiene mucha práctica y atención a los lineamientos correctos, se convierte en una pieza clave para construir
sistemas con una buena base de código y a prueba de errores.