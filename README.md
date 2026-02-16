# 🌙 Fiesta de 15 Bianca 2026

Una invitación web mágica y elegante para la fiesta de 15 años de Bianca, con temática galáctica de luna y estrellas.

## ✨ Características

- **Diseño Galáctico Premium**: Animaciones de estrellas parpadeantes, luna flotante y efectos de glow plateados
- **100% Responsive**: Optimizado para móviles, tablets y desktop
- **Animaciones Fluidas**: Usando Framer Motion para transiciones suaves y micro-interacciones
- **Formulario RSVP**: Integrado con Supabase para guardar confirmaciones de asistencia
- **Confetti Celebration**: Explosión de confetti al confirmar asistencia
- **Scroll Suave**: Navegación fluida entre secciones

## 🎨 Paleta de Colores

- Azules profundos: `#0A0A23`, `#1E1E4B`, `#2A2A8F`
- Plateados: `#C0C0C0`, `#E5E5E5`, `#F0F0F0`
- Blancos y gradientes etéreos

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- Cuenta de Supabase (ya configurada en este proyecto)

### Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Las variables de entorno de Supabase ya están configuradas en `.env`

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Build para Producción

Para crear una build optimizada para producción:

```bash
npm run build
```

Los archivos estáticos se generarán en la carpeta `dist/`

## 📦 Deploy en Netlify

### Opción 1: Deploy desde Git

1. Sube tu código a GitHub
2. Ve a [Netlify](https://app.netlify.com)
3. Click en "New site from Git"
4. Conecta tu repositorio
5. Configura:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Agrega las variables de entorno en Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Opción 2: Deploy Manual

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build y deploy:
```bash
npm run build
netlify deploy --prod
```

## 🗄️ Base de Datos

La aplicación usa Supabase con una tabla `guests` que almacena:
- Nombre del invitado
- Email
- Estado de asistencia (Sí/No)
- Mensaje opcional
- Fecha de confirmación

Las Row Level Security (RLS) policies están configuradas para permitir inserción y lectura pública.

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   ├── StarField.tsx       # Fondo animado de estrellas
│   ├── Hero.tsx            # Sección principal con título y luna
│   ├── EventDetails.tsx    # Cards con detalles del evento
│   ├── Gifts.tsx           # Sección de regalos con alias
│   ├── RSVPForm.tsx        # Formulario de confirmación
│   └── Footer.tsx          # Footer con redes sociales
├── lib/
│   └── supabase.ts         # Cliente de Supabase
├── App.tsx                 # Componente principal
├── main.tsx                # Entry point
└── index.css               # Estilos globales con Tailwind
```

## 🎭 Tecnologías Utilizadas

- **React 18**: Framework UI
- **TypeScript**: Type safety
- **Vite**: Build tool y dev server
- **Tailwind CSS**: Styling utility-first
- **Framer Motion**: Animaciones
- **React Confetti**: Efectos de celebración
- **Supabase**: Base de datos y backend
- **Lucide React**: Iconos elegantes
- **Google Fonts**: Great Vibes (script) y Poppins (sans-serif)

## 🎨 Personalización

### Cambiar Textos

Edita los componentes en `src/components/` para cambiar textos, fechas, direcciones, etc.

### Cambiar Colores

Los colores están definidos inline en los componentes. Busca los valores hex como `#0A0A23`, `#C0C0C0`, etc. y reemplázalos.

### Modificar Animaciones

Ajusta las propiedades de `motion` en Framer Motion para cambiar duraciones, delays y efectos.

## 📱 Responsive Design

La aplicación está optimizada para:
- Móviles (320px - 640px)
- Tablets (641px - 1024px)
- Desktop (1025px+)

Todos los breakpoints usan las clases de Tailwind (`sm:`, `md:`, `lg:`).

## 🌟 Características Destacadas

1. **Cielo Estrellado Dinámico**: Canvas con 200 estrellas que parpadean con opacidades variables
2. **Luna Flotante Animada**: SVG con gradientes y efectos de glow que flota suavemente
3. **Cards con Hover Effects**: Efectos de iluminación al pasar el mouse
4. **Estrellas Cayendo**: En la sección de regalos con animación continua
5. **Formulario con Validación**: Validación básica y feedback visual
6. **Confetti al Confirmar**: Explosión de 500 piezas de confetti

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview de build
- `npm run lint` - Linter de código
- `npm run typecheck` - Verificación de tipos TypeScript

## 📄 Licencia

Este proyecto fue creado para el evento personal de Bianca 2026.

---

**Hecho con amor para una noche mágica bajo las estrellas** 🌙✨
