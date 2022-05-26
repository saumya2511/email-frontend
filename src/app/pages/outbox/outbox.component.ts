import { Component, OnInit } from '@angular/core';
import { firestore } from 'src/firebase';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css']
})
export class OutboxComponent implements OnInit {


  profile:any;
  emails:any = [];
  constructor() { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.profile =  JSON.parse(user ? user : '');
    this.getInboxMails();
  }

  getInboxMails() {
    console.log(this.profile)
    if(this.profile.useremail !== undefined) {
    const emailsviadoc:any = []  
    firestore.collection("inbox").where("from" , "==" , this.profile.name + "@new.com").get()
      .then((emailSnap:any) => {
        emailSnap.forEach((doc:any) => {
          emailsviadoc.push(doc.data());
        });
        this.emails = emailsviadoc;
        console.log(this.emails)
      })
      .catch((err:any) => {
        alert("Error fetching mails!!")
        console.log(err);
      })
    }
  }
}
