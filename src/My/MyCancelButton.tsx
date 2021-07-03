
type Props = {
	onClick: () => void
}

export const MyCancelButton = ({onClick} : Props) => {
	console.log("MyCancelButton rendering")
	return (
		<button onClick={event => onClick()}>
			Cancel
		</button>
	)
}
