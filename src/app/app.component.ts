import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AssignmentsPage } from '../pages/assignments/assignments';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public userDetail : any;
  rootPage: any = LoginPage;

  showSplash = true;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  onclickHome(){
    this.nav.setRoot(HomePage);
  }

  onclickAssignments(){
    this.nav.push(AssignmentsPage);
  }

  onclickprofile(){
    this.nav.push(ProfilePage);
  }

  onclicklogout(){
    this.nav.setRoot(LoginPage);
  }
  
}
