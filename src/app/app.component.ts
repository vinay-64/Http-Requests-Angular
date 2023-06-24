import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  mySet = new Set<number>();

  loadedPosts: Post[] = [];

  url = 'https://angular-complete-guide-7d579-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  ngOnInit(): void {}

  fetchData() {
    this.http
      .get<{ [key: string]: Post }>(this.url + 'posts.json')
      .pipe(
        map((response) => {
          const postsArray: Post[] = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              postsArray.push({ ...response[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.loadedPosts = response;
      });
  }

  onSubmit(form) {
    console.log(form);
    this.http
      .post<{ name: string }>(this.url + '/posts.json', form)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
