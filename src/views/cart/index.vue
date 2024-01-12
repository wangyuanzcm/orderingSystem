<template>
  <div>
    <!-- <context-holder /> -->
    <Card title="购物车" :bordered="false">
      <template #extra>
        <a-space size="middle">
          <a-button type="primary" :disabled="!$auth('sys.menu.add')" @click="handleJumpGoods()">
            继续购买
          </a-button>
          <a-button
            type="success"
            :disabled="!$auth('sys.menu.add')"
            @click="handleOrder(orderIds)"
          >
            一键下单
          </a-button>
        </a-space>
      </template>
      <a-card
        v-for="receiverId in Object.keys(receiverInfo)"
        :key="receiverId"
        :hoverable="true"
        type="inner"
        :title="receiverInfo[receiverId].nick_name"
        style="margin-top: 30px; background-color: #fff"
      >
        <template #extra>
          <a-space size="middle">
            <a-statistic
              :value="countMoney(orderInfo[receiverId])"
              :precision="2"
              suffix="元"
              prefix="小计："
              :value-style="{ fontSize: '14px' }"
              style="margin-right: auto"
            >
            </a-statistic>
          </a-space>
        </template>
        <template #actions>
          <div style="display: flex; flex-direction: row; justify-content: end">
            <a-space size="middle">
              <a-button
                type="success"
                style="margin-right: 20px"
                :disabled="!$auth('sys.menu.add')"
                @click="handleOrder(orderInfo[receiverId].map((i) => i.id))"
              >
                下单
              </a-button>
            </a-space></div
          >
        </template>
        <a-list item-layout="horizontal" :data-source="orderInfo[receiverId]">
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a-space size="middle">
                  <a-button
                    type="danger"
                    :disabled="!$auth('sys.menu.add')"
                    @click="handleDeleteOrder(item)"
                  >
                    删除
                  </a-button>
                  <a-button
                    :disabled="!$auth('sys.menu.add')"
                    @click="handleOrderEdit(item, receiverInfo[receiverId].nick_name)"
                  >
                    编辑
                  </a-button>
                </a-space>
              </template>
              <a-list-item-meta :description="item.goods_type">
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.goods_name }}</a>
                </template>
              </a-list-item-meta>
              <div>
                <a-space size="middle">
                  <a-typography-text> 商品价格：{{ item.goods_price }}元</a-typography-text>
                  <a-typography-text> 商品数量：{{ item.goods_count }}</a-typography-text>
                </a-space>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </Card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { groupBy, keyBy } from 'lodash-es';
  import { Card, message } from 'ant-design-vue';
  import type { PageSearchOrderInfo } from '@/service';
  import { services } from '@/utils/request';
  import { countMoney } from '@/utils/transform';
  const router = useRouter();
  const orderInfo = ref({});
  const receiverInfo = ref({});
  const orderIds = ref<number[]>([]);
  const handleJumpGoods = () => {
    router.push({
      path: '/goods',
    });
  };
  const handleOrderEdit = (orderInfo: PageSearchOrderInfo, nickName = '') => {
    const { id, goods_id: goodsId } = orderInfo;
    router.push({
      path: '/buygoods',
      query: { orderId: id, id: goodsId, receiverNickName: nickName },
    });
  };
  //更新订单状态
  const handleOrder = async (ids: number[]) => {
    await services.orderControllerUpdateStatus({
      status: 20,
      ids,
    });
    getorderControllerCart();
    message.success('下单成功');
  };

  const handleDeleteOrder = async (orderInfo: PageSearchOrderInfo) => {
    await services.orderControllerDelete({ ids: [orderInfo.id] });
    // 刷新页面
    getorderControllerCart();
  };
  // 获取购物车详细信息
  const getorderControllerCart = async () => {
    const result = await services.orderControllerCart();
    const data = result.data as unknown as PageSearchOrderInfo[];
    // ts-ignore
    const reveiveIds = (data || []).map((i) => i.receiver_id);
    orderIds.value = (data || []).map((i) => i.id);
    const { data: receiverInfoData } = await services.receiverControllerSearch({ ids: reveiveIds });
    orderInfo.value = groupBy(data, 'receiver_id');
    receiverInfo.value = keyBy(receiverInfoData as unknown as Array<Record<string, any>>, 'id');
    console.log(orderIds.value, '===');
  };
  // 获取页面参数
  onMounted(() => {
    getorderControllerCart();
  });
</script>

<style lang="less" scoped></style>
