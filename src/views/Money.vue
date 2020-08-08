<template>
    <div>
        <Layout class-prefix="layout">
            <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
            <Types :value.sync="record.type"/>
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
  import Types from '@/components/Money/Types.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  const version = window.localStorage.getItem('version') || '0';

  @Component({
    components: {Button, FormItem, Tags, Types, NumberPad}
  })
  export default class Money extends Vue {
    get recordList() {
      return this.$store.state.recordList;
    }

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
<style lang="scss">

    .layout-content {
        /*border: 1px solid red;*/
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>

