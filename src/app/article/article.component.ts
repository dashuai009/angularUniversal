import { Component, OnInit } from '@angular/core';
import * as md from 'markdown-it';
import * as hljs from 'highlight.js';
import * as latex from 'markdown-it-katex';
import { GetMDService } from '../services/get-md.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private getMD: GetMDService, private route: ActivatedRoute) { }
  result: SafeHtml;
  ngOnInit(): void {
    console.log("Adfasfdsdf");
    const repoName = this.route.snapshot.paramMap.get('repo');
    console.log(repoName);
    //获取url中的参数

    this.getMD.getReadmeFromGithub(repoName).subscribe(res => {
      //请求数据

      let needToChange = md({
        html: true,        // 在源码中启用 HTML 标签
        linkify: true,        // 将类似 URL 的文本自动转换为链接。

        // 启用一些语言中立的替换 + 引号美化
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              // 得到经过highlight.js之后的html代码
              const preCode = hljs.highlight(lang, str, true).value
              // 以换行进行分割
              const lines = preCode.split(/\n/).slice(0, -1)
              // 添加自定义行号
              let html = lines.map((item, index) => {
                return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
              }).join('')
              html = '<ol>' + html + '</ol>'
              // 添加代码语言
              if (lines.length) {
                html += '<b class="name">' + lang + '</b>'
              }
              return '<pre class="hljs"><code>' +
                html +
                '</code></pre>'
            } catch (__) { }
          }

          // 未添加代码语言，此处与上面同理
          const preCode = md.utils.escapeHtml(str)
          const lines = preCode.split(/\n/).slice(0, -1)
          let html = lines.map((item, index) => {
            return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
          }).join('')
          html = '<ol>' + html + '</ol>'
          return '<pre class="hljs"><code>' +
            html +
            '</code></pre>'
        }
      }).use(latex, { "throwOnError": false, "errorColor": " #cc0000" })
        .render(`${decodeURIComponent(escape(atob((res["content"]))))}`);//将content部分转码
      this.result = this.sanitizer.bypassSecurityTrustHtml(needToChange);
    });
  }

}
