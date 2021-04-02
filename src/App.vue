<template>
  <div
    id="app"
    v-cloak
  >
    <router-view></router-view>
  </div>
</template>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css'; /*深色主题*/

.selectRow,.el-table__body tr.current-row>td {
    background-color: #c6e5ff !important;
}
.hoveTitle {
    text-align: center;
    /* width: 140px; */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
[v-cloak] {
    display: none;
}
</style>