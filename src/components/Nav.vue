<template>
    <nav>
        <router-link to="/labels" class="item" active-class="selected">
            <Icon name="labels"/>
            标签
        </router-link>
        <router-link to="/money" class="item" active-class="selected">
            <Icon name="money"/>
            记账
        </router-link>

        <router-link to="/statistics" class="item" active-class="selected">
            <Icon name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
  // import  x from '@/assets/icons/Labels.svg';
  // console.log(x)

  import Icon from '@/components/Icon.vue';
  export default {
    name: 'Nav',
    components: {Icon}
  };
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";
    nav {
        display: flex;
        @extend %outer-shadow;
        flex-direction: row;
        font-size: 12px;
        > .item {
            padding: 2px 0;
            width: 33.3333%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        .icon{
            width: 34px;
            height: 34px;
        }
        }
        > .item.selected{
            color: $color-hightlight;
        }
    }
</style>