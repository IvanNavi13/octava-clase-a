import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  public pokemon$!: Observable<any>;
  public pokemonName: string = 'pikachu';

  constructor(private apiService: ApiService) {
    this.pokemon$ = apiService.searchPokemon('pikachu').pipe(
      // tap((resp) => {
      //   console.log("SecConstr",resp)
      // })
    );
  }


  ngOnInit(): void {
  }

  onInput(){
    // console.log(this.pokemonName)
    this.pokemon$ = this.apiService.searchPokemon(this.pokemonName);
  }

}
