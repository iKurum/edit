// 按键监听
export function KeyboardEvent(
  e: React.KeyboardEvent<HTMLTextAreaElement>,
  edit: HTMLTextAreaElement | null,
  setValue: (value: string | ((value: string) => string)) => void,
  cb?: (_this: KeyboardEvent) => void
) {
  let _this = e.nativeEvent

  if (_this.code === 'Tab' && edit) {
    _this.preventDefault()

    let { selectionStart, selectionEnd } = edit
    setValue(value => value.slice(0, selectionStart) +
      '   ' +
      value.slice(selectionEnd))
  }

  if (cb) cb(_this);
};