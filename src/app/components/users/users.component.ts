import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  allUsers!: any[];

  constructor(
    private service: UsersService
  ) { }

  ngOnInit(): void {
    // this.loadAllUsers()
    // this.loadRoles()
    this.loadProfile()
  }

  // loadAllUsers() {
  //   this.service.getAllUsers().subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

  // loadRoles() {
  //   this.service.getRoles().subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }

    loadProfile() {
    this.service.getProfile().subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
