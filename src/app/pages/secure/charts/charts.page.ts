import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {
  content_loaded: boolean = false;
  constructor(private helperService: HelperService) {}

  ngOnInit() {
    // Create bar chart
    this.createBarChart();
  }

  ionViewDidEnter() {}

  // Create bar chart
  createBarChart() {
    let helperService = this.helperService;
    // Random array of numbers
    let rand_numbers = [...Array(12)].map((e) => (Math.random() * 100) | 0);
  }
}
