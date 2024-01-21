import { z } from "zod";
import { greetingValidationSchema } from "./GreetingFields.jsx";

export const roundValidationSchema = z.discriminatedUnion('questionsType', [
    // ===== REMOVE =====
    z.object({
        greeting: greetingValidationSchema,
        questionsType: z.literal('remove'),
        questions: z.array(z.any()),
        time: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        googleSheetsId: z.string().trim().nonempty("Поле обов'язкове"),
    }),

    // ===== SORT =====
    z.object({
        greeting: greetingValidationSchema,
        questionsType: z.literal('sort'),
        questions: z.array(z.any()),
        time: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        googleSheetsId: z.string().trim().nonempty("Поле обов'язкове"),
    }),

    // ===== CONNECTIONS =====
    z.object({
        greeting: greetingValidationSchema,
        questionsType: z.literal('connections'),
        questions: z.array(z.any()),
        time: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        googleSheetsId: z.string().trim().nonempty("Поле обов'язкове"),
    }),

    // ===== SELECT =====
    z.object({
        greeting: greetingValidationSchema,
        questionsType: z.literal('select'),
        gapTime: z.coerce.number({ invalid_type_error: "Введіть число" }).min(0, {message: 'Мінімальне число - 0'}),
        questionsCount: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        questions: z.array(z.any()),
        voting: z.object({
            votingTime: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        }).optional(),
        googleSheetsId: z.string().trim().nonempty("Поле обов'язкове")
    }),

    // ===== RANGE =====
    z.object({
        greeting: greetingValidationSchema,
        questionsType: z.literal('range'),
        gapTime: z.coerce.number({ invalid_type_error: "Введіть число" }).min(0, {message: 'Мінімальне число - 0'}),
        questionsCount: z.coerce.number({ invalid_type_error: "Введіть число" }).min(1, {message: 'Мінімальне число - 1'}),
        questions: z.array(z.any()),
        googleSheetsId: z.string().trim().nonempty("Поле обов'язкове")
    }),

])