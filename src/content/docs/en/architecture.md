---

title: Organization of a Software Project
description: The organization of a software project is essential to maintain clean and easy-to-understand code. In this chapter, we will explore the best practices for organizing a software project, including folder structure, file organization, and documentation.

---

So far, we have talked about the essential components of code: functions and variables, their typing, and how
documentation through comments can help provide clarity. We also studied how to create a good internal structure in
the code, organizing functions so that they are readable, reusable, and easy-to-maintain blocks.

But, no matter how tidy our functions are, there is something bigger than them that also requires attention:
**software architecture**. We will understand software architecture *as the organization of the system into logical
parts that can be understood independently, along with the software elements that compose them and the relationships
between them. It also encompasses the externally visible properties of those components and the relationships between
them*. This organization is not limited simply to the arrangement of files and folders, but involves decisions on how
to structure and connect the system so that it is understandable, scalable, and maintainable. A poorly defined
structure can become an obstacle in the long run. Therefore, in this chapter, we will focus on the key aspects to
build a solid project structure.

It is important to make it clear that there is no single valid architecture. Each type of project has characteristics
that influence how they should be organized. A *backend* application is not the same as a data analysis one, and even
within the same category, two different developers may choose to use different structures that are equally effective.
That is why we will not propose a single universal architecture, but rather work on general concepts and aspects that
can be applied to multiple contexts.

To accompany the chapter and make it more didactic, we will use a real project as a guiding thread. We will study its
structure and the decisions behind it. The goal is not to take it as a perfect model, but as an opportunity to
understand how to organize a project.

### The Project

Our practical example seeks to show, on a small scale, a real and functional project, while being simple enough not to
get lost in unnecessary details. It is a *backend* written in Python that allows managing products and their prices.

The system provides us with the following functionalities:

* **Add** new products.
* **Update** prices using a factor.
* **List** products with their value in Argentine pesos.
* **List** products with their value in *dollars*, through an interaction via an external API.

The goal of this project is not to be complex, but complete enough to teach the concepts of a real architecture.

The chosen technologies were the following:

* **[Poetry](https://python-poetry.org/)**: tool for dependency management and packaging.
* **[FastAPI](https://fastapi.tiangolo.com/)**: modern and fast web framework for building *API*s.
* **[Pydantic](https://docs.pydantic.dev/)**: data validation and serialization library.
* **[PonyORM](https://ponyorm.org/)**: ORM that allows writing database queries using Python expressions instead of SQL.
* **[SQLAlchemy](https://www.sqlalchemy.org/)**: robust and flexible ORM that provides tools to map Python classes to
relational database tables.
* **[SQLite](https://www.sqlite.org/)**: lightweight and embedded database engine that saves information in a single
file, ideal for prototypes and small applications.

:::note
An **ORM** is a *framework* that seeks to abstract the use of SQL. In them, one writes code following its own rules,
this code is then translated to SQL and finally executed.
:::

Note that the application uses two ORMs. For now, we will not go into details about this, as this responds to didactic
reasons that will be clarified later.

The complete code is available in the following GitHub repository:
[codigo-bonito-api-rest](https://github.com/FranZavalla/codigo-bonito-api-rest). A `README.md` file is included there
with all the necessary instructions to run the application. Anyway, throughout the chapter, representative fragments of
the code will be included to guide the reading.

## A Simple Architecture Based on Layers

Designing software architecture is a recurring and widely studied topic. Among some famous architectures, we can find
**Domain-Driven Design (DDD)** by Eric Evans, **Onion Architecture** by Jeffrey Palermo, and **Clean Architecture** by
Robert C. Martin. While there are differences between them, all these proposals share a common denominator: they divide
the system into well-defined layers, each with a responsibility and clear rules.

However, in practice, these structures are rarely implemented strictly. Real projects usually require adaptations or
simplifications depending on the context. Sometimes, the problem to be solved is unclear or evolves over time, so
different approaches end up being mixed within the same architecture, sometimes erroneously, resulting in a vague
architecture, which is difficult to maintain.

With the aim of understanding the benefits of a layered architecture without falling into excessive complexity, in this
section we propose a simplified architecture based on four layers. The proposal aims for the reader to understand the
responsibility assigned to each layer and the benefits of structuring the code in this way, to then be able to delve
into more complex architectures that share the same foundations.

The layers that make up our simplified architecture are the following:

* **Layer 0 - Data Definition**: This layer defines and implements the data with which the system will work. For
example, if we work with raw SQL, this layer will contain the SQL files that define the tables. If our application
has no persistent data, this layer will be empty.
* **Layer 1 - Data Access**: It is the layer responsible for containing the logic necessary to access the data used by
the application. In it, one can access both own data (those defined in layer 0) and data coming from external
services or sources.
* **Layer 2 - Application Logic**: Contains the code that implements the functionalities specific to the system.
* **Layer 3 - User Interface**: Functions as a connection between the system and the outside world, whether they are
other systems or users who use it.

To reinforce these ideas and favor the didactic aspect, in our project code we will explicitly find the 4 layers
represented by folders. Each folder will be named with the number and name of the layer. For example, the folder
associated with the first layer will be `layer_0_db_definition`.

Numbering the layers allows us to express simply a guideline that should be respected in any layered architecture:

:::tip[Pro Tip]
In a **layered architecture**, an element of layer **n** can only interact with elements of layer **n** or lower, but
never with higher layers.
:::

It is thanks to this guideline that layered architectures promote aspects such as component decoupling. Furthermore, if
the implementation is well done, a very valuable and desirable property is obtained: the possibility of having
**functional partial systems**: that is, if we take the code of layer **n** together with all its lower layers, we
should have a completely functional system:

* With **layers 0** and **1**, we can access and manipulate data.
* By adding **layer 2**, we obtain the implementation of the specific logic of our system over the data. With this, we
should be able to execute any functionality of the system programmatically. For example, in Python, it should be
possible to start an interpreter and execute any functionality of the system.
* Finally, by including **layer 3**, we complete the system, enabling the possibility of it interacting with the end
user.

It is important to remark that in our model, layer 2 is very general and therefore with few details, restrictions,
and/or guidelines. But in large projects, this layer is really complex given that it contains code with distinct
particularities:

* **Code that implements specific business logic**. For example, in our project, it is the only type of code that
exists in layer 2 and will be in charge of implementing the functionality of showing product prices in dollars.
Another example of this type of code could be processing data to generate a specific report.
* **Code that implements more general or auxiliary processes**. For example, functions that can receive data, upload it
to a cloud service, and send an email to access that data. This same code could be used to save the result of
generating any report. These types of modules are usually called services.
* Some of these processes do not need an immediate response, so they are usually executed in the background. For this,
it is common to implement *jobs*, [message queues](https://aws.amazon.com/message-queue/), and processes in charge
of their execution (*workers*).
* If it were necessary to perform these tasks periodically, we could also include a **task scheduler**.

All the organization and implementation of these functionalities escape our simplified architecture and are not present
in our guide project.

Finally, it is worth mentioning the existence of a **transversal** layer, which contains functionalities that do not
belong to a specific layer but can be used by all of them. As its name indicates, this layer is not located next to a
particular layer, but offers auxiliary services to the entire system. Its modules are usually generic and reusable,
facilitating their transfer to other projects without much modification.

A common example in this layer is the implementation of a *logging* component, which allows recording events such as
errors, warnings, or relevant information for system monitoring. In our example project, we seek to keep the structure
as simple as possible, so we will not include code belonging to this layer.

## Organizing code within each layer

There are different ways to implement code in a layered architecture. The most important thing is not the exact
implementation style, but **respecting the limits of responsibility and scope of each layer**. That is, as long as each
layer remains focused on its function within the system, the design will be valid.

A first good approximation can be based on the use of **functions**. Functions are clear and concise tools for solving
well-delimited problems. Languages like `C`, which only know of functions and procedures, have been used to this day to
create complex and completely functional systems.

However, as a system grows and with it, the number of functions involved, some limitations arise. When functions are
scattered, it becomes difficult to know what is already implemented and what is not, which can lead to logic
duplication due to simple ignorance. This makes the code prone to errors and reduces its reuse.

For these scenarios, we can resort to **object-oriented programming**, which offers us a more robust solution. Classes
organize code more concretely. Within this paradigm, a useful tool is **abstract classes**, which allow defining clear
interfaces that favor the decoupling of implementations. In other words, the *what* each class does is made explicit
and not the *how* it does it. This way, an implementation can be replaced by another without affecting the rest of the
system. This practice is known as **programming against interfaces**, and promotes system maintainability and
scalability.

### Types of classes

When implementing a system with objects, it is important to understand that there are different types of classes, which
define objects with distinct particularities. In our project, we will find three types of classes:

1. **Data Class**: these are classes that contain specific data, without associated logic. These classes will be used
to define the information that a service or module expects and returns. Using this type of classes decouples the
interaction between them.
In our project, examples of this type of class will be `CreateProductData` and `ProductData`. The first will have
the data necessary to create a product: name and price. The second will have the information of a product in our
database: id, name, and price. Note that id is a unique value defined at the database level, so it is not data
needed when creating a product.
Python is a dynamically typed language, so defining a class for 'specific data' is not direct; for this reason, we
use the de facto standard for this task: **Pydantic**. Pydantic is a package that executes type validation at
runtime, in addition to providing other extra functionalities for data handling. On the other hand, we do not want
to forget that not all languages need this type of data class; languages like TypeScript already possess predefined
constructors for this task, such as `type` and `interface`, each with its particularities.
2. **Abstract Data Types (ADT)**: these are classes that, in addition to containing specific data, possess a set of
operations that can be performed on the data or derived from it. In general, they are abstractions of real-world
entities and, in contrast to the aforementioned data classes, this type of class is for the internal use of a
service or module. The set of operations an ADT performs is strongly linked to the internal use given to it.
In our project, a class of this type is `Product(db.Entity)` in the `models_ponyorm.py` file. This class is created
within the PonyORM *framework*. The abstraction of products in the database contains information similar to what we
found in `CreateProductData`, but also contains internal data belonging to PonyORM and provides methods to
manipulate both the table containing the data and specific data (create new entries, fetch specific data, modify
and save it, etc.). Observe here the importance of having different structures. Layers 0 and 1 (definition and data
access) will understand `Product(db.Entity)` but will communicate with layer 2 (application logic) using
`CreateProductData` and `ProductData`. This way, layer 2 will never know details about how data persistence is
implemented or how it is internally manipulated. Consequently, layer 2 will be totally decoupled from this
implementation.
3. **Functionality type classes**: these are classes that encapsulate operations or procedures useful for the system.
These operations are usually built from other 'simpler' operations provided by other classes in the system. Often,
these classes make use of others of the same type to fulfill their purpose. In these cases, a good practice is to
use the design pattern known as **dependency injection**. This pattern is based on passing instances of auxiliary
classes as arguments at the moment of instantiating the main class. When we do this, we are promoting component
decoupling.
In our project, we find several examples of functionality type classes: `ProductRepository` is a class implemented
in layer 1 and used to interact with the database. In this same layer, we also find the `DollarConnector` class,
which interacts with the external API that provides us with the dollar price in real-time. As a last example, we
will mention the `ProductWithDollarBluePrices` class. This class implements a functionality that reports the value
of database products with their value in dollars. To do this, it makes use of dependency injection: in its
initialization, instances of the previously named classes will be received. The `ProductRepository` instance will
be used to access product data, while the `DollarConnector` instance will be used to obtain dollar prices.

Understanding and correctly leveraging object-oriented programming is a complex task, as it requires time and practice.
But once internalized, the code structure improves significantly, mainly affecting maintainability and scalability.

## System Layers

### Layer 0: Data Definition

**Data definition** corresponds to the first link in the architecture of any *software* system. Its purpose is to
define the fundamental elements with which the system will work: **persistent data**. This task is not trivial, as it
implies important decisions. Different objectives introduce different challenges and requirements. Designing a system
is not the same if it must handle:

* data associated with related entities (users, friends, posts),
* time series (asset prices updated every second),
* large volumes of images,
* videos,
* a combination of all these types of data.

Specific system logic or data processing is not performed in this layer. Its function is to define the structures,
types, and constraints of the data so that other layers can work with them consistently and reliably. Here, the
**physical components** responsible for storing the data are also usually specified.

This last point is not minor. Suppose we are implementing a social network that allows uploading images. In the
beginning, the number of users will be small, so it might suffice to save the images inside the same server running the
application. However, if the system grows and begins to receive millions of users uploading images constantly, a single
disk with limited physical capacity will not be sufficient.

#### What can we find in this layer?

* **Storage models**: Tables (SQL), collections (MongoDB), hierarchical structures (XML/JSON), data in flat files,
etc.
* **Initialization of persistent structures**: Code to create files, databases, folders, etc.
* **Migration or initial load *scripts***: Code that modifies the database, inserts test information or initial system
states.
* **Type or interface definitions**.

#### Example in our project

In our case, layer 0 is contained in the `/layer_0_db_definition` folder.

```bash
backend-products/
  └── layer_0_db_definition/
      ├── database_sqlalchemy.py
      ├── models_sqlalchemy.py
      ├── database_ponyorm.py
      └── models_ponyorm.py

```

Let's analyze the following files:

* `database_sqlalchemy.py` contains the function that initializes the database with SQLAlchemy, `init_sqlalchemy()`,
and the function that returns sessions to work with it, `get_database()`. In our project, we configured SQLAlchemy
to use a local instance of SQLite. That is, our physical component will be our own hard drive and data will be
saved using a single binary file. We can make these choices since we are developing an example project, but both
decisions are bad if we take performance and scalability into account.
```python
def init_sqlalchemy():
  Base.metadata.create_all(bind=engine)

# Simplified version
def get_database():
  return SessionLocal()

```


* In `models_sqlalchemy.py`, we define the only table our system will use (`product`) with its columns and
constraints. When reading this file, SQLAlchemy connects to the database. Then, if it doesn't find the table, it
creates it with the defined constraints.
```python
class Product(Base):
  __tablename__ = "product"

  id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
  name: Mapped[str] = mapped_column(nullable=False)
  price: Mapped[float] = mapped_column(nullable=False)

```



In addition to these files, `database_ponyorm.py` and `models_ponyorm.py` are also included. These files are analogous
to those just presented but implemented in PonyORM. The idea is to show later how data definition can change without
affecting application logic (layer 2) thanks to the abstractions provided in the data access layer (layer 1).

### Layer 1: Data Access

The purpose of the **data access** layer is to **abstract** the actions of retrieving, storing, modifying, and/or
deleting information, either by directly accessing the lower layer or by interacting with external sources, such as
third-party APIs.

This layer depends totally on layer 0. Therefore, any change in how data is defined will imply adjustments in this
layer to maintain consistency.

#### What can we find in this layer?

We usually find components in this layer such as:

* **Repositories**: Abstract database access, allowing upper layers to obtain or modify information without writing
queries or SQL code.
* **API Connectors**: Encapsulate connection logic with APIs, whether third-party or own.
* **Storage Abstractions**: Responsible for providing functions that write/read files, handle cache, among others.

#### Example in our project

Layer 1 is contained in the `/layer_1_data_access` folder. There we distinguish two main components: repositories
(`repositories`) that manage access to the `products` table in the database and connectors (`connectors`), responsible
for interacting with the external dollar API.

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

#### Repositories

Inside `/repositories`, we find the file `product_abstract.py`, which contains two data classes `CreateProductData`
and `ProductData` and the abstract class `AbstractProductRepository`. Data classes, as we said before, define the data
with which one can communicate with the repository to access products. On the other hand, `AbstractProductRepository`
defines the methods that a 'valid' product repository must provide for our system without specifying anything regarding
their implementation.

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

The files `product_pony.py` and `product_sqlalchemy.py` provide implementations of `AbstractProductRepository`. It is
worth noting that we have nothing conceptually relevant to say about these files; in them, we only find specific
implementations. The important part has already been defined by the abstract class.

#### Connectors

In the `/connectors` folder, inside the `dollar_connector.py` file, we define the abstract class `DollarConnector`:

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

This class establishes that every concrete implementation must include a `get_price` method that returns the dollar
price at the current moment.

In the `bluelytics_connector.py` file, we have an implementation of this class: `BluelyticsConncector`.

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

`BluelyticsResponse` corresponds to a data class we use to validate the response received from the external API. This
is very important because being a third-party service, its responses could change without prior notice.

On the other hand, note that the current implementation defines the dollar price as the average between the buy and
sell value of the *blue dollar*. If in the future it was required to change this, for example, using only the buy or
sell value, or even switching from the blue dollar to the official dollar, it would suffice to modify the
implementation in this class for that change to impact the entire system.

### Layer 2: Application Logic

This layer represents the **core** of our application. Here we find logic that defines our system. As we mentioned
before, we will not go into depth about the guidelines of this layer, because it can be very complex and we will limit
ourselves to recounting what we find in our example.

#### What can we find in this layer?

We do not have a fixed recipe for this layer. Application logic varies strongly from one project to another. However,
we can name some common elements that usually appear in this layer:

* **Data processors or transformers**: convert data into useful structures for the user or the application itself.
* **Endpoint handlers**: in charge of receiving data and external requests. They perform a series of operations and
deliver an appropriate response.
* **Validations**: not belonging to data definition, but rather arising from specific rules of this layer.
* **Specific calculations**: algorithms that respond to application needs.
* **Functionality classes**.

#### Example in our project

We find this layer in the `/layer_2_logic` folder of our project:

```bash
backend-products/
  └── layer_2_logic/
      └── product_with_dollar_blue.py
      └── factory.py

```

Inside `product_with_dollar_blue.py`, we find, on one hand, the data class `ProductDataWithUSDPrice` and on the other,
the functionality type class `ProductWithDollarBluePrices`, which is responsible for retrieving products from the
database and adding a new attribute to them: their price in dollars.

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

Instances of the `ProductWithDollarBluePrices` class are built from two dependencies: a **product repository** and a
**connector to obtain dollar prices**. Both come from the data access layer and are provided externally as constructor
arguments. This way `ProductWithDollarBluePrices` accesses products and the dollar price without having a notion of the
underlying implementations.

The other file in this layer is `factory.py`. This file is a **factory** as it implements functionalities that
*create instances of classes used in the project*, based on configuration or context:

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

The `get_product_repository` function uses `select_product_repository` to return, depending on the project
configuration, an instance of a product repository implemented in SQLAlchemy or PonyORM. This example is very simple,
but it shows the power of working with abstractions to access data: since both repositories implement the same
interface, we can use them interchangeably.

In this case, both ORMs are similar technologies, but we could be using different technologies to store data, and still
abstract those differences through a common interface like `AbstractProductRepository`.

The selection criterion is also very simple: an external configuration variable. However, in real projects, we could
base ourselves on much more complex criteria, such as choosing a high-performance technology for *premium* users and a
more economical one for the rest of the users.

### Layer 3: Application Interface

The last layer of our architecture corresponds to the **application interface**: this layer implements the interface
accessible from the outside to communicate with our system. Therefore, the function of this layer is to **receive
external requests** and **return results** generated by the application logic.

This layer includes the logic necessary to transform external requests to the format used by the application logic.
Similarly, any result generated by the application logic must be transformed into a suitable format to be received by
the end user. Depending on the type of application, other functionalities can be implemented in this layer, for example
user authentication, permission checking, and/or error handling.

#### What can we find in this layer?

Some frequent interfaces we find in this layer are:

* **Web API (REST, GraphQL, …)**: common in *backends*, allow users or other applications to interact with our
system through HTTP requests.
* **Web pages**: applications shown to the user through a web browser.
* **Graphical interfaces (GUI)**: present in desktop or mobile applications.
* **Command lines (CLI)**: used in tools or automation *scripts*.
* **Charts**: common in data analysis, where results are presented visually.

All these mechanisms share a characteristic: **they make the main functionality of the system visible or usable**.

#### Example in our project

We find this last layer in the `/layer_3_api` folder, which contains the files responsible for defining the HTTP
*endpoints* that expose the system functionality. The implementation of this layer is built with the `FastAPI`
*framework*, which simplifies tasks that in other environments would be repetitive when creating our API.

```bash
backend-products/
  ├── layer_3_interface/
  │   ├── products.py
  │   └── products_with_usd_prices.py
  └── main.py

```

Inside the `/layer_3_interface` folder we have two files, `products.py`, where we will define the *endpoints*
associated with products with prices in pesos, and `products_with_usd_prices.py` where the *endpoints* associated with
products with prices in dollars are defined. In these files, functions are used to define access points to the
application. For example, in `products.py` we find the `get_product` function:

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

In this code fragment, we use the `@router.get(...)` decorator to define a GET *endpoint* on the
`/product/{product_id}` route. By placing the decorator next to the `get_product` function, we are associating its
functionality with said route. The `product_id` segment within the route represents a *path parameter*, that is, a
value provided by the user in the URL. In the function signature, this parameter is declared as an integer
(`product_id: int`), indicating that a numeric value is expected which will be used to search for a product in the
database.

On the other hand, FastAPI allows defining *endpoint* dependencies directly in the function definition. In this case,
`product_repository` is an instance injected via `Depends(get_product_repository)`. This abstraction allows decoupling
the obtaining of the repository from the core logic of the *endpoint*, keeping it simple and focused on its purpose:
retrieving a product by its id.

In the function logic, an attempt is made to obtain the product by calling `product_repository.get_by_id(product_id)`.
If the search is successful, the result is converted to a dictionary via the `model_dump()` method and then the
response is completed in JSON format with HTTP code 200, indicating success.

In case something does not happen as we expect, the *endpoint* explicitly handles two types of errors. First, if the
product does not exist, a `ValueError` exception is raised in the repository and a JSON response with error code 404
indicating what happened is returned. On the other hand, if any other exception occurs during execution (for example, a
database not available or poorly configured), a response with code 500 is returned. This generic handling avoids
exposing internal system details that could provide useful information for a malicious attacker.

It is worth noting that FastAPI includes automatic validations of parameters defined in the route. Although this is not
reflected directly in the function body, when the server receives a request with a non-numeric value in the URL (for
example, a request to the route `/product/im_not_a_number`), FastAPI will automatically respond with an error
informing that the provided value is not valid, given that an integer was expected.

Everything developed so far is strongly linked to the FastAPI *framework*. This was intentional, as it allowed us to
concretely exemplify the following four moments when implementing access to our application:

* **Request validation**. In this first stage, it is verified that whoever makes the request sends valid data. In our
example, the validation is in charge of the *framework* itself which ensures that `product_id` is an integer.
* **Instantiations and imports**. Here the necessary resources to handle the request are prepared. In our case, it
corresponds to the automatic instantiation of the repository via `get_product_repository`.
* **Execution**. This is the central stage, where the appropriate logic is carried out to fulfill the request. In the
example, we simply find the call to the `get_by_id` method of the product repository.
* **Return of result**. Finally, a response is returned to the client in the appropriate format. If the request was
successful, then the product data is returned in JSON format. If an error occurred, it is reported via a message
and an appropriate HTTP code. In our case, expected errors are explicitly handled, such as a non-existent product
and generic errors.

Note that these same four moments are replicated in every *endpoint* of our application. In particular, we observe what
happens with the route responsible for returning all products from the database with prices in dollars. This function
is `get_products_with_usd_price` and we can find it in the `products_with_usd_prices.py` file:

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

Let's see the four moments:

* **Request validation**. In this case, there is nothing to validate, the request does not depend on any external
data, all products are always returned.
* **Instantiations and imports**. `dollar_blue_repository` is instantiated via `get_dollar_blue_repository`.
* **Execution**. We use the `get_products` method of `dollar_blue_repository` to obtain all products with prices in
dollars.
* **Return of result**. In case of success, the list of products is returned and if an unexpected error occurs, a
generic error.

Finally, we encounter the `main.py` file which, although not found inside the `/layer_3_interface` folder, is also part
of this layer. There the main FastAPI instance and the database connection are initialized. It acts as the real entry
point of the application and therefore forms part of the **user interaction**.

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

## The challenge of good abstraction

This chapter was oriented to teach organizing code through abstractions and task encapsulation. We believe this is the
correct way to write code and structure a system. However, we must recognize that this approach is not perfect and much
less free of problems.

One of the first challenges is that creating correct abstractions is not easy. Even with much experience, it is common
for some parts of the system not to be optimal or to be poorly organized. Furthermore, reaching perfect organization
may require such a high level of abstraction that the benefits obtained do not justify the implementation effort.

Another point to keep in mind is that excessively modularized organization can affect code comprehension. When
functionality is divided into multiple files, classes, and layers, the execution flow becomes difficult to follow,
especially for those developers not familiar with the system. So, over-modularized code can lead to 'correct' but
unreadable code.

Something worse than not encapsulating tasks is trying to do it and doing it wrong. In this chapter, we showed a simple
example with good properties, but we did not delve into how to reach it. This is a complex task that requires
experience, iteration, and system understanding.

It is important to accept that in the early stages of a project it is normal to refactor it. Therefore, one should not
be discouraged if, months after having implemented a functionality, we feel that its structure can improve. This is
part of the development process, mainly in the core functions of our system.

It is also important to mention execution times. For example, Python is not a programming language that shines for its
performance; in large systems, implementing so many logical layers can affect system performance. An interesting
example of this dilemma is developed in the article [Beyond Clean Code](https://tobeva.com/articles/beyond/), where it
is analyzed in depth how the search for modular and object-oriented organization can, in certain contexts,
significantly harm performance. The central message is that an organization based on layers and abstractions is not
always the best option: it depends a lot on the problem domain and the operations being performed.