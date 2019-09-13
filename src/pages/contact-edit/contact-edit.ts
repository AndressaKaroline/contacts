import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { ContactsListPage } from '../contacts-list/contacts-list';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ContactEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-edit',
  templateUrl: 'contact-edit.html',
})
export class ContactEditPage {

  model: Contact;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, public contactsProvider: ContactsProvider, private camera: Camera) {
    if (this.navParams.data.contact) {
      this.model = this.navParams.data.contact;
    } else {
      this.model = new Contact();
    }
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.model.photo = base64image;
      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }

  saveContact() {
    this.contactsProvider.updateContact(this.model.id, this.model)
      .then((result: any) => {
        this.toast.create({ message: 'Usuário salvo', duration: 3000 }).present();
        this.navCtrl.push(ContactsListPage);
      })
      .catch((error: any) => {
        this.toast.create({ message: error.error, duration: 3000 }).present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactEditPage');
  }
}

export class Contact {
  id: number;
  name: string;
  gender: string;
  birthday:string;
  employed: string;
  salary: string;
  photo: string;
}
