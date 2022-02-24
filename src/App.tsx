import { useState, useRef, useEffect } from 'react'
import css from 'style/app.module.css'
import { md } from 'components/md'
import { EditContext } from 'components/context'
import { handleScroll } from 'components/scroll'
import { NavList } from 'components/navlist'
import { KeyboardEvent } from 'components/keyboardEvent'

function App() {
  const [htmlString, setHtmlString] = useState('')  // 存储解析后的html字符串
  const [value, setValue] = useState('')   // 编辑区的文字内容
  const [ready, setReady] = useState<boolean>(false)
  const editRef = useRef<HTMLTextAreaElement | null>(null)
  const showRef = useRef<HTMLDivElement | null>(null)
  let history = useRef<string[]>([]) // 撤回 历史记录，最多十条
  let ctrlZ = useRef<number>(1) // 撤回操作 次数 1-未撤回

  useEffect(() => {
    if (editRef.current && showRef.current)
      setReady(true)
  }, [])

  useEffect(() => {
    // 编辑区内容改变，更新value的值，并同步渲染
    setHtmlString(md.render(value))
  }, [value])



  // value 变化时，记录历史
  useEffect(() => {
    if (ctrlZ.current === 1) {
      if (history.current.length >= 10)
        history.current = history.current.slice(1, 10)
      history.current.push(value)
    }
  }, [value]);

  return (
    <div className={css.edit_box}>
      {ready ?
        <EditContext.Provider value={{
          edit: editRef.current,
          show: showRef.current,
          setNew: setValue,
          value: value,
          history: history.current,
        }}>
          <NavList />
        </EditContext.Provider>
        : null
      }
      <div className={css.warp}>
        <textarea
          style={{ height: '100%' }}
          ref={editRef}
          className={css.edit}
          placeholder='开始输入...'
          onScroll={(e) => handleScroll(1, e, null, showRef.current)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            return KeyboardEvent(
              e,
              editRef.current,
              setValue,
              (_this) => {
                if (_this.ctrlKey) {
                  if (
                    _this.code === 'KeyZ' &&
                    history.current.length >= ++ctrlZ.current
                  ) {
                    setValue(history.current[history.current.length - ctrlZ.current])
                  }
                } else {
                  ctrlZ.current = 1
                }
              }
            )
          }}
          value={value}
          spellCheck={false} // 关闭语法检查
        />
        <div
          id='write'
          ref={showRef}
          onScroll={(e) => handleScroll(2, e, editRef.current)}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </div>
    </div>
  )
}

export default App
