import React, { useContext } from 'react'
import { EditContext } from 'components/context'
import Icon from 'components/icon'

// 加粗
export function Bold() {
  const { edit, setNew, value } = useContext(EditContext)

  const add = () => {
    // 获取编辑区光标的位置。
    // 未选中文字时：selectionStart === selectionEnd
    // 选中文字时：selectionStart < selectionEnd
    if (edit) {
      let { selectionStart, selectionEnd } = edit
      let newValue: string
      if (selectionStart === selectionEnd) {
        // 无选中内容
        newValue = value.slice(0, selectionStart) +
          '**加粗文字**' +
          value.slice(selectionEnd)
      } else if (
        /^\*+[\s\S]+\*+$/.test(value.slice(selectionStart, selectionEnd))
      ) {
        // 选中内容已加粗
        let b = /^\*+([\s\S]+?)\*+$/.exec(value.slice(selectionStart, selectionEnd)) || [];
        
        newValue = value.slice(0, selectionStart) +
          (/^\*+$/.test(b[0]) ? '' : b[1]) +
          value.slice(selectionEnd)
      } else {
        // 选中内容未加粗
        newValue = value.slice(0, selectionStart) +
          '**' +
          value.slice(selectionStart, selectionEnd) +
          '**' +
          value.slice(selectionEnd)
      }

      if (setNew) setNew(newValue)
    }
  };

  return <Icon type='icon-bold' onClick={add} />;
}