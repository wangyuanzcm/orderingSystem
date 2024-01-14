export const countMoney = (orderInfoList = []): number => {
  return orderInfoList.reduce((pre, cur: Record<string, any>) => {
    const { coupon, ...others } = cur;
    console.log(countSingeMoney({ ...others, coupon: String(coupon).split(',') }));
    return pre + countSingeMoney({ ...others, coupon: String(coupon).split(',') });
  }, 0);
};

export const countSingeMoney = (goodsInfo) => {
  const { goods_price: goodsPrice, goods_count: goodsCount, coupon } = goodsInfo;
  if (goodsPrice && goodsCount) {
    let _total = goodsPrice * goodsCount;
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
        const c = _coupon.shift();
        if (c.startsWith('*')) {
          _total = _total * Number(c.slice(1));
        }
        if (c.startsWith('-')) {
          _total = _total - Number(c.slice(1));
        }
      }

      return _total;
    }
    return _total;
  }
  return 0;
};

export const mergeSchema = (defaultSchema, defineSchema) => {
  return {
    ...defaultSchema,
    properties: { ...defineSchema, ...defaultSchema.properties },
  };
};

export const decodeColumns = (columnString: string) => {
  const tableColumns = JSON.parse(columnString);
  return tableColumns.map((i) => {
    const { customRender, ...others } = i;
    if (customRender) {
      console.log(customRender, '-------');
      // console.log(Babel.transform);
      // const transformedCode = Babel.transform(customRender, {
      //   presets: ['@babel/preset-react'],
      // }).code;
      // console.log(transformedCode, '-------');

      return {
        ...others,
        // customRender: new Function('record', customRender),
      };
    }
    return others;
  });
};
