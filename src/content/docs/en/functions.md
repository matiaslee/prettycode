---

title: Function Design
description: asdf

---

## Functions as an organization method

**Functions** are one of the essential elements in every programming language. They are *blocks of code that allow us
to group a set of instructions or sentences under a single name to execute specific tasks*. Using them brings multiple
benefits, one of the most evident being **code reuse**. Suppose a web application where it is necessary to validate
email addresses; it would be reasonable to have a function named `validate_email` that performs this task. Such a
function would be used whenever validation is necessary.

When we are taught to program, we are often told that functions only exist to avoid code repetition. But it is rarely
mentioned that they are also a tool that can serve for its organization. This purpose usually remains in the background
because explaining it requires more complex examples, which is not always viable in an introductory course.

Unfortunately, after the first programming courses, the concept of a function is rarely studied in depth again. As a
result, many developers fail to understand their true potential in code structuring. In reality, creating functions
even when there is no repeated code can be an important strategy to improve the readability of a program.

## Functions must be small

In the body of functions, we find **statements**. A statement in a programming language is a *complete instruction
that tells the computer what task to execute*. They are the fundamental units of execution and, in general, are
delimited by a specific symbol, such as `;` in languages like `C` or `JavaScript`, or by a line break in `Python`.

It is important to note the difference between a statement and a line of code. Although in many cases they coincide,
a statement can occupy multiple lines if we add line breaks to improve readability. Similarly, a line can contain
multiple statements if we write them in sequence. In summary: a statement is a logical unit of execution, while a
line of code is just a visual aspect of a program's code.

:::tip[Pro Tip]
Function bodies should ideally have about 10 statements or fewer.
:::


Function design is key to code organization. Keeping the body of functions short may seem like an unnecessary limit
to developers accustomed to writing long functions that simply fulfill their purpose. However, reducing the amount of
statements in a function brings important advantages:

* **Reduces the number of responsibilities**, ideally to a single one.
* **Facilitates the assignment of descriptive names** that clearly reflect their purpose.

Let's look at an example of a function that contradicts this principle. In the following code, we observe how several
tasks are performed at the same time.

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

```

This function has too many responsibilities:

1. It validates the input matrices.
2. It performs the multiplication.
3. It gives a specific format to the result in a text string.

To improve it, let's see how to divide it into smaller functions, ensuring that each one has a unique purpose.

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

In this new interpretation, the main function `multiplyAndFormatMatrix` tells a story that is easy to follow: first
validation is performed, then multiplication, and finally, formatting. In turn, within the validation, we also find a
logical sequence: first each matrix is verified separately, and then the dimensions of both are validated.

The rest of the functions do not narrate a story, but perform specific operations, each clearly reflected in its name.
Furthermore, this code does not require additional comments, as the functions are short enough and their names are
well chosen.

Surely, some readers will have noticed that the second code is more extensive. **This does not matter**. More lines of
code or statements do not necessarily imply greater algorithmic complexity (i.e., the second program is not
significantly more expensive in terms of execution). At a human level, it is always preferable to work with more
extensive but understandable code, rather than compact but difficult-to-understand code.

## Requirements evolve

In any project, requirements are constantly evolving. Suppose the client who requested the functionality in
`multiplyAndFormatMatrix` now only needs to validate and multiply the matrices, without formatting the result. With
the second approach, implementing this change would be as simple as writing the following:

```typescript
function multiplyMatrixes(matrixA: Matrix, matrixB: Matrix): string {
  validateMatrixes(matrixA, matrixB);
  return multiplyMatrixes(matrixA, matrixB);
}

```

In contrast, in the first code, complying with this new requirement would imply refactoring the function, which does
not always imply a simple task.

## The code grows horizontally

We have already seen how code can grow vertically and what we must do to reduce this length. However, code also expands
horizontally, and this represents a problem for readability, and consequently, maintenance.

### Lines too long

The first culprit contributing to horizontal growth is **lines that are too long**. These can arise for various
reasons, such as extensive text strings, excessively long variable or function names, complex arithmetic or logical
expressions, and function calls with numerous parameters.

Historically, a limit of 80 characters per line was established, a convention that is still strongly supported. With
this value, no developer should have viewing problems on their screen. Anyway, with the evolution of screens, editors,
and languages, some developers have extended this limit to 120 characters. Beyond the exact number, the important
thing is to avoid excessively long lines that make reading difficult, and even more importantly, **prevent
horizontal scrolling**, as this severely affects code navigability.

:::tip[Pro Tip]
A line of code must never cause horizontal scrolling.
:::

To solve this problem, we can apply several strategies. For example:

#### Splitting expressions into multiple lines

Instead of a long expression on a single line:

```python
total_price = base_price + (base_price * tax_rate) - (base_price * discount) + shipping_fee

```

We can divide it into several lines that improve reading:

```python
total_price = (
    base_price
    + (base_price * tax_rate)
    - (base_price * discount)
    + shipping_fee
)

```

Note that this solution, while adding more lines to our code, does not add more statements. On the other hand, every
modern editor has the option to collapse statements, then, using this option one would see something like the following:

```python
> total_price = (...

```

and could expand the statement when necessary.

#### Using intermediate variables

If we have a line with multiple operations, for example:

```python
final_value = (quantity * price_per_item) + (quantity * price_per_item * tax) - discount

```

We can decompose it into intermediate variables

```python
subtotal = quantity * price_per_item
tax_amount = subtotal * tax
final_value = subtotal + tax_amount - discount

```

In this case, we are indeed adding more statements to our function, but it is not adding any visual complexity to the
code.

#### Restructuring functions with many parameters

The following function has many parameters on a single line

```python
def send_email(receiver: str, subject: str, message: str, is_html: bool, attach_signature: bool, template: str) -> bool:
    # code ...

```

We can rewrite it in the following way:

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

In these cases, the *collapse statements* option can also be used.

This strategy is also applicable to function calls.
For example, instead of:

```python
# Unformatted code, less readable:
send_email(user.email, "Welcome!", "Hello, we are happy to have you.", True, False, "footer.html")

```

we can write:

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

While it is not recommended for a function to have too many parameters, in some cases external libraries impose this
structure on us. Later in this chapter, we will address this issue in detail.

#### Restructuring dictionaries or objects

A similar problem occurs with Python dictionaries and JavaScript objects. These become very long to define in a single
line. The previously presented solution also applies to these cases.

```python
# When we have a dictionary with many keys
login_error = {"name": "Login error", "http_status": 400, "context": "...", "message": "The username or password is incorrect"}

# We can organize it into several lines
login_error = {
    "name": "Login error",
    "http_status": 400,
    "context": "...",
    "message": "The username or the password in incorrect"
}

```

### Many levels of indentation

Excessive levels of indentation are another factor contributing to the horizontal growth of code. Indentation, which
consists of adding spaces at the beginning of lines, is used to reflect the hierarchical structure of the program and
facilitate reading the flow of execution. In languages like Python, it is a mandatory part of the syntax, while in
others, it primarily fulfills a visual function.

While good indentation helps understand the code organization, when too many levels accumulate, it is usually an
indication of unnecessarily complex logic. In these cases, it is advisable to reorganize the code using helper
functions or instructions like `return`, `break`, or `continue` to avoid nested blocks and improve clarity.

:::tip[Pro Tip]
A function should not have more than 3 levels of indentation.
:::

Below, some simple strategies to reduce indentation in programs will be presented.

#### Abstracting indentation levels into new functions

Let's observe the following function `process_nested_json()`, which handles processing a list of nested objects:

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

Clearly, the function does not follow the defined guideline regarding 3 maximum levels of indentation. For this very
reason, understanding what the body of the function performs is not an easy task. Let's compare this implementation
with one that better modularizes the task by introducing helper functions:

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

In this case, the main function `process_nested_json` is exclusively responsible for iterating over users and
delegating tasks to other functions. This approach greatly improves code reading, as it is not necessary to read the
entire implementation completely. It suffices to observe the `for` loop and the call to the corresponding function to
understand broadly what is happening: *the function returns all special items from completed orders for all users*.
Then, in case one wants to understand more deeply, one can always review the implementations of the helper functions.

:::note[Typing is not free]
One of our guidelines says that we must always type functions, but we are not typing the example code.
This is to focus on the code refactor, because when one is not accustomed, types can make code reading difficult.
:::

:::note[Exercise]
How would you type the functions in the last example? **Hint**: you can use an *alias* to simplify the task. With
*aliases* we introduce the following types

* `SpecialItemInfo = Dict[str, int]`,
* `User = ...`,
* `ItemInfo = ...`,
* `SystemData = ...`
such that `process_nested_json` has the type
`def process_nested_json(data: SystemData) -> List[SpecialItemInfo]`.

What would be a better name for the function?
:::

#### Returning values early

The discussion about whether functions should have more than one return point does not have a universally correct
answer; it depends largely on how the developer implements the logic. However, multiple returns can be useful to
simplify logic, especially when we want to prevent excessive indentation levels. Let's look at the following example:

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

Although it is a simple example, in more complex codes its reading could become difficult, mainly due to the number of
conditions one has to keep in mind. Now, let's compare with an improved version of this function that makes use of
early returns to reduce nesting and improve reading:

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

In this second version, conditions that invalidate the user are handled immediately, leaving a clearer flow and
eliminating unnecessary indentation.

#### Making use of `continue` in loops

The strategy of returning values early is not always possible, such as in the case of a loop. Its analogue for this
case is to use the `continue` statement to execute the next iteration and avoid nesting more logic in a loop.

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

For this simple example, we see that the loop has two nested `if` conditions. Each of them includes a new indentation
and a condition for the reader to keep in mind. Now let's observe this new version:

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

In this code we can observe that, when the `if` conditions are not met, a `continue` is automatically performed. With
this we not only simplify the logic and reading, but in extreme cases we could avoid computationally expensive
calculations.

## White spaces

White spaces are any tabulation, line break, or simply separations between keywords, operators, or blocks of code.
While they do not contribute to the real functionality of the program, white spaces are essential for programs or
classes to be more readable. Thus, they are a very important factor when reorganizing code.

Just as in a literary text the writer uses punctuation marks so the reader understands the flow of the text,
developers must use white spaces to allow the code to breathe. It is possible to eliminate visual clutter simply by
separating functionalities or similar actions within a function, or adding spaces between operators. Consider the
following code fragment:

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

In this example, the lack of white spaces makes the code difficult to read. There are no blank lines between functions
nor spaces between operators, which makes it difficult to identify the distinct sections of the code. If this messy
style extends to a complete file, the code becomes unmanageable.

:::tip[Pro Tip]
Use white spaces between different parts of the code.
:::

Let's see the corrected version now:

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

This code is more readable, breathes, and allows the developer reading it to more easily differentiate each of the
parts.

### When to include blank lines?

If we observe the previous example as part of a larger file, we can notice that there are different *moments* in the
code:

* **Definition of interfaces**: `Information`
* **Helper functions**: `hexToString` and `getUserById`
* **Main function**: `parseUserInformation`

Within this main function, there are also distinct *moments*:

* **Initialization of variables**
* **Flow controllers**: `if`
* **Return of result**

All these *moments* are the parts of our code; knowing how to differentiate them is fundamental to making use of
spacing between them and improving code comprehension.

#### Basic rules for the use of white spaces

1. **Separate functions, classes, interfaces, or types**
* This facilitates the quick identification of the main code components.


2. **Logically group code blocks within functions**
* Separate sections within a function with blank lines to distinguish:
* Variable definitions
* Function calls
* Flow control blocks (`if`, `while`, `for`, ...)
* Return of result




3. **Add spaces around operators and conditions**
* Adding spaces between binary operators or complex conditions within control structures helps both who writes
and who reads the code. This facilitates distinguishing elements and understanding the precedence of operations.
* It is not the same to read `a + b` as `a+b`, and this difference becomes even more evident as expressions
become more complex or parentheses are added. Let's see an example:



In a very complex condition, the lack of spaces hinders
understanding the precedence of operators

```typescript
while((isEven||(isOdd&&n%5!==0)&&errorStr===null)){
    // code ...
}

```

By adding spaces, the condition becomes a bit clearer

```typescript
while ((isEven || ( isOdd && n % 5 !== 0)) && errorStr === null) {
    // code ...
}

```

Even so, this condition remains imperfect; it is complicated to read and understand what is being verified. Reviewing
and rethinking this code should be a first approach for any developer.

#### Use of formatting tools

It is possible to automate the handling of white spaces through *code formatting tools*, such as
**[Prettier](https://prettier.io/)** in JavaScript or **[Black](https://black.readthedocs.io/en/stable/)** in Python.
These tools apply rules so that the code maintains a uniform style. These rules can be adapted to the style preferred
by the developer or required by the project through a configuration file.

Some code editors allow configuring these rules so that they run automatically every time a file is saved. This
guarantees that all project code maintains a consistent style and is easy to read.

### Vertical alignment

A last type of important spacing is the **vertical alignment** of code using tabs or spaces. In this strategy,
contiguous lines are organized so that they remain visually aligned, which facilitates code comprehension.

Commonly, we use this technique around the equal symbol `=`, or when structuring array elements in a way that improves
readability. Although it is not strictly necessary, vertical alignment adds order and clarity in repetitive fragments,
which helps detect typing errors or other problems in the code. However, this practice can conflict with certain
automatic formatting tools, which do not always preserve alignment and force a different style.

Consider the following example:

```typescript
function configureEndpoints() {
    const userEp          = getEndpointUrl("user",    "v1", true);
    const paymentEndpoint = getEndpointUrl("payment", "v1", false);
    const orderEndpoint   = getEndpoitUrl("order",    "v1", true);
    // ...
}

```

By aligning the assignments around the `=`, error detection is facilitated. In this case, we can quickly notice that
in the third line there is a typo: `getEndpoitUrl` instead of `getEndpointUrl`.

## Summarizing guidelines

To improve the readability of our functions we must keep in mind the following aspects:

* The body of functions must remain short; 10 statements would be ideal. Long functions usually perform many
actions and this is not desirable.
* It is important that lines of code do not cause horizontal scrolling, as this only hinders development and
reading. We can use diverse options to avoid this:
* Split expressions into multiple lines
* Use intermediate variables
* Restructure functions with many parameters
* Restructure dictionaries or objects


* Excessive indentation is a problem; it makes it difficult to follow the flow of the code. Again there are
different solutions:
* Abstract indentation levels into new functions
* Return values early
* Make use of `continue` in loops


* Know how to take advantage of white spaces so the code breathes. When we add spaces between logically similar
blocks, we allow readers to differentiate *moments* in the code. With this, it is simpler to follow the main idea.