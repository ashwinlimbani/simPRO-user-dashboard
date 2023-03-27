export interface User {
  id: number;
  age: number;
  bloodGroup: string;
  birthDate: string;
  email: string;
  firstName: string;
  maidenName: string;
  lastName: string;
  gender: string;
  image: string;
  username: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
}
