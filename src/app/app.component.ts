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
  isLoading: boolean = false;

  loadedPosts: Post[] = [];

  url = 'https://angular-complete-guide-7d579-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {
    this.fetchPosts();
  }

  ngOnInit(): void {}

  fetchPosts() {
    this.isLoading = true;
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
        this.isLoading = false;
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
