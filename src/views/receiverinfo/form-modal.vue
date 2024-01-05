<template>
  <context-holder />
  <a-button type="primary" @click="visible = true" style="margin-bottom: 10px">
    新增收货地址
  </a-button>
  <a-modal
    v-model:open="visible"
    :title="title + '收件人信息'"
    :ok-text="title"
    cancel-text="取消"
    @ok="onOk"
  >
    <a-space-compact direction="vertical" style="width: 100%">
      <a-typography-text>地址粘贴板：</a-typography-text>
      <div>
        <a-textarea
          placeholder="试试粘贴收件人姓名、手机号、收货地址，可快速识别您的收货信息"
          allow-clear
          :auto-size="{ minRows: 2, maxRows: 5 }"
          :onChange="handleChange"
        />
      </div>
    </a-space-compact>
    <a-divider>收件人信息</a-divider>

    <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
      <a-form-item
        name="name"
        label="收件人姓名"
        :rules="[{ required: true, message: '请输入收件人姓名' }]"
      >
        <a-input v-model:value="formState.name" placeholder="请输入收件人姓名" />
      </a-form-item>

      <a-form-item
        name="area_code"
        label="所在地区"
        required
        :rules="[{ type: 'array', required: true, message: '请选择所在地区' }]"
      >
        <a-cascader
          v-model:value="formState.area_code"
          :field-names="{ label: 'name', value: 'code' }"
          :options="PcasCode"
          placeholder="请选择所在地区"
        />
      </a-form-item>
      <a-form-item
        name="detail"
        label="详细地址"
        :rules="[{ required: true, message: '请输入收件人详细地址' }]"
      >
        <a-textarea v-model:value="formState.detail" placeholder="请输入备注内容" allow-clear />
      </a-form-item>

      <a-form-item
        name="phone"
        label="手机号码"
        :rules="[
          { required: true, message: '请输入收件人手机号码' },
          { validator: PhoneNumberValidation, trigger: 'change' },
        ]"
      >
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item
        name="email"
        label="邮箱地址"
        :rules="[{ validator: EmailValidation, trigger: 'change' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item name="nick_name" label="昵称">
        <a-input
          v-model:value="formState.nick_name"
          placeholder="如果不填，自动填充，默认为城市+收件人姓名+手机后四位,"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-textarea v-model:value="formState.remark" placeholder="请输入备注内容" allow-clear />
      </a-form-item>
      <a-form-item name="province" label="省份" hidden>
        <a-input v-model:value="formState.province" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="city" label="城市" hidden>
        <a-input v-model:value="formState.city" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="area" label="市县" hidden>
        <a-input v-model:value="formState.area" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="postal_code" label="街道" hidden>
        <a-input v-model:value="formState.postal_code" placeholder="自动填充" />
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

  import AddressParse from 'zh-address-parse';
  import PcasCode from '@/utils/pcas-code';
  import { PhoneNumberValidation, EmailValidation } from '@/utils/validate';

  import { services } from '@/utils/request';
  import { extendAreaCode, collapseAreaCode } from './columns';

  const [messageApi, contextHolder] = message.useMessage();
  const formRef = ref();
  const visible = ref(false);
  const title = ref('新增');
  const formState: {
    id: string;
    name: string;
    phone: string;
    email: string;
    nick_name: string;
    remark: string;
    province: string;
    city: string;
    area: string;
    postal_code: string;
    detail: string;
    area_code: Array<string>;
  } = reactive({
    name: '',
    phone: '',
    email: '',
    nick_name: '',
    remark: '',
    province: '',
    city: '',
    area: '',
    area_code: [],
    postal_code: '',
    detail: '',
    id: '',
  });
  const props = defineProps({
    dynamicTable: {
      type: Object,
      required: true,
    },
  });
  const handleChange = (e) => {
    const addressParse = e.target.value;
    const parseResult: AddressParse.ParseResult & { areaCode?: string } = AddressParse(
      addressParse,
      {},
    );
    console.log(parseResult, '====parseResult');
    const { name, phone, province, city, area, areaCode, postalCode, detail } = parseResult;
    formState.name = name;
    formState.phone = phone;
    formState.province = province;
    formState.city = city;
    formState.area = area;
    formState.area_code = extendAreaCode(areaCode);
    formState.postal_code = postalCode;
    formState.detail = detail;
    formState.nick_name = province + city + area + '-' + name + '-' + (phone || '').slice(-4);
  };

  const openModal = async (record) => {
    visible.value = true;
    title.value = `${record.id ? '编辑' : '新增'}`;
    const { id, name, phone, province, city, area, detail, area_code, postal_code, nick_name } =
      record;
    formState.id = id;
    formState.name = name;
    formState.phone = phone;
    formState.province = province;
    formState.city = city;
    formState.area = area;
    formState.area_code = extendAreaCode(area_code);
    formState.postal_code = postal_code;
    formState.detail = detail;
    formState.nick_name = nick_name;
  };
  const onOk = async () => {
    try {
      // 校验数据格式
      const values = await formRef.value.validate();
      console.log('Received values of form: ', values);
      visible.value = false;
      formRef.value.resetFields();
      const { id, area_code, ...otherValues } = values;
      if (id) {
        await services.receiverControllerUpdate({
          ...otherValues,
          id,
          area_code: collapseAreaCode(area_code),
        });
      } else {
        await services.receiverControllerAdd({
          ...otherValues,
          area_code: collapseAreaCode(area_code),
        });
      }
      props.dynamicTable.reload();

      messageApi.info(`收件人信息${title.value}成功`);
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
