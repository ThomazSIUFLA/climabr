
import { City } from '../entities/city';
import { Weather } from '../entities/weather';
import { CityNotFoundError } from '../errors/city-not-found.error';
import { CacheService } from './cache-service.service';
import { CityRepository } from './protocols/city-repository';
import { WeatherRepository } from './protocols/weather-repository';

export class LoadWeatherService {
  constructor(
    private readonly cityRepo: CityRepository,
    private readonly weatherRepo: WeatherRepository,
    // Injeção do serviço de local Storage
    private readonly storage: CacheService
  ) {}

  async loadByCity(cityId: number): Promise<Weather> {
    const city: City = await this.cityRepo.getById(cityId);

    if (!city) {
      throw new CityNotFoundError();
    }

    // Insere cidade em cache
    this.storage.insert(city)

    const weather = await this.weatherRepo.load(city.coord);
    weather.city = city;

    return weather;
  }
}
