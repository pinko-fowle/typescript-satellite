# Decorators!

Decorators are an experimental feature in Typescript (and a stage 2 ES proposal: https://github.com/tc39/proposal-decorators).

The purpose of them is to add a layer of Metaprogramming to the language, that lets you separate some cross-cutting concerns out of your inheritance tree. Think of it like kind of like the same level of abstraction that a high-order function gives you (in fact we'll see a lot high order functions to implement the decorators).

## Exercises

1.  Add basic logging decorators to each level of the Satellite class.
2.  Add some validation decorators to the properties of the Satellite class (for TLE you can just checks that it starts with a 1 or 2 depending on the line) and layer them on top of the logging. Make these decorators take a string argument for which validation to run.

## Reading

Handbook: https://www.typescriptlang.org/docs/handbook/decorators.html
Some interesting examples: https://github.com/NetanelBasal/helpful-decorators
