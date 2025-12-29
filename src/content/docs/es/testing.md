
---
title: Testing
description: Testing
---

## Haciendo pruebas sobre nuestro código

Cuando escribimos código, una parte importante del trabajo es asegurarnos de que funcione tal como esperamos. Una forma completa de abordar este problema es a través de la **verificación de programas**, la cual busca comprobar matemáticamente la corrección de un programa con respecto a su especificación. Aunque existen herramientas diseñadas para esto, en este capítulo tomaremos un enfoque más accesible y práctico: **realizar pruebas sobre nuestro código**.

La diferencia entre verificar y probar radica en que la verificación es un enfoque mucho más formal, mientras que las **pruebas** buscan confirmar con algún grado de confianza que el código se comporte como esperaríamos. Es fundamental dedicar parte del tiempo de desarrollo a crear estas pruebas, llamadas tests.

Un **test** es un fragmento de código que ejecuta de forma automática una función, módulo o flujo del sistema para comprobar que el resultado sea el esperado. Estas comprobaciones varían desde un simple cálculo matemático hasta simular el comportamiento de un usuario en una aplicación completa. Al proceso de escribir y ejecutar estas pruebas lo llamamos **testing**.

Es importante comprender que el testing no garantiza que el programa esté libre de errores. Que un conjunto de pruebas pase exitosamente solo asegura que en esos casos específicos el sistema funciona como se esperaba, pero siempre pueden existir situaciones no contempladas.

### Beneficios del testing

Realizar pruebas permite detectar errores de forma temprana en entornos controlados, mejorando la calidad del código y reduciendo fallos en producción. Un enfoque común es el de **caja negra**, donde se diseñan tests basándose solo en la interfaz o especificación sin mirar la implementación interna. Escribir tests también es una oportunidad para repensar el código, notando a veces funciones extensas o nombres poco claros.

En lenguajes interpretados como Python o JavaScript, el testing ayuda a identificar errores de sintaxis o tipado que solo aparecen en tiempo de ejecución. Además de estos beneficios, el testing aporta:

* **Facilitar los cambios en el código**: un conjunto de pruebas confiables permite modificar el sistema con tranquilidad, ya que los tests notifican si algo se rompe.
* **Documentar el comportamiento esperado**: los tests sirven como documentación no oficial que ayuda a los desarrolladores a entender partes del sistema.
* **Aumentar la confianza**: si los tests son exitosos, la probabilidad de errores disminuye, aunque no se debe tener fe ciega en ellos.

### *Testing Bonito*

El código de testing debe seguir las buenas prácticas de programación y no ser pensado como algo externo al sistema.

> El código de *testing* debe seguir las buenas prácticas de programación.

Los tests deben tener nombres descriptivos que expresen claramente qué se está probando, como `test_product_endpoint_raises_error_on_bad_request`. Otros lineamientos incluyen:

* Los tests deben enfocarse en un único comportamiento y tener una longitud adecuada.
* La indentación debe mantenerse baja.
* Aprovechar los espacios en blanco para separar bloques lógicos y mejorar la legibilidad.
* Usar comentarios únicamente cuando la intención del código no sea suficiente.

## La pirámide del testing

La **pirámide del testing** es una guía para organizar las pruebas, proponiendo una estructura para clasificarlas y decidir cuántas escribir en cada nivel:

* En la base están los **tests unitarios**, que verifican funciones pequeñas.
* En el medio están los **tests de integración**, que prueban la interacción entre módulos.
* En la cima están los tests **end-to-end** (E2E), que simulan el comportamiento completo del sistema.

Deberíamos tener muchos tests unitarios por ser rápidos y aislados, y pocos tests E2E por ser costosos y difíciles de depurar. Todos comparten el patrón **Arrange, Act, Assert** para organizar su lógica:

1. **Arrange**: se prepara el escenario y se configuran los datos necesarios.
2. **Act**: se ejecuta la acción que se quiere probar llamando a la función.
3. **Assert**: se verifica el valor obtenido contra el esperado.

## Tipos de pruebas

Utilizaremos la aplicación *backend* de productos para ejemplificar las pruebas, cuyo código se encuentra en la carpeta `/testing` del repositorio.

* **pytest**: framework para escribir y ejecutar tests.
* **unittest**: módulo de la biblioteca estándar de Python.

### Tests unitarios

Verifican unidades pequeñas de código de forma aislada. Para no depender de servicios reales, se utilizan **mocks** y **stubs** (dobles de tests). En Python, `unittest.mock` provee `MagicMock` y `patch` para simular estos comportamientos.

#### Ejemplo en nuestro proyecto

Presentamos mocks que simulan una API de cotización del dólar:

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

Implementación del test usando los mocks:

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

#### Ejecución y salida

Comando de ejecución:
`poetry run pytest testing/unit/`

Salida exitosa:

```bash
========================== test session starts ==========================
platform linux -- Python 3.12.3, pytest-8.3.5, pluggy-1.6.0
collected 13 items

testing/unit/test_bluelytics_connector.py ........ [ 61%]
testing/unit/test_product_with_dollar_blue.py ..... [100%]

========================== 13 passed in 0.19s ===========================

```

Si falla, se detallan los errores indicando el test fallido, la línea del error, el valor obtenido contra el esperado y un resumen final.

### Tests de integración

Verifican cómo interactúan diferentes componentes, como la relación entre la definición de datos (Capa 0) y el acceso a ellos (Capa 1). Se suelen usar **fixtures** para preparar el entorno.

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

Uso del fixture en los tests:

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

### Tests end-to-end (E2E)

Validan el sistema completo en un entorno similar al de producción. Requieren que la aplicación esté en ejecución.

Fixture para limpiar y poblar la base de datos persistente:

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

Ejemplo de test E2E realizando una llamada HTTP real:

```python
def test_update_products_price_returns_422_if_the_factor_is_invalid():
    response = requests.put("http://localhost:8000/products?factor=NOTANUMBER")
    assert response.status_code == 422

```

### Errores en nuestra aplicación

Durante el desarrollo detectamos que el sistema aceptaba precios negativos, lo cual se evidenció con el siguiente test que falló:

```python
def test_create_product_with_negative_price_raises_error(session):
    repo = SQLAlchemyProductRepository(session)

    data = CreateProductData(name="Invalid Product", price=-100.0)
    with pytest.raises(ValueError):
        repo.create(data)

```

Mantuvimos este error para reforzar que un conjunto de pruebas exhaustivo permite anticiparse a escenarios inesperados.

## Unificando código y testing

Podemos pensar el testing como algo complementario al momento de escribir código mediante estrategias como *Test-Driven Development* (TDD). En TDD, se escribe primero la prueba, luego el código mínimo para que pase y finalmente se refactoriza. Esto asegura que solo se escriba el código estrictamente necesario, aunque requiere una visión clara del sistema desde el inicio.

También podemos usar herramientas de **debugging** (depuración) para inspeccionar el código en ejecución, como `ipdb` en Python o el depurador de Node.js. Esto permite:

* Examinar y modificar variables.
* Recorrer el código instrucción por instrucción.
* Inspeccionar la pila de llamadas (*stack*).

## La importancia del buen testing

Escribir buenas pruebas requiere práctica para evitar tests demasiado simples o demasiado estrictos que se rompen con cambios mínimos. Las pruebas deben actuar como un mecanismo de seguridad efectivo para detectar errores sutiles y casos borde. El testing mal aplicado puede ralentizar el desarrollo y dar una falsa sensación de seguridad, por lo que métricas como la cobertura no siempre reflejan calidad o confiabilidad.
