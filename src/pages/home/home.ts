import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;

  public resposeDataPosts : any;
  public dataSetPosts : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, public authService : AuthServiceProvider) {
      this.menuCtrl.enable(true);
      const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      this.getposts();
      this.getads();
  }
  
  getposts(){ 
    this.authService.postData(this.userDetails, "getposts").then((result) => {
        this.resposeDataPosts = result;
        if (this.resposeDataPosts.postData) {
          this.dataSetPosts = this.resposeDataPosts.postData;
          console.log(this.dataSetPosts);
        } else {
          console.log("No access app");
        }
      }, (err) => {

        console.log("Conn Error");
      });
  }

  getads(){ 
    this.authService.postData(this.userDetails, "getads").then((result) => {
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);
        } else {
          console.log("No access app");
        }
      }, (err) => {

        console.log("Conn Error");
      });
  }
  
}
