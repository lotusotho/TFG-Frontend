## TFG Frontend - Plataforma de Blogging Minimalista en Markdown

Frontend Angular para [blog.mapach.es](https://blog.mapach.es), una plataforma de blogging minimalista que permite crear blogs personales con subdominios únicos usando Markdown. Proyecto final de grado integrado con [TFG Backend API](https://github.com/tu_usuario/TFG-Backend).

## Características Principales
- Sistema de autenticación JWT completo (registro/login/recuperación)
- Editor Markdown integrado con resaltado de código y emojis
- Dashboard para gestión de posts
- Componentes reutilizables con Angular
- Diseño responsive con Bulma CSS
- Optimización SEO (sitemap.xml, meta tags)
- Integración con API RESTful
- Animaciones con AOS
- Sistema de notificaciones toast

## Tecnologías Utilizadas
- **Frontend**: Angular 18, TypeScript 5
- **Estilos**: Bulma CSS, Sass
- **Markdown**: ngx-markdown + PrismJS
- **Animaciones**: AOS (Animate On Scroll)
- **Emojis**: ngx-emoji-mart
- **Validación**: Reactive Forms
- **Routing**: Angular Router con Guards
- **HTTP Client**: Angular HttpClient
- **Iconos**: Font Awesome 6
- **Herramientas**: Angular CLI, ESLint, Prettier

## Instalación y Ejecución
**Requisitos:**  
- Node.js 20+  
- Angular CLI 18+

1. **Clonar repositorio:**
```bash
git clone https://github.com/lotusotho/TFG-Frontend.git
cd TFG-Frontend
```

2. **Instalar dependencias:**
```bash
pnpm install
```

3. **Variables de entorno:**  
Crear archivo `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000',
  FRONTEND_URL: 'http://localhost:4200'
};
```

4. **Ejecutar en modo desarrollo:**
```bash
ng serve
```

5. **Build para producción:**
```bash
ng build --configuration production
```

## Estructura del Proyecto (src)
```
📦src
 ┣ 📂app
 ┃ ┣ 📂allposts
 ┃ ┃ ┣ 📜allposts.component.css
 ┃ ┃ ┣ 📜allposts.component.html
 ┃ ┃ ┗ 📜allposts.component.ts
 ┃ ┣ 📂featuredpost
 ┃ ┃ ┣ 📜featuredpost.component.css
 ┃ ┃ ┣ 📜featuredpost.component.html
 ┃ ┃ ┗ 📜featuredpost.component.ts
 ┃ ┣ 📂featuredpostmodal
 ┃ ┃ ┣ 📜featuredpostmodal.component.css
 ┃ ┃ ┣ 📜featuredpostmodal.component.html
 ┃ ┃ ┗ 📜featuredpostmodal.component.ts
 ┃ ┣ 📂footer
 ┃ ┃ ┣ 📜footer.component.css
 ┃ ┃ ┣ 📜footer.component.html
 ┃ ┃ ┗ 📜footer.component.ts
 ┃ ┣ 📂forgotpassword
 ┃ ┃ ┣ 📜forgotpassword.component.css
 ┃ ┃ ┣ 📜forgotpassword.component.html
 ┃ ┃ ┗ 📜forgotpassword.component.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┣ 📜auth.guard.ts
 ┃ ┃ ┗ 📜verified.guard.ts
 ┃ ┣ 📂header
 ┃ ┃ ┣ 📜header.component.css
 ┃ ┃ ┣ 📜header.component.html
 ┃ ┃ ┗ 📜header.component.ts
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜home.component.css
 ┃ ┃ ┣ 📜home.component.html
 ┃ ┃ ┗ 📜home.component.ts
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📜login.component.css
 ┃ ┃ ┣ 📜login.component.html
 ┃ ┃ ┗ 📜login.component.ts
 ┃ ┣ 📂mdinfo
 ┃ ┃ ┣ 📜mdinfo.component.css
 ┃ ┃ ┣ 📜mdinfo.component.html
 ┃ ┃ ┗ 📜mdinfo.component.ts
 ┃ ┣ 📂notificationtoast
 ┃ ┃ ┣ 📜notificationtoast.component.css
 ┃ ┃ ┣ 📜notificationtoast.component.html
 ┃ ┃ ┗ 📜notificationtoast.component.ts
 ┃ ┣ 📂notverified
 ┃ ┃ ┣ 📜notverified.component.css
 ┃ ┃ ┣ 📜notverified.component.html
 ┃ ┃ ┗ 📜notverified.component.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜auth.service.ts
 ┃ ┃ ┗ 📜content.service.ts
 ┃ ┣ 📂signup
 ┃ ┃ ┣ 📜signup.component.css
 ┃ ┃ ┣ 📜signup.component.html
 ┃ ┃ ┗ 📜signup.component.ts
 ┃ ┣ 📂tos
 ┃ ┃ ┣ 📜tos.component.css
 ┃ ┃ ┣ 📜tos.component.html
 ┃ ┃ ┗ 📜tos.component.ts
 ┃ ┣ 📂usercontent
 ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┣ 📜dashboard.component.css
 ┃ ┃ ┃ ┣ 📜dashboard.component.html
 ┃ ┃ ┃ ┗ 📜dashboard.component.ts
 ┃ ┃ ┣ 📂userblog
 ┃ ┃ ┃ ┣ 📜userblog.component.css
 ┃ ┃ ┃ ┣ 📜userblog.component.html
 ┃ ┃ ┃ ┗ 📜userblog.component.ts
 ┃ ┃ ┗ 📂usersettings
 ┃ ┃ ┃ ┣ 📜usersettings.component.css
 ┃ ┃ ┃ ┣ 📜usersettings.component.html
 ┃ ┃ ┃ ┗ 📜usersettings.component.ts
 ┃ ┣ 📂verification
 ┃ ┃ ┣ 📂resetpassword
 ┃ ┃ ┃ ┣ 📜resetpassword.component.css
 ┃ ┃ ┃ ┣ 📜resetpassword.component.html
 ┃ ┃ ┃ ┗ 📜resetpassword.component.ts
 ┃ ┃ ┗ 📂verifyaccount
 ┃ ┃ ┃ ┣ 📜verifyaccount.component.css
 ┃ ┃ ┃ ┣ 📜verifyaccount.component.html
 ┃ ┃ ┃ ┗ 📜verifyaccount.component.ts
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.config.server.ts
 ┃ ┣ 📜app.config.ts
 ┃ ┗ 📜app.routes.ts
 ┣ 📂types
 ┃ ┗ 📜types.ts
 ┣ 📂utils
 ┃ ┗ 📜validatorsRegex.ts
 ┣ 📜contants.ts
 ┣ 📜index.html
 ┣ 📜main.server.ts
 ┣ 📜main.ts
 ┗ 📜styles.css
```

## Principales Componentes
| Componente | Descripción |
|------------|-------------|
| `HeaderComponent` | Barra de navegación con menú contextual |
| `DashboardComponent` | Editor Markdown con previsualización en tiempo real |
| `UserblogComponent` | Vista pública del blog de usuario |
| `FeaturedPostComponent` | Grid de posts destacados con modales |
| `NotificationToast` | Sistema de notificaciones visuales |

## Variables de Entorno Clave
```typescript
// environment.ts
export const environment = {
  production: false,
  API_URL: 'http://localhost:3000',  // URL del backend
  FRONTEND_URL: 'http://localhost:4200',
  JWT_REFRESH_INTERVAL: 300000 // 5 minutos
};
```
