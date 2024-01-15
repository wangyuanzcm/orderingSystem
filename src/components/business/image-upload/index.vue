<template>
  <a-upload
    v-model:file-list="fileList"
    :custom-request="uploadFile"
    :before-upload="beforeUpload"
    list-type="picture-card"
    class="upload"
    action="noaction"
    @preview="handlePreview"
  >
    <div>
      <plus-outlined />
      <div style="margin-top: 8px">Upload</div>
    </div>
  </a-upload>
  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import * as qiniu from 'qiniu-js/esm';
  import { PlusOutlined } from '@ant-design/icons-vue';
  // import { Upload, message } from 'ant-design-vue';
  import type { PropType } from 'vue';

  import type { UploadProps } from 'ant-design-vue';
  import { services } from '@/utils/request';

  // // 接收父组件传递的参数
  const props = defineProps({
    value: {
      type: Object as PropType<UploadProps['fileList']>,
      default() {
        return [];
      },
    },
  });

  defineOptions({
    name: 'ImageUpload',
  });
  // 预览变量
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  const token = ref('');

  const getToken = async () => {
    const data = await services.netDiskManageControllerToken();
    token.value = data.data.token;
  };
  onMounted(() => {
    // 在组件挂载后执行的操作
    getToken();
    // 可以执行其他操作，如发送请求、订阅事件等
  });

  // 文件对象列表
  const fileList = ref<UploadProps['fileList']>(props.value);
  watch(props, (newProps) => {
    console.log(newProps, 'newProps');
    fileList.value = newProps.value;
  });
  // 定义表单改变的方法
  const emit = defineEmits(['update:value', 'change']);
  // 设置只上传png图片
  const beforeUpload: UploadProps['beforeUpload'] = () => {
    return true;
    // const isPNG = file.type === 'image/png';
    // if (!isPNG) {
    //   message.error(`${file.name} is not a png file`);
    // }
    // return isPNG || Upload.LIST_IGNORE;
  };
  // 处理图片预览事件
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = file.thumbUrl;
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
  };
  // 点击关闭弹框
  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  /**
   * 使用qiniu-js上传
   */
  const uploadFile: UploadProps['customRequest'] = (param) => {
    // onProgress, onError, onSuccess
    const { file, onProgress, onError, onSuccess } = param;
    const observable = qiniu.upload(file as File, `${(file as File).name}`, token.value);
    observable.subscribe({
      next: (res) => {
        // https://github.com/ElemeFE/element/issues/9759
        onProgress?.({ percent: res.total.percent });
      },
      error: (err) => {
        onError?.(err);
        console.log('上传失败', err);
      },
      complete: (res) => {
        onSuccess?.(res);
        console.log(fileList.value, '----====');
        const fileValue = fileList.value?.map((item) => {
          const { uid, url, name, status, response } = item;
          if (url) {
            return item;
          }
          const { key } = response as { hash: string; key: string };
          return {
            uid,
            name,
            status,
            url: `${__APP_INFO__.imageHost}/${key}`,
          };
        });
        emit('update:value', fileValue);
        //change事件是为了保障在formily组件中可以正常使用
        emit('change', fileValue);
      },
    });
  };
</script>

<style lang="less"></style>
