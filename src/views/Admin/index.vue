<template lang="pug">
    .layout.column.grow.justify-center.align-center
        v-card(style="width: 500px")
            .grey.lighten-5.px-2.layout(v-if="!$store.getters['user/isAuthorized']" style="height:48px")
                .layout.justify-center.align-center(v-if="$store.getters['user/isAuthPending']")
                    v-progress-circular(indeterminate :size="24" :width="2" color="grey")

                AuthDialog(v-else)

            .grey.lighten-5(v-else)
                .layout.justify-space-between.align-center
                    .py-2.pr-2.pl-4
                        .body-2 {{ $store.state.user.userData.name }}
                        .grey--text {{ $store.state.user.userData.email }}

                    v-btn(outline @click="$store.dispatch('user/logout')") выйти

            v-divider.grey.lighten-3

            v-tabs(v-model="activeTab" slider-color="primary" color="grey lighten-5")
                v-tab Задания
                v-tab Группы

                v-tab-item: Generator
                v-tab-item: Groups
</template>

<script>
import AuthDialog from '@/layout/AuthDialog';

import Generator from './Generator';
import Groups from './Groups';

export default {
    components: {
        AuthDialog,
        Generator,
        Groups,
    },

    data: () => ({
        activeTab: null,
    }),
};
</script>

<style lang="sass" scoped>

</style>
