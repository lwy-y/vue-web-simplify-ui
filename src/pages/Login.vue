<template>
  <div
    class="
    login-wrap"
    @click="hidePop($event)"
  >
    <div class="ms-login">
      <div class="
      ms-title">
        <h3>xx管理平台</h3>
        <div class="subtitle">账号密码登录</div>
      </div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
        @keyup.enter.native="submitForm()"
      >
        <el-form-item prop="userAccount">
          <el-popover
            popper-class="account-list"
            v-model="showAccount"
            placement="bottom-end"
            width="220"
            trigger="manual"
          >
            <div
              @click="selectAccount(acc,pwd)"
              class="account-list-item"
              v-for="(pwd,acc) in remerberAccoutList"
              :key="acc"
            >
              <div class="account-list-item-left">{{acc}}</div>
              <div
                @click="deleteAccount(acc,$event)"
                class="account-list-item-right"
              >
                <i class="el-icon-delete"></i>
              </div>
            </div>
            <el-input
              slot="reference"
              tabindex="1"
              v-model.trim="param.userAccount"
              placeholder="请输入账号"
              @focus="onFocus($event)"
              @input="onInput"
            >
              <el-button
                slot="prepend"
                icon="el-icon-user"
              ></el-button>
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            tabindex="2"
            show-password
            type="password"
            placeholder="请输入密码"
            v-model.trim="param.password"
            autocomplete="new-password"
          >
            <el-button
              slot="prepend"
              icon="el-icon-unlock"
            ></el-button>
          </el-input>
        </el-form-item>
        <!-- <div class="login-img">
          <el-form-item prop="randImageValidateCode">
            <el-input
              tabindex="3"
              maxlength="4"
              v-model.trim="param.randImageValidateCode"
              placeholder="点击右侧图片可刷新"
              @keyup.enter.native="submitForm()"
            >
              <el-button
                slot="prepend"
                icon="el-icon-lx-pic"
              ></el-button>
            </el-input>
          </el-form-item>
          <img
            :src="codeImg"
            class="login-img-img"
            @click="refreshValidateCode"
          />
        </div> -->
        <p class="login-tip">
          <span>
            <el-checkbox
              true-label="1"
              false-label="0"
              v-model="remerberStatus"
              @change="changeRemerberStatus"
            >记住密码
            </el-checkbox>
          </span>
          <span>
            <el-link
              class="login-right"
              tabindex="5"
              :underline="false"
              type="primary"
              @click="getPsw"
            >忘记密码</el-link>
          </span>
        </p>
        <!-- <div v-for="(pwd,acc) in remerberAccoutList" :key="acc">
                    账号:{{acc}},密码：{{pwd}}
                </div>-->
        <!-- <p class="login-tips"><el-link tabindex="5" :underline="false" type="primary" @click="getPsw">忘记密码？</el-link></p> -->
        <div class="login-btn">
          <el-button
            tabindex="4"
            type="primary"
            :loading="loading"
            @click="submitForm()"
          >{{loading?'登录中...':'登录'}}
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>

import { Login } from '../api/index'; // 测试接口可删
import md5 from 'js-md5';
import config from '@/config';

const REMERBER_STATUS = 'REMERBER_STATUS';
const REMERBER_ACCOUT_LIST = 'REMERBER_ACCOUT_LIST';
const REMERBER_ACCOUT_LIST_TIME = 'REMERBER_ACCOUT_LIST_TIME';

export default {
  name: 'Login',
  data: function () {
    return {
      codeImg: config.rootPath + 'system/validateCode/getValidateCodeImage?' + Math.random(),
      param: {
        userAccount: '',
        password: '',
        // randImageValidateCode: ''
      },
      rules: {
        userAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        // randImageValidateCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
      },
      loading: false,

      //记住账号功能
      remerberStatus: '0',
      showAccount: false,
      remerberAccoutList: {}
    };
  },
  methods: {
    /**
     *  登录
     */
    Login () {
      let param = Object.assign({}, this.param);
      param.password = md5(this.param.password);//登录密码加密
      this.loading = true;
      Login(param)
        .then(res => {
          //console.log(res);
          this.loading = false;
          sessionStorage.setItem('ms_username', res.data.userName);
          // sessionStorage.setItem('menus', JSON.stringify(res.data.menus));//暂时注释，待登录数据含有菜单列表后解决
          delete res.data.userName;
          sessionStorage.setItem('user', JSON.stringify(res.data));
          sessionStorage.setItem('token', JSON.stringify(res.data.token));
          sessionStorage.setItem("tokenTime", (new Date().getTime()));
          //记住账号密码
          this.remerberAccout(this.param);
          // this.listByUserId(res.data.userId)
          this.$router.push('/');
        })
        .catch(err => {
          this.loading = false;
          //console.error('登录错误：', err);
        });
    },

    /**
     * 根据登录账号ID获取菜单列表
     * @param userId{String} 账号ID
     */
    listByUserId (userId) {
      listByUserId(userId).then(res => {
        this.$message.success(`登录成功`);
        sessionStorage.setItem('menus', JSON.stringify(res.data));
        this.$router.push('/');
      })
    },
    refreshValidateCode () {
      this.codeImg = config.rootPath + 'system/validateCode/getValidateCodeImage?' + Math.random();
    },
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.Login();
        }
      });
    },
    getPsw () {
      this.$alert('若忘记密码,请直接联系管理员', '忘记密码', {
        confirmButtonText: '确定',
        callback: () => { }
      })
    },
    /**
     * 修改记住当前账号和密码的状态
     * 将修改缓存到本地
     * @param {boolern}val checkbox选择的状态值
     */
    changeRemerberStatus (val) {
      this.remerberStatus = val;
      //console.log('当前记住账号状态：', this.remerberStatus);
      if (this.remerberStatus == 0) {
        this.clearRemerberAccout();
      }
      // 本地缓存记住当前的状态
      localStorage.setItem(REMERBER_STATUS, this.remerberStatus);
    },
    /**
     * 获取本地记住状态
     */
    getLocalRemerberStatus () {
      let status = localStorage.getItem(REMERBER_STATUS);
      this.remerberStatus = status;
      //console.log('当前记住状态：', status);
    },
    /**
     * 记住当前输入正确的账号
     * @param {object} userAccount 当前登录成功过的账号
     * 包含字段：{
     *  userAccount: '',
     *  password: '',
     * }
     */
    remerberAccout (userAccount) {
      if (this.remerberStatus == null) {
        this.remerberStatus = 0
      }
      //判断当前账号是否支持记住，不记住则跳过
      if (this.remerberStatus == 0) {
        return;
      }
      //如果记住状态，更新本地记住的账号列表
      let accoutList = this.getRemerberAccoutList();
      let accoutTimeList = this.getRemerberAccoutTimeList();
      accoutList[userAccount.userAccount] = userAccount.password;
      accoutTimeList[userAccount.userAccount] = new Date().getTime();
      //console.log('当前记住的账号列表：', accoutList);
      localStorage.setItem(REMERBER_ACCOUT_LIST, JSON.stringify(accoutList));
      localStorage.setItem(REMERBER_ACCOUT_LIST_TIME, JSON.stringify(accoutTimeList));
    },
    /**
     * 获取记住的账号列表
     * @returns  {map} list 本地记住的账号列表
     */
    getRemerberAccoutList () {
      let accoutList = localStorage.getItem(REMERBER_ACCOUT_LIST);
      if (accoutList) {
        try {
          accoutList = JSON.parse(accoutList);
        } catch (error) {
          accoutList = {};
        }
      } else {
        accoutList = {};
      }
      this.remerberAccoutList = accoutList;
      return accoutList;
    },
    /**
     * 获取记住的账号时间列表
     * @returns  {map} list 本地记住的账号时间列表
     */
    getRemerberAccoutTimeList () {
      let accoutList = localStorage.getItem(REMERBER_ACCOUT_LIST_TIME);
      if (accoutList) {
        try {
          accoutList = JSON.parse(accoutList);
        } catch (error) {
          accoutList = {};
        }
      } else {
        accoutList = {};
      }
      return accoutList;
    },
    /**
     * 清空记住的账号列表
     */
    clearRemerberAccout () {
      this.remerberAccoutList = {};
      localStorage.removeItem(REMERBER_ACCOUT_LIST);
      localStorage.removeItem(REMERBER_ACCOUT_LIST_TIME);
    },
    /**
     * 选中账号填充
     * @param {string} account 账号
     * @param {pwd} pwd 密码
     */
    selectAccount (account, pwd) {
      this.param.userAccount = account;
      this.param.password = pwd;
      //隐藏内容
      this.showAccount = false;
      //清除表单校验
      this.$nextTick(() => {
        this.$refs.login.clearValidate();
      });
    },
    /**
     * 清空记住的账号列表
     * @param {string} account 账号
     * @param {event} evt 点击事件
     */
    deleteAccount (account, evt) {
      this.$confirm(`确定要忘记账号【${account}】吗？`, '提示', {
        type: 'warning'
      })
        .then(() => {
          if (this.param.userAccount == account) {
            //当前表单数据相同，则清空
            this.param.userAccount = '';
            this.param.password = '';
          }
          //删除当前账号
          delete this.remerberAccoutList[account];
          this.showAccount = false;
          //console.log('删除后列表：', this.remerberAccoutList);
          //更新本地数据
          localStorage.setItem(REMERBER_ACCOUT_LIST, JSON.stringify(this.remerberAccoutList));
          let accoutTimeList = this.getRemerberAccoutTimeList();
          delete accoutTimeList[account];
          localStorage.setItem(REMERBER_ACCOUT_LIST_TIME, JSON.stringify(accoutTimeList));
        })
        .catch(() => { });
      //阻止冒泡
      evt.stopPropagation();
      return false;
    },
    /**
     * 填充默认账号
     */
    fillDefaultAccout () {
      //获取记住的账号列表
      let accountList = this.getRemerberAccoutList();
      let accounts = Object.keys(accountList);
      //存在本地账号，默认选中时间最新的一个
      if (accounts && accounts.length) {
        //获取账号对应的时间
        let accountTimeList = this.getRemerberAccoutTimeList();
        //查询最新的账号时间
        let max = 0,
          account = '';
        for (let key in accountTimeList) {
          if (accountTimeList[key] > max) {
            max = accountTimeList[key];
            account = key;
          }
        }
        //存在账号则选中
        if (account && account.length && this.remerberStatus == 1) {
          let pwd = accountList[account];
          this.selectAccount(account, pwd);
          //console.log('默认填充账号：', account);
        }
      }
    },
    /**
     * 账号输入监听处理
     */
    onFocus (evt) {
      let accounts = Object.keys(this.remerberAccoutList);
      //console.log('accounts==', accounts);
      if (accounts && accounts.length) {
        this.showAccount = true;
        let dom = document.querySelector('.el-popover.account-list');
        //console.log('dom==', dom);
        dom.style['max-height'] = '150px';
        dom.style['overflow-y'] = 'auto';
      } else {
        //console.log(222);
        this.showAccount = false;
      }
      //阻止冒泡
      evt.stopPropagation();
      return false;
    },
    /**
     * 输入监听，如果输入文字则隐藏pop框
     */
    onInput (val) {
      if (val && val.length) {
        this.showAccount = false;
      }
    },
    /**
     * 监听屏幕点击事件，隐藏pop框
     * @author lmh
     */
    hidePop (evt) {
      //判断是否来院输入框弹出点击和删除按钮点击
      if (!evt.target.classList.contains('el-input__inner')) {
        this.showAccount = false;
      }
    }
  },
  created () {
    localStorage.removeItem('list');
    // sessionStorage.removeItem('menus');
    sessionStorage.clear();
    //获取当前记住账号状态
    this.getLocalRemerberStatus();
    //默认选中最新的一个
    this.fillDefaultAccout();
  }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../assets/img/login-bg.png') #8095b0;
    background-size: cover;
    background-repeat: no-repeat;
}

.ms-title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    background-color: #fff;
    padding: 40px 0 30px 0;
}
.subtitle {
    padding-top: 16px;
    font-size: 16px;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 46%;
    width: 380px;
    margin: -150px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.login-img {
    position: relative;
}

.login-img-img {
    width: 97px;
    height: 30px;
    position: absolute;
    top: 1px;
    right: 1px;
}

.ms-content {
    padding: 0 50px 50px 50px;
    background-color: #fff;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tip {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}

>>> .el-checkbox__inner {
    border-color: #66b1ff;
}

.account-list-item {
    display: flex;
    padding: 10px;
    background-color: #f2f2f2;
}

.account-list-item:hover {
    cursor: pointer;
    background-color: #ccc;
}

.account-list-item-left {
    flex: 1;
}

.account-list-item-right {
    width: 30px;
    text-align: center;
}

.account-list-item-right:hover .el-icon-delete {
    color: #ff0000;
}
.login-right {
    float: right;
}
</style>