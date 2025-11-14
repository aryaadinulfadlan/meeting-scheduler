# Online Meeting Scheduler with TypeScript, Next.js, PostgreSQL, Tailwind CSS, and Shadcn UI

- [🧠 Application Overview](#-application-overview)
- [🧪 Database Schema](#-database-schema)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🧰 How to Run the Application](#-how-to-run-the-application)
- [🔐 Authentication](#-authentication)
- [🔐 Authenticated Pages](#-authenticated-pages)
- [🔐 Unauthenticated Pages](#-unauthenticated-pages)

## 🧠 Application Overview

- A scalable and modular Online Meeting Scheduler application built with TypeScript, Next JS, PostgreSQL, Tailwind CSS, and Shadcn-UI.
- This Online Meeting Scheduler provides a streamlined workflow for organizing and booking meeting slots.
- The application enables organizers to define their availability, configure time gaps, and automatically generate schedulable time slots.
- Invitees can then view available slots in real time and book a meeting with a simple, guided flow.
- The system implements clean CRUD operations, server-side persistence, and a well-structured architecture that promotes scalability, maintainability, and reliable user experience.
- It includes simple User Authentication using cookie management with Iron Session.

## 🧱 Database Schema

## See the `drizzle/migrations/` directory for table definitions and sample data.

## 🚀 Features

- Fully typed TypeScript codebase for reliability and maintainability.
- Modern Next.js App Router architecture with full support for Server Components and routing conventions.
- Clean and structured Server Actions for secure, server-side mutations without exposing API endpoints.
- Interactive and accessible UI built with Tailwind CSS and shadcn-ui components.
- React Hook Form combined with Zod schemas for end-to-end form validation (client + server).
- Drizzle ORM for type-safe PostgreSQL schema management, migrations, and efficient SQL queries.
- Scalable database design using PostgreSQL to store meetings, availability, slots, and bookings.
- Organizer workflow to configure availability windows and define custom time gaps.
- Automatic slot generation based on date range, meeting duration, and availability rules.
- Invitee booking flow with real-time slot visibility and precise availability status.
- Zustand for lightweight and predictable client-side state management.
- Clear separation of concerns between UI components, state, business logic, and database operations.
- Built-in safeguards to prevent double-booking through atomic slot validation.
- Fully responsive interface optimized for both desktop and mobile users.
- Modular architecture with separation of concerns.
- Middleware supported for authenticated & unauthenticated pages.
- Simple authentication mechanism using Iron Session

## 🛠️ Tech Stack

This project uses these following main technologies:

- [TypeScript](https://www.typescriptlang.org/) — Main programming language.
- [Next.js](https://github.com/vercel/next.js) — The React Framework.
- [Tailwind CSS](https://tailwindcss.com/) — A utility-first CSS framework.
- [Shadcn UI](https://github.com/shadcn-ui/ui) — A set of beautifully-designed, accessible components and a code distribution platform.
- [PostgreSQL](https://github.com/postgres/postgres) — Relational database.
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) — A modern TypeScript ORM.
- [Zod](https://github.com/colinhacks/zod) — TypeScript-first schema validation with static type inference.
- [Zustand](https://github.com/pmndrs/zustand) — Bear necessities for state management in Reactinference.
- [React Hook Form](https://github.com/react-hook-form/react-hook-form) — React Hooks for form state management and validation.

---

## 🧰 How to Run the Application

- The easiest way to run this application is simply by accessing the Demo Application at: https://arya-scheduler.vercel.app.
- However, if you prefer to run it locally, you only need to prepare the necessary local environment, such as the database and configuration files. The local setup guide is not yet available at the moment.

---

## 🔐 Authentication

- This application uses a simple authentication method powered by Iron Session.
- The Online Meeting Scheduler supports two types of users: Organizer and Invitee. Becoming an Organizer requires signing up or signing in first. Organizers have their own dedicated pages and menus, such as creating Events, configuring availability (day and time), and viewing their upcoming and past meetings.
- Anyone can be an Invitee, as this role is public. If an Invitee knows the username of an Organizer, they can view the list of Events owned by that Organizer. The Invitee can then book one of the Events, which will be matched against the Organizer’s available schedule.

## 🔐 Authenticated Pages

#### When using this application as an Organizer, several authenticated pages become accessible, including:

- Dashboard page: displays an overview of the Organizer’s data.
- My Events page: shows the Organizer’s list of events, allows creating new events, deleting events, and copying event links for public sharing.
- Meetings page: displays both upcoming meetings the Organizer is scheduled to attend and past meetings they have already completed.
- Availability page: allows Organizers to configure their available days and times.

## 🔐 Unauthenticated Pages

#### For guests, the available pages include:

- User Profile page: displays the Organizer’s profile information and their list of events.
- Event page: shows detailed information about a specific event, allows guests to select a date and time based on the Organizer’s availability, and requires guests to submit their personal information to complete the booking.
