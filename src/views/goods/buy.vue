<template>
  <Card title="商品购买" style="margin-top: 20px" :loading="!goodsInfo">
    <template #extra> <Button @click="router.back()">返回上一页</Button> </template>
    <div style="display: flex; width: 100%">
      <Card title="商品详情" style=" width: 30%;margin-top: 20px">
        <Form :form="goodsInfoForm" v-bind="formLayout">
          <SchemaField :schema="GoodsDetailSchema" />
        </Form>
      </Card>
      <div style="width: 60%">
        <Form :form="goodsBuyForm" v-bind="formLayout">
          <SchemaField :schema="GoodsBuySchema" :scope="{ useAsyncDataSource, loadData }" />
        </Form>
      </div>
    </div>
  </Card>
</template>

<script lang="tsx" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { createForm, onFieldValueChange } from '@formily/core';
  import { createSchemaField } from '@formily/vue';
  import {
    Form,
    FormItem,
    Input,
    Radio,
    Select,
    InputNumber as NumberPicker,
    ArrayItems,
  } from '@formily/antdv';
  // @ts-ignore
  import { action } from '@formily/reactive';
  import { Card } from 'ant-design-vue';

  import { GoodsDetailSchema, GoodsBuyDefaultSchema, GoodsBuyDefineSchema } from './config';
  import { ImageUpload as Upload } from '@/components/business/image-upload';
  import { services } from '@/utils/request';
  const route = useRoute();
  const router = useRouter();
  const query = ref({}) as Record<string, any>;
  const goodsInfo = ref<any>(null);

  const goodsInfoForm = createForm();
  const goodsBuyForm = createForm({
    effects() {
      onFieldValueChange('type', (field) => {
        goodsBuyForm.setFieldState('price', (state) => {
          //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
          state.value = field.value;
        });
      });
    },
  });

  const GoodsBuySchema = {
    ...GoodsBuyDefaultSchema,
    properties: { ...GoodsBuyDefineSchema.properties, ...GoodsBuyDefaultSchema.properties },
  };
  const formLayout = {
    labelCol: 6,
    wrapperCol: 12,
    feedbackLayout: 'terse',
    style: {
      display: 'block',
    },
  };

  const { SchemaField } = createSchemaField({
    components: {
      Upload,
      Select,
      Input,
      NumberPicker,
      Radio,
      FormItem,
      ArrayItems,
    },
  });

  const loadData = async () => {
    if (!goodsInfo.value) {
      await getGoodsInfo(query.value.id);
    }
    const { type_price: typePrice = [] } = goodsInfo.value || {};
    const typeOptions = (typePrice || []).map((i) => {
      return {
        label: i.type,
        value: i.price,
      };
    });
    return typeOptions;
  };

  const useAsyncDataSource = (service) => (field) => {
    field.loading = true;
    service(field).then(
      // @ts-ignore
      action.bound((data) => {
        console.log(data, 'data===');
        field.dataSource = data;
        field.loading = false;
      }),
    );
  };
  const getGoodsInfo = async (id) => {
    const result = await services.goodsControllerInfo(id);
    goodsInfo.value = { ...result.data.ext, id };
    goodsInfoForm.setValues(result.data.ext);
  };
  // 获取页面参数
  onMounted(() => {
    query.value = route.query;
    console.log(query.value, 'query.value');
    getGoodsInfo(query.value.id);
  });
</script>
