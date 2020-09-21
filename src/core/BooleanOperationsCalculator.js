import Operations from './BooleanOperations';

export default {
    [Operations.Conjunction]: (a, b) => a && b,
    [Operations.Disjunction]: (a, b) => a || b,
    [Operations.Implication]: (a, b) => !a || b,
    [Operations.Equivalence]: (a, b) => a === b,
    [Operations.ExclusiveOr]: (a, b) => a !== b,
};
