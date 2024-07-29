import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = { //providers: Define un array de proveedores. Los proveedores son servicios y otras configuraciones que se inyectan en la aplicación.
  providers: [
    provideRouter(
      routes, //provideRouter(routes): Configura las rutas de la aplicación utilizando el array de rutas definido en app.routes.ts.
      withComponentInputBinding(), //withComponentInputBinding(): Esta función habilita la vinculación automática de los parámetros dinámicos de la ruta a las propiedades del componente usando decoradores de entrada (input binding). Para que withComponentInputBinding() funcione correctamente, los nombres de los parámetros dinámicos de la ruta y las propiedades del componente .ts deben coincidir
      withRouterConfig({
        paramsInheritanceStrategy: 'always', //Los parámetros de rutas principales no se pasan automáticamente a las rutas hijas. Por defecto, un componente solo puede obtener los parametros de ruta que pertenecen directamente a su ruta a traves de la vinculacion de entrada. Como la ruta hija quiere obtener los parametros de ruta de una ruta padre, tengo que agregar en el enrutador paramsInheritanceStrategy: 'always'. Esto asegura que los valores de los parametros de la ruta padre se inyecten en las rutas hijas. Los nombres de los parámetros  de la ruta padre y las propiedades del componente .ts deben coincidir.
      })
    )
  ]

  //Otros proveedores pueden incluir servicios, interceptores HTTP, configuraciones de i18n, etc.
};
