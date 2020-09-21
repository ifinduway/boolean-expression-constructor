import RandomFactory from '../modules/RandomFactory';

import BooleanExpression from './BooleanExpression';
import BooleanExpressionVariable from './BooleanExpressionVariable';
// import BooleanOperation from './BooleanOperation';

const DefaultRules = [
    // no group top priority operations
];

export default class BooleanExpressionBuilder {
    constructor({
        variables, operands, operations, rules = DefaultRules,
    }) {
        this.variables = variables;
        this.operations = operations;
        this.operands = operands;
        this.rules = rules;
    }

    build() {
        let secd = this.operands - 1;
        const varSetsRepeat = Math.ceil(this.operands / this.variables.length);

        const varPool = RandomFactory.shuffle(
            Array(varSetsRepeat)
                .fill(0)
                .reduce(a => a.concat(this.variables), []),
        );

        const initOp = [new BooleanExpressionVariable(varPool.pop())];

        while (secd > 0) {
            const p = RandomFactory.getRandomFromRange(1, secd >= 2 ? 2 : secd);
            let oper = null;

            if (p === 1) {
                // alert(varPool);
                oper = new BooleanExpressionVariable(varPool.pop());
            } else {
                oper = new BooleanExpression([
                    new BooleanExpressionVariable(varPool.pop()),
                    this.operations[RandomFactory.getRandomFromRange(0, this.operations.length - 1)],
                    new BooleanExpressionVariable(varPool.pop()),
                ]);
                oper.isNegated = RandomFactory.getRandomBoolean();
            }

            initOp.push(this.operations[RandomFactory.getRandomFromRange(0, this.operations.length - 1)]);
            initOp.push(oper);
            secd -= p;
        }

        return new BooleanExpression(initOp);
    }
}
