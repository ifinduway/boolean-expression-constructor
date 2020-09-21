<template lang="pug">
    .layout.column.grow.justify-center.align-center
        div(style="position: absolute; bottom: 16px; right: 16px;")

            AuthDialog(v-if="!$store.getters['user/isAuthorized']")

            .layout(v-else)
                v-btn(flat color="primary" to="/admin") {{ $store.state.user.userData.email }}
                v-btn(flat @click="$store.dispatch('user/logout')") выйти

        v-card.grey.lighten-4(style="width: 400px; overflow: hidden;")
            v-window(v-model="step")
                v-window-item(:value="1")
                    div(v-if="!$store.getters.isGroupsLoaded && !$store.getters.isTasksLoaded")
                    .pa-3(v-else)
                        v-select(
                            label="Группа"
                            solo
                            hide-details
                            @change="onSelectGroup"
                            :value="group"
                            item-value="_id"
                            item-text="name"
                            :items="$store.state.groups")

                        v-select.mt-3(
                            :disabled="!group"
                            label="Задание"
                            solo
                            hide-details
                            @change="onSelectTask"
                            item-text="name"
                            item-value="_id"
                            :value="task"
                            :items="groupRelatedTasks")

                        v-select.mt-3(
                            :disabled="!task"
                            label="Вариант"
                            solo
                            hide-details
                            @change="onSelectVariant"
                            :value="variant"
                            :items="taskRelatedVariants")


                v-window-item(:value="2")
                    .white
                        v-btn.mt-3(small flat @click="backFromTaskView")
                            v-icon(left) mdi-chevron-left
                            | назад

                        .px-4.pb-3.pt-2(v-if="selectedTarget")
                            .headline {{ selectedTarget.name }}
                            .mt-2 {{ selectedTarget.text }}

                    v-divider

                    .layout.justify-center.pa-4(v-if="selectedTarget")
                        LaTeXExpression(:expression="selectedTarget.expression")

</template>

<script>
import AuthDialog from '@/layout/AuthDialog.vue';
import LaTeXExpression from '@/components/LaTeXExpression.vue';

export default {
    components: {
        AuthDialog,
        LaTeXExpression,
    },

    data: () => ({
        group: null,
        task: null,
        variant: null,

        target: null,

        step: 1,
    }),

    computed: {
        groupRelatedTasks() {
            if (!this.$store.state.tasks) return [];
            return this.$store.state.tasks.filter(e => e.forGroup === this.group);
        },

        taskRelatedVariants() {
            if (!this.$store.state.tasks || !this.task) return [];

            const va = Array.from({ length: this.$store.state.tasks.find(({ _id: id }) => id === this.task).variants.length }, (v, k) => k + 1);
            return va;
        },

        selectedTarget() {
            if (!this.variant) return null;

            const t = this.$store.state.tasks.find(({ _id: id }) => id === this.task);

            return {
                name: t.name,
                text: t.description,
                expression: t.variants[this.variant - 1],
            };
        },
    },

    methods: {
        onSelectGroup(e) {
            this.group = e;
            this.task = null;
            this.variant = null;
        },

        onSelectTask(e) {
            this.task = e;
            this.variant = null;
        },

        onSelectVariant(e) {
            this.variant = e;
            this.step = 2;
        },

        backFromTaskView() {
            this.step = 1;
            this.variant = null;
        },
    },
};
</script>

<style lang="sass" scoped>

</style>
