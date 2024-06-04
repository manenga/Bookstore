import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html'
import { type Book, BookSchema, BooksDatabase } from './db.js';
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
    .use(swagger())
    .use(html())
    .decorate('db', new BooksDatabase())
    .get("/", () => Bun.file("index.html").text())
    .get("/script.js", () => Bun.file("script.js").text())
    .get("/books", ({ db }) => db.getBooks())
    .post(
        "/books",
        async ({ db, body }) => {
          console.log(body)
          const id = (await db.addBook(body as Book)).id
          console.log(id)
          return { success: true, id };
        },
        {
          schema: {
            body: BookSchema,
          },
        }
    )
    .put(
        "/books/:id",
        ({ db, params, body }) => {
          try {
            db.updateBook(parseInt(params.id), body as Book) 
            return { success: true };
          } catch (e) {
            return { success: false };
          }
        },
        {
          schema: {
            body: BookSchema,
          },
        }
    )
    .delete("/books/:id", ({ db, params }) => {
        try {
          db.deleteBook(parseInt(params.id))
          return { success: true };
        } catch (e) {
          return { success: false };
        }
      }) 
    .listen(26);

console.log(`Server started on ${app.server?.hostname}:${app.server?.port}`);