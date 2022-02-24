// import React, { useContext } from 'react'
// import { EditContext } from 'components/context'

let scrolling: 0 | 1 | 2 = 0  // 0: none; 1: 编辑区主动触发滚动; 2: 展示区主动触发滚动
let scrollTimer: NodeJS.Timeout;  // 结束滚动的定时器

export const handleScroll = (
  block: number,
  event: any,
  edit?: HTMLTextAreaElement | null,
  show?: HTMLDivElement | null,
) => {
  let { scrollHeight, scrollTop, clientHeight } = event.target
  let scale = scrollTop / (scrollHeight - clientHeight) // 计算滚动比例

  if (block === 1) {
    if (scrolling === 0) scrolling = 1;  // 记录主动触发滚动的区域
    if (scrolling === 2) return;    // 当前是「展示区」主动触发的滚动，因此不需要再驱动展示区去滚动

    if (show)
      driveScroll(scale, show)  // 驱动「展示区」的滚动

  } else if (block === 2) {
    if (scrolling === 0) scrolling = 2;
    if (scrolling === 1) return;    // 当前是「编辑区」主动触发的滚动，因此不需要再驱动编辑区去滚动

    if (edit)
      driveScroll(scale, edit)
  }
};

// 驱动一个元素进行滚动
const driveScroll = (scale: number, el: HTMLElement) => {
  let { scrollHeight, clientHeight } = el
  el.scrollTop = (scrollHeight - clientHeight) * scale // // scrollTop的同比例滚动

  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    scrolling = 0    // 在滚动结束后，将scrolling设为0，表示滚动结束
    clearTimeout(scrollTimer)
  }, 200)
};