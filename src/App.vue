<template>
  <div id="app">
    <!-- 路由出口
    会根据地址栏中的地址的区别，来载入不同的组件，并显示在这里
    -->
    <router-view></router-view>
  </div>
</template>

<script>
// App.vue这个组件是根组件：所有的其它组件都是从这里开始引入的
export default {
  name:'App'
}
</script>
