<template>
  <context-holder />
  <a-button type="primary" @click="visible = true">新增收货地址</a-button>
  <a-modal
    v-model:open="visible"
    title="新增一个收件人信息"
    ok-text="创建"
    cancel-text="取消"
    @ok="onOk"
  >
    <a-space-compact direction="vertical" style="width: 100%">
      <a-typography-text>地址粘贴板：</a-typography-text>
      <div>
        <a-textarea
          v-model:value="addressParse"
          placeholder="试试粘贴收件人姓名、手机号、收货地址，可快速识别您的收货信息"
          allow-clear
          :auto-size="{ minRows: 2, maxRows: 5 }"
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
        name="province_city"
        label="所在地区"
        :rules="[{ required: true, message: '请选择所在地区' }]"
      >
        <a-cascader
          v-model:value="formState.province_city"
          :field-names="{ label: 'name', value: 'code' }"
          :options="PcasCode"
          change-on-select
          placeholder="请选择所在地区"
        />
      </a-form-item>
      <a-form-item
        name="address"
        label="详细地址"
        :rules="[{ required: true, message: '请输入收件人详细地址' }]"
      >
        <a-textarea v-model:value="formState.address" placeholder="请输入备注内容" allow-clear />
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
      <a-form-item name="nickName" label="昵称">
        <a-input
          v-model:value="formState.nickName"
          placeholder="如果不填，自动填充，默认为城市+收件人姓名+手机后四位,"
        />
      </a-form-item>
      <a-form-item name="remark" label="备注">
        <a-textarea
          v-model:value="formState.description"
          placeholder="请输入备注内容"
          allow-clear
        />
      </a-form-item>
      <a-form-item name="province" label="省份" hidden>
        <a-input v-model:value="formState.province" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="city" label="城市" hidden>
        <a-input v-model:value="formState.city" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="county" label="市县" hidden>
        <a-input v-model:value="formState.county" placeholder="自动填充" />
      </a-form-item>
      <a-form-item name="street" label="街道" hidden>
        <a-input v-model:value="formState.street" placeholder="自动填充" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup>
  import { watch, reactive, ref, toRaw } from 'vue';
  import { message } from 'ant-design-vue';
  import smart from 'address-smart-parse';
  import PcasCode from '@/utils/pcas-code';
  import { PhoneNumberValidation, EmailValidation } from '@/utils/validate';

  import { services } from '@/utils/request';
  const [messageApi, contextHolder] = message.useMessage();

  const addressParse = ref('');
  const formRef = ref();
  const visible = ref(false);
  const formState = reactive({
    name: '',
    province: '',
    city: '',
    county: '',
    province_city: [],
    address: '',
    phone: '',
    email: '',
    nickName: '',
    remark: '',
    street: '',
  });
  watch(addressParse, () => {
    const {
      name,
      phone,
      province,
      city,
      county,
      provinceCode,
      cityCode,
      countyCode,
      street,
      streetCode,
      address,
    } = smart(addressParse.value);
    formState.province_city = [provinceCode, cityCode, countyCode, streetCode];
    formState.province = province;
    formState.city = city;
    formState.county = county;
    formState.street = street || '';
    formState.address = address;
    formState.phone = phone || '';
    formState.name = name;
    formState.nickName = city + county + '-' + name + '-' + (phone || '').slice(-4);
  });

  const onOk = async () => {
    try {
      // 校验数据格式
      const values = await formRef.value.validate();
      console.log('Received values of form: ', values);
      visible.value = false;
      addressParse.value = '';
      formRef.value.resetFields();
      const { province_city, ...otherValues } = values;
      const [province_code, city_code, county_code, street_code] = province_city;
      const result = await services.receiverControllerAdd({
        ...otherValues,
        province_code,
        city_code,
        county_code,
        street_code,
      });
      console.log(result, 'result');
      messageApi.info('收件人信息添加成功');
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };
</script>
<style scoped>
  .collection-create-form_last-form-item {
    margin-bottom: 0;
  }
</style>
