<template>
  <Card title="商品购买" style="margin-top: 20px" :loading="!goodsInfo">
    <template #extra> <Button @click="router.back()">返回上一页</Button> </template>
    <div style="display: flex; width: 100%">
      <Card title="商品详情" style="width: 30%; margin-top: 20px">
        <Form :form="goodsInfoForm" v-bind="formLayout">
          <SchemaField
            :schema="GoodsEditSchema"
            :scope="{
              viewPattern: 'readPretty',
              Visible: 'none',
            }"
          />
        </Form>
      </Card>
      <div style="width: 60%">
        <Form :form="goodsBuyForm" v-bind="formLayout">
          <SchemaField
            :schema="GoodsBuySchema"
            :scope="{
              useAsyncDataSource,
              getCouponOptions,
              loadData,
              handleReceiverInfoSearch,
              viewPattern,
            }"
          />
          <a-divider />
          <a-space
            size="middle"
            style="display: flex; justify-content: space-between; width: 60%; margin: 0 auto"
          >
            <a-statistic
              :value="total"
              :precision="2"
              suffix="元"
              prefix="小计："
              :value-style="{ color: 'red' }"
              style="margin-right: auto"
            >
            </a-statistic>
            <FormButtonGroup align-form-item style="display: flex; width: 100%">
              <a-space size="middle">
                <Reset danger @click="handleReset">重置</Reset>
                <Submit @submit="(values) => handleOrder(values, status)"
                  >{{ query.orderId ? '更新' : '创建' }}订单</Submit
                >
                <Submit @submit="(values) => handleOrder(values, status + 10)">状态流转</Submit>
              </a-space>
            </FormButtonGroup>
          </a-space>
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
    Submit,
    Reset,
    FormButtonGroup,
  } from '@formily/antdv';
  // @ts-ignore
  import { action } from '@formily/reactive';
  import { debounce } from 'lodash-es';
  import { Card, message } from 'ant-design-vue';
  import {
    GoodsEditSchema,
    GoodsBuyDefaultSchema,
    GoodsBuyDefineSchema,
    CouponOptions,
  } from './config';
  import { countSingeMoney } from '@/utils/transform';

  import { ImageUpload as Upload } from '@/components/business/image-upload';
  import { services } from '@/utils/request';
  const route = useRoute();
  const router = useRouter();
  const query = ref({}) as Record<string, any>;
  const goodsInfo = ref<any>(null);
  const total = ref(0);
  const status = ref(10);
  const viewPattern = ref('editable'); // editable/disabled
  const goodsInfoForm = createForm();
  const goodsBuyForm = createForm({
    effects() {
      // 根据商品类型实时设置价格
      const handlePriceChange = (field) => {
        goodsBuyForm.setFieldState('goods_price', (state) => {
          //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
          const { dataSource, value } = field;
          state.value = dataSource.filter((i) => i.value === value)[0].price;
        });
      };
      // 根据选项实时计算总价
      const handlecount = () => {
        const values = goodsBuyForm.getFormState().values;
        total.value = countSingeMoney(values);
      };
      onFieldValueChange('goods_type', (field) => {
        handlePriceChange(field);
        handlecount();
      });
      onFieldValueChange('goods_count', () => {
        handlecount();
      });
      onFieldValueChange('coupon', () => {
        handlecount();
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
  // 动态获取商品类型
  const loadData = async () => {
    if (!goodsInfo.value) {
      await getGoodsInfo(query.value.id);
    }
    const { type_price: typePrice = [] } = goodsInfo.value || {};
    const typeOptions = (typePrice || []).map((i) => {
      return {
        label: i.type,
        value: i.type,
        price: i.price,
      };
    });
    return typeOptions;
  };
  // 异步加载商品类型选项
  const useAsyncDataSource = (service) => (field) => {
    field.loading = true;
    service(field).then(
      // @ts-ignore
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      }),
    );
  };
  // 获取配置的优惠券类型
  const getCouponOptions = () => (field) => {
    field.loading = true;
    Promise.resolve(CouponOptions).then(
      // @ts-ignore
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      }),
    );
  };

  // 搜索收件人信息
  const handleReceiverInfoSearch = debounce(async (value = '') => {
    const query = value.replace(/^\s*|\s*$/g, '');
    const params = {
      limit: 10,
      page: 1,
      nick_name: query,
    };
    const result = await services.receiverControllerPage(params);
    // @ts-ignore
    const { list = [] } = result.data;
    const options = (list || []).map((option) => ({
      label: option.nick_name,
      value: option.id,
    }));
    goodsBuyForm.setFieldState('receiver_id', (state) => {
      //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
      state.dataSource = options;
    });
  }, 500);
  const handleReset = () => {
    total.value = 0;
  };
  //处理购物车事件
  const handleOrder = async (values, status) => {
    console.log(values, 'valuse====');
    const { id, title } = goodsInfo.value;
    const {
      goods_type: goodsType,
      goods_price: goodsPrice,
      goods_count: goodsCount,
      coupon = [],
      receiver_id: receiverId,
      ...others
    } = values;

    const params = {
      goods_type: goodsType,
      goods_price: goodsPrice,
      goods_count: goodsCount,
      receiver_id: receiverId.value ? receiverId.value : receiverId,
      coupon: coupon.join(','),
      status,
      goods_id: id,
      goods_name: title,
      ext: { ...others },
    };
    if (query.value.orderId) {
      const result = await services.orderControllerUpdate({
        ...params,
        id: Number(query.value.orderId),
      });
      console.log(result, 'result');
      message.success('订单更新成功');
    } else {
      const result = await services.orderControllerAdd(params);
      console.log(result, 'result');
      message.success('订单新增成功');
    }

    // router.push({
    //   path: '/cart',
    // });
  };

  // 获取商品详细信息
  const getGoodsInfo = async (id) => {
    const result = await services.goodsControllerInfo(id);
    goodsInfo.value = { ...result.data.ext, id };
    goodsInfoForm.setValues(result.data.ext);
  };
  //获取订单数据，用于表单回填
  const getOrderInfo = async (id, receiverNickName) => {
    const result = await services.orderControllerInfo(id);
    console.log(result, 'result===');
    const {
      ext = {},
      status: _status,
      goods_type: goodsType,
      goods_price: goodsPrice,
      receiver_id: receiverId,
      goods_count: goodsCount,
      coupon,
    } = result.data || {};
    status.value = _status;
    const values = {
      ...ext,
      goods_type: goodsType,
      goods_price: goodsPrice,
      goods_count: goodsCount,
      receiver_id: {
        label: receiverNickName,
        value: receiverId,
      },
      coupon: coupon.split(','),
    };
    goodsBuyForm.setValues({ ...values });
    total.value = countSingeMoney({ goodsPrice, goodsCount, coupon: coupon.split(',') });
  };
  // 获取页面参数
  onMounted(() => {
    query.value = route.query;
    console.log(query.value, 'query.value');
    const { id, orderId, receiverNickName } = query.value;
    getGoodsInfo(id);
    if (orderId) {
      viewPattern.value = 'disabled';

      getOrderInfo(orderId, receiverNickName);
    }
  });
</script>
