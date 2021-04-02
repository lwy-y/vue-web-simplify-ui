<template>
  <div class="sidebar">
    <logo v-if="showLogo" :collapse="collapse" />
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :unique-opened="true"
      router
    >
      <template v-for="item in items">
        <template v-if="item.menuVOList && item.menuVOList.length">
          <el-submenu
            :index="item.route"
            :key="item.route"
          >
            <!-- <el-submenu :index="index +'' "> -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.menuName }}</span>
            </template>
            <template v-for="subItem in item.menuVOList">
              <el-submenu
                v-if="subItem.menuVOList && subItem.menuVOList.length"
                :index="subItem.route"
                :key="subItem.menuId"
              >
                <template slot="title">{{ subItem.menuName }}</template>
                <el-menu-item
                  v-for="threeItem in subItem.menuVOList"
                  :key="threeItem.menuId"
                  :index="threeItem.route"
                >{{ threeItem.menuName }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.route"
                :key="subItem.menuId"
              >{{ subItem.menuName }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item
            v-if="item.route =='/dashboard'"
            :index="item.route"
            :key="item.route"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';
import Logo from '../common/Logo'
export default {
  components:{Logo},
  data () {
    return {
      collapse: false,
      showLogo:true,
      items: [
        {
          icon: 'el-icon-view',
          route: '/dashboard',
          menuName: '系统首页'
        },
      ]
    };
  },
  computed: {
    onRoutes () {
      // //console.log(this.$route.path);
      return this.$route.path;
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
    // this.items = JSON.parse(sessionStorage.getItem('menus'));
    // //console.log('menus:', this.items);
    this.getMenus(JSON.parse(sessionStorage.getItem('menus')))
  },
  methods: {
    getMenus (menusList) {
      // let menusList = JSON.parse(sessionStorage.getItem('menus'));
      // //console.log(menusList, "获取的菜单");
      //菜单赋值权限
      this.items.forEach((item, index) => {
        if (item.route != "/dashboard") {
          //将不存在的权限进行过滤
          let res = item.menuVOList.filter((ite)=>{
            return JSON.stringify(menusList).indexOf(`${ite.menuName}`) != -1
          })
          item.menuVOList = res
        }
      })
      // console.log(this.items, "过滤后的菜单");
    },
  },


};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 168px;
}

.sidebar > ul {
    height: 100%;
}

>>> .el-submenu .el-menu-item{
  min-width: 168px;
}
>>> .el-menu{
  border-right: 0px;
}
</style>
