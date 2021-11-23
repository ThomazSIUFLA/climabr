import { promise } from 'selenium-webdriver';
import { CacheService } from 'src/domain/services/cache-service.service';
import { City } from '../entities/city';
import { CityNotFoundError } from '../errors/city-not-found.error';
import { CityRepository } from './protocols/city-repository';

export class SearchCityService {
  constructor(
    private readonly cityRepo: CityRepository,
    private cache: CacheService
    ) {}

  async search(query: string): Promise<City[]> {
    if (!query || query.trim().length < 3) {
      return [];
    }

    const cities = await this.cityRepo.getAll()

    const filteredCities = cities.filter(
      (item) => item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );

    if (filteredCities.length == 0) {
      throw new CityNotFoundError();
    }

    return filteredCities;
  }

  async buscaEmCache(): Promise<City[]> {

    let cities: City[]
    await this.cache.getAll().then(data => {
      console.log('Recuperando...', data)
      cities = data
    })

    return cities
  }
}
