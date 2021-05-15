import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularUniversal';

  data = [
    {
      url: "/article/dashuai009",
      description: "config files for my Github profile"
    },
    {
      url: "/article/oclick",
      description: "时钟app",
    },
    {
      url: "/article/blog",
      description: "blog(旧版)"
    },
    {
      url:"/article/app2",
      description:"在线扫雷游戏（前端）"
    },
    {
      url:"/article/app2_server",
      description:"在线扫雷游戏（后端）"
    }
  ]
}
