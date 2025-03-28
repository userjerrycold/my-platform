<template>
  <n-config-provider>
    <n-message-provider>
      <n-layout style="min-height: 100vh">
        <!-- 顶部导航栏 -->
        <n-layout-header bordered class="header">
          <n-gradient-text type="info" :size="24">
            Qianwan Platform
          </n-gradient-text>
          
          <n-menu
            mode="horizontal"
            :options="menuOptions"
            :value="activeMenuKey"
            @update:value="handleMenuSelect"
            class="nav-menu"
          />
        </n-layout-header>

        <!-- 主内容区 -->
        <n-layout-content class="main-content">
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NConfigProvider,
  NMessageProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NMenu,
  NGradientText,
  type MenuOption
} from 'naive-ui'

const router = useRouter()
const route = useRoute()



const menuOptions: MenuOption[] = [
  {
    label: '生活',
    key: 'life',
    children: [
      { label: '菜谱', key: 'life-recipes' },
      { label: '菜单', key: 'life-menu' }
    ]
  },
  {
    label: '工作',
    key: 'work',
    children: [
      { label: '知识库', key: 'work-knowledge' }
    ]
  }
]

const activeMenuKey = computed(() => {
  const path = route.path
  if (path.startsWith('/life/recipes')) return 'life-recipes'
  if (path.startsWith('/life/menu')) return 'life-menu'
  if (path.startsWith('/work/knowledge')) return 'work-knowledge'
  return ''
})

const handleMenuSelect = (key: string) => {
  const map: Record<string, string> = {
    'life-recipes': '/life/recipes',
    'life-menu': '/life/menu',
    'work-knowledge': '/work/knowledge'
  }
  if (map[key]) router.push(map[key])
}
</script>

<style scoped>
.header {
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: 64px;
}

.nav-menu {
  flex: 1;
  margin-left: 2rem;
  :deep(.n-menu-item-content) {
    font-weight: 500;
  }
}

.main-content {
  padding: 2rem;
  background-color: #f8f9fa;
}
</style>