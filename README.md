# Ensource

This is a [Next.js](https://nextjs.org/) project bootstrapped with [` create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The project is hosted [here](`https://engage-web-app.vercel.app/`) on [Vercel](https://vercel.com/).

The application was created with these steps:

## Install Core Technologies

The application uses these core technologies:

- [React](https://react.dev/). A library for web and native user interfaces.
- [Next.js](https://nextjs.org/docs). A [React](https://react.dev/) framework for full-stack web applications
- [Tailwind CSS](https://tailwindcss.com/). A CSS framework with classes that can be added directly to markup.

Use `create-next-app` To bootstrap an application with the core technologies:

```
npx create-next-app@latest --use-pnpm
```

The `--use-pnpm` option ensures that all dependencies are managed with the [pnpm](https://pnpm.io/) package manager.

## Install UI components

[shadcn/ui](https://ui.shadcn.com/) provides UI components that can be copied and pasted into apps. They provide behavior and style.

Initiate [shadcn/ui](https://ui.shadcn.com/) and add all the [shadcn/ui](https://ui.shadcn.com/) components:

        npx shadcn-ui@latest init
        npx shadcn-ui@latest add

Manual steps:

- Copy/paste the [shadcn/ui Date Picker](https://ui.shadcn.com/docs/components/date-picker) component.
- Copy/paste [shadcn/ui themes](https://ui.shadcn.com/docs/components/date-picker) into the `globals.css` file.
- Add an `ag-grid.css` file that uses the [shadcn/ui CSS variables](https://ui.shadcn.com/docs/theming#css-variables) to theme [Ag Grid](https://ag-grid.com/).
- `pnpm add @radix-ui/react-icons`

## Additional UI components

- [React Hook Form](https://react-hook-form.com/)
- [AgGrid](https://ag-grid.com/react-data-grid/getting-started/)
- [react-select](https://react-select.com/)
