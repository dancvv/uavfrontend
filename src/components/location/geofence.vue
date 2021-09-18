<template>
  <div>
    <h3 class="breadcrumb">当前位置</h3>
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/welcomepage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>飞行器位置</el-breadcrumb-item>
      <el-breadcrumb-item>地理围栏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="boxCard">
      <h3>地理围栏</h3>
      <el-form :model="geoFenceData" ref="geoFenceData" label-width="100px" class="demo-dynamic">
        <el-form-item
            v-for="(domain, index) in geoFenceData.points"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
        >
          <el-input></el-input><el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('geoFenceData')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('geoFenceData')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "geofence",
  data(){
    return{
      geoFenceData:{
        points:[{lat:'',lng:''}],
        fenceType:''
      },
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.geoFenceData.domains.indexOf(item)
      if (index !== -1) {
        this.geoFenceData.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.geoFenceData.domains.push({
        value: '',
        key: Date.now()
      });
    }
  }
}
</script>

<style scoped>
.breadcrumb{
  margin: 20px;
}
.boxCard{
  margin-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
}
.geoFenceForm{
  width: 200px;
}
</style>
