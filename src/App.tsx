import React from 'react'
import './App.css'
import { IsDirtyFrame } from './Lib/IsDirtyFrame'
import {MyForm} from './My/MyForm'

export const App = () => {
	return (
		<div>
			Here comes the app...
			<hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm incomingData={["this", "is", "it"]}/>
			</IsDirtyFrame>
			<hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm incomingData={["this", "is", "more", "of", "it"]}/>
			</IsDirtyFrame>
			<hr />
			Without dirty detection
			<MyForm incomingData={["this", "is", "the", "last", "one"]}/>
			<hr />
		</div>
	)
}
