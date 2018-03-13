<template lang="pug">
  .sidebar
    el-menu.el-menu-vertical-demo(:default-active='onRoutes', unique-opened='', router='')
      template(v-for='item in items')
        template(v-if='item.subs')
          el-submenu(:index='item.index')
            template(slot='title')
              i(:class='item.icon')
              | {{ item.title }}
            el-menu-item(v-for='(subItem,i) in item.subs', :key='i', :index='subItem.index')
              | {{ subItem.title }}
        template(v-else='')
          el-menu-item(:index='item.index')
            i(:class='item.icon')
            | {{ item.title }}
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'el-icon-document',
          index: '1',
          title: '猜中就送',
          subs: [
            {
              index: '/dashboard',
              title: '仪表盘'
            },
            {
              index: '/product',
              title: '商品列表'
            },
            {
              index: '/category',
              title: '分类维护'
            },
            {
              index: '/lucky',
              title: '中奖查询'
            },
            {
              index: '/fans',
              title: '粉丝列表'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 200px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
