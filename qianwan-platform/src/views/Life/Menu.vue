<template>
    <div class="menu-container">
      <n-h1 class="page-title">今日菜单</n-h1>
      <n-p class="page-subtitle">选择您想做的菜品</n-p>
      
      <div class="menu-grid">
        <div 
          v-for="recipe in recipes" 
          :key="recipe.id" 
          class="menu-item"
          :class="{ selected: selectedRecipes.includes(recipe.id) }"
          @click="toggleSelect(recipe.id)"
        >
          <div class="item-image">
            <img :src="recipe.image" :alt="recipe.name" />
            <div class="checkmark" v-if="selectedRecipes.includes(recipe.id)">
              <n-icon size="24" color="#52c41a">
                <CheckmarkCircle />
              </n-icon>
            </div>
          </div>
          <n-text class="item-name">{{ recipe.name }}</n-text>
        </div>
      </div>
      
      <div class="submit-area">
        <n-button 
          type="primary" 
          size="large" 
          :disabled="selectedRecipes.length === 0"
          @click="showSelectedRecipes"
        >
          提交菜单 ({{ selectedRecipes.length }})
        </n-button>
      </div>
      
      <n-modal 
        v-model:show="showModal" 
        preset="card"
        :style="{ width: '800px', maxWidth: '90vw' }"
        :bordered="false"
        :segmented="false"
      >
        <template #header>
          <n-gradient-text type="info" :size="20">
            您选择的菜单
          </n-gradient-text>
        </template>
        
        <div class="modal-content">
          <div 
            v-for="recipe in selectedRecipeDetails" 
            :key="recipe.id" 
            class="modal-recipe"
          >
            <n-h2 class="modal-recipe-title">{{ recipe.name }}</n-h2>
            <div class="modal-recipe-content">
              <img :src="recipe.image" :alt="recipe.name" class="modal-image" />
              <div class="modal-recipe-info">
                <n-p class="modal-description">{{ recipe.description }}</n-p>
                <n-collapse accordion>
                  <n-collapse-item title="食材" name="ingredients">
                    <div class="ingredients-list">
                      <n-tag 
                        v-for="(ingredient, index) in recipe.ingredients" 
                        :key="index"
                        type="info"
                        class="ingredient-tag"
                      >
                        {{ ingredient }}
                      </n-tag>
                    </div>
                  </n-collapse-item>
                  <n-collapse-item title="制作步骤" name="steps">
                    <ol class="steps-list">
                      <li v-for="(step, index) in recipe.steps" :key="index">
                        {{ step }}
                      </li>
                    </ol>
                  </n-collapse-item>
                </n-collapse>
              </div>
            </div>
          </div>
        </div>
      </n-modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { NH1, NP, NText, NButton, NModal, NGradientText, NCollapse, NCollapseItem, NTag, NIcon } from 'naive-ui'
  import { CheckmarkCircle } from '@vicons/ionicons5'
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
  const selectedRecipes = ref<number[]>([])
  const showModal = ref(false)
  
  onMounted(async () => {
    recipes.value = await fetchRecipes()
  })
  
  const toggleSelect = (id: number) => {
    const index = selectedRecipes.value.indexOf(id)
    if (index === -1) {
      selectedRecipes.value.push(id)
    } else {
      selectedRecipes.value.splice(index, 1)
    }
  }
  
  const selectedRecipeDetails = computed(() => {
    return recipes.value.filter(recipe => selectedRecipes.value.includes(recipe.id))
  })
  
  const showSelectedRecipes = () => {
    showModal.value = true
  }
  </script>
  
  <style lang="scss" scoped>
  .menu-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-title {
    text-align: center;
    margin-bottom: 0.5rem;
    background-image: v-bind('$primary-gradient');
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .page-subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .menu-item {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      border: 2px solid transparent;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }
      
      &.selected {
        border-color: #52c41a;
        background: rgba(82, 196, 26, 0.05);
      }
      
      .item-image {
        position: relative;
        margin-bottom: 0.5rem;
        
        img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 6px;
        }
        
        .checkmark {
          position: absolute;
          top: -10px;
          right: -10px;
          background: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
      }
      
      .item-name {
        font-weight: 500;
        color: #333;
      }
    }
  }
  
  .submit-area {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    
    .n-button {
      padding: 0 2rem;
      height: 48px;
      font-size: 16px;
    }
  }
  
  .modal-content {
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 0.5rem;
    
    .modal-recipe {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px dashed #eee;
      
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      .modal-recipe-title {
        margin-bottom: 1rem;
        color: #333;
      }
      
      .modal-recipe-content {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1.5rem;
        
        .modal-image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }
        
        .modal-recipe-info {
          .modal-description {
            color: #666;
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          
          .ingredients-list {
            margin-top: 0.5rem;
            
            .ingredient-tag {
              margin-right: 0.5rem;
              margin-bottom: 0.5rem;
              background: rgba(110, 142, 251, 0.1);
              border: none;
            }
          }
          
          .steps-list {
            padding-left: 1.5rem;
            margin-top: 0.5rem;
            
            li {
              margin-bottom: 0.5rem;
              color: #555;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
  </style>