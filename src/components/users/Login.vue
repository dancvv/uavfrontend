<template>
    <div class="login-wrap">

        <div class="ms-login">
          <div class="ms-icon">
            <img src="../../assets/icon/uavIcon.svg" width="85 px" alt="None">
          </div>
            <h1 class="ms-title">实时信息处理与态势感知平台</h1>
          <el-divider></el-divider>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="输入账号">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-top:25px;">
                    <el-input type="password" placeholder="登录密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <span>注：admin 是管理员，其他为普通用户</span>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getType();
    },
    methods: {
        getType() {
            let datas = {
                telephone: '13088888888',
                typeCode: 2
            };
            this.$api.login.getType(datas).then(res => {
                console.log('c',res);
            });
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #044289 url('../../assets/img/login-bg.svg');
}
.ms-title {
  width: 100%;
  text-align: center;
  margin: 25px 0px 15px;
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.ms-login {
    position: relative;
    width: 500px;
    height: 450px;
    max-width: 90%;
    margin: 275px auto;
    border-radius: 5px;
    background: white;
    overflow: hidden;
}
.ms-icon{
  display: flex;
  justify-content: center;
  margin: 15px;
}
.ms-content {
    padding: 5px 30px;
}
.login-btn {
    margin-top: 10%;
}
.login-btn button {
    width: 100%;
    height: 36px;
    text-align: center;
    margin-bottom: 10px;
}
</style>
