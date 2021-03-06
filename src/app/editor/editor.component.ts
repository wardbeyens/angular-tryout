import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from './../shared/services/articles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Article } from '../shared/models/article.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  article: Article = new Article();
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting: boolean = false;
  publishText: string = 'Publish Article';

  constructor(
    private ArticlesService: ArticlesService,
    private route: ActivatedRoute,
    private Router: Router,
    private fb: FormBuilder
  ) {
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
    });
    this.articleForm.valueChanges.subscribe((value) => {
      console.log(value);
      this.updateArticle(value);
    });

    this.route.url.subscribe((data) => {
      console.log(data);
      this.publishText = data[data.length - 1].path !== 'editor' ? 'Edit Article' : 'Publish Article';
    });

  }

  ngOnInit(): void {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Article }) => {
      // hier gaat ie checken
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
  }

  updateArticle(values: Object) {
    (<any>Object).assign(this.article, values);
  }

  addTag() {
    let tag = this.tagField.value;
    console.log(this.article.tagList.indexOf(tag));
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateArticle(this.articleForm.value);

    this.ArticlesService.save(this.article).subscribe(
      // (article) => this.Router.navigateByUrl('/editor/' + article.slug),
      (article) => this.Router.navigateByUrl('/article/' + article.slug),
      (err) => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
