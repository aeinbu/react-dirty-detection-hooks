// import React from 'react'
import { IsDirtyFrame, useIsDirtyStateConsumer, useStateWithIsDirtyTracking } from './Lib/IsDirtyFrame'


export const MyForm = () => {
	const data = [
		"this", "is", "it"
	]

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

				<MyButton />
			</div >
	)
}


type MyInputProps = {
	name: string
	value: string
}

const MyInput = ({ value: incomingValue, name }: MyInputProps) => {
	const [value, setValue] = useStateWithIsDirtyTracking(name, incomingValue)

	console.log("MyInput rendering", { name, value })
	return (
		<div>
			<input value={value} onChange={event => setValue(event.target.value as string)} />
		</div>
	)
}


const MyButton = () => {
	const isDirty = useIsDirtyStateConsumer()

	console.log("MyButton rendering", { isDirty })
	return (
		<button disabled={!isDirty}>
			Save {isDirty ? "(The form is dirty)" : "(The form is not dirty)"}
		</button>
	)
}