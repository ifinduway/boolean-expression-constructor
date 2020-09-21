<template lang="pug">
    v-card.variable-selector.layout.align-center(color="transparent" flat)
        .layout.align-center.grow.justify-center
            LaTeXExpression(v-if="expression" :expression="expression")

        v-btn.mr-2(flat icon @click="update")
            v-icon mdi-refresh
</template>

<script>
import LaTeXExpression from '@/components/LaTeXExpression';
import BooleanExpressionBuilder from '@/core/BooleanExpressionBuilder';

export default {
    components: {
        LaTeXExpression,
    },

    props: {
        builder: BooleanExpressionBuilder,
        notation: String,
    },

    data: () => ({
        expression: null,
    }),

    watch: {
        builder: 'update',
    },

    created() {
        this.update();
    },

    methods: {
        update() {
            this.expression = this.builder.build().toLaTeX({ booleanOperationFormat: this.notation });
            this.$emit('change', this.expression);
        },
    },
};
</script>

<style lang="sass" scoped>
.variable-selector
    height: 50px
    cursor: pointer

    &:hover
        background-color: rgba(0,0,0,0.05) !important
</style>
