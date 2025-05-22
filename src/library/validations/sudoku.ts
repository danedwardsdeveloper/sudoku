import { z } from 'zod'

export const SudokuSchema = z
	.array(z.array(z.number().min(1).max(9)))
	.length(9)
	.refine(
		(board) => {
			for (let row = 0; row < 9; row++) {
				const rowSet = new Set(board[row])
				if (rowSet.size !== 9) return false
			}

			for (let column = 0; column < 9; column++) {
				const colSet = new Set()
				for (let row = 0; row < 9; row++) {
					colSet.add(board[row][column])
				}
				if (colSet.size !== 9) return false
			}

			for (let boxRow = 0; boxRow < 3; boxRow++) {
				for (let boxCol = 0; boxCol < 3; boxCol++) {
					const boxSet = new Set()
					for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
						for (let column = boxCol * 3; column < boxCol * 3 + 3; column++) {
							boxSet.add(board[row][column])
						}
					}
					if (boxSet.size !== 9) return false
				}
			}

			return true
		},
		{ message: 'Invalid Sudoku solution' },
	)
