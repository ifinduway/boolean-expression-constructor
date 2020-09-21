// const LaTeXLiterals = {
//     [BooleanOperations.Conjunction]: '\\wedge',
//     [BooleanOperations.Disjunction]: '\\vee',
//     [BooleanOperations.Equivalence]: '\\equiv',
//     [BooleanOperations.ExclusiveOr]: '\\oplus',
//     [BooleanOperations.Implication]: '\\to',
// };

export default class BooleanOperation {
    constructor({
        name,
        gate,
        LaTeXInterpolator,
        processor,
    }) {
        this.name = name;
        this.gate = gate;
        this.LaTeXInterpolator = LaTeXInterpolator;
        this.processor = processor;
    }

    toLaTeX(expression, { booleanOperationFormat = 'mathematical' }) {
        return this.LaTeXInterpolator[booleanOperationFormat](expression);
    }
}
