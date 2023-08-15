import { Component, OnInit } from '@angular/core';

import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Hero } from 'src/app/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    return this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
          this.heroService.searchHeroes(term)),
    )
  }
}
