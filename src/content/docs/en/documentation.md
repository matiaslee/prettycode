---
title: Documentation and Comments
description: asdf
---


Code evolves constantly: it is modified, deleted, rewritten. During this process, developers must consider multiple
factors, from preconditions and edge cases to assumptions that cannot always be expressed directly in the code. As a
result, when a new developer joins the team or reviews the code, inevitable questions arise: *Why was this check not
performed?* or *What is the reason behind this decision?* To avoid these situations, it is fundamental that the code
clearly expresses those non-trivial considerations. In this chapter, we will address this topic through
**documentation**.

It is important to clarify that, although we will talk about documentation, we are not referring to the external
documentation of a project, such as development plans or API descriptions. Documenting externally can be costly, as it
requires constant maintenance to remain aligned with the code. Often, the reality of the system is in the code itself,
and external documentation tends to lag behind, generating inconsistencies. Given this, experienced developers always
end up reviewing the code before the documentation. It is for all this that we will focus on the internal documentation
that accompanies the code and enriches it, helping developers to more quickly understand the **natural language
semantics** of the code.

To make explicit the considerations that influence the code, two main tools are employed: informational comments and
internal documentation comments. **Informational comments** are *annotations within the code, and explain decisions,
assumptions, or momentarily point out aspects to review*. **Internal documentation comments**, on the other hand, refer
to Python *docstrings* or JavaScript *JSDoc*, which provide descriptions for functions, classes, and modules.

Comments are also present in **natural language semantics**, that is, the *description of the program according to what
the developer intends the code to do*. A well-written and readable code is not enough if it contains assumptions that
only the original developer knows. Adding a precise comment can add a lot of value, as it contextualizes decisions and
explains the *story* of the code. Just as a narrator describes the motivations of characters in a novel, a good comment
can clarify a line of code that, at first glance, might seem confusing.

In this chapter, we will analyze comments and internal documentation in more depth. We will also give recommendations
that differentiate any comment from one that is truly useful.

## Types of Documentation in Code

As we have already seen, there are different types of comments, each with a specific purpose within the code.
Understanding their differences is key to using them effectively and avoiding redundant or unnecessary comments.

### Informational Comments

Informational comments explain aspects of the code that are not evident at first glance. Their purpose is to clarify
design decisions, assumptions, or important details that might not be obvious to other developers. These comments do not
follow a rigid format and can be found both in a single line and in a set of them (block comment). By using them we are
anticipating the reader's doubts, answering questions that have not yet been formulated. Let's look at an example:

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

Without the comment, the main mathematical operation might seem like an arbitrary calculation. However, it seeks to
answer a key question: *Where does this calculation come from?* Note that this comment might not be necessary if
instead we write a function with a descriptive name that performs the distance calculation, leaving comments only for
clarifications that the code alone cannot convey.

If a comment refers to several statements, it may be a sign that those lines should be encapsulated in a function. If we
add a descriptive name to that function, we have a function that can explain itself, thus avoiding the use of comments.
Ideally, **code should not depend on comments for its understanding**. Although sometimes it is necessary to clarify
aspects that cannot be expressed with code, these cases should be the exception and not the rule.

:::tip[Pro Tip]
Informational comments should be used exceptionally.
:::

There are situations where informational comments can add real value to the code and we must ensure that this really
happens. A statement and a comment occupy the same space on the screen, which is why we must know when to use them.
Now, what should a useful comment include?

* **The *why* rather than the *what*:** A comment should clarify the intention behind a statement, rather than
describing what it does.
* **Additional context that the code cannot express by itself:** For example, if there is a technical limitation or a
specific convention to follow.
* **Important technical decisions:** Explain why a data structure was chosen over another or why a particular
algorithm was implemented.
* **Explanation of non-trivial solutions:** If a problem was solved in an unconventional way, it is useful to
document it for future developers.

It is not only important to know when and what to comment, but also how to do it. A good comment must be clear and easy
to understand without omitting essential details. Furthermore, it must be brief and direct, avoiding any unnecessary
clarification.

### Tag Comments

Within informational comments, we can find a subcategory: **tag comments** (or marker comments). Unlike comments that
explain the code, these seek to communicate information to developers by pointing out possible problems, pending tasks,
or known errors. They are distinguished because they begin with a *tag word* written in uppercase, which facilitates
their identification in the code. Some of the most common tags are:

* **TODO**: Indicates a pending task or some functionality that needs to be implemented.
* **FIXME**: Indicates a problem that needs to be reviewed.
* **BUG**: Points out a known error that must be fixed.
* **HACK**: Marks a temporary or less than ideal solution that could be improved.

Large work teams or companies usually define conventions on when and how to use these tags. In some cases, they even
create their own *tag words* to reflect specific needs within the project.

We must not forget that these comments should be temporary and not remain indefinitely in the code. Ideally, if one is
working on surrounding code and it is possible to resolve the comment, it is good to do so. Another option is to
periodically perform a global search in the project to identify these annotations.

## Internal Documentation

In **natural language semantics**, sometimes a good function or variable name simply is not enough to fully communicate
the developer's intention. That is why it is useful to accompany the code with *docstrings*.

A ***docstring*** is nothing more than *a special comment located at the beginning of a function, whose purpose is to
briefly document its usage and serve as a guide for developers*. It is generally composed of three parts:

1. **Function description:** Explains its purpose and context of use.
2. **Parameter description:** Details the input arguments, which can include pre and post conditions, as well as extra
information such as expected data types.
3. **Return value:** Indicates what the function returns, with an optional description of the result and its type.

Note that *docstrings* can apply not only to functions or classes but also to variables and other code elements that
require structured documentation.

:::note
*docstring* is the term used in Python and other languages for this type of comments, but most modern languages have
similar formats. For example, JavaScript and TypeScript use **JSDoc**, while Java uses **Javadoc**, among other
documentation standards.
:::

Many code editors allow visualizing *docstrings* by hovering the cursor over the function name. This is especially
useful when working with external libraries, as it allows understanding their usage better without needing to review the
implementation or external documentation.

When writing the *docstring* of a function, we must always compare the function name with what is written. If a
*docstring* turns out to be redundant with respect to the function name, then the name is well chosen. On the other
hand, if the *docstring* uses verbs or nouns that do not appear in the function name, this may be an indication that
the name is poorly chosen. For this reason, we introduce the following guideline:

:::tip[Pro Tip]
Always write *docstrings* and compare them with the function name.
:::

The docstring must provide information that the function name cannot express alone, such as the exceptions it handles,
the units of measurement of variables, or the format of the return value. Let's look again at the example of the
previous function and analyze its description through TypeScript internal documentation:

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

First, we can observe that there is a comment in the definition of the `Coordinates` type, which indicates that if we
use this type, we are dealing with latitude and longitude values in degrees. This is crucial because it prevents
unexpected errors related to units of measurement.

On the other hand, the main comment is found in the function that calculates the distance between satellites. In this
case, it specifies that the *Haversine* formula is used, and information about types is provided. Although in
TypeScript type definition makes this part redundant, in JavaScript it can be very useful. Finally, the comment gives
us extra information that we would not know without reading the implementation, such as that the return value type is a
number expressing the distance between the two satellites in **kilometers**, or that the function will throw an
exception in case of invalid values for latitude and longitude.

Below is the code translated to Python with its corresponding *docstring*:

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

In this code, we can notice some differences and similarities between **JSDoc** and **docstring**. However, these are
only their main characteristics; there are more details that can be included depending on the language and
implementation. Additionally, we can encounter diverse additional formats, such as the one used in the Python `numpy`
library, which has its own convention for *docstrings*. In general for Python, it is recommended to use the format
proposed by `PEP 257` or with similar modifications.