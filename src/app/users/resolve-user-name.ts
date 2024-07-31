import { ActivatedRouteSnapshot, ResolveFn,  RouterStateSnapshot } from '@angular/router';
import {  inject } from '@angular/core';
import { UsersService } from './users.service';



//La función resolveUserName es una función de resolución que se utiliza para obtener datos antes de que una ruta específica sea activada. Esta función debe ser aceptada en la matriz de resolve definida en el app.routes.ts. Para ello, tiene que tener una firma determinada. Esta funcion será llamada cuando el usuario navega de una ruta a otra. Cada vez que la ruta se active, (es decir, cuando la URL coincide con la ruta configurada en app.routes.ts), Angular verifica si hay alguna lógica de resolución asociada a esa ruta.Si existe una lógica de resolución, Angular ejecutará la función de resolución antes de que el componente correspondiente se cargue y se muestre. La función de resolución  recibirá la ultima instantánea que describa esta ruta activada. Una "instantánea de la ruta activada" (ActivatedRouteSnapshot) es un objeto que contiene toda la información relevante sobre la ruta actual en el momento en que se activa. Esta función de resolución se volverá a ejecutar cada vez que cambie el parámetro userId de la ruta
export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId');
  const userName = usersService.users.find(user => user.id === userId)?.name || '';
  return userName//tenemos que devolver los datos que deben ser resueltos por esta funcion: el nombre de usuario
}
