import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firebaseauth, firestore } from 'src/firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;

  constructor(protected route: Router, protected router: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      const res: any = await firebaseauth.signInWithEmailAndPassword(this.email, this.password);
      if (res.user) {
        console.log(res.user.uid)
        firestore.collection("users").doc(res.user.uid).get()
          .then(snap => {
            const profileData = snap.data();
            localStorage.setItem('user', JSON.stringify(profileData));
            this.route.navigate(['inbox']);
          })
          .catch(err => {
            alert("Error fetching profile!!")
            console.log('Error fetching profile', err)
          })
      }
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  }
}
