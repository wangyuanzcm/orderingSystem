<template>
  <Card :title="`商品详情`" style="margin-top: 20px">
    <template #extra> <Button @click="router.back()">返回上一页</Button> </template>
    <Form :form="form" v-bind="formLayout">
      <SchemaField
        :schema="mergeSchema(GoodsEditDefaultSchema, GoodsEditDefineSchema)"
        :scope="{
          viewPattern: 'readPretty',
          Visible: 'none',
        }"
      />
    </Form>
  </Card>
</template>

<script lang="tsx" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { createForm } from '@formily/core';
  import { createSchemaField } from '@formily/vue';
  import {
    Form,
    FormItem,
    Input,
    Radio,
    InputNumber as NumberPicker,
    ArrayItems,
  } from '@formily/antdv';
  import { Card } from 'ant-design-vue';
  import { GoodsEditDefaultSchema } from './config';
  import { services } from '@/utils/request';
  import { ImageUpload as Upload } from '@/components/business/image-upload';
  import { mergeSchema } from '@/utils/transform';
  import { getConfig } from '@/core/permission';
  const GoodsEditDefineSchema = JSON.parse(getConfig('GOODS_EDIT_DEFINE_SCHEMA'));
  const route = useRoute();
  const router = useRouter();
  const query = ref({}) as Record<string, any>;

  const formLayout = {
    labelCol: 6,
    wrapperCol: 12,
    feedbackLayout: 'terse',
    style: {
      display: 'block',
    },
  };
  const form = createForm();
  const { SchemaField } = createSchemaField({
    components: {
      Upload,
      Input,
      NumberPicker,
      Radio,
      FormItem,
      ArrayItems,
    },
  });

  const getGoodsInfo = async (id) => {
    const result = await services.goodsControllerInfo(id);
    form.setValues(result.data.ext);
  };
  // 获取页面参数
  onMounted(() => {
    query.value = route.query;
    console.log(query.value, 'query.value');
    getGoodsInfo(query.value.id);
  });
</script>
