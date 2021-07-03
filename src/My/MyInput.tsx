import { useStateWithIsDirtyTracking } from '../Lib/IsDirtyFrame'

type Props = {
	name: string
	value: string
}

export const MyInput = ({ value: incomingValue, name }: Props) => {
	const [value, setValue] = useStateWithIsDirtyTracking(name, incomingValue)

	console.log("MyInput rendering", { name, value })
	return (
		<div>
			<input
				value={value}
				onChange={event => setValue(event.target.value as string)}
			/>
		</div>
	)
}
