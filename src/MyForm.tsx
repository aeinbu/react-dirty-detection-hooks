// import React from 'react'
import { useIsDirtyStateConsumer, useStateWithIsDirtyTracking } from './Lib/IsDirtyFrame'


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

				<MySaveButton />
				<MyCloseButton />
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


const MySaveButton = () => {
	const isDirty = useIsDirtyStateConsumer()

//TODO: Save should reset the dirtycontext and all initialvalues - or load new initialvalues into the inputs

	console.log("MySaveButton rendering", { isDirty })
	return (
		<button disabled={!isDirty}>
			Save {isDirty ? "(The form is dirty)" : "(The form is not dirty)"}
		</button>
	)
}


const MyCloseButton = () => {
	const isDirty = useIsDirtyStateConsumer()

	console.log("MyCloseButton rendering", { isDirty })
	return (
		<button disabled={!isDirty}>
			Close {isDirty ? "(The form is dirty)" : "(The form is not dirty)"}
		</button>
	)
}