<template lang="pug">
div
    v-app#app
        //- div(style="position: absolute; bottom: 16px; right: 16px;")

            AuthDialog(v-if="!$store.getters['user/isAuthorized']")

            .layout(v-else)
                v-btn(flat color="primary" to="/admin") {{ $store.state.user.userData.email }}
                v-btn(flat) выйти

        router-view
</template>

<script>
import AuthDialog from '@/layout/AuthDialog.vue';

export default {
    components: {
        AuthDialog,
    },

    created() {
        this.$store.dispatch('user/auth');
        this.$store.dispatch('loadGroups');
        this.$store.dispatch('loadTasks');
    },
};
</script>


<style lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Material+Icons|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&subset=cyrillic,cyrillic-ext,latin-ext');
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons');

html, body {
    height: 100%;
}

body {
    margin: 0px;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: red !important;
}
</style>
