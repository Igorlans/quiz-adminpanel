import { GamesService, QuestionsService, uploadFile } from "../../services/FirebaseService.js";
import { collection, doc, writeBatch, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { gamesCollectionId, questionsCollectionId } from "../../config.js";

const uploadGreeting = async (greeting) => {
    try {

        let greetingMainImageUrl = greeting?.mainImage;
        let greetingSecondaryImageUrl = greeting?.secondaryImage;

        if (greetingMainImageUrl?.name) {
            greetingMainImageUrl = await uploadFile(greetingMainImageUrl, 'gameImages');
            // greetingMainImageUrl = 'uploaded'
        }
        if (greetingSecondaryImageUrl?.name) {
            greetingSecondaryImageUrl = await uploadFile(greetingSecondaryImageUrl, 'gameImages');
            // greetingSecondaryImageUrl = 'uploaded'
        }

        return {
            ...greeting,
            mainImage: greetingMainImageUrl,
            secondaryImage: greetingSecondaryImageUrl
        }
    } catch (e) {
        throw e;
    }
}

const parseTours = async (tours) => {
    try {
        const newTours = await Promise.all(tours?.map(async (tour) => {
            const rounds = await Promise.all(tour?.rounds?.map(async (round) => {
                const greeting = await uploadGreeting(round?.greeting)
                console.log('ROUND QUESTIONS ========', round?.questions);
                if (round?.questions?.length) {
                    await QuestionsService.createMany(round?.questions)
                }

                let categories = [];

                round?.questions.forEach(question => {
                    if (!!question?.category) {
                        categories.push(question?.category?.trim())
                    }
                })

                categories = [...new Set([...categories])];

                const newRound = {...round, categories};
                delete newRound?.questions;
                console.log(newRound);
                return { ...newRound, greeting };
            }))
            const greeting = await uploadGreeting(tour?.greeting)

            return {
                ...tour,
                greeting,
                rounds
            }
        }))

        const structuredTours = newTours?.reduce((acc, tour, tourIndex) => {

            const structuredRounds = tour?.rounds?.reduce((acc, round, roundIndex) => {
                acc[roundIndex] = round;
                return acc;
            }, {})

            acc[tourIndex] = {...tour, rounds: structuredRounds};
            return acc;
        }, {})

        return structuredTours;
    } catch (e) {
        throw e;
    }
}
export const parseGame = async (gameData, gameImage) => {
    try {
        const greeting = await uploadGreeting(gameData?.greeting)


        let uploadedGameImageUrl = gameImage;
        if (gameImage?.name) {
            uploadedGameImageUrl = await uploadFile(gameImage, 'gameImages');
        }
        // const uploadedGameImageUrl = 'uploaded'

        const roundIds = gameData?.tours?.flatMap(obj => obj.rounds.map(round => round.id));

        const tours = await parseTours(gameData?.tours);




        const gameToAdd = {
            title: gameData.title,
            toStarsIndex: gameData.toStarsIndex,
            isPremium: gameData.isPremium,
            isActive: gameData.isActive,
            finalScreen: gameData.finalScreen,
            image: uploadedGameImageUrl,
            tours,
            greeting: greeting,
            roundIds
        }
        console.log('nui');
        console.log('GAME TO ADD =======', gameToAdd);
        return gameToAdd;
    } catch (e) {
        throw e;
    }
}

export const addGame = async (gameData, gameImage) => {
    try {
        const parsedGame = await parseGame(gameData, gameImage)
        return await GamesService.create(parsedGame)
    } catch (e) {
        throw e;
    }
}

export const updateGame = async (gameData, gameImage, roundIds, gameId) => {
    try {
        await Promise.all(roundIds?.map(async (roundId) =>
            await QuestionsService.deleteMany(['roundId', '==', roundId])
        ))
        const parsedGame = await parseGame(gameData, gameImage)
        return await setDoc(doc(db, gamesCollectionId, gameId), parsedGame)
    } catch (e) {
        throw e;
    }
}

export const removeGame = async (gameId, roundIds) => {
    try {
        await Promise.all(roundIds?.map(async (roundId) =>
            await QuestionsService.deleteMany(['roundId', '==', roundId])
        ))
        return await deleteDoc(doc(db, gamesCollectionId, gameId))
    } catch (e) {
        throw e;
    }
}