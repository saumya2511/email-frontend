import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firebaseauth, firestore } from 'src/firebase';
import axios from 'axios';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {

  to:any = ''
  body:any = ''
  subject:any = ''
  profile:any = ''

  constructor(protected route: Router, protected router: ActivatedRoute) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.profile =  JSON.parse(user ? user : '');
  }

  async sendMail() {

    try {
      const typeofMail : any = await axios.post("https://python-email.herokuapp.com/classify", { msg: this.body });
      console.log(typeofMail);
      console.log({
        from: this.profile.name + "@code.com",
        to: this.to,
        subject: this.subject,
        body: this.body,
        category: typeofMail.data.result
      })
      if(typeofMail) {
        const inmsgID = firestore.collection("inbox").doc().id; 
        const outmsgID = firestore.collection("inbox").doc().id; 
        await firestore.
        collection("inbox")
        .doc(inmsgID)
        .set({
          from: this.profile.name + "@new.com",
          to: this.to,
          subject: this.subject,
          body: this.body,
          category: typeofMail.data.result
        });
        await firestore.
        collection("outbox")
        .doc(outmsgID)
        .set({
          from: this.profile.name + "@new.com",
          to: this.to,
          subject: this.subject,
          body: this.body,
          category: typeofMail.data.result
        });
      }
      alert("Mail sent!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

}
