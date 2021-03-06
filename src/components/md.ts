
import * as markdownitEmoji from 'markdown-it-emoji'
import * as markdownitSub from 'markdown-it-sub'
import * as markdownitSup from 'markdown-it-sup'
import * as markdownitFootnote from 'markdown-it-footnote'
import * as markdownitDeflist from 'markdown-it-deflist'
import * as markdownitAbbr from 'markdown-it-abbr'
import * as markdownitIns from 'markdown-it-ins'
import * as markdownitMark from 'markdown-it-mark'

import markdownIt from 'markdown-it'
import hljs from 'highlight.js'  // 引入highlight.js库
import 'highlight.js/styles/github.css'  // 引入github风格的代码高亮样式
import 'style/edit/alfluent.css'
import Token from 'markdown-it/lib/token'

export const md: markdownIt = new markdownIt({
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  // 设置代码高亮的配置
  highlight: function (code, language) {
    if (language && hljs.getLanguage(language)) {
      try {
        const perCode = hljs.highlight(code, { language }).value
        // 以换行进行分割
        const lines = perCode.split(/\n/).slice(0, -1)
        // 添加自定义行号
        let html = lines.map((item, index) => {
          return '<li key=' + index + '>' + item + '</li>';
        }).join('')
        html = '<ol>' + html + '</ol>'

        if (lines.length >= 3) {
          html += '<b class="lang-name">' + language + '</b>'
        }

        return `<pre><code class="hljs language-${language}">${html}</code></pre>`;
      } catch (__) { }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + '</code></pre>';
  }
})
  .use(markdownitEmoji) // emoji 表情
  .use(markdownitSub) // 下标
  .use(markdownitSup) // 上标
  .use(markdownitFootnote) // 脚注
  .use(markdownitDeflist) // 定义列表
  .use(markdownitAbbr) // 缩写
  .use(markdownitIns) // 插入
  .use(markdownitMark) // 标记

md.core.ruler.push('wh-imgs', (state) => {
  let heading: Token | null = null
  let paragraph: Token | null = null

  state.tokens.forEach(token => {
    // 标题
    if (token.type === 'heading_open') {
      heading = token
    }
    // p标签
    if (token.type === 'paragraph_open') {
      paragraph = token
    }

    if (token.type === 'inline' && token.children) {
      token.children.forEach(item => {

        // 标题设置 id
        if (item.type === 'text' && !!heading) {
          item.attrs = item.attrs || []
          let id = item.content.match(/^([\S\s]+)[\s]?<#!([\S\s]+)>$/)

          if (id && id[1]) item.content = id[1]
          if (id && id[2]) heading.attrPush(['id', id[2]])
        }

        // 图片设置 宽高、居中
        if (item.tag === 'img') {
          item.attrs = item.attrs || []
          for (let i = 0; i < item.attrs.length; i++) {
            if (item.attrs[i].indexOf('src') !== -1) {
              let src = item.attrs[i][1].split('#!')[0]
              let wh = item.attrs[i][1].split('#!')[1]?.toLowerCase()?.split('x')

              if (wh && wh.length) {
                item.attrs[i][1] = src;
                item.attrs.push([
                  'style',
                  `width: ${wh[0] ? `${wh[0]}px` : 'auto'}; 
                  height: ${wh[1] && !isNaN(Number(wh[1])) ?
                    `${wh[1]}px` : 'auto'
                  };
                  text-align: ${wh[1] && isNaN(Number(wh[1])) ? wh[1] :
                    (wh[2] || 'auto')
                  }`
                ])
                if (paragraph) paragraph.attrPush([
                  'style',
                  `text-align: ${wh[0] && isNaN(Number(wh[0])) ? wh[0] :
                    wh[1] && isNaN(Number(wh[1])) ? wh[1] :
                      (wh[2] || 'auto')
                  }`
                ])
              }

            }
          };
        }

      });
    }
  });
  return true;
})