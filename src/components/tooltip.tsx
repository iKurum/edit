import css from 'style/components/tooltip.module.css'
import TooltipSpace from 'd.ts/tooltip'

// 提示框
function Tooltip(props: TooltipSpace.Props) {
  let { placement, children, title, style, tipStyle } = props;

  return <div className={css.tooltip} style={style}>
    <div>
      <div
        className={[css.tip, css[placement || 'top']].join(' ')}
        style={tipStyle}
      >
        {title}
      </div>
      {children}
    </div>
  </div>;
}

export default Tooltip