import Vue from 'vue'
/**
 * 表单相关混入处理
 * @author lmh
 */
Vue.mixin({
    methods:{
        /**
         * 重置element表单数据
         * @param {*} formRef el-form标签的ref值
         */
        elFormReset(formRef){
            //console.log(this.$refs[formRef])
            if(this.$refs[formRef]){
                this.$refs[formRef].resetFields();
            }
        },
        /**
         * 判断输入值是否为一个数字
         * @param {string|number} val 输入值
         * @param {*} errMsg 错误消息提示
         */
        isInputNumber(val,errMsg){
            let reg = /^[0-9]+$/
            if(val=='' || reg.test(val)){
                return true;
            }
            this.$message.warning(errMsg || '请输入一个数字串');
            return false;
        },


    }
})