<template>
    <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
        <div class="content" :class="classPrefix && `${classPrefix}-content`">
            <slot/>
        </div>
        <Nav/>
    </div>
</template>

<script>
  export default {
    props:['classPrefix'],
    name: 'Layout',
  };
</script>

<style lang="scss" scoped>
    .layout-wrapper {
        /*border: 1px solid blue;*/
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        /*border: 1px solid black;*/
        overflow: auto;
        flex-grow: 1;
    }
</style>