import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Observable, observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { Pokemon } from '../pokemon';
import { pokeimages, pokemodel, pokemodelPage } from '../models/pokemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleCardComponent } from '../single-card/single-card.component';



@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

}
