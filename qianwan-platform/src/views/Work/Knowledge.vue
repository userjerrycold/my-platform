<template>
    <div class="knowledge-container">
      <n-h1 class="page-title">知识库</n-h1>
      
      <div class="action-bar">
        <n-space>
          <n-button type="primary" @click="showAddModal = true">
            <template #icon>
              <n-icon><Add /></n-icon>
            </template>
            新增文档
          </n-button>
          <n-select 
            v-model:value="filterTag" 
            :options="tagOptions" 
            placeholder="筛选标签" 
            clearable
            style="width: 200px"
          />
        </n-space>
      </div>
      
      <n-data-table
        :columns="columns"
        :data="filteredKnowledge"
        :pagination="pagination"
        :bordered="false"
        class="knowledge-table"
      />
      
      <n-modal 
        v-model:show="showAddModal" 
        preset="dialog"
        title="新增文档"
        positive-text="确认"
        negative-text="取消"
        @positive-click="handleAddKnowledge"
      >
        <n-form
          ref="formRef"
          :model="formValue"
          :rules="rules"
          label-placement="left"
          label-width="auto"
        >
          <n-form-item label="文档标题" path="title">
            <n-input v-model:value="formValue.title" placeholder="请输入文档标题" />
          </n-form-item>
          <n-form-item label="URL" path="url">
            <n-input v-model:value="formValue.url" placeholder="请输入文档URL" />
          </n-form-item>
          <n-form-item label="标签" path="tags">
            <n-select 
              v-model:value="formValue.tags" 
              multiple 
              :options="tagOptions" 
              placeholder="请选择标签"
            />
          </n-form-item>
        </n-form>
      </n-modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { NH1, NButton, NSpace, NSelect, NDataTable, NModal, NForm, NFormItem, NInput, NIcon, useMessage } from 'naive-ui'
  import { Add } from '@vicons/ionicons5'
  import { fetchKnowledge, addKnowledge, deleteKnowledge } from '../../api/api'
  
  // 确保在 setup 的最顶层调用
  const message = useMessage()


  interface KnowledgeItem {
    id: number
    title: string
    url: string
    tags: string[]
    createdAt: string
  }
  

  const knowledgeList = ref<KnowledgeItem[]>([])
  const showAddModal = ref(false)
  const filterTag = ref<string | null>(null)
  
  const formValue = ref({
    title: '',
    url: '',
    tags: []
  })
  
  const rules = {
    title: {
      required: true,
      message: '请输入文档标题',
      trigger: 'blur'
    },
    url: {
      required: true,
      message: '请输入文档URL',
      trigger: 'blur'
    },
    tags: {
      type: 'array',
      required: true,
      message: '请至少选择一个标签',
      trigger: 'change'
    }
  }
  
  const tagOptions = [
    { label: '飞书', value: '飞书' },
    { label: 'gitlab', value: 'gitlab' },
    { label: 'redmine', value: 'redmine' },
    { label: '阿里云', value: '阿里云' },
    { label: 'code', value: 'code' }
  ]
  
  const columns = [
    {
      title: '文档标题',
      key: 'title',
      render: (row: KnowledgeItem) => {
        return h(
          'a',
          {
            href: row.url,
            target: '_blank',
            class: 'doc-link'
          },
          row.title
        )
      }
    },
    {
      title: '标签',
      key: 'tags',
      render: (row: KnowledgeItem) => {
        return row.tags.map(tag => h(
          NTag,
          { 
            type: 'info',
            bordered: false,
            style: { marginRight: '6px', marginBottom: '6px' }
          },
          { default: () => tag }
        ))
      }
    },
    {
      title: '创建时间',
      key: 'createdAt',
      render: (row: KnowledgeItem) => {
        return new Date(row.createdAt).toLocaleString()
      }
    },
    {
      title: '操作',
      key: 'actions',
      render: (row: KnowledgeItem) => {
        return h(NSpace, {}, [
          h(
            NButton,
            {
              size: 'small',
              onClick: () => handleEdit(row)
            },
            { default: () => '编辑' }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              onClick: () => handleDelete(row.id)
            },
            { default: () => '删除' }
          )
        ])
      }
    }
  ]
  
  const pagination = {
    pageSize: 10
  }
  
  onMounted(async () => {
    knowledgeList.value = await fetchKnowledge()
  })
  
  const filteredKnowledge = computed(() => {
    if (!filterTag.value) return knowledgeList.value
    return knowledgeList.value.filter(item => item.tags.includes(filterTag.value))
  })
  
  const handleAddKnowledge = async () => {
    try {
      const newItem = await addKnowledge(formValue.value)
      knowledgeList.value.unshift(newItem)
      message.success('添加成功')
      formValue.value = { title: '', url: '', tags: [] }
    } catch (error) {
      message.error('添加失败')
    }
  }
  
  const handleEdit = (item: KnowledgeItem) => {
    // 这里可以打开编辑模态框，为了简洁省略
    message.info('编辑功能待实现')
  }
  
  const handleDelete = async (id: number) => {
    try {
      await deleteKnowledge(id)
      knowledgeList.value = knowledgeList.value.filter(item => item.id !== id)
      message.success('删除成功')
    } catch (error) {
      message.error('删除失败')
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .knowledge-container {
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
  
  .action-bar {
    margin-bottom: 1.5rem;
    display: flex;
    justify-content: space-between;
  }
  
  .knowledge-table {
    margin-top: 1rem;
    
    :deep(.doc-link) {
      color: #333;
      text-decoration: none;
      transition: color 0.2s;
      
      &:hover {
        color: #6e8efb;
      }
    }
  }
  </style>