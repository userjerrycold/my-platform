<template>
    <div class="home-container">
      <n-gradient-text type="info" :size="28" class="welcome-title">
        欢迎使用 Qianwan Platform
      </n-gradient-text>
      
      <n-card class="welcome-card">
        <template #cover>
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Welcome">
        </template>
        
        <n-space vertical>
          <n-h2>平台简介</n-h2>
          <n-p>
            这是一个集生活和工作管理于一体的综合平台，包含菜谱管理、菜单规划和知识库等功能。
          </n-p>
          <n-p>
            您可以通过顶部导航栏访问各个功能模块。
          </n-p>
        </n-space>
      </n-card>
      
      <div class="feature-grid">
        <n-card v-for="feature in features" :key="feature.title" hoverable>
          <template #header>
            <n-icon :component="feature.icon" size="24" :color="feature.color" />
            <n-text strong>{{ feature.title }}</n-text>
          </template>
          <n-p>{{ feature.description }}</n-p>
        </n-card>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { NGradientText, NCard, NSpace, NH2, NP, NText, NIcon } from 'naive-ui'
  import { BookOutline, RestaurantOutline, LaptopOutline } from '@vicons/ionicons5'
  
  const features = [
    {
      title: '菜谱大全',
      description: '收集各种美味菜谱，详细步骤指导您烹饪',
      icon: RestaurantOutline,
      color: '#6e8efb'
    },
    {
      title: '菜单规划',
      description: '轻松规划每日菜单，一键生成购物清单',
      icon: BookOutline,
      color: '#a777e3'
    },
    {
      title: '知识库',
      description: '整理工作文档和资源，高效知识管理',
      icon: LaptopOutline,
      color: '#4facfe'
    }
  ]
  </script>
  
  <style lang="scss" scoped>
  .home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .welcome-title {
    display: block;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .welcome-card {
    margin-bottom: 2rem;
    
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    
    .n-card {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }
      
      ::v-deep(.n-card-header) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
  </style>