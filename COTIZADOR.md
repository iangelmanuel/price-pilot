# PricePilot — Documentación Completa del Cotizador

## ¿Qué es PricePilot?

PricePilot es una herramienta interna de administración para un negocio de **casillero / dropshipping** que compra productos en tiendas de Estados Unidos (principalmente Amazon) con descuento y los revende en Colombia. Su función principal es calcular automáticamente el precio de venta final en pesos colombianos (COP) a partir del precio en dólares (USD), aplicando todos los costos y márgenes del negocio.

---

## Flujo completo del usuario

```
1. Ingresar URL y precio USD del producto
         ↓
2. Configurar TRM, comisión, envío, peso
         ↓
3. Ver precio final COP en tiempo real
         ↓
4. Copiar precio al portapapeles
         ↓
5. Generar mensaje de WhatsApp con IA
         ↓
6. Copiar mensaje y publicar
```

---

## Sección 1: Fuente del Producto

Esta sección captura la información básica del producto que se va a cotizar.

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| **Enlace del producto** | URL (texto) | No | Link directo al producto (ej: Amazon). Sirve para referencia, se puede copiar o abrir directamente. |
| **Precio del producto (USD)** | Número decimal | Sí | El precio de compra en dólares. Este es el valor base de toda la cotización. |
| **Código de cupón** | Texto | No | Cupón de descuento del producto. Solo para referencia y copia rápida. |
| **Libras** | Número decimal | No | Peso del producto en libras. Afecta el costo de envío si se selecciona una tarifa por libra. |

> El campo **Precio USD** acepta tanto punto como coma como separador decimal (ej: `49,99` o `49.99`), adaptado al formato colombiano.

---

## Sección 2: Conversión Automática a COP

Esta es la sección central del cotizador. Aquí se configura cómo se convierte el precio en USD a COP y qué costos adicionales se aplican.

### 2.1 TRM (Tasa de Cambio)

- **¿Qué es?** La tasa de cambio del dólar americano a peso colombiano. Ejemplo: `4.150` significa que 1 USD = $4.150 COP.
- **¿De dónde viene?** Se obtiene automáticamente desde la API pública de Hexarate (`hexarate.paikama.co`) al cargar la aplicación. Usa la tasa *mid-market* (punto medio entre compra y venta) redondeada hacia arriba.
- **¿Se puede cambiar?** Sí. Al activar el toggle **"Manual"**, el campo TRM se vuelve editable y el usuario puede ingresar la tasa que desee.
- **Persistencia:** El valor (y si es manual o automático) se guarda en `localStorage`, por lo que al recargar la página se recupera el último valor usado.

### 2.2 Comisión de la empresa

Conjunto de opciones (pills) que agrega un valor fijo en COP **sobre** el TRM. Representa el margen de ganancia por la conversión de divisas.

| Opción | Valor agregado al TRM |
|---|---|
| `+0` | $0 COP (sin comisión) |
| `+150` | $150 COP por dólar |
| `+200` | $200 COP por dólar |
| `+300` | $300 COP por dólar |

> **Ejemplo:** Si TRM = $4.150 y se selecciona `+200`, la tasa efectiva usada en el cálculo es **$4.350 COP por dólar**.
>
> Esta "tasa efectiva" se muestra debajo del precio final con el texto: `Tasa efectiva: $4.350`

### 2.3 Toggle "Envío +10.000"

- **Activo:** Suma **$10.000 COP** fijos al precio final.
- **Inactivo:** No suma nada ($0).
- Representa un costo fijo de envío o manipulación del producto.

### 2.4 Toggle "Incremento +15%"

- **Activo:** Multiplica el subtotal por **1.15** (sube el precio un 15%).
- **Inactivo:** Multiplica por **1.0** (sin cambio).
- Útil para agregar un margen adicional de ganancia sobre el precio base calculado.

> **Importante:** El 15% se aplica **antes** de sumar el envío y el costo por libra.

### 2.5 Costo por libra

Opciones (pills) que definen cuánto cuesta el envío internacional **por cada libra** del producto.

| Opción | Costo por libra |
|---|---|
| `Libra +0` | $0 COP (sin costo por peso) |
| `+18.000` | $18.000 COP por libra |
| `+30.000` | $30.000 COP por libra |

> Este costo se multiplica por las libras ingresadas en la sección anterior.
>
> **Ejemplo:** Producto de 2.5 libras con tarifa `+18.000` → $45.000 COP adicionales.

---

## Fórmula de Cálculo

Esta es la fórmula exacta que usa el sistema para calcular el precio final:

```
Tasa efectiva = TRM + Comisión empresa

Costo por peso = Costo por libra × Libras del producto

Precio final COP = (Precio USD × Tasa efectiva × Incremento %)
                   + Costo de envío fijo
                   + Costo por peso
```

### Variables de la fórmula

| Variable | Valor posible |
|---|---|
| `Precio USD` | Ingresado por el usuario |
| `TRM` | Auto (API) o manual |
| `Comisión empresa` | 0, 150, 200 o 300 COP |
| `Tasa efectiva` | TRM + Comisión |
| `Incremento %` | 1.0 (sin aumento) o 1.15 (+15%) |
| `Costo de envío fijo` | 0 o 10.000 COP |
| `Costo por libra` | 0, 18.000 o 30.000 COP/lb |
| `Libras` | Ingresado por el usuario |
| `Costo por peso` | Costo por libra × Libras |

### Ejemplo de cálculo completo

```
Producto: $49.99 USD, 2 libras
TRM: $4.150 | Comisión: +200 | Envío: +10.000 | +15% | Libra: +18.000

Tasa efectiva = 4.150 + 200 = 4.350
Costo por peso = 18.000 × 2 = 36.000

Precio final = (49.99 × 4.350 × 1.15) + 10.000 + 36.000
             = (49.99 × 5.002,5)    + 10.000 + 36.000
             = 250.074,975          + 10.000 + 36.000
             = $296.075 COP  ← redondeado hacia arriba
```

---

## Sección 3: Resultados (Precio Final)

El precio final se muestra de forma prominente y se actualiza en **tiempo real** con cada cambio en los campos.

### Precio final COP

- Número grande en la pantalla, formateado en pesos colombianos.
- Siempre se redondea **hacia arriba** al entero más cercano (`Math.ceil`).
- Formato: `$296.075` (estilo colombiano con puntos para miles).

### Botón de copiar

- Copia el precio final como número entero al portapapeles.
- Lo que se copia: solo el número, ej: `296075` — listo para pegar en cualquier lugar.

### Desglose del precio (4 tiles)

Debajo del precio final, se muestran 4 tiles que desglosan de dónde viene cada parte del precio:

| Tile | Valor que muestra |
|---|---|
| **Base** | `Precio USD × Tasa efectiva` (sin el 15%) |
| **Envío** | Costo fijo de envío (0 o $10.000 COP) |
| **Libra** | `Costo por libra × Libras` |
| **Total** | Precio final completo (resaltado) |

### Tasa efectiva

Debajo del desglose se muestra: `Tasa efectiva: $4.350 COP`

Permite verificar rápidamente cuál es la tasa real con la que se está calculando.

---

## Sección 4: Asistente IA para WhatsApp

Genera automáticamente un mensaje de WhatsApp listo para publicar, con el producto cotizado.

### Campos de entrada

| Campo | Descripción |
|---|---|
| **Código del producto** | Código interno (ej: `912`) |
| **Título del producto** | Nombre del producto para el mensaje |
| **Precio actual (COP)** | Precio de venta en COP para mostrar en el mensaje |
| **Precio anterior (COP)** | Precio tachado (precio "antes de descuento") |
| **Descripción para IA** | Beneficios/características del producto, una por línea |

### Cómo funciona la IA

1. El usuario llena los campos y hace clic en **"Generar mensaje con IA"**.
2. Se llama a un servidor que usa **OpenRouter** (con el modelo `openai/gpt-oss-20b:free`) para generar el mensaje.
3. El mensaje se muestra en streaming (aparece palabra por palabra, en tiempo real).
4. Temperatura de generación: `0.2` — respuestas consistentes y poco creativas, enfocadas en el formato.

### Fallback sin API Key

Si no hay API key configurada, el sistema genera el mensaje localmente con una plantilla fija:

```
🆔 Código: 912
✨ Nombre del producto
Precio Spring 🍂: $296.075
❌ Antes: $350.000
✨ Beneficio 1
✨ Beneficio 2
✨ Beneficio 3
🍁 Aprovecha Spring Deal Days aquí 👉 wa.link/znboo2
```

### Vista previa de WhatsApp

- En cuanto se ingresa una URL de producto, aparece una **burbuja estilo WhatsApp** a la derecha con la info básica: link, cupón, precio USD y libras.
- Cuando la IA genera el mensaje, aparece una **segunda burbuja** con el mensaje completo.
- Cada burbuja tiene su propio botón de copiar.

---

## Persistencia de datos

Toda la configuración de precios se guarda automáticamente en el navegador (`localStorage`) bajo la clave `price-pilot:price-settings:v1`. Incluye:

- TRM actual y si está en modo manual
- Comisión seleccionada
- Costo de envío activo
- Costo por libra seleccionado
- Si el incremento del 15% está activo

Al recargar la página, todos estos valores se restauran automáticamente.

---

## Botón "Limpiar datos"

Ubicado en la barra superior. Resetea **todos** los campos del formulario y el mensaje de IA a su estado inicial (vacío/cero). No afecta la configuración de precios guardada.

---

## Resumen de todos los valores configurables

| Parámetro | Opciones | Impacto |
|---|---|---|
| TRM | Auto (API) o manual | Base de conversión USD→COP |
| Comisión empresa | 0 / 150 / 200 / 300 COP | Suma a TRM → tasa efectiva |
| Envío fijo | 0 / 10.000 COP | Suma fija al final |
| Incremento | 0% / +15% | Multiplica el subtotal |
| Costo por libra | 0 / 18.000 / 30.000 COP | Multiplica × libras del producto |
| Precio USD | Libre | Base del cálculo |
| Libras | Libre | Multiplica × costo por libra |
