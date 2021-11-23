import { City } from './../entities/city';
import { Storage } from '@ionic/storage';

export class CacheService {

  constructor(private storage: Storage) {
    // Cria database
    this.storage.create()
  }

  // Insere cidade
  public insert(city: City) {
    // Identificador único
    let key = city.id.toString()
    return this.save(key, city);
  }

  // Salva objeto no storage, usando uma chave única
  private save(key: string, city: City) {
    console.log('Salvando...', key, city)
    return this.storage.set(key, city);
  }

  // Remove objeto do local Storage
  public remove(key: string) {
    return this.storage.remove(key);
  }

  // retorna cidades em cache
  public getAll() {
    let cidades: City[] = [];

    // Retorna lista com cidades armazenadas no localStorage
    return this.storage.forEach((value: City) => {
      cidades.push(value)
    })
    .then(() => {
      return Promise.resolve(cidades);
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
