<template lang="pug">
    .latex-expression(v-html="renderedExpression")
</template>

<script>
import katex from 'katex';
import 'katex/dist/katex.css';

export default {
    props: {
        expression: String,
    },

    computed: {
        renderedExpression() {
            return katex.renderToString(this.expression);
        },
    },
};
</script>

<style lang="sass" scoped>
.latex-expression
    height: 23px
</style>
