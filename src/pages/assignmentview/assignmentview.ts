import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-assignmentview',
  templateUrl: 'assignmentview.html',
})
export class AssignmentviewPage {

  coursename:string;
  courseid:string;

  public questionno = [1];

  public awnsers = {};
  public awnsersMan = {};

  userDetails:any;
  resposeData:any;
  submissionResponse:any;
  dataSet:any;
  dataSetMan:any;

  assignmentpostdetails : {};

  assigmentfetch = {
    user_id : "",
    token : "",
    courseid : "",
    rollno:"" 
  }

  tempData = {};

  public showbt:boolean;
  public showtxt:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthServiceProvider, public alertCtrl: AlertController, private loadctrl: LoadingController) {
    this.coursename = navParams.get('coursename');
    this.courseid = navParams.get('courseid');

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.assigmentfetch.courseid = this.courseid;
    this.assigmentfetch.user_id = this.userDetails.user_id;
    this.assigmentfetch.token = this.userDetails.token;
    this.assigmentfetch.rollno = this.userDetails.rollno;

    this.getQuestion();

    this.showbt = false;
    this.showtxt = false;
  }

  /****************** GET QUESTION USING ASSIGNMENT ID ************/

  getQuestion(){
    let zest = this.loadctrl.create({
      content: "Getting Data",
      duration:20000
    });  
    zest.present();
    this.authService.postData(this.assigmentfetch, "getvideo").then((result) => {
      zest.dismiss();
        this.resposeData = result;
        this.dataSet = this.resposeData.feedData;
        if(this.dataSet == null){
          this.showbt = false;
          this.showtxt = true;
        }
        else{
          this.showbt = true;
          console.log(this.dataSet);
        }
        
      }, (err) => {
        zest.dismiss();
        //Connection failed message
      });
  }

  /****************** SUBMISSION ASSIGNMENT ************/
  showalertsuccess(){
    let alert = this.alertCtrl.create({
      title:this.coursename,
      subTitle:this.submissionResponse.Text,
      buttons:["OK"]
    });
    alert.present();
  }

  showalerterror(){
    let alert = this.alertCtrl.create({
      title:this.coursename,
      subTitle:"Assignment Submission Failed :(",
      buttons:["OK"]
    });
    alert.present();
  }


}
