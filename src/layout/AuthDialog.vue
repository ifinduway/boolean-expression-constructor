<template lang="pug">
    v-dialog.grow(
        v-model="isShown"
        width="400"
        lazy
        :fullscreen="$vuetify.breakpoint.smAndDown"
        :transition="$vuetify.breakpoint.smAndDown ? 'dialog-bottom-transition' : 'dialog-transition'")

        v-btn(
            slot="activator"
            :loading="$store.getters['user/isAuthPending']"
            color="primary"
            flat) войти

        v-card
            v-btn.hidden-md-and-up(flat @click="e => isShown = !isShown" fab fixed right top): v-icon mdi-close

            div(style="height:20px")

            transition(name="user-auth-card-mini__fake-dismiss")
                v-tabs(v-if="isShown" v-model="tabsm" slider-color="primary" centered)

                    v-tab(:ripple="false") Вход
                    v-tab(:ripple="false") Регистрация

                    v-tab-item
                        v-card.d-flex(flat)
                            .layout.column
                                //-v-alert(
                                    dismissible
                                    type="error"
                                    v-if="$store.getters['user/hasAuthError']"
                                    v-model="$store.state.user.authErrorMessage"
                                    style="margin:0" ) {{ $store.state.user.authErrorMessage }}

                                v-form.px-4.pb-4.pt-4.layout.column(ref="authForm" @submit.prevent="(validateAuth() && auth())")
                                    .layout.column(style="flex: 1")
                                        v-text-field.user-auth-card-mini__input(
                                            label="Email"
                                            :rules="authRules.email"
                                            v-model="authForm.email")

                                        v-text-field.user-auth-card-mini__input(
                                            label="Пароль"
                                            :rules="authRules.password"
                                            v-model="authForm.password"
                                            type="password")

                                    v-spacer.hidden-sm-and-down

                                    v-layout.shrink(:column="$vuetify.breakpoint.smAndDown" align-center justify-end)
                                        v-btn(round color="primary" block large type="submit" :loading="$store.getters['user/isAuthPending']") Вход

                    v-tab-item
                        v-card.d-flex(flat)
                            .layout.column
                                //-v-alert(
                                    type="error"
                                    v-if="$store.getters['user/hasRegisterError']"
                                    v-model="$store.state.user.regErrorMessage"
                                    style="margin:0"
                                    dismissible) {{ $store.state.user.regErrorMessage }}

                                v-form.px-4.pb-4.pt-4.layout.column(ref="registerForm" @submit.prevent="(validateRegister() && register())")
                                    .layout.column(style="flex: 1")

                                        v-text-field.user-auth-card-mini__input(label="Email" v-model="registerForm.email" :rules="registerRules.email")

                                        v-text-field.user-auth-card-mini__input(label="Имя" v-model="registerForm.firstName" :rules="registerRules.name")

                                        v-text-field.user-auth-card-mini__input(label="Фамилия" v-model="registerForm.secondName" :rules="registerRules.secondName")

                                        v-text-field.user-auth-card-mini__input(label="Пароль" v-model="registerForm.password" counter="25" hint="8-25 символов" persistent-hint :rules="registerRules.password" type="password")

                                        v-text-field.user-auth-card-mini__input(label="Пароль еще раз" v-model="registerForm.passwordConfirm" :rules="[comparePasswords]" type="password")

                                    v-layout.shrink(:column="$vuetify.breakpoint.smAndDown" align-center justify-end)
                                        v-btn(round color="primary" block large type="submit" :loading="$store.getters['user/isRegistrationPending']") Регистрация
</template>

<script>
export default {
    data: () => ({
        isShown: false,
        isResetPasswordShown: false,
        tabsm: null,

        authForm: {
            email: '',
            password: '',
        },

        authRules: {
            email: [
                v => (v === '' ? 'Введите email' : false),
                v => (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ? 'Введите валидный email' : false),
            ],
            password: [v => (v === '' ? 'Введите пароль' : false)],
        },

        registerForm: {
            email: '',
            firstName: '',
            secondName: '',
            password: '',
            passwordConfirm: '',
        },

        resetPasswordEmail: null,

        registerRules: {
            email: [
                v => (v === '' ? 'Введите email' : false),
                v => (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ? 'Введите валидный email' : false),
            ],
            name: [v => (v === '' ? 'Введите имя' : false)],
            secondName: [v => (v === '' ? 'Введите фамилию' : false)],
            password: [v => (v === '' ? 'Введите пароль' : false)],
        },
    }),

    computed: {
        comparePasswords() {
            return this.registerForm.password !== this.registerForm.passwordConfirm ? 'Введенные пароли не совпадают' : false;
        },
    },

    methods: {
        validateAuth() {
            return this.$refs.authForm.validate();
        },

        auth() {
            this.$store.dispatch('user/login', {
                email: this.authForm.email,
                password: this.authForm.password,
            });
        },

        validateRegister() {
            return this.$refs.registerForm.validate();
        },

        async register() {
            const isDone = await this.$store.dispatch('user/register', {
                email: this.registerForm.email,
                password: this.registerForm.password,
                name: `${this.registerForm.firstName} ${this.registerForm.secondName}`,
            });

            if (isDone) this.isShown = !this.isShown;
        },

        async login() {
            const isDone = await this.$store.dispatch('user/login', {
                email: this.authForm.email,
                password: this.authForm.password,
            });

            if (isDone) this.isShown = !this.isShown;
        },
    },
};
</script>

<style lang="sass" scoped>

.user-auth-card-mini

    &__input
        flex-grow: 0
        flex-basis: auto
        margin-bottom: 10px

    &__fake-dismiss
        &-enter-active
            transition: all 0s ease-out
        &-leave-active
            transition: all 1s ease-in
        &-leave-to
            opacity: 0
        &-enter
            opacity: 0

</style>
