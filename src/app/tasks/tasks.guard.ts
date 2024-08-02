import { CanDeactivateFn } from "@angular/router";
import { NewTaskComponent } from "./new-task/new-task.component";


//La función canLeaveEditPage está definida para ser usada como un guardia CanDeactivate y aplica específicamente al componente NewTaskComponent.
export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => { //component representa la instancia del componente que se está tratando de desactivar. En este caso, es una instancia de NewTaskComponent.
  if(component.submitted) { //cuando en el formulario pulsamos el boton de Create, se desecandena la funcion  onSubmit() que transforma la propiedad submitted a  true. Como cuando pulsamos Create submitted tiene este valor true, entonces se retorna true y esto significa que el usuario puede salir de la pagina.
    return true
  }
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) { //si el formulario todavía no se ha enviado y  alguna de estas propiedades es vedadera, significa que contiene datos que han sido insertados por el usuario mediante el formulario, y entonces cuando pulsamos en el botón de 'cancel', preguntaremos mediante un  mensaje si queremos abandonar la página,  que nos devolvera true si el usuario pulsa 'aceptar'  o false si el usuario pulsa 'cancelar'. Si devolvemos true el usuario puede salir de la pagina pero si devolvemos false no podrá salir de la página
    return window.confirm('Do you really want to leave? You will lose the entered data') //confirm() devolverá un boolean dependiendo de si el usuario ha pulsado 'aceptar' o 'cancelar' en la ventana que se abre con el mensaje
  }
  return true //si no hemos introducido datos y las propiedades enteredTitle(), enteredDate() y enteredSummary() del formulario del componente NewTaskComponent están sin modificar, cuando pulsemos en botón 'cancel' devolvemos true. Si devolvemos true el usuario puede salir de la pagina.
}
