import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {GetMDService} from './get-md.service';
import {first, tap} from 'rxjs/operators';
import {isPlatformServer} from '@angular/common';


@Injectable()
export class ArticleResolver implements Resolve<String> {

    constructor(private getMD: GetMDService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String> {

        const  repo= route.params['repo'];

        return this.getMD.getReadmeFromGithub(repo)
            .pipe(
                first()
            );
    }

}