import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public moves = 0;
  public pairsFound = 0;

  constructor(private router: Router) {}

  public ngOnInit(): void {}

  public navigateToStartScreen() {
    this.router.navigate(['/board/start']);
  }
}
