declare namespace TooltipSpace {
  interface Props {
    // 子元素对象
    children: JSX.Element
    // 提示文字
    title: string | JSX.Element
    // 常显内容样式
    style?: React.CSSProperties
    // 提示框样式
    tipStyle?: React.CSSProperties
    // 提示框位置
    placement?: 'top' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left'
  }
}

export default TooltipSpace