import { gamesCollection } from '@/library/constants'
import Board from './Board'

export default function Page() {
	return <Board initialBoard={gamesCollection.Easy[0].initial} />
}
