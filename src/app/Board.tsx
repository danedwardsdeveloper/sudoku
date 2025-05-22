'use client'
import { mergeClasses } from '@/library/utilities/public'
import { SudokuSchema } from '@/library/validations/sudoku'
import type { InitialBoard } from '@/types'
import { type KeyboardEvent, useEffect, useState } from 'react'

type Coordinates = {
	row: number
	column: number
}

export default function Board({ initialBoard }: { initialBoard: InitialBoard }) {
	const [currentBoard, setCurrentBoard] = useState<number[][]>(initialBoard.map((row) => [...row]))
	const [selectedCell, setSelectedCell] = useState<Coordinates | null>(null)
	const [_isComplete, setIsComplete] = useState(false)

	function isInitialCell(row: number, column: number): boolean {
		return initialBoard[row][column] !== 0
	}

	const getBoxIndex = (row: number, column: number): number => {
		return Math.floor(row / 3) * 3 + Math.floor(column / 3)
	}

	function getBorderClasses(row: number, column: number): string {
		const classes = []

		// Thicker right border for 3x3 box separation (except last column)
		if (column % 3 === 2 && column !== 8) {
			classes.push('border-r-2 border-r-zinc-800')
		}

		// Thicker bottom border for 3x3 box separation (except last row)
		if (row % 3 === 2 && row !== 8) {
			classes.push('border-b-2 border-b-zinc-800')
		}

		return classes.join(' ')
	}

	function getHighlightClasses(row: number, column: number): string {
		if (!selectedCell) return ''

		const { row: selectedRow, column: selectedCol } = selectedCell
		const cellValue = currentBoard[row][column]
		const selectedValue = currentBoard[selectedRow][selectedCol]

		const isSameNumber = cellValue !== 0 && selectedValue !== 0 && cellValue === selectedValue

		if (isSameNumber) return 'bg-waffle-green'

		const isRowColumnOrGroup =
			row === selectedRow || column === selectedCol || getBoxIndex(row, column) === getBoxIndex(selectedRow, selectedCol)

		if (isRowColumnOrGroup) return 'bg-waffle-mustard'

		return ''
	}

	function handleChange(row: number, column: number, value: string) {
		if (isInitialCell(row, column)) return

		const numValue = value === '' ? 0 : Number.parseInt(value)
		if (Number.isNaN(numValue) || numValue < 0 || numValue > 9) return

		const newBoard = currentBoard.map((boardRow, rowIndex) =>
			boardRow.map((cell, columnIndex) => (rowIndex === row && columnIndex === column ? numValue : cell)),
		)

		setCurrentBoard(newBoard)
	}

	function handleCellClick(row: number, column: number) {
		setSelectedCell({ row, column })
	}

	function handleKeyDown(event: KeyboardEvent, row: number, column: number) {
		if (event.key === 'Backspace' || event.key === 'Delete') {
			handleChange(row, column, '')
		}
	}

	useEffect(() => {
		const hasEmptyCells = currentBoard.some((row) => row.some((cell) => cell === 0))

		if (!hasEmptyCells) {
			try {
				SudokuSchema.parse(currentBoard)
				setIsComplete(true)
			} catch {
				setIsComplete(false)
			}
		} else {
			setIsComplete(false)
		}
	}, [currentBoard])

	return (
		<div className="flex flex-column items-center justify-center min-h-screen p-4">
			<div className="grid grid-cols-9 gap-0 border-4 border-zinc-800 bg-white rounded-sm transition-all duration-300 max-w-xl">
				{currentBoard.map((row, rowIndex) =>
					row.map((cell, columnIndex) => {
						const key = `${rowIndex}-${columnIndex}`

						return (
							<div key={key}>
								<input
									type="text"
									value={cell === 0 ? '' : cell.toString()}
									onChange={(event) => handleChange(rowIndex, columnIndex, event.target.value)}
									onClick={() => handleCellClick(rowIndex, columnIndex)}
									onKeyDown={(event) => handleKeyDown(event, rowIndex, columnIndex)}
									className={mergeClasses(
										'aspect-square w-full text-center text-4xl border border-zinc-400',
										isInitialCell(rowIndex, columnIndex)
											? 'bg-zinc-200 text-zinc-800 font-bold cursor-default'
											: 'bg-white text-blue-600 cursor-text',
										getBorderClasses(rowIndex, columnIndex),
										getHighlightClasses(rowIndex, columnIndex),
									)}
									maxLength={1}
									readOnly={isInitialCell(rowIndex, columnIndex)}
									pattern="[1-9]"
								/>
							</div>
						)
					}),
				)}
			</div>
		</div>
	)
}
