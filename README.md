# 📝 NoteHub

NoteHub is a React + TypeScript application for managing personal notes. It allows users to create, search, paginate, and delete notes using a clean UI and a powerful backend API.

Live demo: [notehub-mu-gold.vercel.app](https://05-notehub-mu-gold.vercel.app/)  
Backend API: [NoteHub Swagger Docs](https://notehub-public.goit.study/api/docs/#/Auth/createAuthToken)

---

## 🚀 Features

- 🔍 Search notes with debounce
- ➕ Create new notes via modal form
- ❌ Delete notes with instant cache update (via TanStack Query mutation)
- 📄 Paginate through notes (12 per page)
- ✅ Form validation with Formik + Yup
- 🔄 Data fetching and caching via TanStack Query (`useQuery`, `useMutation`, `placeholderData`)
- 💅 Modular styling with CSS Modules
- 🔐 Secure token-based API access via environment variable
- ♿ Accessible modal with ARIA attributes

---

## 🛠 Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)
- [React Paginate](https://www.npmjs.com/package/react-paginate)
- [React Hot Toast](https://react-hot-toast.com/)
- [Modern Normalize](https://github.com/sindresorhus/modern-normalize)

---

## 📁 Project Structure
src/
├── components/
│   ├── App/
│   ├── NoteList/
│   ├── NoteForm/
│   ├── Modal/
│   ├── Pagination/
│   ├── SearchBox/
│   ├── Loader/
│   ├── ErrorMessage/
│   └── EmptyState/
├── services/
│   └── noteService.ts
├── types/
│   └── note.ts
├── index.css
└── main.tsx


---

## ⚙️ Getting Started

1. Clone the repository:
  
   git clone https://github.com/Michael-Kit/05-notehub.git
   cd 05-notehub
2. Install dependencies:

npm install

3. Create a .env file:

VITE_NOTEHUB_TOKEN=your_api_token_here
You can generate your token via the NoteHub API by submitting your email.

4. Start the development server:

npm run dev

5. Task Compliance (GoIT)
This project fully meets the requirements of the NoteHub task:

✅ Uses Vite + TypeScript

✅ All components are in separate folders with matching .tsx and .module.css files

✅ Uses TanStack Query for all data operations

✅ Uses Axios for HTTP requests

✅ Token stored securely via .env

✅ Pagination, search, modal, and form logic implemented

✅ Includes separate components for loading, error, and empty states

👤 Author
Name: Mykhaylo(Michael) Kit

Course: GoIT Fullstack Developer

Task: NoteHub — Homework # 05-notehub

