# TodoApp

## Pasos a seguir para hacer uso de este proyecto

 1. Clonar el proyecto
 2. Ejecutar ```npm install``` 
 3. Ejecutar la app ```ng serve -o```
 

## Este es un breve listado del contenido del proyecto standalone:

1. Uso de señales (signals). input() para crear un nueva señal, uso de computed().
2. Uso de rutas padres,  hijas,  ruta comodín '**', propiedad data, propiedad resolve, runGuardsAndResolvers, propiedad title para títulos de página tanto estáticos como dinámicos (app.routes.ts)
3. Uso de Guard:  canDeactivate (app.routes.ts)
4. Uso de lazy load para cargar rutas hijas (loadChildren) (app.routes.ts)
5. Carga del servicio tasks.service.ts de forma perezosa (users.routes.ts)
6. Uso del provider withComponentInputBinding() y del  paramsInheritanceStrategy: 'always' (app.config.ts)
7. Uso de routerLink, routerLinkActive, [queryPrams] (.html)
8. Uso de localStorage (tasks.service.ts)
