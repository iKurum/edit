import React from 'react'

export default function Icon(props: {
  type: string,
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}) {
  return <>
    <span
      style={{ margin: '4px' }}
      onClick={props.onClick}
    >
      <span style={{ cursor: 'pointer' }}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={`#${props.type}`}></use>
        </svg>
      </span>
    </span>
  </>
}