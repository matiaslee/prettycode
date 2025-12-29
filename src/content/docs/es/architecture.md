---
title: Organización de un proyecto de software
description: La organización de un proyecto de software es esencial para mantener un código limpio y fácil de entender. En este capítulo, exploraremos las mejores prácticas para organizar un proyecto de software, incluyendo la estructura de carpetas, la organización de archivos y la documentación.
---

Hasta el momento hemos hablado de los componentes esenciales del código: funciones y variables, su tipado y cómo la documentación mediante comentarios puede ayudar a aportar claridad. También estudiamos cómo crear una buena estructura interna en el código, organizando las funciones de modo que sean bloques legibles, reutilizables y fáciles de mantener.

Pero, por más ordenadas que estén nuestras funciones, existe algo más grande que ellas y que también requiere atención: **la arquitectura del *software***. Entenderemos a la arquitectura del *software* *como la organización del sistema en partes lógicas que pueden ser comprendidas de forma independiente, junto con los elementos de software que las componen y las relaciones entre ellos. También abarca las propiedades externamente visibles de esos componentes y las relaciones entre ellos*. Esta organización no se limita simplemente a la disposición de archivos y carpetas, sino que implica decisiones sobre cómo estructurar y conectar el sistema para que sea comprensible, escalable y mantenible. Una estructura mal definida puede convertirse en un obstáculo a largo plazo. Por eso, en este capítulo, pondremos el foco en los aspectos claves para construir una estructura de proyecto sólida.

Es importante dejar en claro que no existe una única arquitectura válida. Cada tipo de proyecto tiene características que influyen en cómo deben organizarse. No es lo mismo una aplicación *backend* que una de análisis de datos, y aún dentro de la misma categoría, dos desarrolladores distintos pueden elegir utilizar estructuras diferentes que resulten igualmente efectivas. Es por ello que no propondremos una única arquitectura universal, sino que trabajaremos sobre conceptos y aspectos generales que pueden aplicarse a múltiples contextos.

Para acompañar el capítulo y hacerlo más didáctico, utilizaremos un proyecto real como hilo conductor. Estudiaremos su estructura y las decisiones detrás de ella. El objetivo no es tomarlo como modelo perfecto, sino como una oportunidad para comprender cómo organizar un proyecto.

### El proyecto

Nuestro ejemplo práctico busca mostrar, a pequeña escala, un proyecto real y funcional, a la vez que sencillo para no perdernos en detalles innecesarios. Se trata de un *backend* escrito en Python que permite administrar productos y sus precios.

El sistema nos provee de las siguientes funcionalidades:

* **Añadir** nuevos productos.
* **Actualizar** los precios mediante un factor.
* **Listar** los productos con su valor en pesos argentinos.
* **Listar** los productos con su valor en *dólares*, a través de una interacción mediante una API externa.

El objetivo de este proyecto no es ser complejo, sino lo suficientemente completo para enseñar los conceptos de una arquitectura real.

Las tecnologías elegidas fueron las siguientes:

* **[Poetry](https://python-poetry.org/)**: herramienta para la gestión de dependencias y empaquetado.
* **[FastAPI](https://fastapi.tiangolo.com/)**: framework web moderno y rápido para construir *API*s.
* **[Pydantic](https://docs.pydantic.dev/)**: biblioteca de validación y serialización de datos.
* **[PonyORM](https://ponyorm.org/)**: ORM que permite escribir consultas a la base de datos usando expresiones Python en lugar de SQL.
* **[SQLAlchemy](https://www.sqlalchemy.org/)**: ORM robusto y flexible que proporciona herramientas para mapear clases de Python a tablas de bases de datos relacionales.
* **[SQLite](https://www.sqlite.org/)**: motor de base de datos ligero y embebido que guarda la información en un solo archivo, ideal para prototipos y aplicaciones pequeñas.

 :::note
 Un **ORM** es un *framework* que busca abstraer el uso de SQL. En ellos, uno escribe código siguiendo las reglas propias del mismo, este código luego es traducido a SQL y finalmente es ejecutado.
:::

Notar que la aplicación utiliza dos ORMs. Por ahora no entraremos en detalles al respecto, ya que esto responde a motivos didácticos que se aclararán más adelante.

El código completo se encuentra disponible en el siguiente repositorio de GitHub: [codigo-bonito-api-rest](https://github.com/FranZavalla/codigo-bonito-api-rest). Allí se incluye un archivo `README.md` con todas las instrucciones necesarias para ejecutar la aplicación. De todos modos, a lo largo del capítulo se incluirán fragmentos representativos del código para guiar la lectura.

## Una arquitectura simple basada en capas

Diseñar la arquitectura de un *software* es un tema recurrente y ampliamente estudiado. Entre algunas arquitecturas famosas nos podemos encontrar con **Domain-Driven Design (DDD)** por Eric Evans, **Onion Architecture** por Jeffrey Palermo y **Clean Architecture** de Robert C. Martin. Si bien existen diferencias entre ellas, todas estas propuestas comparten un denominador común: dividen al sistema en capas bien definidas, cada una con una responsabilidad y reglas claras.

Sin embargo, en la práctica, estas estructuras rara vez se implementan de forma estricta. Los proyectos reales suelen requerir adaptaciones o simplificaciones según el contexto. En ocasiones, el problema a resolver no es claro o evoluciona en el tiempo, por lo que se terminan mezclando distintos enfoques dentro de una misma arquitectura, a veces erróneos, dando como resultado una arquitectura vaga, la cual es difícil de mantener.

Con el objetivo de entender los beneficios de una arquitectura por capas sin caer en una complejidad excesiva, en esta sección proponemos una arquitectura simplificada basada en cuatro capas. La propuesta tiene como objetivo que el lector entienda la responsabilidad asignada a cada capa y los beneficios de estructurar el código de esta forma, para luego poder profundizar en arquitecturas más complejas que compartan los mismos fundamentos.

Las capas que componen a nuestra arquitectura simplificada son las siguientes:

* **Capa 0 - Definición de datos**: Esta capa define e implementa los datos con los que el sistema trabajará. Por ejemplo, si trabajamos con SQL crudo, esta capa contendrá los archivos SQL que defininen las tablas. Si nuestra aplicación no tiene datos persistentes, esta capa estará vacía.
* **Capa 1 - Acceso de datos**: Es la capa encargada de contener la lógica necesaria para acceder a los datos que utiliza la aplicación. En ella se pueden acceder tanto a datos propios (los definidos en la capa 0) como a datos provenientes de servicios o fuentes externas.
* **Capa 2 - Lógica de la aplicación**: Contiene el código que implementa las funcionalidades propias del sistema.
* **Capa 3 - Interfaz de usuario**: Funciona como conexión entre el sistema y el mundo exterior, ya sean otros sistemas o usuarios que lo utilizan.

Para reforzar estas ideas y favorecer el aspecto didáctico, en el código de nuestro proyecto encontraremos explícitamente las 4 capas representadas por carpetas. Cada carpeta estará nombrada con el número y el nombre de la capa. Por ejemplo, la carpeta asociada a la primer capa será `layer_0_db_definition`.

Numerar las capas nos permite expresar de forma sencilla un lineamiento que debería respetarse en cualquier arquitectura por capas:

:::tip[Pro Tip]
En una **arquitectura por capas**, un elemento de la capa **n** solo puede interactuar con elementos de la capa **n** o inferiores, pero jamás con capas superiores.
:::

Es gracias a este lineamiento que las arquitecturas por capas promueven aspectos como el desacople de componentes. Además, si la implementación está bien realizada, se obtiene una propiedad muy valiosa y deseable: la posibilidad de tener **sistemas parciales funcionales**: es decir, si tomamos el código de la capa **n** junto con todas sus capas inferiores, deberíamos tener un sistema completamente funcional:

* Con las **capas 0** y **1**, podemos acceder y manipular datos.
* Al agregar la **capa 2**, obtenemos la implementación de la lógica específica de nuestro sistema sobre los datos. Con esto, deberíamos poder ejecutar cualquier funcionalidad del sistema en forma programática. Por ejemplo, en Python, debería ser posible iniciar un intérprete y ejecutar cualquier funcionalidad del sistema.
* Finalmente, al incluir la **capa 3**, completamos el sistema, habilitando la posibilidad de que interaccione con el usuario final.

Es importante remarcar que en nuestro modelo, la capa 2 es muy general y por lo tanto con pocos detalles, restricciones y/o lineamientos. Pero en proyectos grandes, esta capa es realmente compleja dado que contiene código con distintas particularidades:

* **Código que implementa lógica específica de negocio**. Por ejemplo, en nuestro proyecto es el único tipo de código que existe en la capa 2 y será el encargado de implementar la funcionalidad de mostrar los precios de los productos en dólares. Otro ejemplo de este tipo de código podría ser procesar datos para generar un reporte específico.
* **Código que implementa procesos más generales o auxiliares**. Por ejemplo, funciones que puedan recibir datos, subirlos a un servicio en la nube y enviar un correo para poder acceder a esos datos. Este mismo código se podría usar para guardar el resultado de generar cualquier reporte. Este tipo de módulos se los suele denominar servicios.
* Algunos de estos procesos no necesitan una respuesta inmediata, entonces suelen ejecutarse en segundo plano. Para ello, es común implementar *jobs*, [colas de mensajes](https://aws.amazon.com/es/message-queue/) y procesos encargados de su ejecución (*workers*).
* Si fuera necesario realizar estas tareas de forma periódica, también podríamos incluir un **planificador de tareas**.

Toda la organización e implementación de estas funcionalidades escapan de nuestra arquitectura simplificada y no están presentes en nuestro proyecto guía.

Por último, vale mencionar la existencia de una capa **transversal**, la cual contiene funcionalidades que no pertenecen a una capa específica, sino que pueden ser utilizadas por todas ellas. Como su nombre lo indica, esta capa no se ubica junto a una capa en particular, sino que ofrece servicios auxiliares a todo el sistema. Sus módulos suelen ser genéricos y reutilizables, facilitando su traslado hacia otros proyectos sin mucha modificación.

Un ejemplo común en esta capa es la implementación de un componente de *logging*, que permite registrar eventos como errores, advertencias o información relevante para el monitoreo del sistema. En nuestro proyecto de ejemplo, buscamos mantener la estructura lo más simple posible, por lo que no incluiremos código perteneciente a esta capa.

## Organizando el código dentro de cada capa

Existen diferentes formas de implementar el código en una arquitectura por capas. Lo más importante no es el estilo exacto de la implementación, sino **respetar los límites de responsabilidad y alcance de cada capa**. Es decir que mientras cada capa se mantenga enfocada en su función dentro del sistema, el diseño será válido.

Una primera buena aproximación puede basarse en el uso de **funciones**. Las funciones son herramientas claras y concisas para resolver problemas bien delimitados. Lenguajes como `C`, que sólo conocen de funciones y procedimientos, han sido utilizados hasta la actualidad para crear sistemas complejos y completamente funcionales.

Sin embargo, a medida que un sistema crece y con él, el número de funciones involucradas, surgen algunas limitaciones. Cuando las funciones están dispersas, se dificulta saber que es lo ya está implementado y que no, lo que puede derivar en la duplicación de lógica por simple desconocimiento. Esto hace que el código se vuelva propenso a errores y reduce la reutilización del mismo.

Para estos escenarios, es que podemos recurrir a la **programación orientada a objetos**, que nos ofrece una solución más robusta. Las clases organizan el código de forma más concreta. Dentro de este paradigma, una herramienta útil son las **clases abstractas** las cuales permiten definir interfaces claras que favorecen al desacople de las implementaciones. En otras palabras, se explicita el *qué* hace cada clase y no el *cómo* lo hace. De esta forma se puede reemplazar una implementación por otra sin afectar al resto del sistema. Esta práctica es conocida como **programar contra interfaces**, y promueve la mantenibilidad y escalabilidad del sistema.

### Tipos de clases

Al implementar un sistema con objetos, es importante entender que existen distintos tipos de clases, las cuales definen objetos con distintas particularidades. En nuestro proyecto vamos a encontrar tres tipos de clases:

1.  **Clase de datos**: son clases que contienen datos específicos, sin lógica asociada. Estas clases se usarán para definir la información que espera y devuelve un servicio o módulo. Utilizando este tipo de clases se desacopla la interacción entre los mismos.
    En nuestro proyecto, ejemplo de este tipo de clases serán `CreateProductData` y `ProductData`. La primera tendrá los datos necesarios para crear un producto: el nombre y el precio. El segundo tendrá la información de un producto en nuestra base de datos: id, nombre y precio. Notemos que id es un valor único que se define a nivel base de datos, por lo tanto no es un dato que se necesite al momento de crear un producto.
    Python es un lenguaje de tipado dinámico, entonces no es directo definir una clase a ‘datos específicos’, por esta razón es que utilizamos el estándar de facto para esta tarea: **Pydantic**. Pydantic es un paquete que ejecuta la validación de tipos en tiempo de ejecución, además de proveer otras funcionalidades extras para el manejo de datos. Por otro lado, no queremos olvidarnos de que no todos los lenguajes necesitan de este tipo de clases de datos, lenguajes como TypeScript ya poseen constructores predefinidos para esta tarea, como `type` e `interface`, cada uno con sus particularidades.
2.  **Tipos Abstractos de Datos (TAD)**: son clases que además de contener datos específicos poseen un conjunto de operaciones que se pueden realizar sobre los datos o a partir de los mismos. En general son abstracciones de entidades del mundo real y, en contraposición a las clases de datos antes mencionadas, este tipo de clases son para uso interno de un servicio o módulo. El conjunto de operaciones que un TAD realiza está fuertemente ligado al uso interno que se le da.
    En nuestro proyecto, una clase de este tipo es `Product(db.Entity)` en el archivo `models_ponyorm.py`. Esta clase se crea dentro del *framework* PonyORM. La abstracción de los productos en la base de datos contiene información similar a la que encontrábamos en `CreateProductData`, pero además contiene datos internos que pertenecen a PonyORM y provee métodos para manipular tanto la tabla que contiene los datos, así como un dato específico (crear entradas nuevas, traer un dato particular, modificarlo y guardarlo, etc). Observemos aquí la importancia de tener distintas estructuras. Las capas 0 y 1 (definición y acceso a datos) entenderán de `Product(db.Entity)` pero se comunicarán con la capa 2 (lógica de aplicación) usando `CreateProductData` y `ProductData`, de esta forma, la capa 2 nunca sabrá detalles sobre cómo se implementa la persistencia de datos ni cómo se manipulan internamente. En consecuencia, la capa 2 estará totalmente desacoplada de esta implementación.
3.  **Clases de tipo funcionalidad**: son clases que encapsulan operaciones o precedimientos útiles para el sistema. Estas operaciones suelen construirse a partir de otras operaciones ‘más simples’ provistas por otras clases del sistema. A menudo, estas clases hacen uso de otras de su mismo tipo para cumplir su propósito. En estos casos, una buena práctica es utilizar el patrón de diseño conocido como **inyección de dependencias**. Este patrón se basa en pasar instancias de clases auxiliares como argumento al momento de instanciar la clase principal. Cuando hacemos esto, estamos promoviendo el desacople de componentes.
    En nuestro proyecto encontramos varios ejemplos de clases de tipo funcionalidad: `ProductRepository` es una clase que se implementa en la capa 1 y se utiliza para interactuar con la base de datos. En esta misma capa también encontramos la clase `DollarConnector`, la cual interactúa con la API externa que nos provee del precio del dólar en tiempo real. Como último ejemplo, mencionaremos la clase `ProductWithDollarBluePrices`. Esta clase implementa una funcionalidad que informa el valor de los productos de la base de datos con su valor en dólares. Para ello, hace uso de la inyección de dependencias: en su inicialización se recibirán instancias de las clases previamente nombradas. La instancia de `ProductRepository` será utilizada para acceder a los datos de los productos, mientras que la instancia de `DollarConnector` será utilizada para obtener los precios del dólar.

Comprender y aprovechar correctamente la programación orientada a objetos es una tarea compleja, ya que requiere tiempo y práctica. Pero una vez internalizada, la estructura del código mejora significativamente, afectando principalmente a la mantenibilidad y escalabilidad.

## Capas del sistema

### Capa 0: Definición de datos

La **definición de datos** corresponde al primer eslabón en la arquitectura de cualquier sistema de *software*. Su propósito es definir los elementos fundamentales con los que trabajará el sistema: los **datos persistentes**. Esta tarea no es trivial, ya que implica decisiones importantes. Distintos objetivos, introducen distintos desafíos y requerimientos. No es lo mismo diseñar un sistema que debe manejar:

* datos asociados a entidades relacionadas (usuarios, amigos, publicaciones),
* series temporales (precios de activos actualizados cada segundo),
* grandes volúmenes de imágenes,
* videos,
* una combinación de todos estos tipos de datos.

En esta capa no se realiza lógica específica del sistema ni procesamiento de datos. Su función es definir las estructuras, tipos y restricciones de los datos para que las demás capas puedan trabajar con ellas de forma consistente y confiable. Aquí también se suelen especificar los **componentes físicos** encargados de almacenar los datos.

Este último punto no es menor. Supongamos que estamos implementando una red social que permite subir imágenes. En los inicios, la cantidad de usuario será poca, entonces podría bastar con guardar las imágenes dentro del mismo servidor que ejecuta la aplicación. Sin embargo, si el sistema crece y comienza a recibir millones de usuario que suben imágenes constantemente, un único disco con capacidad física limitada no será suficiente.

#### ¿Qué podemos encontrar en esta capa?

* **Modelos de almacenamiento**: Tablas (SQL), colecciones (MongoDB), estructuras jerárquicas (XML/JSON), datos en archivos planos, etc.
* **Inicialización de estructuras persistentes**: Código para crear archivos, bases de datos, carpetas, etc.
* **_Scripts_ de migración o carga inicial**: Código que modifica la base de datos, inserta información de prueba o estados iniciales del sistema.
* **Definiciones de tipos o interfaces**

#### Ejemplo en nuestro proyecto

En nuestro caso, la capa 0 está contenida en la carpeta `/layer_0_db_definition`.

```bash
backend-products/
  └── layer_0_db_definition/
      ├── database_sqlalchemy.py
      ├── models_sqlalchemy.py
      ├── database_ponyorm.py
      └── models_ponyorm.py
````

Analicemos los siguientes archivos:

  * `database_sqlalchemy.py` contiene la función que inicializa la base de datos con SQLAlchemy, `init_sqlalchemy()` y la función que devuelve sesiones para trabajar con ella, `get_database()`. En nuestro proyecto, configuramos a SQLAlchemy para usar una instancia local de SQLite. Es decir, nuestro componente físico será nuestro propio disco duro y los datos se guardarán usando un único archivo binario. Podemos hacer estas elecciones dado que estamos desarrollando un proyecto de ejemplo, pero ambas decisiones son malas si tenemos en cuenta el desempeño y escalabilidad.
    ```python
    def init_sqlalchemy():
      Base.metadata.create_all(bind=engine)

    # Versión simplificada
    def get_database():
      return SessionLocal()
    ```
  * En `models_sqlalchemy.py` definimos la única tabla que va a utilizar nuestro sistema (`product`) con sus columnas y restricciones. Cuando lee este archivo, SQLAlchemy se conecta a la base de datos. Luego, si no encuentra la tabla, la crea con las restricciones definidas.
    ```python
    class Product(Base):
      __tablename__ = "product"

      id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
      name: Mapped[str] = mapped_column(nullable=False)
      price: Mapped[float] = mapped_column(nullable=False)
    ```

Además de estos archivos, también se incluyen `database_ponyorm.py` y `models_ponyorm.py`. Estos archivos son análogos a los que acabamos de presentar, pero implementados en PonyORM. La idea es mostrar más adelante como la definición de los datos puede cambiar sin que esto afecte a la lógica de la aplicación (capa 2) gracias a las abstracciones provistas en la capa de acceso de datos (capa 1).

### Capa 1: Acceso a datos

El propósito de la capa de **acceso a datos** es **abstraer** las acciones de obtener, almacenar, modificar y/o eliminar información, ya sea accediendo directamente a la capa inferior, o bien interactuando con fuentes externas, como por ejemplo APIs de terceros.

Esta capa depende totalmente de la capa 0. Por lo tanto, cualquier cambio en la forma en que se definen los datos implicará ajustes en esta capa para mantener la coherencia.

#### ¿Qué podemos encontrar en esta capa?

Solemos encontrar en esta capa componentes como:

  * **Repositorios**: Abstraen el acceso a base de datos, permitiendo a capas superiores obtener o modificar información sin escribir consultas ni código SQL.
  * **Conectores con APIs**: Encapsulan lógica de conexión con APIs, ya sea de terceros o propias.
  * **Abstracciones de almacenamiento**: Se encargan de proveer funciones que escriben/leen archivos, manejan caché, entre otras.

#### Ejemplo en nuestro proyecto

La capa 1 está contenida en la carpeta `/layer_1_data_access`. Allí distinguimos dos componentes principales: los repositorios (`repositories`) que gestionan el acceso a la tabla `products` en la base de datos y los conectores (`connectors`), encargados de interactuar con la API externa del dólar.

```bash
backend-products/
  └── layer_1_data_access/
      ├── connectors/
      │   ├── dollar_connector.py
      │   └── bluelytics_connector.py
      └── repositories/
          ├── product_abstract.py
          ├── product_pony.py
          └── product_sqlalchemy.py
```

#### Repositorios

Dentro de `/repositories`, encontramos el archivo `product_abstract.py`, el cual contiene dos clases de datos `CreateProductData` y `ProductData` y la clase abstracta `AbstractProductRepository`. Las clases de datos, como ya dijimos antes, definen los datos con los cuales uno puede comunicarse con el repositorio para acceder a los productos. Por otro lado, `AbstractProductRepository` define los métodos que debe proveer un repositorio de productos ‘válido’ para nuestro sistema sin especificar nada con respecto a la implementación de los mismos.

```python
class ProductData(BaseModel):
  id: int
  name: str
  price: float

  model_config = {"from_attributes": True}

class CreateProductData(BaseModel):
  name: str
  price: float

class AbstractProductRepository(ABC):
  @abstractmethod
  def get_all(self) -> List[ProductData]:
    pass

  @abstractmethod
  def get_by_id(self, product_id: int) -> ProductData:
    pass

  @abstractmethod
  def create(self, product: CreateProductData) -> ProductData:
    pass
```

Los archivos `product_pony.py` y `product_sqlalchemy.py` proveen implementaciones de `AbstractProductRepository`. Cabe destacar que no tenemos nada conceptualmente relevante que decir de estos archivos, en ellos solo encontramos implementaciones específicas. Lo importante ya ha sido definido por la clase abstracta.

#### Conectores

En la carpeta `/connectors`, dentro del archivo `dollar_connector.py` definimos la clase abstracta `DollarConnector`:

```python
class DollarConnector(ABC):
  @abstractmethod
  def get_price(self) -> float:
    """
    Retrieves the current price of the dollar.

    Returns:
      float: The current price of the dollar.
    """
    pass
```

Esta clase establece que toda implementación concreta debe incluir un método `get_price` que retorna el precio del dólar en el momento actual.

En el archivo `bluelytics_connector.py` tenemos una implementación de esta clase: `BluelyticsConncector`.

```python
class ExchangeRate(BaseModel):
  value_avg: float
  value_sell: float
  value_buy: float

class BluelyticsResponse(BaseModel):
  oficial: ExchangeRate
  blue: ExchangeRate
  oficial_euro: ExchangeRate
  blue_euro: ExchangeRate
  last_update: datetime


class BluelyticsConnector(DollarConnector):
  def __init__(self, endpoint=BLUELYTICS_API_URL):
    self.endpoint = endpoint

  def get_price(self) -> float:
    price_response = requests.get(self.endpoint)
    price_response.raise_for_status()

    json_data = price_response.json()
    try:
      bluelytics_parsed = BluelyticsResponse.model_validate(json_data)
    except Exception as e:
      raise ValueError(f"Error parsing Bluelytics response: {e}")

    return bluelytics_parsed.blue.value_avg
```

`BluelyticsResponse` corresponde a una clase de datos que utilizamos para validar la respuesta recibida desde la API externa. Esto es muy importante porque al tratarse de un servicio de terceros, sus respuestas podían cambiar sin previo aviso.

Por otro lado, notemos que la implementación actual define el precio del dólar como el promedio entre el valor de compra y el de venta del *dólar blue*. Si en el futuro se requiriese cambiar esto, por ejemplo, usar únicamente el valor de compra o de venta, o incluso cambiar del dólar blue al dólar oficial, bastaría con modificar la implementación en esta clase para que ese cambio impacte en todo el sistema.

### Capa 2: Lógica de aplicación

Esta capa representa el **núcleo** de nuestra aplicación. Aquí encontramos lógica que define a nuestro sistema. Como ya mencionamos antes, no iremos en profundidad sobre los lineamientos de esa capa, porque la misma puede ser muy compleja y sólo nos limitaremos a contar qué es lo que encontramos en nuestro ejemplo.

#### ¿Qué podemos encontrar en esta capa?

No contamos con una receta fija para esta capa. La lógica de la aplicación varía fuertemente de un proyecto a otro. Sin embargo podemos nombrar algunos elementos comunes que suelen aparecer en esta capa:

  * **Procesadores o transformadores de datos**: convierten datos en estructuras útiles para el usuario o la misma aplicación.
  * **Manejadores de *endpoints***: encargados de recibir datos y solicitudes externas. Realizan una serie de operaciones y entregan una respuesta acorde.
  * **Validaciones**: que no pertenecen a la definición de datos, más bien surgen de reglas específicas de esta capa.
  * **Cálculos específicos**: algoritmos que responden a las necesidades de la aplicación.
  * **Clases de funcionalidad**.

#### Ejemplo en nuestro proyecto

Esta capa la encontramos en la carpeta `/layer_2_logic` de nuestro proyecto:

```bash
backend-products/
  └── layer_2_logic/
      └── product_with_dollar_blue.py
      └── factory.py
```

Dentro de `product_with_dollar_blue.py` se encuentran, por un lado, la clase de datos `ProductDataWithUSDPrice` y por otro, la clase de tipo funcionalidad `ProductWithDollarBluePrices`, que se encarga de recuperar productos desde la base de datos y agregarles un nuevo atributo: su precio en dólares.

```python
class ProductDataWithUSDPrice(ProductData):
  usd_price: float

class ProductWithDollarBluePrices:
  def __init__(
    self,
    product_repository: AbstractProductRepository,
    dollar_blue_connector: DollarConnector,
  ):
    self.product_repository = product_repository
    self.dollar_blue_connector = dollar_blue_connector

  def get_product(self, product_id: int) -> ProductResponseWithUSDPrice:
    # code ...
    return ProductResponseWithUSDPrice(
      # code ...
    )

  def get_products(self) -> List[ProductResponseWithUSDPrice]:
    # code ...
    return [
      # code ...
    ]
```

Las instancias de la clase `ProductWithDollarBluePrices` se construyen a partir de dos dependencias: un **repositorio de productos** y un **conector para obtener los precios del dólar**. Ambos provienen de la capa de acceso a datos y son provistos externamente como argumentos del constructor. De esta forma `ProductWithDollarBluePrices` accede a los productos y al precio del dólar sin tener noción de las implementaciones subyacentes.

El otro archivo en esta capa es `factory.py`. Este archivo es una **fábrica** pues implementa funcionalidades que *crean instancias de clases utilizadas en el proyecto*, en función de la configuración o del contexto:

```python
def select_product_repository(
  db: Optional[Session] = None,
) -> AbstractProductRepository:
  """
  Returns the appropriate product repository based on the configuration settings.

  Args:
    db (Session, optional): The database session to use. Defaults to None.

  Returns:
    Union[SQLARepo, PonyRepo]: An instance of the appropriate product repository.
  """
  ...

def get_product_repository() -> AbstractProductRepository:
  with get_database() as db:
    return select_product_repository(db)

def get_dollar_blue_repository() -> ProductWithDollarBluePrices:
  product_repository = get_product_repository()
  dollar_blue_connector = BluelyticsConnector()
  return ProductWithDollarBluePrices(product_repository, dollar_blue_connector)
```

La función `get_product_repository` utiliza `select_product_repository` para devolver, dependiendo la configuración del proyecto, una instancia de un repositorio de productos implementado en SQLAlchemy o en PonyORM. Este ejemplo es muy simple, pero muestra el poder de trabajar con abstracciones para acceder a los datos: dado que ambos repositorios implementan la misma interfaz, podemos hacer uso de ellos indistintamente.

En este caso, ambos ORMs son tecnologías similares, pero podríamos estar utilizando tecnologías diferentes para almacenar los datos, y aún así abstraer esas diferencias mediante una interfaz común como `AbstractProductRepository`.

El criterio de selección también es muy simple: una variable de configuración externa. Sin embargo, en proyectos reales, podríamos basarnos en criterios mucho más complejos, como por ejemplo elegir una tecnología con alto rendimiento para usuarios *premium* y otra más económica para el resto de los usuarios.

### Capa 3: Interfaz de la aplicación

La última capa de nuestra arquitectura corresponde a la **interfaz de aplicación**: esta capa implementa la interfaz accesible desde el exterior para comunicarse con nuestro sistema. Por lo tanto, la función de esta capa es **recibir solicitudes externas** y **devolver resultados** generados por la lógica de la aplicación.

Esta capa incluye la lógica necesaria para transformar las solicitudes externas al formato utilizado por la lógica de la aplicación. De forma análoga, todo resultado generado por la lógica de la aplicación debe ser transformado a un formato adecuado para que sea recibido por el usuario final. Dependiendo el tipo de aplicación, en esta capa se pueden implementar otras funcionalidades, por ejemplo la autenticación de usuarios, el chequeo de permisos y/o el manejo de errores.

#### ¿Qué podemos encontrar en esta capa?

Algunas interfaces frecuentes que encontramos en esta capa son:

  * **API web (REST, GraphQL, …)**: comunes en *backends*, permiten que usuarios u otras aplicaciones interactúen con nuestro sistema a través de solicitudes HTTP.
  * **Páginas web**: aplicaciones mostradas al usuario mediante un navegador web.
  * **Interfaces gráficas (GUI)**: presentes en aplicaciones de escritorio o de celulares.
  * **Líneas de comando (CLI)**: utilizadas en herramientas o *scripts* de automatización.
  * **Gráficos**: comunes en análisis de datos, donde los resultados se presentan de forma visual.

Todos estos mecanismos comparten una característica: **hacen visible o utilizable la funcionalidad principal del sistema**.

#### Ejemplo en nuestro proyecto

Esta última capa la encontramos en la carpeta `/layer_3_api`, que contiene los archivos encargados de definir los *endpoints* HTTP que expone la funcionalidad del sistema. La implementación de esta capa se construye con el *framework* `FastAPI`, el cual nos simplifica tareas que en otros entornos serían repetitivas al momento de crear nuestra API.

```bash
backend-products/
  ├── layer_3_interface/
  │   ├── products.py
  │   └── products_with_usd_prices.py
  └── main.py
```

Dentro de la carpeta `/layer_3_interface` tenemos dos archivos, `products.py`, donde definiremos los *endpoints* asociados a los productos con los precios en pesos, y `products_with_usd_prices.py` donde se definen los *endpoints* asociados a los productos con los precios en dólares. En estos archivos se usan funciones para definir los puntos de acceso a la aplicación. Por ejemplo, en `products.py` encontramos la función `get_product`:

```python
@router.get("/product/{product_id}")
def get_product(
    product_id: int,
    product_repository: AbstractProductRepository = Depends(get_product_repository),
):
    try:
        product = product_repository.get_by_id(product_id)
        json_product = product.model_dump()
        return JSONResponse(status_code=200, content=json_product)
    except ValueError:
        return JSONResponse(status_code=404, content={"detail": "Product not found"})
    except Exception:
        return JSONResponse(
            status_code=500, content={"detail": "Internal server error"}
      )
```

En este fragmento de código utilizamos el decorador `@router.get(...)` para definir un *endpoint* GET en la ruta `/product/{product_id}`. Al colocar el decorador junto a la función `get_product`, estamos asociando su funcionalidad a dicha ruta. El segmento `product_id` dentro de la ruta representa un *path parameter*, es decir, un valor proporcionado por el usuario en la URL. En la signatura de la función, este parámetro se declara como un entero (`product_id: int`), indicando que se espera un valor numérico que será utilizado para buscar un producto en la base de datos.

Por otro lado, FastAPI permite definir dependencias del *endpoint* directamente en la definición de la función. En este caso, `product_repository` es una instancia inyectada mediante `Depends(get_product_repository)`. Esta abstracción permite desacoplar la obtención del repositorio de la lógica del núcleo del *endpoint*, manteniéndola simple y enfocada en su propósito: recuperar un producto por su id.

En la lógica de la función, se intenta obtener el producto llamando a `product_repository.get_by_id(product_id)`. Si la búsqueda es exitosa, el resultado se convierte a un diccionario mediante el método `model_dump()` y luego se completa la respuesta en formato JSON con código HTTP 200, indicando éxito.

En el caso de que algo no ocurriese como lo esperamos, el *endpoint* maneja explícitamente dos tipos de errores. En primer lugar, si el producto no existe, se lanza una excepción `ValueError` en el repositorio y se devuelve una respuesta JSON con código de error 404 indicando lo sucedido. Por otro lado, si se produce cualquier otra excepción durante la ejecución (por ejemplo, una base de datos no disponible o mal configurada), se devuelve una respuesta con código 500. Este manejo genérico evita exponer detalles internos del sistema que podrían brindar información de utilidad para un atacante malicioso.

Cabe destacar que FastAPI incluye validaciones automáticas de los parámetros definidos en la ruta. Si bien esto no se refleja directamente en el cuerpo de la función, cuando el servidor recibe una solicitud con un valor no numérico en la URL (por ejemplo, una solicitud a la ruta `/product/no_soy_un_numero`), FastAPI responderá automáticamente con un error informando que el valor proporcionado no es válido, dado que se esperaba un número entero.

Todo lo desarrollado hasta ahora está fuertemente ligado al *framework* FastAPI. Esto fue intencional, ya que nos permitió ejemplificar concretamente los siguientes cuatro momentos a la hora de implementar un acceso a nuestra aplicación:

  * **Validación del request**. En esta primera etapa, se verifica que quién realiza la solicitud envié datos válidos. En nuestro ejemplo, la validación esta a cargo del propio *framework* que se asegura de que el `product_id` sea un entero.
  * **Instanciaciones e importaciones**. Aquí se preparan los recursos necesarios para manejar la solicitud. En nuestro caso, corresponde a la instanciación automática del repositorio mediante `get_product_repository`.
  * **Ejecución**. Esta es la etapa central, donde se lleva a cabo la lógica adecuada para cumplir con la solicitud. En el ejemplo, simplemente encontramos la llamada al método `get_by_id` del repositorio de productos.
  * **Retorno del resultado**. Finalmente, se devuelve una respuesta al cliente en el formato adecuado. Si la solicitud fue exitosa, entonces los datos del producto son devueltos en el formato JSON. Si ocurrió un error, se informa mediante un mensaje y un código HTTP adecuado. En nuestro caso, se manejan explícitamente errores esperables, como un producto no existente y errores genéricos.

Notemos que estos mismos cuatro momentos están replicados en todo *endpoint* de nuestra aplicación. En particular observamos que ocurre con la ruta que se encarga de devolver todos los productos de la base de datos con los precios en dólares. Esta función es `get_products_with_usd_price` y la podemos encontrar en el archivo `products_with_usd_prices.py`:

```python
@router.get("/products_with_usd_prices/products_with_usd_prices/")
def get_products_with_usd_price(
	dollar_blue_repository: ProductWithDollarBluePrices = Depends(
    get_dollar_blue_repository
  ),
):
  try:
    products = dollar_blue_repository.get_products()
    json_products = [product.model_dump() for product in products]
    return JSONResponse(status_code=200, content=json_products)
  except Exception:
    return JSONResponse(
      status_code=500, content={"detail": "Internal server error"}
    )
```

Veamos los cuatro momentos:

  * **Validación de la solicitud**. En este caso no hay nada que validar, la solicitud no depende de ningún dato externo, siempre se devuelven todos los productos.
  * **Instanciaciones e importaciones**. Se instancia `dollar_blue_repository` mediante `get_dollar_blue_repository`.
  * **Ejecución**. Utilizamos el método `get_products` de `dollar_blue_repository` para obtener todos los productos con los precios en dólares.
  * **Retorno del resultado**. En caso de éxito, se devuelve la lista de los productos y si ocurre un error inesperado, un error genérico.

Por último, nos encontramos con el archivo `main.py` que si bien no se encuentra dentro de la carpeta `/layer_3_interface`, también forma parte de esta capa. Allí se inicializa la instancia principal de FastAPI y la conexión a la base de datos. Actúa como punto de entrada real de la aplicación y por lo tanto forma parte de la **interacción con el usuario**.

```python
def init_db():
  print("Initializing database...")
  if settings.ORM == "sqlalchemy":
    init_sqlalchemy()
  else:
    init_pony()

@asynccontextmanager
async def lifespan(app: FastAPI):
  init_db()
  yield

app = FastAPI(lifespan=lifespan)
```

## El desafío de una buena abstracción

Esta capítulo fue orientado para enseñar a organizar el código mediante abstracciones y encapsulamiento de tareas. Creemos que esta es la forma correcta de escribir código y estructurar un sistema. Sin embargo, nos toca reconocer que este enfoque no es perfecto y mucho menos está libre de problemas.

Uno de los primeros desafíos es que crear abstracciones correctas no es fácil. Aún con mucha experiencia, es común que algunas partes del sistema no sean óptimas o estén mal organizadas. Además, alcanzar una organización perfecta puede requerir un nivel de abstracción tan alto que los beneficios obtenidos no justifican el esfuerzo de implementación.

Otro punto a tener en cuenta es que una organización excesivamente modularizada puede afectar la compresión del código. Cuando una funcionalidad está dividida en múltiples archivos, clases y capas, el flujo de ejecución se vuelve difícil de seguir, especialmente para aquellos desarrolladores no familiarizados con el sistema. Entonces, un código sobremodularizado puede llevar a un código ‘correcto’ pero ilegible.

Algo peor que no encapsular tareas, es intentar hacerlo y hacerlo mal. En este capítulo mostramos un ejemplo sencillo con buenas propiedades, pero no profundizamos en cómo llegar a ella. Esta es una tarea compleja que requiere experiencia, iteración y comprensión del sistema.

Es importante aceptar que en las primeras etapas de un proyecto es normal refactorizar el mismo. Por lo tanto no hay que desanimarse si, meses después de haber implementado una funcionalidad, sentimos que su estructura puede mejorar. Esto es parte del proceso de desarrollar, principalmente en las funciones núcleo de nuestro sistema.

También es importante hacer una mención de los tiempos de ejecución. Por ejemplo, Python no es un lenguaje de programación que brille por su desempeño, en sistemas grandes implementar tantas capas lógicas puede afectar al rendimiento del sistema. Un ejemplo interesante de este dilema, se desarrolla en el artículo [Beyond Clean Code](https://tobeva.com/articles/beyond/), donde se analiza en profundidad cómo la búsqueda de una organización modular y orientada a objetos puede, en ciertos contextos, perjudicar significativamente el rendimiento. El mensaje central es que una organización basada en capas y abstracciones no es siempre la mejor opción: depende mucho del dominio del problema y de las operaciones que se realizan.

```
```