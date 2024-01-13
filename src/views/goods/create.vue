<template>
  <Card :title="`商品详情`" style="margin-top: 20px">
    <Form :form="form" v-bind="formLayout">
      <SchemaField
        :schema="GoodsEditSchema"
        :scope="{
          viewPattern: 'editable',
          Visible: 'visible',
        }"
      />
      <FormButtonGroup align-form-item align="center">
        <a-space size="small">
          <Reset>重置</Reset>
          <Submit @submit="onSubmit">提交</Submit>
        </a-space>
      </FormButtonGroup>
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
    Submit,
    Reset,
    FormButtonGroup,
    ArrayItems,
  } from '@formily/antdv';
  import { Card } from 'ant-design-vue';
  import { GoodsEditSchema } from './config';
  import { services } from '@/utils/request';
  import { ImageUpload as Upload } from '@/components/business/image-upload';
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

  const onSubmit = async (value) => {
    const { id } = query.value;
    if (id) {
      await services.goodsControllerUpdate({
        ext: value,
        id: Number(id),
      });
    } else {
      await services.goodsControllerAdd({
        ext: value,
      });
    }
    form.reset();
    router.back();
  };

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
