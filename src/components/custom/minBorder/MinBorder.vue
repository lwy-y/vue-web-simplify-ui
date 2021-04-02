<template>
  <div>
    <div class="left-border" :style="{color: color,fontSize : size+'px',borderBottomWidth: borderBottomWidth+'px'}">
      {{title}}
    </div>
  </div>
</template>

<script>
    export default {
        name: 'MinBorder',
        props:{
            title :{
                type: String,
                default : '小标题'
            },
            color :{
                type: String,
                default : '#029AE6'
            },
            size :{
                type: Number,
                default : 14
            },
            borderBottomWidth: {
                type: Number,
                default : 1
            }
        }
    };
</script>

<style scoped>
.left-border{
  margin-left: 16px;
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 7px;
  position: relative;
  padding-top: 3px;
}
.left-border:before{
  content: '';
  position: absolute;
  background: #029AE6;
  width: 3px;
  height: 32px;
  left: -11px;
}
</style>