import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';
import { CacheService } from 'src/domain/services/cache-service.service';
import { Storage } from '@ionic/storage';

const createSearchCityService = (cacheService: CacheService) => {
  return new SearchCityService(
    new LocalCityRepository(),
    cacheService
    );
};

// Factory cache service
const createCacheService = (storage: Storage) =>{
  return new CacheService(storage)
}

const createLoadWeatherService = (http: HttpClient, cacheService: CacheService) => {
  return new LoadWeatherService(
    new LocalCityRepository(),
    new ApiWeatherRepository(http),
    cacheService
  );
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
      deps: [CacheService]
    },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient, CacheService],
    },
    // provider do serviço
    {
      provide: CacheService,
      useFactory: createCacheService,
      deps: [Storage],
    },
    Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
