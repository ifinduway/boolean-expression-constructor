<template lang="pug">
v-dialog.grow(
    v-model="isShown"
    width="400"
    lazy)

    slot(name="activator" slot="activator")

    v-card.pa-2
        v-select(
            :items="$store.state.user.userData.presets"
            item-text="name"
            item-value="data"
            box
            label="Пресет"
            hide-details
            v-model="preset")

        v-btn.mt-2.mb-0(
            block
            color="primary"
            :disabled="!canApply"
            @click="onApplySelectedPreset") применить
</template>

<script>
export default {
    props: {
        onApply: Function,
    },

    data: () => ({
        isShown: false,
        preset: null,
    }),

    computed: {
        canApply() {
            return !!this.preset;
        },
    },

    methods: {
        onApplySelectedPreset() {
            this.onApply(this.preset);
        },
    },
};
</script>

<style lang="sass" scoped>

</style>
