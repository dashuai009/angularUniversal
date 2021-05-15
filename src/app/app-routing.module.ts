import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent} from './article/article.component';
import{ArticleResolver}from './services/article.resolver';
const routes: Routes = [
    {
        path: 'article/:repo',
        component: ArticleComponent,
        resolve: {
            article: ArticleResolver
        }
    },
    {
        path: "**",
        redirectTo: '/'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
