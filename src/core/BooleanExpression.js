import BooleanOperation from './BooleanOperation';

export default class BooleanExpression {
    constructor(blueprint) {
        this.blueprint = blueprint;
    }

    isGroup = false;

    isNegated = false;

    get isComplex() {
        return this.blueprint.length > 1;
    }

    get isGrouped() {
        if (this.isNegated && this.isComplex) return true;

        return this.isGroup;
    }

    toLaTeX(options) {
        let res = this.blueprint.reduce((cres, e) => {
            if (e instanceof BooleanOperation) return e.toLaTeX(cres, options);
            if (e instanceof BooleanExpression) return `${e.toLaTeX(options)} ${cres}`;
            return `${e.name} ${cres}`; // assuming as variable
        }, '');

        if (this.isGrouped) res = `(${res})`;
        if (this.isNegated) res = `\\overline{${res}}`;

        return res;
    }
}
