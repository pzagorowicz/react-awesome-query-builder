This is a fork of [react-awesome-query-builder](https://ukrbublik.github.io/react-awesome-query-builder) and it is based on react-awesome-query-builder@5.2.0, on top of this [commit](https://github.com/ukrbublik/react-awesome-query-builder/commit/359dfd1c0b57f9c00bb19d60cfa3b3dc87563b2c).

The main goal of this modification is to make it possible to use functions in the left-hand side operand of a query. 

Implementation of this feature is experimental and it is based on the right-hand side (RHS) operand logic and components. It intruduces breaking change due to replacing `field` property in the query model with the new properties for left-hand side (LHS) operand: `lhsValue`, `lhsValueSrc`, `lhsValueType` and `lhsValueError`.
