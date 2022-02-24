declare module 'markdown-it-sub'
declare module 'markdown-it-sup'
declare module 'markdown-it-footnote'
declare module 'markdown-it-deflist'
declare module 'markdown-it-abbr'
declare module 'markdown-it-ins'
declare module 'markdown-it-mark'

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
declare module '*.css'