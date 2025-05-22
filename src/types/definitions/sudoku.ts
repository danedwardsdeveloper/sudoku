type SolvedCell = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type InitialCell = SolvedCell | 0
type Row<T> = [T, T, T, T, T, T, T, T, T]

export type InitialBoard = [
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
	Row<InitialCell>,
]

export type Solution = [
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
	Row<SolvedCell>,
]

type Game = { initial: InitialBoard; solution: Solution }
type Difficulty = 'Easy' | 'Medium' | 'Difficult'

export type GamesCollection = { [key in Difficulty]: Game[] }
