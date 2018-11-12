import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '../core/service/article.service';
import {Article} from '../core/model/article.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  validateForm: FormGroup;

  isSubmitting = false;

  article: Article = {} as Article;

  errors: Object = {};

  constructor(private fb: FormBuilder, private articleService: ArticleService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.validateForm.patchValue(this.article);
      }
    });
  }


  submitForm($event, value) {
    $event.preventDefault();
    this.isSubmitting = true;
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.updateArticle(this.validateForm.value);
    this.articleService.save(this.article)
      .subscribe(
        article => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        });
  }

  private updateArticle(values: Object) {
    Object.assign(this.article, values);
  }

}
