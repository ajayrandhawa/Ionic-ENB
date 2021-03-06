import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AssignmentviewPage } from '../assignmentview/assignmentview'

@IonicPage()
@Component({
  selector: 'page-assignments',
  templateUrl: 'assignments.html',
})
export class AssignmentsPage {

  public userDetails : any;
  public resposeData : any;
  public dataSet : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthServiceProvider, public alertCtrl: AlertController, private loadctrl: LoadingController) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.getassignment();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssignmentsPage');
  }

  getassignment(){
    let zest = this.loadctrl.create({
      content: "Getting Data",
      duration: 20000
    });  
    zest.present();
    this.authService.postData(this.userDetails, "getcourse").then((result) => {
      zest.dismiss();
        this.resposeData = result;
        if (this.resposeData.feedData) {
          this.dataSet = this.resposeData.feedData;
          console.log(this.dataSet);
        } else {
          zest.dismiss();
          console.log("No access app");
        }
      }, (err) => {
        zest.dismiss();
        //Connection failed message
      });
  }

  test(courseid : String, coursename : String){
    this.navCtrl.push(AssignmentviewPage ,{
      courseid: courseid ,
      coursename: coursename
    });
  }
}
