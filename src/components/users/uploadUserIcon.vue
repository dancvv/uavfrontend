<template>
  <div class="cut-picture">
      <img :src="imgDataUrl" width="200px"><br>
      <el-link :underline="false" type="primary" @click="toggleShow">修改</el-link><br>
      <!-- <a class="btn" @click="toggleShow">设置头像</a> -->
        <my-upload field="img"
            v-show="show"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="show"
            :width="300"
            :height="300"
            url=""
            :params="params"
            :headers="headers"
            :noCircle="false"
            :preview="'图形展示'"
            img-format="png"></my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
    name: '',
    data() {
        return {
            show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			imgDataUrl: require('../../assets/img/avatar.jpeg')
        }
    },
    components: {
        'my-upload': myUpload
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field){
            // 裁剪完成
            console.log('-------- crop success --------');
            this.imgDataUrl = imgDataUrl;
            // console.log(this.imgDataUrl)
            console.log(field)
        },
        cropUploadSuccess(jsonData, field){
            // 服务器返回成功
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
        },
        cropUploadFail(status, field){
            // 服务器返回失败
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    }
}
</script>
<style scoped>
.cut-picture{
    margin-left: 20px;
}
</style>