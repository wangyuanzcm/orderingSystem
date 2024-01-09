<template>
  <a-upload
    v-model:file-list="fileList"
    :customRequest="uploadFile"
    :before-upload="beforeUpload"
    @preview="handlePreview"
    list-type="picture-card"
    class="upload"
    action="noaction"
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
  import type { PropType } from 'vue';
  import { ref, computed, createVNode, nextTick } from 'vue';
  import * as qiniu from 'qiniu-js/esm';
  import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { Modal, Drawer, Spin, Upload, notification } from 'ant-design-vue';
  import { message } from 'ant-design-vue';

  import type { UploadProps, UploadChangeParam, UploadFile } from 'ant-design-vue';

  // 接收父组件传递的参数
  const props = defineProps({
    token: {
      type: String,
      default: '',
    },
    value: {
      type: Object as PropType<UploadProps['fileList']>,
      default: [],
    },
  });

  defineOptions({
    name: 'imageUpload',
  });
  // 预览变量
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  // 文件对象列表
  const fileList = ref<UploadProps['fileList']>(props.value);

  // 定义表单改变的方法
  const emit = defineEmits(['update:value']);
  // 设置只上传png图片
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
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
    const observable = qiniu.upload(file as File, `${(file as File).name}`, props.token);
    observable.subscribe({
      next: (res) => {
        console.log(res, 'res====');
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
        const fileValue = fileList.value?.map(({ uid, name, status, response }) => {
          const { key } = response as { hash: string; key: string };
          return {
            uid,
            name,
            status,
            url: `${_VITE_IMAGE_HOST_}/${key}`,
          };
        });
        emit('update:value', fileValue);
      },
    });
  };
  // const handleUploadError = (err, file: File) => {
  //   const failFile = fileList.value.find((n) => n.originFileObj === file);
  //   if (failFile) {
  //     failFile.status = 'error';
  //   }
  //   notification.error({
  //     message: '上传进度提醒',
  //     description: `上传${file?.name}文件失败！错误信息：${
  //       err.code === 614 ? '上传文件已存在' : err.message
  //     }`,
  //     duration: 0,
  //   });
  // };
  // const handleUploadSuccess = (file: File) => {
  //   const successFile = fileList.value.find((n) => n.originFileObj === file);
  //   if (successFile) {
  //     successFile.status = 'success';
  //   }
  // };
</script>

<style lang="less"></style>
