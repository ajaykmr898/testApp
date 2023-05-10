import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Marker } from '@capacitor/google-maps/dist/typings/definitions';
import {environment} from "@environments/environment";
import {FoodProvider, foodProviders} from "@mock/mock-data";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  map: GoogleMap;
  litOfFoodProviders: FoodProvider[] = [];

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.mapApiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });

    this.litOfFoodProviders = foodProviders;

    this.setMarkers(
      this.litOfFoodProviders.map(
        (provider: { latitude: Number; longitude: Number }) => {
          return {
            coordinate: { lat: provider.latitude, lng: provider.longitude },
          } as Marker;
        }
      )
    );
  }
  constructor() {}

  async ngAfterViewInit(): Promise<void> {
    await this.createMap();
  }

  private setMarkers(locations: Marker[]) {
    this.map.addMarkers(locations).then((r) => console.log('markers added ✅'));
  }
}
