---

title: Testing
description: Testing

---

When we write code, an important part of the work is ensuring it works as expected. A complete way to address this
problem is through **program verification**. Program verification seeks to *mathematically prove the correctness of a
program with respect to its specification*. Tools designed specifically for this exist, but it is not the approach we
will take in this chapter. What we seek is something much more accessible and practical: **performing tests on our
code**.

The difference between verifying and testing can be subtle at first, but in practice, they are distant. As we said,
verification corresponds to a much more formal approach. While **tests** seek to *confirm with some degree of
confidence that the code behaves as we would expect*. It is important that during the development stage of a *software*
system we dedicate part of the time to creating these tests.

A **test** is nothing more than a code fragment that automatically executes a function, module, or complete flow of our
system with the aim of verifying that the result is the expected one. These checks can range from something as simple
as checking that a mathematical calculation returns the correct value, to more complex situations like simulating a
user's behavior in a complete application. We call the process of writing and executing these tests **testing**.

It is important to understand that testing does not guarantee that the program is completely free of errors. That a set
of tests passes successfully only guarantees that in those specific cases the system works as expected. But there may
always be the possibility of cases not contemplated, such as those that occur with certain data combinations or
specific conditions that were not covered. It is fundamental that, as developers, we contemplate this possibility and
try to cover the largest amount of cases possible, thinking that those exceptional cases can always occur.

### Benefits of testing

Performing tests allows us to detect errors early and in controlled environments. Thanks to this, we not only reduce
the number of failures in production, but we also improve code quality. In many cases, it is possible to design and
write tests without looking directly at the implementation in the code body, we simply use its interface or
specification; this approach is known as *black box* and is widely used by teams dedicated exclusively to testing. This
stage is also an opportunity to review already written code, and often leads us to notice overly extensive functions,
unclear names, or very complex flows. When we write tests, we also rethink the code.

In interpreted languages, like Python or JavaScript, testing fulfills an additional function: it helps us identify
syntax or typing errors that, otherwise, could remain hidden until the moment of their execution in production. This is
because, unlike compiled languages (which allow us to detect errors before executing the code), in interpreted
languages the code is only analyzed when it is running. Therefore, tests, even the simplest ones, force the
interpretation of the code and allow the appropriate errors to be raised in case they exist.

Ultimately, besides helping to write better and detect errors quickly, testing provides concrete benefits:

* **Facilitate code changes**. When we have a set of reliable tests, we can modify the system with peace of mind. If
any part of the code breaks, the tests should make us notice these errors.
* **Document expected behavior**. Tests are a way to document the code unofficially, at least for a finite set of
cases. Developers should be able to understand parts of the system simply by observing the tests.
* **Increase confidence**. If the implemented tests are successful, confidence in the system grows and the
probability of errors occurring decreases. Anyway, as we explained previously, one should not have blind faith in
tests, it is always possible that uncovered paths or uncontemplated situations exist.

Furthermore, testing offers us immediate feedback on what we are building. Knowing that a part of the system works as
expected, and having that instant confirmation generates certain satisfaction in the developer, which reinforces their
motivation to continue development.

### *Pretty Testing*

The *testing* code must not be thought of as something external to the system; both work together to build reliable
*software*. Therefore, all guidelines and good practices named in previous chapters must be respected during this
stage.

:::tip[Pro Tip]
**Guideline:** The *testing* code must follow good programming practices.
:::

Tests are represented as functions, and therefore must have descriptive names that make explicit what is being tested.
For example: `test_product_endpoint_raises_error_on_bad_request`, although this name might seem excessively long, in
this context there is no problem, the important thing is that they are precise.

Other guidelines to keep in mind:

* Tests must focus on a single behavior and have an appropriate length. Many statements in a test is a symptom of
performing multiple actions.
* Indentation must be kept low.
* Take advantage of white spaces to improve readability and separate logical blocks.
* Comments should be used only when the code's intention is not sufficient.

When a system's code is *ugly*, its tests will be too. And when tests are *ugly*, one of their fundamental purposes is
lost: increasing system reliability. The guidelines and good practices help us so that tests, like the rest of the
code, are clear, useful, and sustainable.

## The testing pyramid

When we want to start performing tests on our code, it is useful to have a guide that helps us organize ourselves, in
the same way we did when structuring our project through layers in the previous chapter. The **testing pyramid** is one
of the references we will use for this purpose. This idea proposes a clear structure to classify tests and decide how
many to write at each level.

The pyramid is composed of three layers:

* At the base are **unit tests**, which verify small functions of the code.
* In the middle are **integration tests**, which test how different modules or components of the system interact with
each other.
* Finally, at the top are **end-to-end** (E2E) tests, which simulate the complete behavior of the system.

The key to this pyramid lies in the proportion: we should have many unit tests, fewer integration tests, and few E2E
tests. This is because unit tests are faster, isolated, and easier to maintain, while end-to-end tests are costly (in
time and sometimes in resources), fragile, and more difficult to debug.

Although in practice, these proportions are not always respected to the letter, the pyramid continues to represent a
very good reference for developers. It reminds us that there are different levels of granularity in tests and that all
of them are equally important to keep code free of errors.

Each type of test possesses its own implementation strategies, tools, and objectives that we will see throughout this
chapter. However, all share a common structure at the moment of implementing them: the *Arrange, Act, Assert* pattern.
This pattern works as a mnemonic, which helps us organize the logic of the test:

1. First, the scenario is prepared (*Arrange*), usually through functions that run before the tests and configure the
data and environment necessary to simulate a real situation.
2. Then, the action we want to test is executed (*Act*), the function is called with specific parameters. This is the
body of our test.
3. Finally, the expected value is verified (*Assert*). Generally, this is the last line of the test, where we compare
the obtained result with the expected value. If they match, the test finishes correctly indicating success; if not,
the system indicates a failure showing the value that did not meet the condition.

---

## Types of tests

As in the previous chapter, we will be using example code to guide the reading. In this case, we will perform tests on
the product and price *backend* application from the previous chapter.

All corresponding code is found in the `/testing` folder at the root of the project. Additionally, we have a `Makefile`
to execute tests more quickly. In the `README.md` file, again at the root of the project, we find the instructions to
execute the tests from the `Makefile` file.

For this section we include two new technologies:

* [pytest](https://docs.pytest.org/en/stable/): *framework* that helps us write and execute tests.
* [unittest](https://docs.python.org/3/library/unittest.html): module from the Python standard library.

Although both technologies are useful for performing testing, we use `pytest` as the base for our tests, and `unittest`
as support with some tools that we will present later.

Below we will review the three types of tests that were named previously. In each of them, we will explain their scope,
some tools that are used, review a real implementation, and show their execution and reading of results.

### Unit tests

Unit tests correspond to the first level of the *testing* pyramid and should abound in any *software* project. Their
objective is to verify the behavior of small units of code in isolation, generally they are functions or class methods.
It is important that these tests be fast and simple, as they are executed in large quantities. Furthermore, they must
not depend on databases or real third-party services.

Now, this does not mean that we cannot test functions that interact with external services or databases. What we do in
these cases is temporarily replace those dependencies with controlled simulated versions. For this, *mocks* and *stubs*
exist, known as *test doubles*. Both allow replacing real functions with fake versions, whose behavior is known. The
main difference is that a *mock*, besides simulating behaviors, can record much more information: how many times
functions were invoked, with what arguments, among others.

Although it is possible to create doubles by hand, most modern testing libraries facilitate these tasks for us. In
Python, the `unittest.mock` module offers utilities like `MagicMock`, which allows creating simulated objects
configuring what they should return or how they should behave. Then, the `patch` function during the test allows us to
temporarily replace system objects with these mocks.

#### Example in our project

In our project we have two instances of unit tests, the first for the `ProductWithDollarBluePrices` class and the
second for `BluelyticsConnector`, both inside the `/unit` folder. In this example, we will study the second
implementation.

Additionally, inside the `/mocks` folder we will find multiple doubles that simulate this class of our system. Below
are two functions that generate *mocks* to simulate the behavior of an API that returns the dollar quotation. One of
them represents a successful scenario and the other a response with error.

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

Both *mocks* are instances of `MagicMock` which allows us to configure behavior. In the case of
`get_happy_mock_response`, it is explicitly defined that the `raise_for_status` method does nothing (produces no type
of error), and, on the other hand, that the `json` method returns a dictionary with the data expected by the system.

If we observe `get_bad_status_mock_response`, we will see a failed scenario. Upon calling `raise_for_status`, an
`HTTPError` exception is raised. This allows us to test how the system would react to unexpected situations, without
depending on the external service actually failing at that moment.

To complement, the test must be effectively performed. That is why we define the following functions that make use of
the *mocks*:

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

In the first test, we use `get_happy_mock_response()` to simulate a valid API response. Then, with the `patch`
function, we temporarily replace `requests.get` with our modified version. Thus, when the `get_price` method of
`BluelyticsConnector` attempts to make an HTTP call, it will actually be receiving the simulated response. Finally, we
use `assert` to verify that the returned value is the expected one.

In the second test, we use the *mock* `get_bad_status_mock_response()` to simulate a failed response that raises an
exception. We again employ `patch` to replace `requests.get` within the `get_prices` method. In this case, the line
`with pytest.raises(HTTPError)` fulfills the role of `assert`, ensuring that an `HTTPError` exception is indeed
raised.

It is important to highlight that unit tests must not only validate correct return values but also cover other aspects
such as the behavior of a function: exceptions, side effects, and even details like the number of times an internal
function was called.

#### Execution and output

As we mentioned previously, thanks to the `Makefile` file we can execute tests quickly. In this case, when running the
command `make run_unit_tests`, all tests located within the `/unit` folder will be executed. This command, internally,
executes:

```bash
poetry run pytest testing/unit/


```

Below is an example of its output in the terminal:

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

In this output, several elements stand out. First, the header, which indicates information about the execution
platform, Python version, active *plugins*, and the number of tests found (`collected 13 items`). Then, test files are
listed along with a series of dots (`.`) representing tests that executed successfully and at the end of the line, a
percentage indicating how many tests each file represents of the total. Finally, the execution is summarized with the
total passed tests and the time it took to complete them.

In the event that any test fails, the summary changes to include error details. For example:

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

Here we can observe that a test failed (`F.......`), and the system shows the error detail:

* First, we are informed which test case failed, `test_get_prices_return_avg_value_on_success`.
* Then, the line that produced the error `assert price == 2`, and next, the obtained value against the expected one,
`assert 1.0 == 2`. Finally, the file and specific line of the failure are mentioned, along with the exception that
occurred, `AssertError`.
* Lastly, a summary of failed tests is shown along with successful ones, and the time employed.

### Integration tests

The second level of the pyramid corresponds to integration tests. Unlike the previous level, where simple isolated code
pieces were validated, integration tests focus on verifying how different system components relate and interact. Their
objective is to ensure that parts of the system collaborate correctly respecting data flow.

A tool commonly used in these types of tests are *fixtures*, provided in Python by libraries like `pytest`. *Fixtures*
allow defining a test environment that is prepared before (and optionally after) executing each test. This makes them
ideal for initializing data, establishing connections, or cleaning resources, ensuring that each test is executed in a
controlled and repeatable context.

#### Example in our project

In this case, in our project, we perform integration testing to check how layer 0 and 1 components relate, that is,
data definition and access to them through repositories. As explained in the previous chapter, we have two repository
implementations (one based on SQLAlchemy and another on PonyORM), both respecting the same interface.

Our project's tests are in charge of verifying that both implementations correctly satisfy the interface. In this
example, we will focus on the PonyORM repository tests, which are found in the `test_ponyorm_product_repository.py`
file inside the `/integration` folder.

In the following test, we can see the implementation of a *fixture* for these test cases:

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

This code represents a *fixture* that sets up an in-memory database using SQLite. The `@pytest.fixture()` decorator on
the definition of the `db_with_products` function indicates to `pytest` that this function can be executed before each
test. Within the *fixture* body, a clean database is created, corresponding tables are generated, and three example
products are inserted.

The use of the keyword `yield` allows temporarily suspending execution to run a test. Once it is finished,
disconnection and database cleanup continue. This pattern ensures that each test is executed on a clean database,
without being affected by side effects from previous test executions.

Let's see now how this *fixture* is used in concrete testing cases:

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

In these two tests, the `db_with_products` *fixture* is included as a parameter in each function definition. This
indicates to `pytest` that it must execute the *fixture* before running the test. Thus, in the case of having multiple
*fixtures* in the same file, we could indicate precisely which one to use in each case.

The first test verifies that, when searching for the product with id 1 (previously inserted by the *fixture*), the
repository returns a valid object. To validate the result, the product name from the repository is compared with the
one obtained directly from the database. In the second test, it is checked that the creation of a new product works
correctly. To do this, the quantity of existing products is counted before the operation, then a new product is created
through the repository, and finally, it is verified that the quantity of products has increased by one.

#### Execution and output

In this case, test execution is performed with the `make run_integration_tests` command which internally performs
`poetry run pytest testing/integration`. Again, in the output we observe files and executed tests, whether successful
or failed.

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

### End-to-end (E2E) tests

Finally, at the top of the pyramid, we find *end-to-end* tests. This type of tests seeks to validate the functioning of
the entire system, from components belonging to lower layers to interfaces accessible by users. At this level, it is
fundamental that the test environment resembles the production environment as much as possible. For example, while in
previous levels we used an in-memory database, that is not acceptable in E2E, since our real system uses a persistent
database on file. The objective of this level is to answer a key question: does the complete system behave correctly
from start to finish?

#### Example in our project

We find this level inside the `/e2e` folder, and in this case, we have a single file, `test_endpoints`, which will
perform tests on our *backend* *endpoints*. These tests have a particularity: since they require the application to be
running, it is necessary to prepare the environment before launching them. For that, we define a *script* in the
`Makefile` file. This *script* establishes environment variables so that the system uses a test database and the
SQLAlchemy ORM, and then takes charge of automatically starting and stopping the application before and after running
the tests.

Let's observe the *fixture* that these tests use:

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

This *fixture* shares many similarities with the one used in the previous layer, although with some key differences.
On one hand, here we use SQLAlchemy instead of PonyORM, and on the other, we are working with a persistent database,
not in memory, which requires us to manually delete data before and after each test. It is also important to highlight
the use of the `autouse=True` parameter in the *fixture* decorator. This indicates to `pytest` that it must
automatically execute the function before each test, without needing to pass it as a parameter.

The only test we will review at this level is the following:

```python
def test_update_products_price_returns_422_if_the_factor_is_invalid():
  response = requests.put("http://localhost:8000/products?factor=NOTANUMBER")
  assert response.status_code == 422


```

Here we can observe that a real HTTP call is being made to the application via `requests.put`. In this case, the
*endpoint* in charge of updating product prices is called, but with the particularity of using `NOTANUMBER` as a
multiplicative factor. Faced with this situation, the application should throw an exception and respond with an HTTP
code `422 Unprocessable Entity`, indicating an error in the entered parameter.

#### Execution and output

For the case of *end-to-end* tests, execution is somewhat more complex. To run them, we use the `make run_e2e_tests`
command, which executes a series of additional steps sequentially:

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

We will not stop to explain in detail each of these lines, but their purpose is the following: start the *backend* in
the background, wait for it to be available, execute the tests, and then turn off the server. This process ensures
that the system is running at the moment of performing tests, and at the same time allows controlling the environment
precisely via variables like the database path and the ORM to use.

The output generated by these tests maintains the same format we saw previously: first a summary of the execution
environment is printed, and then the result of the test cases.

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

Let's observe that in this case, the execution took a little over 2 seconds. Although this is still fast, a notable
difference is noticed compared to unit and integration tests that barely totaled a second between the two. It is for
this reason that we must maintain a reasonable amount of *end-to-end* tests and avoid testing trivial cases at this
level, as they could slow down the process even more.

### Errors in our application

During the development of tests for this chapter, we found a real error in our *backend* application. Upon attempting
to create a new product with a negative price, we expected an error to be thrown. However, the system accepted the
value. This behavior was evidenced through the following test, which in a correct system should have passed without
problems:

```python
def test_create_product_with_negative_price_raises_error(session):
  repo = SQLAlchemyProductRepository(session)

  data = CreateProductData(name="Invalid Product", price=-100.0)
  with pytest.raises(ValueError):
    repo.create(data)


```

We could have fixed the repository by adding a validation on the product price, but we decided to keep the error and
the failed test to reinforce the importance of testing. These types of errors are key to building a reliable system; a
priori we never know the users of our application, and consequently, we do not know how they might make use of it. An
exhaustive set of tests allows us to anticipate these unexpected scenarios and achieve an application robust against
errors.

---

## Unifying code and testing

Now let's change the testing mindset: instead of performing it in a stage subsequent to programming, let's think of it
as something complementary at the moment of writing code. One of the best-known strategies is *Test-Driven Development*
(TDD).

In TDD, the developer first writes a test for a specific function. Then they implement the minimum code necessary for
that test to pass correctly. This process is repeated until the functionality is complete, and finally, the code is
refactored if necessary. Always ensuring that the test continues running successfully. The advantages of this pattern
are evident, the entire system is tested from the start, and only strictly necessary code is written, neither more nor
less.

It would seem all advantages, but TDD has its difficulties. The developer needs a broad and clear vision of the system
before building it, meaning they require knowing the entire system, its responsibilities, main flows, secondary flows,
and exceptional cases. This does not always happen, especially in early development stages. Thus, forcing a prior test
before the system programming stage becomes an obstacle rather than a guide.

Even so, we can perform tests while writing code without using TDD. Most languages offer external *debugging* tools
that allow us to inspect and experiment with code at runtime. In Python, there is `ipdb`, while in JavaScript we have
the `Node.js` debugger, which is usually integrated into editors like VS Code. This tool allows stopping program
execution at a specific point and performing diverse actions such as:

* Examine and modify variables.
* Step through code instruction by instruction.
* Inspect the call stack.
* Among other actions useful for understanding the internal state of the system.

We consider that knowing how to debug code is very important, as it helps us face errors difficult to track or simply
observe the behavior of our program while we develop it. However, delving into these tools escapes the scope of this
chapter and work.

---

## The importance of good testing

Writing good tests is not a trivial task. Like any other skill in development, it requires practice and good judgment
to detect relevant problems. At the beginning, it is normal to fall into overly simple tests that do not correctly
verify system behavior, or conversely, overly strict tests, which break at the slightest change. The true challenge is
to manage to write tests that act as an effective safety mechanism, that is, that detect subtle errors, but also manage
to test important behaviors, edge cases, and even unexpected situations.

Poorly applied testing can, in fact, work against the system. Slowing down development and generating a false sense of
security. That is why metrics like coverage in tests do not always contribute real value to testing. We can have sets
of tests that verify each of the lines and flows in our code, but that are poor when we talk about quality and
reliability.

Ultimately, testing is one of the most powerful tools in development. And when one has much practice and attention to
the correct guidelines, it becomes a key piece to build systems with a good code base and proof against errors.