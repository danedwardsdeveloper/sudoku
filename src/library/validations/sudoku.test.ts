import { describe, expect, test } from 'vitest'
import { easyGame } from '../constants'
import { SudokuSchema } from './sudoku'

interface Suite {
	suiteDescription: string
	cases: Case[]
}

interface Case {
	caseDescription: string
	value: number[][]
	expected: boolean
}

describe('Validation tests', () => {
	const suites: Suite[] = [
		{
			suiteDescription: 'Valid solutions',
			cases: [
				{
					caseDescription: 'Easy',
					value: easyGame.solution,
					expected: true,
				},
			],
		},
		{
			suiteDescription: 'Invalid solutions',
			cases: [
				{
					caseDescription: 'Duplicate in row',
					value: [
						[1, 1, 5, 6, 9, 2, 4, 3, 8],
						[3, 8, 2, 1, 4, 7, 5, 6, 9],
						[4, 6, 9, 5, 3, 8, 2, 1, 7],
						[6, 4, 3, 2, 1, 9, 8, 7, 5],
						[9, 5, 7, 4, 8, 6, 1, 2, 3],
						[1, 2, 8, 3, 7, 5, 6, 9, 4],
						[2, 3, 4, 7, 5, 1, 9, 8, 6],
						[5, 9, 1, 8, 6, 3, 7, 4, 2],
						[8, 7, 6, 9, 2, 4, 3, 5, 1],
					],
					expected: false,
				},
			],
		},
	]

	for (const { suiteDescription, cases } of suites) {
		describe(suiteDescription, () => {
			for (const { caseDescription, value, expected } of cases) {
				test(caseDescription, () => {
					const result = SudokuSchema.safeParse(value)
					expect(result.success).toBe(expected)
				})
			}
		})
	}
})

/* 
pnpm vitest src/library/validations/sudoku
*/
