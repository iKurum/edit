import { useContext } from 'react'
import { EditContext } from 'components/context'
import Icon from 'components/icon'

// 删除线
export function Strikethrough() {
  const { edit, setNew, value } = useContext(EditContext)

  const add = () => {
    if (edit) {
      let { selectionStart, selectionEnd } = edit
      let newValue: string
      if (selectionStart === selectionEnd) {
        // 无选中内容
        newValue = value.slice(0, selectionStart) +
          '~~删除文字~~' +
          value.slice(selectionEnd)
      } else if (
        /^\\~+[\s\S]+\\~+$/.test(value.slice(selectionStart, selectionEnd))
      ) {
        // 选中内容已加粗
        let b = /^\\~+([\s\S]+?)\\~+$/.exec(value.slice(selectionStart, selectionEnd)) || [];

        newValue = value.slice(0, selectionStart) +
          (/^\\~+$/.test(b[0]) ? '' : b[1]) +
          value.slice(selectionEnd)
      } else {
        // 选中内容未加粗
        newValue = value.slice(0, selectionStart) +
          '~~' +
          value.slice(selectionStart, selectionEnd) +
          '~~' +
          value.slice(selectionEnd)
      }

      if (setNew) setNew(newValue)
    }
  };

  return <Icon type='icon-shanchuxian' onClick={add} />;
}