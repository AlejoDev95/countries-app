# CountriesApp

Aplicación React Native que muestra información de países del mundo utilizando GraphQL, implementada con Clean Architecture.

## Tabla de Contenidos

- [Requisitos del Sistema](#requisitos-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Solución de Problemas](#solución-de-problemas)

## Requisitos del Sistema

### Versiones Requeridas

- **Node.js**: >= 20.x
- **npm**: >= 10.x (incluido con Node.js)
- **React Native**: 0.82.1
- **React**: 19.1.1

### Para Desarrollo en iOS

- **macOS**: Monterey o superior
- **Xcode**: 26.1.1 o superior
- **iOS Deployment Target**: 15.1+
- **CocoaPods**: Última versión estable
- **Ruby**: 2.7+ (para CocoaPods)

### Para Desarrollo en Android

- **JDK**: OpenJDK 17 (recomendado Zulu 17.0.16 LTS)
- **Android Studio**: Flamingo o superior
- **Android SDK**:
  - Build Tools: 36.0.0
  - Compile SDK: 36
  - Target SDK: 36
  - Min SDK: 24
  - NDK Version: 27.1.12297006
- **Kotlin**: 2.1.20

### Herramientas Adicionales

- **Watchman**: Recomendado para mejor rendimiento en desarrollo (opcional)
- **Git**: Para clonar el repositorio

## Tecnologías Utilizadas

### Core

- **React Native**: 0.82.1
- **TypeScript**: 5.8.3
- **React Navigation**: 7.1.25

### Estado y Datos

- **Apollo Client**: 4.0.10 (GraphQL Client)
- **GraphQL**: 16.12.0

### UI/Styling

- **NativeWind**: 4.2.1 (Tailwind CSS para React Native)
- **TailwindCSS**: 3.4.19

### Video

- **react-native-video**: 6.18.0
- **react-native-worklets**: 0.7.1

### Herramientas de Desarrollo

- **ESLint**: 8.19.0
- **Prettier**: 3.7.4
- **Jest**: 29.6.3

## Instalación

### 1. Verificar Requisitos del Sistema

#### Instalar Node.js

```bash
# Usando nvm (recomendado)
nvm install 20
nvm use 20

# Verificar versión
node --version  # Debe ser >= 20.x
npm --version
```

#### Instalar Watchman (macOS)

```bash
brew install watchman
```

### 2. Configuración para iOS

#### Instalar Xcode

1. Descarga Xcode desde la App Store (versión 26.1.1 o superior)
2. Instala las Command Line Tools:

```bash
xcode-select --install
```

#### Instalar CocoaPods

```bash
# Instalar Ruby (si no está instalado)
brew install ruby

# Instalar CocoaPods
sudo gem install cocoapods

# Verificar instalación
pod --version
```

### 3. Configuración para Android

#### Instalar Java (OpenJDK 17)

```bash
# Usando Homebrew (macOS)
brew install --cask zulu@17

# Configurar JAVA_HOME en ~/.zshrc o ~/.bash_profile
export JAVA_HOME=$(/usr/libexec/java_home -v 17)

# Verificar instalación
java --version  # Debe mostrar OpenJDK 17.x
```

#### Configurar Android Studio

1. Descarga e instala [Android Studio](https://developer.android.com/studio)
2. Durante la instalación, asegúrate de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
   - Performance (Intel HAXM) - solo para Intel Macs

3. Configura las variables de entorno en `~/.zshrc` o `~/.bash_profile`:

   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

4. Instala los SDK necesarios usando Android Studio SDK Manager:
   - Android SDK Platform 36
   - Android SDK Build-Tools 36.0.0
   - NDK (Side by side) versión 27.1.12297006

### 4. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd CountriesApp
```

### 5. Instalar Dependencias del Proyecto

```bash
# Instalar dependencias de Node
npm install

# Para iOS: Instalar dependencias de CocoaPods
cd ios
pod install
cd ..
```

## Configuración

### Variables de Entorno

El proyecto utiliza `react-native-dotenv` para gestionar variables de entorno desde un archivo `.env`.

#### Archivo .env

El proyecto incluye un archivo [.env](.env) con las siguientes variables:

```bash
GRAPHQL_ENDPOINT=https://countries.trevorblades.com/graphql
APP_NAME=CountriesApp
APP_VERSION=0.0.1
```

#### Variables Disponibles

- **GRAPHQL_ENDPOINT**: URL del endpoint GraphQL para consultar información de países
  - Valor actual: `https://countries.trevorblades.com/graphql`
  - Descripción: API pública gratuita que proporciona datos de países del mundo

- **APP_NAME**: Nombre de la aplicación
  - Valor: `CountriesApp`

- **APP_VERSION**: Versión de la aplicación
  - Valor: `0.0.1`

- **IS_DEV**: Indica si la app está en modo desarrollo
  - Valor: `__DEV__` (automático - true en desarrollo, false en producción)

#### Cómo Modificar las Variables

1. Edita el archivo [.env](.env) en la raíz del proyecto:

   ```bash
   GRAPHQL_ENDPOINT=https://tu-endpoint-personalizado.com/graphql
   APP_NAME=MiApp
   APP_VERSION=1.0.0
   ```

2. Reinicia Metro Bundler con cache limpio:

   ```bash
   npm start -- --reset-cache
   ```

3. Ejecuta la app nuevamente

#### Archivo env.ts

El archivo [src/core/config/env.ts](src/core/config/env.ts) actúa como una capa de abstracción que:

- Importa las variables desde `@env` (archivo `.env`)
- Proporciona valores por defecto si las variables no están definidas
- Centraliza el acceso a la configuración en toda la app

**No es necesario editar `env.ts` directamente** - solo edita el archivo `.env`.

#### Archivo .env.example

Existe un archivo [.env.example](.env.example) como plantilla de referencia. Si clonas el proyecto, copia este archivo a `.env`:

```bash
cp .env.example .env
```

### Configuración de NativeWind

El proyecto usa NativeWind para styling. La configuración está en:

- [tailwind.config.js](tailwind.config.js)
- `babel.config.js`

No requiere configuración adicional para desarrollo.

### Path Aliases

El proyecto tiene configurados los siguientes alias de importación:

- `@/*` → `src/*`
- `@core/*` → `src/core/*`
- `@shared/*` → `src/shared/*`
- `@features/*` → `src/features/*`
- `@navigation/*` → `src/navigation/*`

Configurados en:

- [tsconfig.json](tsconfig.json) (TypeScript)
- [babel.config.js](babel.config.js) (Runtime)

## Ejecución del Proyecto

### Iniciar Metro Bundler

Metro es el bundler de JavaScript para React Native. Debe estar corriendo antes de ejecutar la aplicación:

```bash
npm start
```

### Ejecutar en iOS

En una nueva terminal (manteniendo Metro corriendo):

```bash
# Ejecutar en simulador iOS (por defecto iPhone)
npm run ios

# Ejecutar en un dispositivo específico
npx react-native run-ios --device "Nombre del dispositivo"

# Ejecutar en un simulador específico
npx react-native run-ios --simulator="iPhone 15 Pro"
```

**Nota**: La primera compilación puede tardar varios minutos.

### Ejecutar en Android

#### Iniciar Emulador Android

1. Abre Android Studio
2. Ve a `Device Manager`
3. Crea o inicia un AVD (Android Virtual Device) con API 24 o superior

O desde la terminal:

```bash
# Listar emuladores disponibles
emulator -list-avds

# Iniciar un emulador
emulator -avd <nombre-del-emulador>
```

#### Ejecutar la aplicación

En una nueva terminal (manteniendo Metro corriendo):

```bash
# Ejecutar en emulador o dispositivo conectado
npm run android
```

**Nota**: La primera compilación puede tardar varios minutos.

### Desarrollo

Una vez que la aplicación está corriendo:

- **Recargar**:
  - iOS: Presiona `R` en el simulador
  - Android: Presiona `R` dos veces o usa `Ctrl+M` (Windows/Linux) / `Cmd+M` (macOS)

- **Abrir Dev Menu**:
  - iOS: `Cmd+D` en el simulador
  - Android: Agita el dispositivo o `Cmd+M` (macOS) / `Ctrl+M` (Windows/Linux)

- **Hot Reload**: Habilitado por defecto (Fast Refresh)

## Estructura del Proyecto

```plaintext
CountriesApp/
├── src/
│   ├── core/                       # Configuración y bootstrap de la app
│   │   ├── config/                 # Variables de entorno
│   │   ├── bootstrap/              # Inicialización de la app
│   │   └── infrastructure/         # Clientes HTTP y GraphQL
│   ├── features/
│   │   └── countries/              # Feature de países
│   │       ├── domain/             # Entidades, repositorios, casos de uso
│   │       ├── infrastructure/     # Implementación de repos y GraphQL
│   │       └── presentation/       # UI, componentes, hooks
│   ├── shared/                     # Componentes y utilidades compartidas
│   └── navigation/                 # Configuración de navegación
├── android/                        # Código nativo Android
├── ios/                            # Código nativo iOS
└── App.tsx                         # Punto de entrada de la aplicación
```

### Arquitectura

El proyecto sigue **Clean Architecture** con las siguientes capas:

- **Domain**: Lógica de negocio pura (entidades, casos de uso, interfaces)
- **Infrastructure**: Implementación de servicios externos (GraphQL, HTTP)
- **Presentation**: UI y lógica de presentación (componentes, hooks, pantallas)

## Solución de Problemas

### iOS

#### Error: "Could not find iPhone simulator"

```bash
# Listar simuladores disponibles
xcrun simctl list devices

# Resetear simuladores
xcrun simctl erase all
```

#### Error al instalar pods

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

#### Error: "Command PhaseScriptExecution failed"

```bash
cd ios
xcodebuild clean
cd ..
```

### Android

#### Error: "SDK location not found"

Crea el archivo `android/local.properties`:

```properties
sdk.dir=/Users/<tu-usuario>/Library/Android/sdk
```

#### Error: "Execution failed for task ':app:installDebug'"

```bash
cd android
./gradlew clean
cd ..
```

#### Error: "Unable to load script from assets"

1. Asegúrate de que Metro esté corriendo
2. Limpia el cache:

```bash
npm start -- --reset-cache
```

### Problemas Generales

#### Limpiar cache completo

```bash
# Limpiar cache de npm
npm cache clean --force

# Limpiar cache de Metro
npm start -- --reset-cache

# Limpiar watchman
watchman watch-del-all

# Eliminar y reinstalar dependencias
rm -rf node_modules
npm install

# Para iOS
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..

# Para Android
cd android && ./gradlew clean && cd ..
```

#### Puerto 8081 ocupado

```bash
# Encontrar proceso usando el puerto
lsof -i :8081

# Matar el proceso
kill -9 <PID>
```

## Scripts Disponibles

```bash
npm start          # Inicia Metro Bundler
npm run android    # Ejecuta la app en Android
npm run ios        # Ejecuta la app en iOS
npm run lint       # Ejecuta ESLint
npm test           # Ejecuta tests con Jest
```

## Recursos Adicionales

- [Documentación de React Native](https://reactnative.dev)
- [Documentación de React Navigation](https://reactnavigation.org)
- [Documentación de Apollo Client](https://www.apollographql.com/docs/react)
- [Documentación de NativeWind](https://www.nativewind.dev)
- [Guía de configuración del entorno](https://reactnative.dev/docs/environment-setup)

## Licencia

Privado - Todos los derechos reservados
