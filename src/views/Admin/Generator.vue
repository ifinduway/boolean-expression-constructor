<template lang="pug">
    div
        v-divider

        .px-3.pt-3

            div(v-if="$store.getters.isGroupsLoading") loading

            template(v-else)

                v-select(
                    :items="$store.state.groups"
                    item-text="name"
                    item-value="_id"
                    box
                    label="Группа"
                    hide-details
                    v-model="taskGroup")

                v-text-field.mt-2(box label="задание" hide-details v-model="taskName")

                v-textarea.mt-2(box label="текст задания" hide-details v-model="taskText")

                .body-2.mt-4 Формат

                .layout.mt-2
                    SelectableChip.grow.mr-1(
                        @click="setNotation('mathematical')"
                        :selected="notation === 'mathematical'") mathematical

                    SelectableChip.grow.mr-1(
                        @click="setNotation('arithmetical')"
                        :selected="notation === 'arithmetical'") arithmetical

                    SelectableChip.grow(
                        @click="setNotation('programmatic')"
                        :selected="notation === 'programmatic'") programmatic

                .body-2.mt-3 Operators

                .layout.mt-2
                    SelectableChip.grow.mr-1(
                        v-for="(e, i) in availableOperations"
                        :key="i"
                        @click="onOperationToggle(e)"
                        :selected="isOperationSelected(e)" ) {{e.gate}}

                        LaTeXExpression(:expression="e.toLaTeX('', { booleanOperationFormat: notation })")


                .body-2.mt-3 Операнды

                v-slider.shrink.mt-0(
                    v-model="operands"
                    :max="5"
                    :step="1"
                    ticks="always"
                    tick-size="2"
                    min="1"
                    hide-details)

                .body-2.mt-3 Переменные

                v-slider.shrink.mt-0(
                    v-model="variablesCount"
                    :tick-labels="availableVariables"
                    :max="availableVariables.length"
                    :step="1"
                    ticks="always"
                    tick-size="2"
                    min="1"
                    hide-details)

                .layout.mt-4.align-center
                    v-text-field.grey(
                        v-model="expCount"
                        solo
                        hide-details
                        style="width: 0px"
                        type="number" :min="1" :max="100" )

                v-btn.ma-0.mt-2.mb-3(@click="saveTask" block color="primary") создать

        v-divider

        .grey.lighten-5.layout(v-if="$store.getters['user/isAuthorized']" style="height:48px")
            PresetApplyDialog.d-flex.grow.column(:onApply="applyPreset")
                Touchable.grow.d-flex.column(slot="activator" style="height: 100%;")
                    .layout.align-center.justify-center.grow
                        .font-weight-bold(style="text-align: center") ПРИМЕНИТЬ ПРЕСЕТ

            v-divider(vertical)

            PresetSaveDialog.d-flex.grow.column(:preset="serializedPreset")
                Touchable.grow.d-flex.column(slot="activator" style="height: 100%;")
                    .layout.align-center.justify-center.grow
                        .font-weight-bold(style="text-align: center") СОХРАНИТЬ ПРЕСЕТ

        v-divider

        .grey.lighten-3
            template(v-for="(e, i) in expCountArray")
                v-divider.grey.lighten-2(v-if="i !== 0" :key="0 - i")
                ExpressionListItem(
                    :key="i"
                    :builder="builder"
                    :notation="notation"
                    @change="ex => setOutputExpression(i, ex)")
</template>

<script>
import BooleanOperations from '@/core/BooleanOperations';
import BooleanExpressionBuilder from '@/core/BooleanExpressionBuilder';

import LaTeXExpression from '@/components/LaTeXExpression.vue';
import SelectableChip from '@/components/SelectableChip.vue';
import Touchable from '@/components/Touchable.vue';

import ExpressionListItem from '@/layout/ExpressionListItem';
import PresetSaveDialog from '@/layout/PresetSaveDialog';
import PresetApplyDialog from '@/layout/PresetApplyDialog';

export default {
    name: 'home',

    components: {
        LaTeXExpression,
        SelectableChip,
        ExpressionListItem,
        Touchable,
        PresetSaveDialog,
        PresetApplyDialog,
    },

    watch: {
        expCount: 'updateExprs',
        builder: 'updateExprs',
        notation: 'updateExprs',
    },

    data: () => ({
        exp: [],
        expCount: 1,
        variablesCount: 2,
        operands: 2,
        notation: 'mathematical',
        operations: [...BooleanOperations],
        availableOperations: [...BooleanOperations],
        availableVariables: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x9'],
        availableNotations: ['mathematical', 'arithmetical', 'programmatic'],

        taskGroup: null,
        taskName: '',
        taskText: '',
        variants: [],
    }),

    computed: {
        serializedPreset() {
            return {
                taskName: this.taskName,
                taskText: this.taskText,
                notation: this.notation,
                operands: this.operands,
                operations: this.operations.map(e => e.name),
                variablesCount: this.variablesCount,
            };
        },

        expCountArray() {
            return Array(+this.expCount).fill(1);
        },

        variables() {
            return this.availableVariables.slice(0, this.variablesCount);
        },

        builder() {
            const {
                variables, operations, operands, notation,
            } = this;
            return new BooleanExpressionBuilder({ variables, operations, operands });
        },

        isOperationSelected() {
            return o => this.operations.includes(o);
        },
    },

    methods: {
        updateExprs() {
            this.variants.length = this.expCount;
            // console.log(this.variants);
        },

        setNotation(notation) {
            this.notation = notation;
        },

        onOperationToggle(operation) {
            if (!this.operations.includes(operation)) {
                this.operations.push(operation);
                return;
            }

            if (this.operations.length === 1) return;

            this.operations.splice(this.operations.findIndex(e => e === operation), 1);
        },

        setOutputExpression(i, exp) {
            this.variants[i] = exp;
        },

        async saveTask() {
            await this.$store.dispatch('admin/taskAdd', {
                forGroup: this.taskGroup,
                name: this.taskName,
                description: this.taskText,
                variants: this.variants,
            });

            this.taskGroup = null;
            this.taskName = '';
            this.taskText = '';
        },
        applyPreset({
            taskName, taskText, notation, operands, variablesCount, operations,
        }) {
            this.taskName = taskName;
            this.taskText = taskText;
            this.notation = notation;
            this.operands = operands;
            this.operations = operations.map(e => this.availableOperations.find(x => x.name === e.name));
            this.variablesCount = variablesCount;
        },
    },
};
</script>

<style lang="sass" scoped>
.preset-btn
    font-size: 14
    font-weight: 500
    text-transform: uppercase
    justify-content: center
    align-items: center
    display: flex
</style>
