import {  ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { resolveUserName } from "./resolve-user-name";

export const resolveTitle: ResolveFn<string> =(
  activatedRoute : ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
   return resolveUserName(activatedRoute, routerState) + '\'s Tasks' //al llamar a esta función resolve que ya teníamos creada, obtenemos el nombre de usuario ya que esta funcion resolveUserName retona userName. Luego simplemente he añadido esta cadena de texto '\'s Tasks' para que el titulo creado sea algo como: Max's Tasks
}





// Si hubiesemos querido, en vez de hacer uso de la funcion de resolucion ya creada resolveUserName, podriamos haber creado la lógica desde 0 de esta manera:

/*
export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId');
  const userName = usersService.users.find(user => user.id === userId)?.name || '';
  return userName + '\'s Tasks'
}
*/
