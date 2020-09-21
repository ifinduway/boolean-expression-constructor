import BooleanOperation from './BooleanOperation';

export default [
    new BooleanOperation({
        name: 'Conjunction',
        gate: 'AND',
        processor: (a, b) => a && b,
        LaTeXInterpolator: {
            mathematical: exp => `\\wedge ${exp}`,
            arithmetical: exp => `\\ast  ${exp}`,
            programmatic: exp => ` ${exp}`,
        },
    }),
    new BooleanOperation({
        name: 'Disjunction',
        gate: 'OR',
        processor: (a, b) => a || b,
        LaTeXInterpolator: {
            mathematical: exp => `\\vee ${exp}`,
            arithmetical: exp => `+ ${exp}`,
            programmatic: exp => ` ${exp}`,
        },
    }),
    new BooleanOperation({
        name: 'Implication',
        gate: 'IMP',
        processor: (a, b) => !a || b,
        LaTeXInterpolator: {
            mathematical: exp => `\\to ${exp}`,
            arithmetical: exp => `\\Leftrightarrow ${exp}`,
            programmatic: exp => ` ${exp}`,
        },
    }),
    new BooleanOperation({
        name: 'Equivalence',
        gate: 'EQ',
        processor: (a, b) => a === b,
        LaTeXInterpolator: {
            mathematical: exp => `\\leftrightarrow ${exp}`,
            arithmetical: exp => `\\veebar ${exp}`,
            programmatic: exp => `=== ${exp}`,
        },
    }),
    new BooleanOperation({
        name: 'ExclusiveOr',
        gate: 'XOR',
        processor: (a, b) => a !== b,
        LaTeXInterpolator: {
            mathematical: exp => `\\oplus ${exp}`,
            arithmetical: exp => `\\Rightarrow ${exp}`,
            programmatic: exp => ` !== ${exp}`,
        },
    }),
];
