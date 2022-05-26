import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firebaseauth, firestore } from 'src/firebase';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email:any;
  password:any;
  name:any;

  constructor(protected route: Router, protected router: ActivatedRoute) { }

  ngOnInit(): void {}

  async onSubmit() {
    try {
      let user:any = await firebaseauth.createUserWithEmailAndPassword(this.email, this.password);
      console.log(user)
      if((user)) {
        console.log(user);
        let uid = user.user.uid;
        await firestore.collection("/users").doc(uid).set({ 
          name: this.name,
          useremail: this.email + "@code.com",
          appuserID: uid 
        });
      }
      alert("Sign up success!")
    } catch(err) {
      console.log(err);
      alert("Error in signup!");
    }
  }
  
}
