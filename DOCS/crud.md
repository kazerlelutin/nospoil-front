
## CRUD PROVIDER

The CRUD (Create, Read, Update, Delete) system is a fundamental pattern for managing data within applications. This documentation outlines the implementation of a customizable CRUD provider using Preact and TypeScript, facilitating consistent data operations across your application. Additionally, it covers best practices for testing your CRUD operations using Vitest, @testing-library/preact, Fast-Check, and Vitest-Axe for accessibility.

## CrudProvider Component
### Props:

- name (string): The name identifier for the CRUD context.
- crud (CrudActions<T>): An object containing CRUD action methods.
- children (preact.ComponentChildren): The child components that will have access to the CRUD actions.



```tsx
// src/types/crud.ts

<CrudProvider<TestEntity>
  name="test"
  crud={{
    getList: { /* ... */ },
    getItem: { /* ... */ },
    create: { /* ... */ },
    update: { /* ... */ },
    delete: { /* ... */ },
  }}
>
  {children}
</CrudProvider>

```

## useCrud Hook

Type Signature:

```tsx
function useCrud<T>(name: string): CrudActions<T>
```

### Parameters:

- name (string): The name identifier for the CRUD context.


### Returns:

An object containing the CRUD actions: getList, getItem, create, update, delete.
Usage:

```tsx
//same provider's name
const { getList, getItem, create, update, delete: deleteItem } = useCrud<TestEntity>('test')
```