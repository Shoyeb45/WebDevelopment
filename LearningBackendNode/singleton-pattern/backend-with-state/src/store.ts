// chess

interface Game {
    id: string,
    whitePlayer: string,
    blackPlayer: string,
    moves: string[]
}

export class GameManager {
    private games: Game[] = [];
    private static instance: GameManager;

    private constructor() { }

    public static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public addGame(game: Game) {
        this.games.push(game);
    }

    public getGame() {
        return this.games;
    }

    public addMove(gameId: string, moves: string) {
        const game = this.games.find(game => game.id === gameId);
        if (game) {
            game.moves.push(moves);
        }
    }

    public logState() {
        console.log(this.games);
        
    }
}
