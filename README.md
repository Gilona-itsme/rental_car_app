# 🚗 RentalCar

Каталог автомобілів для оренди — тестове завдання, виконане в межах фултстек-курсу GoIT. Застосунок дозволяє переглядати список авто з фільтрами, деталями кожної машини та формою бронювання.

## 🔗 Демо

- Live: `посилання на деплой`
- Репозиторій: `посилання на GitHub`

## 🛠 Технології

- **Next.js** (App Router)
- **TypeScript**
- **TanStack Query** (`useInfiniteQuery`, `useQuery`, `prefetchQuery`)
- **Zustand** (з `persist` для форми бронювання)
- **Tailwind CSS** — кастомні компонентні класи
- **Headless UI** — кастомні `Listbox`-дропдауни замість нативних `<select>`

## ✨ Функціонал

- Каталог авто з **infinite scroll** та кнопкою «Load More» (по 12 карток за раз)
- Кастомні дропдаун-фільтри на базі Headless UI
- Стани завантаження та порожнього результату як перевикористовувані клієнтські компоненти
- Повноекранний оверлей завантаження, обмежений областю списку авто
- Сторінка деталей авто з `generateMetadata` для SEO та `useParams` + `useQuery` для клієнтських даних
- Форма бронювання на Zustand з валідацією полів та збереженням стану (`persist`)
- Компонент `FormField` із плаваючим лейблом та станами помилок

## 📁 Структура проєкту (ключове)

```
components/
  CarItem/
  CarList/
  FormField/
app/
  cars/
    page.tsx        # CarsPage — серверний рендер + prefetch
    CarsClient.tsx   # клієнтська логіка з useInfiniteQuery
  cars/[id]/
    page.tsx        # generateMetadata
    CarDetailsClient.tsx
store/
  bookingForm.ts     # Zustand store з persist
```

## 🔌 API

Дані отримуються з бекенду GoIT: `https://ac.goit.global`.

Типи `Car` узгоджені з реальною структурою відповіді API:

| Поле | Тип |
|---|---|
| `engine` | `string` |
| `features` | `string[]` |
| `location` | `{ country: string; city: string; address: string }` |
| `rentalPrice` | `string` |

## 🚀 Встановлення та запуск

```bash
git clone <repo-url>
cd rentalcar
npm install
npm run dev
```

Застосунок буде доступний за адресою `http://localhost:3000`.

## 🧪 Скрипти

```bash
npm run dev      # запуск у режимі розробки
npm run build    # продакшн-збірка
npm run start    # запуск продакшн-збірки
npm run lint     # перевірка ESLint
```

## 🐛 Технічні виклики та рішення

- Виправлено помилку через `generateMetadata`, оголошений усередині тіла компонента
- Вирішено проблему з тим, що `CarDetailsClient` не отримував дані
- Додано `try/catch` для `prefetchQuery`
- Усунено hydration mismatch через `toLocaleString()` без явної локалі
- Налаштовано `next/image` для зовнішнього хостнейму зображень
- Виправлено подвійний слеш в URL OG-зображення
- Вирішено `TS2503` через неправильний синтаксис простору імен типів
- Синхронізовано `queryKey` між `prefetchQuery` та `useQuery`

## 👤 Автор

Ілона — Frontend Developer / Web Designer

---

> ⚠️ Заповни поля `посилання на деплой` та `посилання на GitHub`, а також перевір назву репозиторію та команди запуску відповідно до реального `package.json`.
