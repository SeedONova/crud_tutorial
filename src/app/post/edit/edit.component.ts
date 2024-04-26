import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id!:number;
  post!:Post;
  form!:FormGroup;

  constructor(public postService: PostService, private router:Router, private route:ActivatedRoute){

  }

  ngOnInit():void{
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data:Post) =>{
      this.post = data;
    })

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    })
  }

  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value)
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
      alert("Data Updated Successful");
      this.router.navigateByUrl('post/index')
    })
  }
}
