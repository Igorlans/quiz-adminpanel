import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GamesService, QuestionsService } from "../../services/FirebaseService.js";
import GameForm from "./GameForm.jsx";

const UpdateGamePage = () => {

    const { id } = useParams()
    const [game, setGame] = useState(null)
    const fetchGame = async () => {
        const game = await GamesService.getOneById(id)

        const arrayTours = await Promise.all(Object.entries(game?.tours)?.map(async ([number, tour]) => {
            const arrayRounds = await Promise.all(Object.entries(tour?.rounds)?.map(async ([number, round]) => {
                const questions = await QuestionsService.getMany({where: ["roundId", "==", round?.id]})
                return {...round, questions}
            }))
            return {...tour, rounds: arrayRounds}
        }))
        console.log('GAME parse =====', {...game, tours: arrayTours});
        setGame({...game, tours: arrayTours })
    }

    useEffect(() => {
        fetchGame()
    }, [])

    return (
        game
            ? <GameForm game={game} />
            : null
    );
};

export default UpdateGamePage;