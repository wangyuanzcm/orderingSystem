// import { transform } from '@babel/core';
import { isVNode as _isVNode, createVNode as _createVNode } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Image, ImagePreviewGroup, message } from 'ant-design-vue';
function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !_isVNode(s))
  );
}
// // 运行时配置
// const babelConfig = {
//   presets: [
//     [
//       '@babel/preset-env',
//       {
//         modules: false, // 使用 ESModule
//         useBuiltIns: 'usage',
//         corejs: { version: '3.22.5', proposals: true },
//         targets: {
//           chrome: 49,
//         },
//       },
//     ],
//     '@babel/preset-react',
//   ],
//   plugins: ['@babel/plugin-transform-arrow-functions'],
// };

export const countMoney = (orderInfoList = []): number => {
  return orderInfoList.reduce((pre, cur: Record<string, any>) => {
    const { coupon, ...others } = cur;
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

const getCustomRender = (renderParams) => {
  const { renderType, renderKey, renderOptions = [] } = renderParams;
  if (renderType === 'ImageList') {
    return ({ record }) => {
      const imageList = record[renderKey];
      return (
        <ImagePreviewGroup>
          {imageList.map(({ url }) => (
            <Image width={100} src={url} />
          ))}
        </ImagePreviewGroup>
      );
    };
  }
  if (renderType === 'Select') {
    return ({ record }) => {
      const _renderValue = record[renderKey];
      if (!Array.isArray(renderOptions)) {
        message.error('select的选项必须是数组类型');
      }
      const valueArray = renderOptions.filter((i) => {
        if (Array.isArray(_renderValue)) {
          return _renderValue.some((m) => m === i.value);
        }
        return _renderValue === i.value;
      });
      console.log(renderOptions, valueArray, _renderValue, 'valueArray');
      return (
        <a-space align="center">
          {valueArray.map((i) => (
            <a-typography-text>{i.label}</a-typography-text>
          ))}
        </a-space>
      );
    };
  }
};

const getFormItemProps = (formProps) => {
  const { formType, formOptions } = formProps;
  if (formType === 'Select') {
    return {
      required: false,
      component: 'Select',
      componentProps: () => ({
        options: formOptions,
      }),
    };
  }
};

export const decodeColumns = (columnString: string) => {
  const tableColumns = JSON.parse(columnString);
  return tableColumns.map((i) => {
    const { customRender, formItemProps, ...others } = i;
    return {
      ...others,
      ...(customRender ? { customRender: getCustomRender(customRender) } : {}),
      ...(formItemProps ? { formItemProps: getFormItemProps(formItemProps) } : {}),
    };

    return others;
  });
};
