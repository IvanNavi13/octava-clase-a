import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import StorageHelper from '../../lib/helpers/storage.helper';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(public httpAPI: ApiService, private dataService: DataService, public router: Router) { }

  ngOnInit(): void {
  }

  onclick() {
    console.log(this.username);
    console.log(this.password);
    this.httpAPI.login(this.username, this.password).subscribe(
      {
        next: (resp) => {
          StorageHelper.setItem('session', resp)
          // console.log(resp);
          this.router.navigate(['search'])
        }
      });
  }

}
