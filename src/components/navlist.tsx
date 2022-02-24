import React from 'react'
import css from 'style/components/navlist.module.css'
import Tooltip from './tooltip'

import { Bold } from 'nav/blod'
import { Italic } from 'nav/italic'
import { Strikethrough } from 'nav/strikethrough'
import { OrderedList } from 'nav/orderedList'
import { UnorderedList } from 'nav/unorderedList'
import { CarryOut } from 'nav/carryOut'
import { Image } from 'nav/image'
import { Appstore } from '@/nav/appStore'

interface Nav {
  key: number
  name: string
  component: JSX.Element
  style?: React.CSSProperties // 内容样式
  placement?: boolean // 提示框位置 true-left false-bottomLeft 默认false
}

const list: Nav[] = [
  { key: 1, name: '加粗', component: <Bold /> },
  { key: 2, name: '斜体', component: <Italic /> },
  { key: 3, name: '删除线', component: <Strikethrough /> },
  { key: 4, name: '图片', component: <Image /> },
  { key: 5, name: '有序列表', component: <OrderedList /> },
  { key: 6, name: '无序列表', component: <UnorderedList /> },
  { key: 7, name: '任务列表', component: <CarryOut /> },
  {
    key: -1,
    name: '设置',
    component: <Appstore />,
    style: {
      flexGrow: 1, display: 'flex', justifyContent: 'flex-end'
    },
    placement: true
  }
]

export function NavList() {
  return <div className={css.nav}>
    {list.map((item: Nav) => <Tooltip
      placement={item.placement ? 'left' : 'bottomLeft'}
      title={item.name}
      key={item.key}
      style={item.style}
      tipStyle={item.key === 7 ? { marginRight: 10 } : undefined}
    >
      {item.component}
    </Tooltip>)}
  </div>;
}