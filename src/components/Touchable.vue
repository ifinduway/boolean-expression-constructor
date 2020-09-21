<template lang="pug">
    .touchable(v-ripple="{ class: 'deep-purple--text' }")
        slot
</template>

<script>
export default {
    name: 'touchable',
};
</script>

<style lang="sass" scoped>
.touchable
    user-select: none
    cursor: pointer
</style>
