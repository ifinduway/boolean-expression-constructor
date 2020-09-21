<template lang="pug">
    div(style="overflow: hidden").grey.lighten-4
        v-divider

        .layout.elevation-1.justify-end.grey.lighten-5
            v-text-field(label="новая группа" hide-details placeholder="название" box v-model="newGroupName")
            v-divider(vertical)
            v-btn(color="primary" @click="addGroup" :loading="$store.getters.isGroupsLoading") добавить

        div(style="height: 500px")
            div(v-if="$store.getters.isGroupsLoading") adasdas

            div(v-else v-for="(e, i) in $store.state.groups")
                .layout.align-center(style="height: 50px")
                    .layout.align-center.grow.pl-4 {{e.name}}

                    v-btn.mr-2(flat icon)
                        v-icon mdi-close

                v-divider.grey.lighten-2
</template>

<script>
export default {
    data: () => ({
        newGroupName: '',
    }),

    // mounted( ) { console.log(this.$store) },

    methods: {
        addGroup() {
            this.$store.dispatch('admin/groupAdd', { name: this.newGroupName });
        },
    },
};
</script>

<style lang="sass" scoped>

</style>
