<template>
    <Layout>
        <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id"
                        class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>¥{{item.amount}}</span>

                    </li>
                </ol>
            </li>
        </ol>
    </Layout>

</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Vue from 'vue';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({
    components: {Tabs},
  })
  export default class Statistics extends Vue {
    tagString(tags:Tag[]){
      return tags.length === 0 ? '无':tags.join(',')
    }
    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get result() {
      const {recordList} = this;
      type HashTableValue = { title: string, items: RecordList[] }
      const hashTable: { [key: string]: HashTableValue } = {};
      for (let i = 0; i < recordList.length; i++) {
        const [date, time] = recordList[i].saveAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    interval = 'day';
    intervalList = intervalList;
    recordTypeList = recordTypeList;
  }
</script>
<style scoped lang="scss">
    %item {
        padding: 8px 16px;
        min-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .title {
        @extend %item;
    }

    .record {
        @extend %item;
        background-color: white;
    }
    .notes{
        margin-right: auto;
        margin-left: 16px;
        color:#999;

    }


    ::v-deep {
        .type-tabs-item {
            background: white;

            &.selected {
                background: #c4c4c4;

                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            height: 48px;
        }
    }

</style>

