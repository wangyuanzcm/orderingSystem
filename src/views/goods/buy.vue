<template>
  <Card title="商品购买" style="margin-top: 20px" :loading="!goodsInfo">
    <template #extra> <Button @click="router.back()">返回上一页</Button> </template>
    <div style="display: flex; width: 100%">
      <Card title="商品详情" style="width: 30%; margin-top: 20px">
        <Form :form="goodsInfoForm" v-bind="formLayout">
          <SchemaField :schema="GoodsDetailSchema" />
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
            }"
          />
          <a-divider />
          <a-space
            size="middle"
            style=" display: flex; justify-content: space-between;width: 60%; margin: 0 auto"
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
                <Submit @submit="handleJoinCart">加入购物车</Submit>
                <Submit @submit="handleJoinOrder">直接下单</Submit>
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
  import { Card } from 'ant-design-vue';

  import {
    GoodsDetailSchema,
    GoodsBuyDefaultSchema,
    GoodsBuyDefineSchema,
    CouponOptions,
  } from './config';
  import { ImageUpload as Upload } from '@/components/business/image-upload';
  import { services } from '@/utils/request';
  const route = useRoute();
  const router = useRouter();
  const query = ref({}) as Record<string, any>;
  const goodsInfo = ref<any>(null);
  const total = ref(0);
  const goodsInfoForm = createForm();
  const goodsBuyForm = createForm({
    effects() {
      // 根据商品类型实时设置价格
      const handlePriceChange = (field) => {
        goodsBuyForm.setFieldState('price', (state) => {
          //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
          state.value = field.value;
        });
      };
      // 根据选项实时计算总价
      const handlecount = () => {
        const values = goodsBuyForm.getFormState().values;
        console.log(values, 'values===');
        const { price, count, coupon } = values;
        if (price && count) {
          console.log(price * count, 'count----');
          let _total = price * count;
          if (coupon && coupon.length > 0) {
            // 优惠券按照类型排序
            const _coupon = coupon.sort((a, b) => {
              if (a.startsWith('*') && !b.startsWith('*')) {
                return -1; // a 较小，排在前面
              } else if (!a.startsWith('*') && b.startsWith('*')) {
                return 1; // b 较小，排在前面
              } else {
                return 0; // 保持原有顺序
              }
            });
            // 计算所有优惠券情况下的总价
            while (_coupon.length > 0) {
              const c = _coupon.pop();
              if (c.startsWith('*')) {
                _total = _total * Number(c);
              }
              if (c.startsWith('-')) {
                _total = _total - Number(c);
              }
            }

            total.value = _total;
          }
        }
      };
      onFieldValueChange('type', (field) => {
        handlePriceChange(field);
        handlecount();
      });
      onFieldValueChange('count', () => {
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
        value: i.price,
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
    goodsBuyForm.setFieldState('receiverInfo', (state) => {
      console.log(state, 'state==');
      //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
      state.dataSource = options;
    });
  }, 500);
  const handleReset = () => {
    total.value = 0;
  };
  //加入购物车
  const handleJoinCart = () => {};
  //直接下单
  const handleJoinOrder = () => {};

  // 获取商品详细信息
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