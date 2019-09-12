import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { ContactsListPage } from '../contacts-list/contacts-list';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private contactProvider: ContactsProvider) {
    if (this.navParams.data.contact) {
      this.model = this.navParams.data.contact;
    } else {
      this.model = new Contact();
    }
  }

  saveContact() {
    this.contactProvider.updateContact(this.model.id, this.model)
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
}
