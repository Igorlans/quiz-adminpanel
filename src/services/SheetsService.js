import { CategoriesService } from "./FirebaseService.js";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { v4 as generateId } from "uuid";

export class SheetsService {
    googleSheetsId;

    constructor(googleSheetsId) {
        try {
            this.googleSheetsId = googleSheetsId;
        } catch (e) {
            throw e;
        }
    }

    async getRowsAndCols(query) {
        try {
            let url = `https://docs.google.com/spreadsheets/d/${this.googleSheetsId}/gviz/tq?`

            if (query) {
                const encodedQuery = encodeURIComponent(query);
                url += 'tq=' + encodedQuery;
            }

            const response = await fetch(url)
            if(!response.ok) throw new Error('Помилка отримання таблиці')
            const rawText = await response.text()
            console.log(rawText);
            const data = JSON.parse(rawText.substring(47).slice(0, -2))

            return {
                rows: data?.table?.rows,
                cols: data?.table?.cols,
            }
        } catch (e) {
            throw e;
        }
    }

    async getIdOfCreatedCategory(name) {
        try {
            const category = query(CategoriesService.collectionRef, where('name', '==', name.trim()))
            const cat = await getDocs(category)
            const docs = cat.docs?.map(doc => ({...doc.data(), id: doc.id}))
            if (docs.length) {
                return docs[0]?.id;
            } else {
                const newCategory = await addDoc(CategoriesService.collectionRef, {name: name?.trim()})
                return newCategory.id;
            }
        } catch (e) {
            throw e;
        }
    }
    validateSelectRow(arrayOfValues, rowNumber) {
        try {
            arrayOfValues.forEach((value) => {
                if (typeof value === 'string') {
                    if (!value.trim()) {
                        throw new Error(`Незаповнене поле у рядку ${rowNumber}`)
                    }
                } else if (value <= 0) {
                    throw new Error(`Незаповнене поле у рядку ${rowNumber}`)
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async parseQuestions(questionsType, roundId) {
        try {
            switch (questionsType) {
                case 'select':
                    return this.parseSelectQuestion(roundId)
                case 'range':
                    return this.parseRangeQuestion(roundId)
                case 'remove':
                    return this.parseRemoveQuestion(roundId)
                case 'sort':
                    return this.parseSortQuestion(roundId)
                case 'connections':
                    return this.parseConnectionsQuestion(roundId)
                default:
                    return this.parseSelectQuestion(roundId)


            }
        } catch (e) {
            throw e;
        }
    }
    async parseRangeQuestion(roundId) {
        try {
            const rowsAndCols = await this.getRowsAndCols();
            const normalizedRows = normalizeRows(rowsAndCols.rows);
            console.log(normalizedRows, 'rows');
            const questions = normalizedRows?.map((row, index) => {
                const text = String(row[0]);
                const correctAnswer = row[1];
                const min = row[2];
                const max = row[3];
                const points = row[4];
                const time = row[5];
                const type = 'range';

                const validationSum = correctAnswer + min + max + points + time;

                if (typeof validationSum === 'string') throw new Error(`Неправильний формат у рядку ${index + 2}`)

                return {
                    roundId,
                    text,
                    points,
                    correctAnswer,
                    min,
                    max,
                    time,
                    type,
                }
            })

            return questions;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    async parseSelectQuestion(roundId) {
        try {
            const rowsAndCols = await this.getRowsAndCols();
            const normalizedRows = normalizeRows(rowsAndCols.rows);
            console.log(normalizedRows, 'rows');
            const questions = await Promise.all(normalizedRows?.map(async (row, index) => {
                const category = String(row[0]);
                const text = String(row[1]);
                const correctVariant = String(row[2]);
                const variant2 = String(row[3]);
                const variant3 = String(row[4]);
                const variant4 = String(row[5]);
                const points = row[6];
                const time = row[7];
                const type = 'select';

                const valuesArray = [
                    category, text, correctVariant, variant2, variant3, variant4, points, time
                ]
                this.validateSelectRow(valuesArray, index + 2)

                const options = [
                    {value: correctVariant, correct: true},
                    {value: variant2, correct: false},
                    {value: variant3, correct: false},
                    {value: variant4, correct: false},
                ]
                return {
                    roundId: roundId,
                    category,
                    text,
                    points,
                    time,
                    type,
                    options
                }
            }))

            return questions;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    async parseRemoveQuestion(roundId) {
        try {
            const rowsAndCols = await this.getRowsAndCols();
            const normalizedRows = normalizeRows(rowsAndCols.rows);
            console.log(normalizedRows, 'rows');

            const questionsArr = [];

            let newQuestion = {options: [], time: 0, type: 'remove'};

            for (let rowIndex = 0; rowIndex < normalizedRows.length; rowIndex++) {
                const rowArray = normalizedRows[rowIndex];
                const isVariantRow = rowArray[0] === '-';
                const isFirstQuestion = !newQuestion?.text;

                if (!isVariantRow) {
                    // ======== INFO ROW ========
                    if (!isFirstQuestion) {
                        questionsArr.push({ ...newQuestion, roundId })
                        newQuestion = {options: [], time: 0, type: 'remove'}
                    }
                    const text = rowArray[0];
                    const points = Number(rowArray[5]);
                    newQuestion = {
                        ...newQuestion, text, points
                    }
                } else {
                    // ======== VARIANT ROW ========
                    const correctVariant = String(rowArray[1]);
                    const variant2 = String(rowArray[2]);
                    const variant3 = String(rowArray[3]);
                    const variant4 = String(rowArray[4]);

                    const newOption = {data: [
                        {value: correctVariant, correct: true},
                        {value: variant2, correct: false},
                        {value: variant3, correct: false},
                        {value: variant4, correct: false},
                    ]}

                    const options = [...newQuestion?.options, newOption];
                    newQuestion = {...newQuestion, options}

                    if (rowIndex === normalizedRows.length - 1) {
                        questionsArr.push(newQuestion)
                    }
                }
            }

            return questionsArr;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    async parseSortQuestion(roundId) {
        try {
            const rowsAndCols = await this.getRowsAndCols();
            const normalizedRows = normalizeRows(rowsAndCols.rows);
            console.log(normalizedRows, 'rows');

            const questionsArr = [];

            const initQuestion = {
                time: 0,
                subjects: [],
                options: [],
                type: 'sort'
            }

            let newQuestion = {...initQuestion};

            for (let rowIndex = 0; rowIndex < normalizedRows.length; rowIndex++) {
                const rowArray = normalizedRows[rowIndex];
                const isVariantRow = rowArray[0] === '-';
                const isFirstQuestion = !newQuestion?.text;

                if (!isVariantRow) {
                    // ======== INFO ROW ========
                    if (!isFirstQuestion) {
                        questionsArr.push({ ...newQuestion, roundId })
                        newQuestion = {...initQuestion}
                    }

                    const text = String(rowArray[0]);
                    const points = Number(rowArray[3]);
                    const options = [String(rowArray[1]), String(rowArray[2])]

                    newQuestion = {
                        ...newQuestion, text, points, options
                    }
                } else {
                    // ======== VARIANT ROW ========
                    const variant1 = String(rowArray[1]);
                    const variant2 = String(rowArray[2]);

                    const newSubject1 = {
                        name: variant1,
                        expected: newQuestion?.options[0]
                    }

                    const newSubject2 = {
                        name: variant2,
                        expected: newQuestion?.options[1]
                    }

                    const subjects = [...newQuestion?.subjects, newSubject1, newSubject2];
                    newQuestion = {...newQuestion, subjects}

                    if (rowIndex === normalizedRows.length - 1) {
                        questionsArr.push({...newQuestion, roundId})
                    }
                }
            }

            return questionsArr;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    async parseConnectionsQuestion(roundId) {
        try {
            const rowsAndCols = await this.getRowsAndCols();
            const normalizedRows = normalizeRows(rowsAndCols.rows);
            console.log(normalizedRows, 'rows');

            const questionsArr = [];

            const initQuestion = {
                time: 0,
                type: 'connections',
                question: {},
                answer: {}
            }

            let newQuestion = {...initQuestion};

            for (let rowIndex = 0; rowIndex < normalizedRows.length; rowIndex++) {
                const rowArray = normalizedRows[rowIndex];
                const isVariantRow = rowArray[0] === '-';
                const isFirstQuestion = !newQuestion?.text;

                if (!isVariantRow) {
                    // ======== INFO ROW ========
                    if (!isFirstQuestion) {
                        questionsArr.push({ ...newQuestion, roundId })
                        newQuestion = {...initQuestion}
                    }

                    const text = String(rowArray[0]);
                    const points = Number(rowArray[3]);
                    const questionTitle = String(rowArray[1]);
                    const answerTitle = String(rowArray[2]);

                    newQuestion = {
                        ...newQuestion,
                        text,
                        points,
                        answer: {
                            title: answerTitle,
                            options: []
                        },
                        question: {
                            title: questionTitle,
                            options: []
                        }
                    }
                } else {
                    // ======== VARIANT ROW ========
                    const lockId = generateId();

                    const question = String(rowArray[1]);
                    const answer = String(rowArray[2]);

                    const questionOption = {
                        type: 'question',
                        value: question,
                        key: lockId
                    }

                    const answerOption = {
                        type: 'answer',
                        value: answer,
                        key: lockId
                    }

                    const newAnswerOptions = [...newQuestion.answer?.options, answerOption]
                    const newQuestionOptions = [...newQuestion.question?.options, questionOption]

                    newQuestion = {
                        ...newQuestion,
                        answer: {...newQuestion.answer, options: newAnswerOptions},
                        question: {...newQuestion.question, options: newQuestionOptions}
                    }

                    if (rowIndex === normalizedRows.length - 1) {
                        questionsArr.push({...newQuestion, roundId})
                    }
                }
            }

            return questionsArr;
        } catch (e) {
            console.log(e);
            throw e;
        }

    }
}


const normalizeRows = (rows) => {
    try {
        return rows?.map(row => row.c.map(row2 => row2.v))

    } catch (e) {
        throw e
    }
}