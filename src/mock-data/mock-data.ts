export interface FoodProvider {
  id: Number;
  first_name: string;
  last_name: string;
  email: string;
  longitude: Number;
  latitude: Number;
  food: string;
  image: string;
}

export const foodProviders: FoodProvider[] = [
  {
    id: 1,
    first_name: 'Rica',
    last_name: 'Smeal',
    email: 'rsmeal0@nsw.gov.au',
    longitude: 113.618216,
    latitude: 22.919769,
    food: 'Sageretia thea (Osbeck) M.C. Johnst.',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  },
  {
    id: 2,
    first_name: 'Blake',
    last_name: 'Aylin',
    email: 'baylin1@usnews.com',
    longitude: 111.5793,
    latitude: -8.0604,
    food: 'Clematis occidentalis (Hornem.) DC. var. grosseserrata (Rydb.) J. Pringle',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  },
  {
    id: 3,
    first_name: 'Torrance',
    last_name: 'Workman',
    email: 'tworkman2@chronoengine.com',
    longitude: -119.7541856,
    latitude: 36.7949518,
    food: 'Lecanora gyalectodes Nyl.',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  },
  {
    id: 4,
    first_name: 'Fara',
    last_name: 'Hacker',
    email: 'fhacker3@e-recht24.de',
    longitude: 108.5522531,
    latitude: -6.9375866,
    food: 'Prenanthes serpentaria Pursh',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  },
  {
    id: 5,
    first_name: 'Clarie',
    last_name: 'Lapre',
    email: 'clapre4@psu.edu',
    longitude: 21.4177608,
    latitude: 42.1087161,
    food: 'Androsace chamaejasme Wulfen ssp. carinata (Torr.) Hultén',
    image: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  },
];
