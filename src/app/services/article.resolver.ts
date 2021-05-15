import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetMDService } from './get-md.service';
import { first, tap ,map} from 'rxjs/operators';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';

import * as md from 'markdown-it';
import * as hljs from 'highlight.js';
import * as latex from 'markdown-it-katex';

declare const Buffer
@Injectable()
export class ArticleResolver implements Resolve<any> {


    constructor(
        private getMD: GetMDService,
        @Inject(PLATFORM_ID) private platformId,
        private transferState: TransferState
    ) {

    }
    getHtml(res) :string{
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
            .render(Buffer.from(res, 'base64').toString('utf-8'));//将content部分转码
        return needToChange;
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const repoName = route.params['repo'];

        const ARTICLE_KEY = makeStateKey<String>('Markdown-' + repoName)
        console.log(repoName);
        if (this.transferState.hasKey(ARTICLE_KEY)) {

            const course = this.transferState.get<String>(ARTICLE_KEY, null);
            if (isPlatformBrowser(this.platformId)) {//只有在浏览器端才删除记录
                this.transferState.remove(ARTICLE_KEY);
            }
            return of(course);
        }
        else {
            return this.getMD.getReadmeFromGithub(repoName)
                .pipe(
                    first(),
                    tap(res => {
                        const tmp = {
                            data: this.getHtml(res["content"]),
                            title: "repoName"
                        }
                        this.transferState.set(ARTICLE_KEY, tmp);//添加记录（key，value）
                    })
                )
        }
    }
}
