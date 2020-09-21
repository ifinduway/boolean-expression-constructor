<template lang="pug">
v-dialog.grow(
    v-model="isShown"
    width="400"
    lazy)

    slot(name="activator" slot="activator")

    v-card.pa-2
        v-text-field(
            v-model="name"
            label="Название пресета"
            box
            hide-details)

        v-btn.mt-2.mb-0(block color="primary" @click="onPressSave") сохранить
</template>

<script>
export default {
    props: {
        preset: Object,
    },

    data: () => ({
        isShown: false,
        presetToSave: null,
        name: '',
    }),

    methods: {
        async onPressSave() {
            await this.$store.dispatch('user/presetAdd', { presetName: this.name, preset: this.preset });
            this.isShown = false;
        },
    },
};
</script>

<style lang="sass" scoped>

</style>
