import { Notification, MessageBox } from 'element-ui'
import { failTest } from './failText'
import { errorText } from './errorText'
import R from '@/router';
import { debounce2 } from './index'

class Me {
    constructor() {
        //防抖函数改造，同样的消息1000毫秒内只执行一次
        let _error = this.error;
        let _success = this.success;
        let _fail = this.fail;
        this.error = debounce2(_error)
        this.success = debounce2(_success)
        this.fail = debounce2(_fail)
    }
    // 成功提示
    success(title) {
        Notification.success(title)
    }
    // 失败提示
    error(code, title) {
        if (errorText[code]) {
            //登录信息失效，直接跳转
            // R.push({path : errorText[code].path})
            Notification.error({
                message: title,
                type: 'error',
                onClose: () => {
                    R.push({ path: errorText[code].path })
                }
            })
        } else {
            Notification.error({
                dangerouslyUseHTMLString: true,
                message: title,
                type: 'error',
            })
        }
    }
    //系统一次提示
    fail(code) {
        if (failTest[code]) {
            Notification.error({
                message: failTest[code].title,
                type: 'error',
                onClose: () => {
                    if (failTest[code].isRouter) {
                        R.push({ path: failTest[code].path })
                    }
                }
            })
        } else {
            Notification.error('系统异常')
        }
    }
}
const M = new Me()

export { M }