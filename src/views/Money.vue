<template>
    <div>
        <Layout class-prefix="layout">
            <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
            <Tabs :data-source="recordTypeList"
                  :value.sync="record.type"/>
            <div class="notes">
                <FormItem field-name="备注"
                          @update:value="onUpdateNotes"
                          placeholder="在这里输入备注"/>
            </div>
            <Tags/>

        </Layout>
    </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';

  const version = window.localStorage.getItem('version') || '0';

  @Component({
    components: {Tabs, Button, FormItem, Tags, NumberPad}
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

    recordTypeList = recordTypeList;
    record: RecordItem = {
      tags: [], notes: '', type: '-', amount: 0
    };

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    onUpdateAmount(value: string) {
      this.record.amount = parseFloat(value);
    }

    saveRecord() {
      this.$store.commit('createRecord', this.record);
    }


  }
</script>
<style lang="scss" scoped>

    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>

