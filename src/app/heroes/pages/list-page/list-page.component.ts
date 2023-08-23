import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  public constructor(private heroesService: HeroesService) { }
  ngOnInit(): void {

    this.heroesService.getHeroes().subscribe((data:Hero[]) => {
      this.heroes = data;
   });

  }
}
