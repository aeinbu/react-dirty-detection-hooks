import { useState } from 'react'
import { MyCancelButton } from './MyCancelButton'
import { MyInput } from './MyInput'
import { MySaveButton } from './MySaveButton'

type Props = {
	incomingData: string[]
}

export const MyForm = ({incomingData = ["this", "is", "it"]} : Props) => {
	const [data, ] = useState(incomingData)

	const save = () => {
		console.log("*** User pressed save")
	}

	const reset = () => {
		console.log("*** User pressed reset", incomingData)
	}

	console.log("MyForm rendering")
	return (
			<div>
				<header>
					Da form!
				</header>

				{data.map((value, ix) =>
					<MyInput
						key={ix}
						name={ix.toString()}
						value={value}
					/>
				)}

				<MySaveButton onClick={() => save()} />
				<MyCancelButton onClick={() => reset()}/>
			</div >
	)
}



