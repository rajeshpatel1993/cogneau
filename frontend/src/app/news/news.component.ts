import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public searchForm : FormGroup;

  constructor(private fb: FormBuilder, private newsService: NewsService, private router: Router) { }

  

  ngOnInit() {
    this.initializeSearchForm();
  }

  get formControls() { return this.searchForm.controls; }


  initializeSearchForm(){
    this.searchForm  =  this.fb.group({
      searchText: [''],
      startdate: [''],
      enddate: ['']
  });
  }


  search(){
  
    console.log(this.searchForm.value);
    // this.newsService.getSearch(this.searchForm.value).subscribe(data => {
    //   // if(data){
    //   //   this.router.navigate(['news']);

    //   // }
    // }, error=>{
    //   console.log(error);
    // });
    
  }

}
