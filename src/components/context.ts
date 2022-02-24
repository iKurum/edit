import React from 'react'

export let EditContext = React.createContext<{
  // 编辑区域对象
  edit: HTMLTextAreaElement | null
  // 展示区域对象
  show: HTMLDivElement | null
  // 更新输入内容
  setNew: ((value: string) => void) | null
  // 输入的内容
  value: string
  // 历史记录
  history: string[]
}>({
  edit: null,
  show: null,
  setNew: null,
  value: '',
  history: [],
});