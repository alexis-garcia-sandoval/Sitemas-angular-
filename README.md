# Sistema de Transferencias Bancarias

Proyecto Angular para practicar las skills requeridas en la vacante de Capgemini Engineering.

## Tech Stack

- Angular 16+
- TypeScript
- RxJS
- NGRX
- Angular Material

## Instalación

```bash
npm install
ng serve
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios globales, guards, interceptors
│   ├── shared/         # Componentes reutilizables
│   ├── store/          # NGRX: actions, reducers, effects, selectors
│   └── features/
│       ├── auth/       # Login
│       ├── dashboard/  # Vista principal
│       ├── transfer/   # Formulario, confirmación, comprobante
│       └── history/    # Historial de movimientos
```
