import * as yup from "yup";

export const questionFormSchema = yup.object().shape({
    text: yup.string().required("Поле обов'язкове"),
    time: yup.string().required("Поле обов'язкове"),
    points: yup.string().required("Поле обов'язкове"),
});

export const formSchemaConnections = yup.object().shape({
    text: yup.string().required("Поле обов'язкове"),
    time: yup.string().required("Поле обов'язкове"),
    points: yup.string().required("Поле обов'язкове"),
    answer: yup.string().required("Поле обов'язкове"),
    question: yup.string().required("Поле обов'язкове"),
});

export const selectVariantFormSchema = yup.object().shape({
    value: yup.string().required("Поле обов'язкове"),
});

export const categoryFormSchema = yup.object().shape({
    name: yup.string().required("Поле обов'язкове"),
});

export const connectionsVariantSchema = yup.object().shape({
    answer: yup.string().required("Поле обов'язкове"),
    question: yup.string().required("Поле обов'язкове"),
});

export const formSchemaSort = yup.object().shape({
    text: yup.string().required("Поле обов'язкове"),
    time: yup.string().required("Поле обов'язкове"),
    points: yup.string().required("Поле обов'язкове"),
    option1: yup.string().required("Поле обов'язкове"),
    option2: yup.string().required("Поле обов'язкове"),
});

export const formSchemaRemove = yup.object().shape({
    text: yup.string().required("Поле обов'язкове"),
    time: yup.string().required("Поле обов'язкове"),
    points: yup.string().required("Поле обов'язкове"),
});
export const formSchemaRange = yup.object().shape({
    text: yup.string().required("Поле обов'язкове"),
    time: yup.string().required("Поле обов'язкове"),
    points: yup.string().required("Поле обов'язкове"),
    min: yup
        .string()
        .required("Поле обов'язкове")
        .required("Поле обов'язкове")
        .test(
            "is-in-rang",
            `Значення має бути меншим, ніж максимальне`,
            function (value) {
                const { max } = this.parent; // Get the min and max values from the parent object
                return Number(value) < Number(max); // Return true if the value is between min and max, or false otherwise
            }
        ),
    max: yup
        .string()
        .required("Поле обов'язкове")
        .required("Поле обов'язкове")
        .test(
            "is-in-rage",
            `Значення має бути більшим, ніж мінімальне`,
            function (value) {
                const { min } = this.parent; // Get the min and max values from the parent object
                return Number(value) > Number(min); // Return true if the value is between min and max, or false otherwise
            }
        ),
    correctAnswer: yup
        .string()
        .required("Поле обов'язкове")
        .test(
            "is-in-range",
            `Коректна відповідь повинна бути у вказаному діапазоні`,
            function (value) {
                const { min, max } = this.parent; // Get the min and max values from the parent object
                return (
                    Number(value) >= Number(min) && Number(value) <= Number(max)
                ); // Return true if the value is between min and max, or false otherwise
            }
        ),
});

// text: '',
//     time: '',
//     points: '',
//     category: '',
//     min: '',
//     max: '',
//     correctAnswer: ''

// export const formSchemaPickup = yup.object().shape({
//     customerName: yup.string().required('Поле обов\'язкове'),
//     phone: yup.string().required('Поле обов\'язкове').phone('UA', 'Неправильно введений номер'),
//     cutleryNumber: yup.number(),
//     comment: yup.string()
// })
