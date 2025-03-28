import { ref } from 'vue'
import { mock } from 'mockjs'

// 模拟菜谱数据
const mockRecipes = mock({
  'list|10-20': [{
    'id|+1': 1,
    'name': '@ctitle(3, 8)',
    'image': '@image("300x200", "#50BFFF", "#FFF", "png", "@name")',
    'description': '@cparagraph(2, 5)',
    'steps|3-8': ['@cparagraph(1, 2)'],
    'ingredients|5-10': ['@cword(2, 4)']
  }]
})

// 模拟知识库数据
const mockKnowledge = mock({
  'list|10-20': [{
    'id|+1': 1,
    'title': '@ctitle(5, 12)',
    'url': '@url',
    'tags|1-3': ['@pick(["飞书", "gitlab", "redmine", "阿里云", "code"])'],
    'createdAt': '@datetime'
  }]
})

// 实际API调用函数（已注释，使用mock数据）
/*
const apiBaseUrl = 'https://api.qianwan-platform.com'

export const fetchRecipes = async () => {
  const response = await fetch(`${apiBaseUrl}/recipes`)
  return await response.json()
}

export const fetchKnowledge = async () => {
  const response = await fetch(`${apiBaseUrl}/knowledge`)
  return await response.json()
}

export const addKnowledge = async (data: any) => {
  const response = await fetch(`${apiBaseUrl}/knowledge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}
*/

// 使用mock数据的API函数
export const fetchRecipes = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockRecipes.list
}

export const fetchKnowledge = async () => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  return mockKnowledge.list
}

export const addKnowledge = async (data: any) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  const newItem = {
    id: mockKnowledge.list.length + 1,
    ...data,
    createdAt: new Date().toISOString()
  }
  mockKnowledge.list.unshift(newItem)
  return newItem
}

export const deleteKnowledge = async (id: number) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  const index = mockKnowledge.list.findIndex(item => item.id === id)
  if (index !== -1) {
    mockKnowledge.list.splice(index, 1)
  }
  return { success: true }
}