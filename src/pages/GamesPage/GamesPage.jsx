import React, { useEffect, useState } from "react";
import classes from './games.module.scss'
import rubic from '../../assets/cubic.jpg'
import {FiPlus} from 'react-icons/fi'
import {AiFillStar} from 'react-icons/ai'
import { useNavigate } from "react-router";
import { GamesService } from "../../services/FirebaseService.js";
const GamesPage = () => {
    const [games, setGames] = useState(null)
    const initgames = [
        {title: 'Classic', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
        {title: 'Game', image: rubic, isPremium: true},
        {title: 'Game', image: rubic, isPremium: false},
    ]

    const fetchGames = async () => {
        try {
            const games = await GamesService.getMany()
            setGames(games)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])
    const navigate = useNavigate()
    const createGame = () => {
        navigate('/games/create')
    }
    return (
        <div className={classes.games}>
            <div className={classes.games_body}>
                <div className={classes.title}>
                    Ігри
                </div>
                <div className={classes.games_list}>
                    <div className={classes.game_item} onClick={createGame}>
                        <div className={classes.image}>
                            <FiPlus size={50}/>
                        </div>
                        <div className={classes.title}>Створити гру</div>
                    </div>
                    {games?.map(game =>
                        <div onClick={() => navigate(`/games/${game.id}`)} key={game.id} className={[classes.game_item, classes.game_item_present].join(' ')}>
                            <div className={classes.image}>
                                <img src={game.image} alt="game" />
                                <div className={classes.backdrop}>
                                </div>
                                <div className={classes.text}>Налаштувати гру</div>
                                {game.isPremium &&
                                    <div className={classes.premium}>
                                        <AiFillStar size={18} color={'#3b5a9a'}/>
                                    </div>
                                }
                            </div>
                            <div className={classes.title}>{game.title}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GamesPage;