import { useIsDirtyStateConsumer } from '../Lib/IsDirtyFrame'

type Props = {
	onClick: () => void
}

export const MySaveButton = ({onClick} : Props) => {
	const isDirty = useIsDirtyStateConsumer()

	//TODO: Save should reset the dirtycontext and all initialvalues - or load new initialvalues into the inputs
	console.log("MySaveButton rendering", { isDirty })
	return (
		<button disabled={!isDirty} onClick={event => onClick()}>
			Save {isDirty ? "(The form is dirty)" : "(The form is not dirty)"}
		</button>
	)
}
