import { useContext } from 'react'
import { EditContext } from 'components/context'
import Icon from 'components/icon'

// 斜体
export function Italic() {
  const { edit, setNew, value } = useContext(EditContext)

  const add = () => {
    if (edit) {
      let { selectionStart, selectionEnd } = edit
      let newValue: string
      if (selectionStart === selectionEnd) {
        // 无选中内容
        newValue = value.slice(0, selectionStart) +
          '_斜体文字_' +
          value.slice(selectionEnd)
      } else if (
        /^_{1}[\s\S]+_{1}$/.test(value.slice(selectionStart, selectionEnd))
      ) {
        // 选中内容已斜体
        let b = /^_{1}([\s\S]+?)_{1}$/.exec(value.slice(selectionStart, selectionEnd)) || [];

        newValue = value.slice(0, selectionStart) +
          (/^__$/.test(b[0]) ? '' : b[1]) +
          value.slice(selectionEnd)
      } else {
        // 选中内容未斜体
        newValue = value.slice(0, selectionStart) +
          '_' +
          value.slice(selectionStart, selectionEnd) +
          '_' +
          value.slice(selectionEnd)
      }

      if (setNew) setNew(newValue)
    }
  };

  return <Icon type='icon-wenben-xieti' onClick={add} />;
}