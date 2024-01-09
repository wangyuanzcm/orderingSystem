<template>
  <context-holder />
  <a-modal
    v-model:open="visible"
    :title="modalTtitle + '商品信息'"
    :ok-text="modalTtitle"
    cancel-text="取消"
    @ok="onOk"
    @cancel="onClear"
  >
    <a-form ref="formRef" :model="formState" layout="vertical" name="goods_form_in_modal">
      <a-form-item
        name="title"
        label="商品名称"
        :rules="[{ required: true, message: '请输入商品名称' }]"
      >
        <a-input v-model:value="formState.title" placeholder="请输入商品名称" />
      </a-form-item>
      <a-form-item
        name="code_hs"
        label="商品编号"
        :rules="[{ required: true, message: '请输入商品编号' }]"
      >
        <a-input v-model:value="formState.code_hs" placeholder="请输入商品编号" />
      </a-form-item>
      <a-form-item name="image_list" label="商品图片">
        <ImageUpload :token="token" v-model:value="formState.image_list" />
      </a-form-item>
      <a-form-item name="description" label="商品描述">
        <a-textarea
          v-model:value="formState.description"
          placeholder="请输入商品描述"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        name="detail_info"
        label="详细信息"
        :rules="[{ required: true, message: '请输入商品详细信息' }]"
      >
        <a-textarea
          v-model:value="formState.detail_info"
          placeholder="请输入商品详细信息"
          allow-clear
        />
      </a-form-item>

      <a-form-item
        name="price"
        label="商品价格"
        :rules="[{ required: true, message: '请输入商品价格' }]"
      >
        <a-input-number
          v-model:value="formState.price"
          addon-after="元"
          placeholder="请输入总金额"
          :formatter="(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
          :parser="(value: any) => `${value}`.replace(/\$\s?|(,*)/g, '')"
          :precision="2"
        ></a-input-number>
      </a-form-item>

      <a-form-item
        name="types"
        label="商品类型"
        :rules="[{ required: true, message: '请选择商品类型' }]"
      >
        <a-radio-group v-model:value="formState.types">
          <a-radio value="1">A</a-radio>
          <a-radio value="2">B</a-radio>
          <a-radio value="3">C</a-radio>
          <a-radio value="4">D</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        name="universal"
        label="是否为定制商品"
        :rules="[{ required: true, message: '请选择是否为定制商品' }]"
      >
        <a-radio-group v-model:value="formState.universal">
          <a-radio value="1">A</a-radio>
          <a-radio value="2">B</a-radio>
          <a-radio value="3">C</a-radio>
          <a-radio value="4">D</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="id" label="id" hidden>
        <a-input v-model:value="formState.id" placeholder="自动填充" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
  import { watch, reactive, ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { defineProps } from 'vue';
  import * as qiniu from 'qiniu-js/esm';
  import { ImageUpload } from '@/components/business/image-upload';
  import type { UploadToken } from '@/service';

  import type { UploadProps, UploadFile } from 'ant-design-vue';

  import AddressParse from 'zh-address-parse';
  import PcasCode from '@/utils/pcas-code';
  import { PhoneNumberValidation, EmailValidation } from '@/utils/validate';

  import { services } from '@/utils/request';
  import { extendAreaCode, collapseAreaCode } from './columns';

  const [messageApi, contextHolder] = message.useMessage();
  const formRef = ref();
  const visible = ref(false);
  const modalTtitle = ref('新增');

  const formState: {
    title: string;
    code_hs: string;
    image_list: UploadProps['fileList'];
    description: string;
    detail_info: string;
    price: number;
    types: 1 | 2;
    universal: 1 | 2;
    id: string;
  } = reactive({
    title: '',
    code_hs: '',
    image_list: [],
    description: '',
    detail_info: '',
    price: 0.0,
    types: 1,
    universal: 1,
    id: '',
  });
  const props = defineProps({
    dynamicTable: {
      type: Object,
      required: true,
    },
  });
  const path = ref('./');
  const token = ref('');
  const loading = ref(true);

  const openModal = async (record: {
    id: any;
    title?: any;
    code_hs?: any;
    image_list?: any;
    description?: any;
    detail_info?: any;
    price?: any;
    types?: any;
    universal?: any;
  }) => {
    // showing dialog
    visible.value = true;

    loading.value = true;
    try {
      const data = await services.netDiskManageControllerToken();
      console.log(data, 'data===');
      token.value = data.data.token;
      // hide loading
      loading.value = false;
    } catch (err) {
      visible.value = false;
    }
    visible.value = true;
    modalTtitle.value = `${record.id ? '编辑' : '新增'}`;
    if (record.id) {
      const { id, title, code_hs, image_list, description, detail_info, price, types, universal } =
        record;
      formState.id = id;
      formState.title = title;
      formState.code_hs = code_hs;
      formState.image_list = image_list;
      formState.description = description;
      formState.detail_info = detail_info;
      formState.price = price;
      formState.types = types;
      formState.universal = universal;
    }
  };
  const onClear = () => {
    formRef.value.resetFields();
  };
  const onOk = async () => {
    try {
      // 校验数据格式
      const values = await formRef.value.validate();
      console.log('Received values of form: ', values);
      visible.value = false;
      formRef.value.resetFields();
      const { id, ...otherValues } = values;
      if (id) {
        await services.goodsControllerUpdate({
          ...otherValues,
          id,
        });
      } else {
        await services.goodsControllerAdd({
          ...otherValues,
        });
      }
      props.dynamicTable.reload();

      messageApi.info(`商品信息${modalTtitle.value}成功`);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };
  defineExpose({
    openModal,
  });
</script>
<style scoped>
  .collection-create-form_last-form-item {
    margin-bottom: 0;
  }
</style>
