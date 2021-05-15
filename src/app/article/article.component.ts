import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute) { }

  result: SafeHtml;
  ngOnInit(): void {
    //console.log(this.route.snapshot);
    let tmp = this.route.snapshot.data["article"];

    this.result = this.sanitizer.bypassSecurityTrustHtml(tmp.data);

    this.title.setTitle("angular universal");

    this.meta.updateTag({ name: "description", content: tmp.title });


  }

}
