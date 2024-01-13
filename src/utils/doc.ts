import docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import ImageModule from 'docxtemplater-image-module-free';
/**
   导出docx
   @param { String } tempDocxPath 模板文件路径
    @param { Object } data 文件中传入的数据
   @param { String } fileName 导出文件名称
*/
export const exportDocx = (tempDocxPath, data, fileName) => {
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent(tempDocxPath, (error, content) => {
    // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
    // 抛出异常
    if (error) {
      throw error;
    }
    const centered = false;
    const getImage = (tagValue) => {
      return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(tagValue, function (error, content) {
          if (error) {
            return reject(error);
          }
          return resolve(content);
        });
      });
    };
    //图片有关代码，没有图片的可以删除
    const getSize = (img, tagValue, tagName) => {
      // return [200, 105]; //图片大小 （固定的）
      // 非固定（这里是设置宽度最大为300px的图片）
      return new Promise(function (resolve, reject) {
        const image = new Image();
        image.src = tagValue;
        let imgWidth, imgHeight, scale;
        image.onload = function () {
          imgWidth = image.width;
          imgHeight = image.height;
          scale = 0;
          if (imgWidth > 300) {
            scale = 300 / imgWidth;
            imgWidth = 300;
            imgHeight = imgHeight * scale;
          }
          resolve([imgWidth, imgHeight]);
        };
        image.onerror = function (e) {
          console.log('img, tagValue, tagName : ', img, tagValue, tagName);
          reject(e);
        };
      });
    };

    const imageModule = new ImageModule({
      centered,
      getImage,
      getSize,
    });
    // 创建一个JSZip实例，内容为模板的内容
    const zip = new PizZip(content);
    // 创建并加载docxtemplater实例对象
    const doc = new docxtemplater().loadZip(zip).attachModule(imageModule).compile();
    doc
      .resolveData({ ...data.form })
      .then(() => {
        doc.render();
        const out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        }); // Output the document using Data-URI
        saveAs(out, fileName);
      })
      .catch((err) => console.log('errorsss', err));
  });
};
