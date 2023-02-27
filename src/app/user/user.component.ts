import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  user = new User();
  allUsers = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.firestore
    .collection('users') // greift auf die collection zu
    .valueChanges({idField: 'customIdName'}) // immer wenn sich etwas ändert // idField sorgt dafür das dem user automtisch die firebaseid mitgegeben wird 
    .subscribe((changes: any) => { // wird dieser befehl ausgeführt
      console.log(changes)
      this.allUsers = changes;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
