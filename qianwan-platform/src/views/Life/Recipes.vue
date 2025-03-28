<template>
    <div class="recipes-container">
      <n-h1 class="page-title">菜谱大全</n-h1>
      
      <div class="recipe-book">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.id" 
          class="recipe-page"
        >
          <div class="recipe-image">
            <img :src="recipe.image" :alt="recipe.name" />
          </div>
          <div class="recipe-content">
            <n-h2 class="recipe-title">{{ recipe.name }}</n-h2>
            <n-p class="recipe-description">{{ recipe.description }}</n-p>
            
            <n-h3 class="section-title">食材</n-h3>
            <n-tag 
              v-for="(ingredient, index) in recipe.ingredients" 
              :key="index"
              type="info"
              class="ingredient-tag"
            >
              {{ ingredient }}
            </n-tag>
            
            <n-h3 class="section-title">制作步骤</n-h3>
            <ol class="steps-list">
              <li v-for="(step, index) in recipe.steps" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div class="pagination">
        <n-button 
          type="primary" 
          ghost 
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          上一页
        </n-button>
        <span class="page-info">第 {{ currentPage }} 页</span>
        <n-button 
          type="primary" 
          ghost 
          :disabled="currentPage * itemsPerPage >= recipes.length"
          @click="nextPage"
        >
          下一页
        </n-button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { NH1, NH2, NH3, NP, NTag, NButton } from 'naive-ui'
  import { fetchRecipes } from '../../api/api'
  
  interface Recipe {
    id: number
    name: string
    image: string
    description: string
    ingredients: string[]
    steps: string[]
  }
  
  const recipes = ref<Recipe[]>([])
  const currentPage = ref(1)
  const itemsPerPage = 1
  
  onMounted(async () => {
    recipes.value = await fetchRecipes()
  })
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }
  
  const nextPage = () => {
    if (currentPage.value * itemsPerPage < recipes.value.length) {
      currentPage.value++
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .recipes-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-title {
    text-align: center;
    margin-bottom: 2rem;
    background-image: v-bind('$primary-gradient');
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .recipe-book {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    min-height: 600px;
    display: flex;
    flex-direction: column;
  }
  
  .recipe-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    .recipe-image {
      img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      }
    }
    
    .recipe-content {
      .recipe-title {
        color: #333;
        margin-bottom: 1rem;
      }
      
      .recipe-description {
        color: #666;
        margin-bottom: 1.5rem;
        line-height: 1.8;
      }
      
      .section-title {
        margin: 1.5rem 0 1rem;
        color: #555;
        position: relative;
        padding-left: 1rem;
        
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 60%;
          background-image: v-bind('$primary-gradient');
          border-radius: 2px;
        }
      }
      
      .ingredient-tag {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        background: rgba(110, 142, 251, 0.1);
        border: none;
      }
      
      .steps-list {
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.8rem;
          line-height: 1.7;
          color: #555;
        }
      }
    }
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 1rem;
    
    .page-info {
      margin: 0 1rem;
      color: #666;
    }
  }
  </style>