import { Component, OnInit } from '@angular/core';
import { firestore } from 'src/firebase';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  profile:any;
  emails:any = [];
  constructor() { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    this.profile =  JSON.parse(user ? user : '');
    this.getInboxMails();
  }

  getInboxMails() {
    if(this.profile !== undefined) {
      console.log(this.profile)
    const emailsviadoc:any = []  
    firestore.collection("inbox").where("to" , "==" , this.profile.name + "@new.com").get()
      .then((emailSnap:any) => {
        emailSnap.forEach((doc:any) => {
          emailsviadoc.push(doc.data());
        });
        this.emails = emailsviadoc;
      })
      .catch((err:any) => {
        alert("Error fetching mails!!")
        console.log(err);
      })
    }
  }
}
