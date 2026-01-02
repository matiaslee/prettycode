---
title: From Syntax and Semantics to Intention
description: asdf
---



All programming languages share two essential components: syntax and semantics.
Syntax is the set of rules that define how to organize the symbols and keywords of a
language to form valid sentences and expressions. On the other hand, semantics is how
those expressions should be interpreted. This can be formalized in different ways;
one of them is operational semantics, which describes the behavior of a program in t
erms of how its instructions are executed step by step. This semantics is divided into
two branches: *small step* semantics and *big step* semantics.

*Small step* semantics describes the execution of programs by dividing them into small steps, that is,
evaluating each instruction sequentially. To do this, it defines a binary relationship that connects each
state of the program before and after performing an instruction. This semantics is useful for knowing what
the state of the program is at a given moment.

On the other hand, *big step* semantics describes the final results of the computation, without worrying about
intermediate states. The objective of this semantics is to reach the final result directly without stopping at
each step.

There are other semantics, such as axiomatic semantics, which describes the meaning of programs through pre-
and post-conditions, or denotational semantics, which describes the behavior of programs using mathematical
objects.

These semantics are useful because they provide different tools to analyze and understand some aspects of
programming languages, but they are not usually used directly when programming. For this reason, we are going
to introduce a new notion of semantics: **natural language semantics**, which describes the program according
to what the developer understands the code does. This semantics is impossible to define formally because it
is subjective to the developer reading the code, but it is important to give entity to its existence. It can
be more or less evident depending on the quality of the code that is written.

Code that correctly applies natural language semantics is **pretty code**, and **pretty code** follows good
programming practices. Among those practices that we will see in this work is the choice of good function
names: a good name makes explicit what the function does. To illustrate this idea, let's consider a classic
example: a function that calculates the Fibonacci sequence.

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

```

Now, let's analyze the following functions that make use of this sequence.

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


```

Although `rabbit_population_growth` and `count_drone_ancestors` share implementation and formal semantics,
their natural language semantics differ as they perform distinct tasks. The first function communicates a
story about rabbit reproduction, while the second focuses on the ancestors of drones in a hive. This
difference allows us to understand the developer's intention because, with a simple glance at the function
name, we will understand a little more about the context of the code in general.

## The Code Tells a Story

If a software system is complex enough, it will be composed of a large number of functions, modules, and
classes interacting with each other (we will simply speak of functions to improve the flow of the text).
If the code is not organized correctly, it will not only become very difficult to understand but also to
extend and maintain. To avoid these problems, it is very important to adopt a clear and structured work
approach, such as the top-down approach.

When we talk about the top-down approach, we say that we must go from the most general level to the most
specific, decomposing the problem into smaller and more manageable parts. In other words, the code written
by a developer must tell a story: the main function must act as an index or summary, presenting the
'chapters' which are nothing more than the functions within the program. Each function details a specific
part of the story, while components such as variables and flow controllers within the functions develop
the content. Let's observe the following code:

```python showLineNumbers
def nuclear_reactor_controller():
  for control in CONTROL_LIST:
    control_result = execute_control(control)
    if control_result.failed():
      trigger_alarm(control, control_result)
      execute_emergency_plan(control, control_result)

```

Most readers probably do not understand the technical details about nuclear reactors, but this code fragment
tells a story clear enough to understand broadly what is happening. It describes how a reactor performs a
series of routine checks and, if any of them fail, an alarm is activated and an emergency plan is executed.
While there are many details we do not know, such as what the controls are or how the alarms are activated,
the design facilitates exploring internal functionalities and understanding the logic behind these actions.

So, to write a good story in code, we must first take into account fundamental concepts, such as the proper
use of variable and function names, writing clear comments, following conventions of the language being used,
and being consistent with the language throughout the code. These are the pillars for writing **pretty code**
that appropriately communicates the developer's intention, achieving a complex project with evident natural
language semantics.

# The Art of Naming

All code is composed of functions and variables. Functions allow us to abstract a block of statements and
reuse it throughout the program, while variables allow us to store and manipulate data. Both functions and
variables have names that allow us to identify and use them. At a syntactic level, some languages impose
restrictions, such as requiring function names to start with a lowercase letter or prohibiting starting with
a number. But beyond those rules, the developer is completely free to choose any name. The problem is that
vague, confusing, or ambiguous names are frequently used, hindering code comprehension. A name will be well
chosen if it makes its natural language semantics unequivocal.

By incorrectly naming a function, we generate misinterpretations, as another developer might think the
function performs actions it does not actually execute, or conversely, we hide functionalities that are not
reflected in the name. The same happens with variables; unclear names can make it difficult to understand the
type of data they store or how that data is being used in the system. That is why we must carefully choose
specific words that accurately describe the purpose of our elements, avoiding generic or empty terms that can
cause ambiguity.

Imagine a function named `processData`; what does the developer intend for this function to do? Understanding
this just by looking at the name becomes an almost impossible task. Does it sum different values? Does it
filter elements according to a specific rule? Ultimately, it is not clear. On the other hand, names like
`calculateTotalWithTaxes()` or `filterValidatedUsers()` provide much more information about the function's
purpose. The same happens with variables; a recurring case is naming them `data` or `value`. These names
offer no information about their purpose or content. Even in languages without a type system like Python or
JavaScript, one does not even have information about the data type it contains.

:::tip[Pro Tip]
Functions and variables must have descriptive names that help understand their meaning.
:::

How can we choose a good name for our functions and variables? The key lies in using appropriate words
to clearly describe what we intend with them. An essential rule is to use names that are easy to locate
and pronounce. Large projects usually contain multiple files and folders, which in turn possess a large
number of variables and functions, so descriptive and easy-to-search names improve readability and save time.
Furthermore, names that can be said naturally are also easier to remember and share. Conversely, a cryptic
name that only its author understands complicates communication and hinders teamwork.


## Guidelines for Naming Functions

When naming functions, it is fundamental to use verbs. Since functions perform actions, what better than
using verbs which are perfect for that. Choosing the correct verb can make a big difference between a clear
name and an ambiguous one. For example, using `distribute` instead of `send`, or `identify` instead of
`find` can lead to much more precise and informative names. If we are unable to find a verb that precisely
describes the intention of our code, then it may be that the function in question performs more than one
action and should be modularized. Ensuring that a function performs a single task is very important, and
that is why we will treat this topic in the following chapters.

In addition, as we are taught from the first years of school, verbs are usually accompanied by other words
that provide more context about the action. In functions, this is equally important. We need specific terms
that clearly describe the scope of the function. In our previous example `calculateTotalWithTaxes`, it not
only indicates that a total value is being calculated, but also that taxes are being considered.


## Guidelines for Naming Variables

Just as we can give descriptive names to functions, there are some good practices when naming variables
that make it easier to understand the purpose of the code. In this case, the use of nouns is ideal for
variables, as they represent entities within the program. However, the variable type also influences how it
should be named. For variables of type `bool`, it is recommended to use prefixes like `is`, `has`, or `can`.
Since these words usually start questions in English, names like `isVisible` or `hasAccess` turn out intuitive
and help understand the meaning of their value at a given moment. It is important, however, to avoid names
with this format that include a negation, like `isNotOpen`, since, although its objective is understood,
confusion can be generated at the moment of its use.

In the case of arrays, lists, or sets of values, plural names are a good practice, like `adminCommands` or
`validUsers`, to reflect the multiplicity of elements. For numeric variables, prefixes like `max`, `min`, or
`total` add valuable context if the value implies some type of range or limit. Likewise, if the variable
represents some measurable unit (like time, distance, or money), including a reference to the unit in the name
adds much clarity and reduces possible unnecessary conversion errors.

Another good practice when naming constants or variables is to leverage the name of the function with which we
initialize them. If the function has a suitable name, that is, it is descriptive and does not generate
confusion, we can use it as a reference to name our variable coherently. Let's see an example where this is
not respected:

```python
new_product = self._get_product_basic_info(product)

```

The name `new_product` suggests that the variable stores an object of a class, but if we observe the function
name, we see that it actually returns the basic information of a product. A more precise name aligned with its
content would be:

```python
product_basic_info = self._get_product_basic_info(product)

```

## Length of Names

Often, when trying to be specific with our names, a new problem arises: their length. So, what is the perfect
length for a name? In general, names that are too long can be difficult to remember and take up a lot of screen
space, but on the other hand, short names do not offer as much information. The key, as always, is to find a
balance, but there are also some recommendations we can follow:

* If the scope of the function or variable is small, for example, a function only used in the same file in which
it is defined or a variable with a lifespan of a few lines, then it is fine to opt for short names. Imagine we
are creating a package with mathematical functions, and we have an auxiliary function to calculate the magnitude
or norm of a vector; we could name our function `norm()` instead of `calculateVectorMagnitude()`.
* We will try to avoid the use of acronyms and abbreviations whenever possible. New developers or those with
little knowledge of the code might have difficulties understanding their meaning. For example, instead of
`calcTtl()`, use `calculateTotalPrice()`.
* Eliminate words that do not provide relevant information. For example, use `toString()` instead of
`convertToString()`.

Following these recommendations, we will achieve clearer and more concise names that will contribute to
readability and facilitate the understanding of functions and the code in general.

## Typing in Code

### Data Types, Function Types, and Their Behavior

A **data type** (or simply type) defines the set of values that a variable can store and the operations that can be
performed on those values. Similarly, functions also possess a type, known as **function type**, which describes the
type of its parameters and its return value.

In most programming languages, data types can be classified into three categories:

* **Primitives**: Basic types provided by the language, such as `int`, `float`, `char`, `boolean`.
* **Composites**: Structures that group multiple values, such as `array`, `tuple`, `struct`.
* **Custom**: User-defined types based on primitive or composite types. These are used to represent specific entities.

Each data type requires a different amount of memory and allows certain operations to be performed. For example, a
boolean variable can only store the values `true` or `false`, which generally occupies a single byte in memory. On the
other hand, numeric types can represent a much wider range of values, so their size in memory is larger.

:::note
Although conceptually, a boolean value should occupy 1 bit, many languages use a byte as this is the minimum
addressable unit of memory.
:::

A recent case demonstrating the importance of choosing suitable types was seen with the release of the language model
from the Chinese company **DeepSeek**. Unlike their competitors, DeepSeek developers opted to
[use fewer bits for their numeric variables](https://www.inferless.com/learn/the-ultimate-guide-to-deepseek-models).
This decision allowed their model to occupy significantly less memory, thus achieving a more efficient system.
### Static Typing vs Dynamic Typing

While all programming languages have some type system, not all handle it in the same way. In some, the type system
is explicit and mandatory, but in other cases, it exists implicitly and is only verified during execution.
These differences lead us to have two main approaches:

**Static Typing.** In languages with **static typing** like `C`, `Java`, or `Rust`, it is necessary to specify the
type of each declared variable. Once defined, this type cannot change throughout the program. The compiler is
responsible for verifying that all operations and functions respect these types, allowing errors to be detected
even before executing the code.

**Dynamic Typing.** Languages like `JavaScript` and `Python` use **dynamic typing**. In them, the type of a variable
is determined during program execution, and can even contain values of different data types at different times.
This flexibility usually speeds up development at the beginning but also increases the risk of making errors if
sufficient precautions are not taken.

### Why Do We Want to Type?

Some developers consider the flexibility of types in dynamic typing to be one of the main virtues of certain
languages, but the truth is that typing code goes beyond a simple formality. Typing is a key tool that improves
code quality. In small projects or simple functions, it may seem unnecessary or even a waste of time, but
acquiring the habit of typing from the beginning is beneficial. In more complex systems, types allow quickly
understanding the purpose of functions with a simple glance, as they clearly define input and output types.
Furthermore, they reduce errors and facilitate maintainability. When we combine explicit typing with good variable
and function names, we obtain clear and easy-to-understand code.

:::tip[Pro Tip]
Always type variables and functions.
:::

#### Typing in JavaScript and Python

Although JavaScript and Python use dynamic typing by default, they originally did not have a formal type system.
Over time, as projects in these languages became more complex, the need to incorporate typing mechanisms that
improved code clarity became evident. This led to the development of languages like TypeScript for JavaScript and
tools like type annotations in Python, which allow greater control over types without giving up the flexibility
that characterizes both languages.

**Type annotations** in Python in the `typing` module are *visual aids included in variables, parameters, and
functions*. These annotations do not interfere in any way with code execution but serve as a guide for both the
developer and external tools. In the following code fragment, we can observe a function that returns a `bool` with
a parameter of type `List[int]`.

```python
def all_positives(numbers: List[int]) -> bool:
	# code ...

```

On the other hand, for JavaScript, TypeScript was developed, a superset of the language that adds optional static
typing among other improvements. Unlike Python, TypeScript does detect type errors; it does this at the moment of
*transpiling* the code to JavaScript, since TypeScript is not executed directly but is converted to a `.js` file.
In the following code fragment, we can observe a TypeScript implementation.

```js
function allPositives(numbers: Array<number>): boolean {
	// code...
}

```

### Recommendations When Typing

We end this section with some situations to avoid and recommendations when working with types in Python and
TypeScript languages. These recommendations should be adapted whenever possible to the programming language being
worked with.

While typing is a very useful tool we can count on, there are bad practices that many developers often commit.

* Abusing the `any` type: In TypeScript, the `any` type allows omitting type verification on variables where it
is used, which means the transpiler will not apply type checks on them. So, why use a type system if its main
advantage is ignored? This not only complicates reading the code but also increases the risk of errors. If the
type of a variable is genuinely unknown, it is preferable to use `unknown`, which explicitly expresses that the
type is unknown but maintains safety at compile time. Something similar happens in Python: using the `Any` type
simply makes the task of other developers difficult.
* Avoiding type casting: In TypeScript, type casting allows us to force the interpretation of a datum as another
type without modifying its real value. Unlike Python, where `int()` or `str()` effectively transforms a datum,
in TypeScript, the transpiler is simply told to trust the developer. This can hide errors, cause inconsistencies,
and make the code less maintainable.

:::note
Type casting is the process of converting a data type into another. In TypeScript, we can perform a casting of a
datum into another type using the word `as`. For example: `'2' as number;` will tell the transpiler to interpret
the string containing the character 2 as a number.
:::

On the other hand, with static typing, we avoid errors and make our code clearer and more maintainable. To make
the most of this functionality, it is recommended to follow some good practices:

* Define custom types: Both in TypeScript and Python, we can create our own types using interfaces, classes, or
aliases. This promotes the reuse of well-defined data structures and improves clarity.
* Validate types from unknown sources: When working with APIs, third-party libraries, or data of unknown origin,
it is fundamental to validate types to avoid errors. In TypeScript, libraries like Zod allow defining robust
validation schemas, while in Python, tools like Pydantic facilitate data validation at runtime. If a datum does
not meet the expected format, these tools allow errors to be thrown in a controlled manner, avoiding more serious
failures in the system.

## Other Recommendations

### Follow Language Conventions

Developers are free to write code however they wish as long as it works correctly. However, every programming
language has a set of guidelines that recommend styles, practices, and methods for different aspects of
development. These conventions seek to standardize the hierarchy and architecture of files and folders, rules for
comments, and the format of names and spacing, among other aspects.

Following these conventions helps maintain uniformity in *software* projects. If the code looks consistent across
all files and modules, it will be easier to understand its structure and operation. As a result, maintenance and
collaboration are simplified. Although it is not mandatory to follow these norms, knowing and applying them is
essential to fully master a language.
Below are the naming conventions for functions, variables, classes, and other elements in Python and JavaScript.

Python:

* **Functions:** in lowercase, with words separated by underscores (*snake_case*). Example `my_function`.
* **Variables:** follow the same convention as functions.
* **Classes:** each word starts with an uppercase letter and no separators are used (*PascalCase*). Example: `MyClass`.
* **Methods:** same as functions, in *snake_case*.
* **Constants:** same as functions, but completely in uppercase (*SCREAMING_SNAKE_CASE*). Example `THIS_CONSTANT`.
* **Packages:** in lowercase, without underscores. Example `mypackage`.

JavaScript - [AirBnB Style Guide](https://github.com/airbnb/javascript):

* **Functions:** the first word in lowercase, subsequent ones with initial uppercase and no separators (*camelCase*). Example `myFunction`.
* **Variables:** follow the same convention as functions.
* **Classes:** same as in Python, using *PascalCase*. Example: `MyClass`.
* **Methods:** same as functions and variables, in *camelCase*.
* **Constants:** written in uppercase with underscores (*SCREAMING_SNAKE_CASE*), as in Python. Example `THIS_CONSTANT`.
* **Packages:** depends on the project and file type; generally, there is no defined convention except for special cases.

### Be Consistent in Language Usage

Choosing a language and maintaining it throughout a project is fundamental to maintaining coherence in the code.
If, for example, in one file we use a variable `counter` and then in another a variable `contador`, we will be
creating an inconsistency that can generate confusion, especially in work teams with speakers of different
languages.

Generally, English is usually the preferred language for writing code, as it coincides with the keywords of most
programming languages and also facilitates communication and integration in multicultural work teams. It is
important to avoid using special characters like *ñ*, *á*, *ü* as they can cause compatibility errors or hinder
code writing and understanding. On the other hand, a large part of the documentation for languages, libraries,
and APIs is in English, so choosing this language also facilitates access to resources and good practices.

## Summarizing the Guidelines:

* Natural language semantics must be evident: When someone reviews any code, they should be able to explain what
it does without problems.
* When writing code with a top-down approach: functions go from the most general to the most concrete, always
telling a story, thus obtaining evident natural language semantics.
* It is important to choose good names for variables and functions. Both types of names must maintain coherence.
* Typing is important to give more clarity to the code.
* Follow the conventions of the language you use.
* Be consistent with the language.