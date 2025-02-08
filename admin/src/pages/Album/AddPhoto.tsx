import AlbumController from '@/services/album/AlbumController';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, DatePicker, Form, Input, message, Upload } from 'antd';
import EXIF from 'exif-js';
import moment, { Moment } from 'moment';
import { useRef, useState } from 'react';

const AddPhoto = () => {
  const [photoInfo, setPhotoInfo] = useState({
    url: '',
    device: '',
    location: '',
    description: '',
    time: null as Moment | null,
    shade: '',
  });

  const formRef = useRef<any>(null);

  const onValueChange = (key: string, value: any) => {
    setPhotoInfo((prevPhotoInfo) => ({
      ...prevPhotoInfo,
      [key]: value,
    }));
    console.log(photoInfo);
  };

  const getMainColor = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return '';

    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);

    const imageData = context.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const length = data.length;
    const color = { r: 0, g: 0, b: 0 };
    let count = 0;

    for (let i = 0; i < length; i += 4) {
      color.r += data[i];
      color.g += data[i + 1];
      color.b += data[i + 2];
      count++;
    }

    color.r = Math.floor(color.r / count);
    color.g = Math.floor(color.g / count);
    color.b = Math.floor(color.b / count);

    console.log(color);
    return `#${color.r.toString(16)}${color.g.toString(16)}${color.b.toString(
      16,
    )}`;
  };

  const handleFileChange = (e: any) => {
    console.log(e);
    if (e.file.status === 'done') {
      const url = e.file.response.data;
      setPhotoInfo((prevPhotoInfo) => ({
        ...prevPhotoInfo,
        url,
      }));

      const img = new Image();
      img.src = location.protocol + '//' + location.host + url;
      console.log(img);
      img.onload = () => {
        // @ts-ignore
        EXIF.getData(img, function (this: any) {
          const exifData = EXIF.getAllTags(this);
          const dateTimeOriginal = moment(
            exifData.DateTimeOriginal,
            'YYYY:MM:DD HH:mm:ss',
          );

          formRef.current?.setFieldsValue({
            device: exifData.Make + ' ' + exifData.Model,
            time: dateTimeOriginal,
            location: `${exifData.GPSLatitude}, ${exifData.GPSLongitude}`,
          });

          const mainColor = getMainColor(img);

          setPhotoInfo((prevPhotoInfo) => ({
            ...prevPhotoInfo,
            device: exifData.Make + ' ' + exifData.Model,
            time: dateTimeOriginal,
            location: `${exifData.GPSLatitude}, ${exifData.GPSLongitude}`,
            shade: mainColor,
          }));
        });
      };
    }
  };

  const submitHandle = () => {
    if (
      !photoInfo.url ||
      !photoInfo.device ||
      !photoInfo.location ||
      !photoInfo.description ||
      !photoInfo.time
    ) {
      message.error('请填写完整信息');
    } else {
      AlbumController.uploadPhoto({
        ...photoInfo,
        time: photoInfo.time?.format('YYYY-MM-DDTHH:mm:ss'),
      }).then((response) => {
        if (response.data) {
          message.success('上传成功');
        } else {
          message.error(response.msg);
        }
      });
    }
  };

  return (
    <PageContainer>
      <Form ref={formRef} onFinish={submitHandle}>
        <Form.Item
          label="设备名"
          name="device"
          rules={[{ required: true, message: '请输入设备名' }]}
        >
          <Input
            value={photoInfo.device}
            onChange={(e) => onValueChange('device', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="拍摄地点"
          name="location"
          rules={[{ required: true, message: '请输入拍摄地点' }]}
        >
          <Input
            value={photoInfo.location}
            onChange={(e) => onValueChange('location', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="图片描述"
          name={'description'}
          rules={[{ required: true, message: '请输入图片描述' }]}
        >
          <Input
            value={photoInfo.description}
            onChange={(e) => onValueChange('description', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="选择时间"
          name={'time'}
          rules={[{ required: true, message: '请选择时间' }]}
        >
          <DatePicker
            showTime
            value={photoInfo.time}
            onChange={(date) => onValueChange('time', date)}
          />
        </Form.Item>
        <Form.Item label="上传照片">
          <Upload
            listType="picture-card"
            maxCount={1}
            action="/api/v1/upload"
            onChange={handleFileChange}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: '8px' }}> 图片可选</div>
            </div>
          </Upload>
        </Form.Item>
        {photoInfo.shade && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div> 计算出的图片主色调为 {photoInfo.shade}</div>
            <div
              style={{
                width: '10px',
                height: '10px',
                marginLeft: '10px',
                backgroundColor: photoInfo.shade,
              }}
            ></div>
          </div>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: '10px' }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default AddPhoto;
