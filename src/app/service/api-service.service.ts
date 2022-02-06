import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  token: any;
  switch_dashboard = true;
  list_ad: any =  localStorage.getItem("list_ad") ? JSON.parse((localStorage.getItem("list_ad") ?? "[]")) : localStorage.setItem("list_ad", JSON.stringify( [
    {
      image: '',
      video: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
      from_time: '12/05/2021 06:25:00 PM',
      to_time: '12/05/2021 06:27:00 PM',
    },
    {
      image:
        'https://www.bestmobile.pk/mobile-wallpapers/img_320x480/1528970958_320x480_pexels-photo-1144699.jpeg',
      video: '',
      from_time: '12/05/2021 06:28:00 PM',
      to_time: '12/05/2021 06:30:00 PM',
    },
    {
      image: '',
      video: 'http://www.exit109.com/~dnn/clips/RW20seconds_2.mp4',
      from_time: '12/05/2021 06:31:00 PM',
      to_time: '12/05/2021 06:33:00 PM',
    },
    {
      image:
        'https://i0.wp.com/i.pinimg.com/originals/65/93/a7/6593a77ba62b2373b10075373f43efc9.jpg',
      video: '',
      from_time: '12/05/2021 06:34:00 PM',
      to_time: '12/05/2021 06:35:00 PM',
    },
    {
      image: '',
      video: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
      from_time: '12/05/2021 06:35:00 PM',
      to_time: '12/05/2021 06:37:00 PM',
    },
    {
      image:
        'https://www.bestmobile.pk/mobile-wallpapers/img_320x480/1528970958_320x480_pexels-photo-1144699.jpeg',
      video: '',
      from_time: '12/05/2021 06:38:00 PM',
      to_time: '12/05/2021 06:40:00 PM',
    },
    {
      image: '',
      video: 'http://www.exit109.com/~dnn/clips/RW20seconds_2.mp4',
      from_time: '12/05/2021 06:41:00 PM',
      to_time: '12/05/2021 06:43:00 PM',
    },
    {
      image:
        'https://i0.wp.com/i.pinimg.com/originals/65/93/a7/6593a77ba62b2373b10075373f43efc9.jpg',
      video: '',
      from_time: '12/05/2021 06:44:00 PM',
      to_time: '12/05/2021 06:46:00 PM',
    },
    {
      image:
        'https://www.bestmobile.pk/mobile-wallpapers/img_320x480/1528970958_320x480_pexels-photo-1144699.jpeg',
      video: '',
      from_time: '12/05/2021 06:47:00 PM',
      to_time: '12/05/2021 06:50:00 PM',
    },
    {
      image:
        'https://images.unsplash.com/photo-1609607847926-da4702f01fef?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8&w=1000&q=80',
      video: '',
      from_time: '12/05/2021 06:51:00 PM',
      to_time: '12/05/2021 06:53:00 PM',
    },
  ]));
  constructor(
    private _HttpClient: HttpClient,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    /*  this.GetList().subscribe((res) => {
      this.list_ad = res;
    }); */
  }

  GetList(): Observable<any> {
    return this._HttpClient.get('https://signal.creatbots.com/%20PS:');
  }
  get windowRef() {
    return window;
  }
  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Sign up with email/password
  SignUp(email: any, password: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  GettUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    return userRef.get();
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phone,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
}
