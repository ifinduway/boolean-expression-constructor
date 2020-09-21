<template lang="pug">
    .selectable-chip(:class="classes" @click="onClick")
        slot
</template>

<script>
export default {
    props: {
        selected: Boolean,
    },

    computed: {
        classes() {
            return {
                'selectable-chip--selected': this.selected,
                'elevation-1': this.selected,
            };
        },
    },

    methods: {
        onClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="sass" scoped>
.selectable-chip
    border-radius: 10px
    padding: 8px 8px
    cursor: pointer
    transition: all 0.2s
    text-transform: uppercase
    text-align: center
    font-size: 12px
    letter-spacing: 1px
    font-weight: 500
    background-color: rgba(0,0,0,0.04)
    user-select: none
    font-weight: bold

    &:hover
        background-color: rgba(0,0,0,0.07)

    &--selected
        color: white
        background-color: #541388

        &:hover
            background-color: #541388
</style>
