import { City } from './../entities/city';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class CacheService {

  constructor(private storage: Storage) { }

  public insert(city: City) {
    let key = city.id.toString()
    return this.save(key, city);
  }

  public update(key: string, city: City) {
    return this.save(key, city);
  }

  private save(key: string, city: City) {
    return this.storage.set(key, city);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {

    let citys: CityList[] = [];

    return this.storage.forEach((value: City, key: string, iterationNumber: Number) => {
      let city = new CityList();
      city.key = key;
      city.city = value;
      citys.push(city);
    })
      .then(() => {
        return Promise.resolve(citys);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class CityList {
  key: string;
  city: City;
}
