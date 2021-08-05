import React, { useState, useEffect } from 'react'
import './App.css'
import { IsDirtyFrame } from './Lib/IsDirtyFrame'
import { MyForm } from './My/MyForm'

export const App = () => {
	return (
		<div>
			Here comes the app...
			{/* <hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm incomingData={["this", "is", "it"]} />
			</IsDirtyFrame>
			<hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm incomingData={["this", "is", "more", "of", "it"]} />
			</IsDirtyFrame>
			<hr />
			Without dirty detection
			<MyForm incomingData={["this", "is", "the", "last", "one"]} /> */}
			<hr />
			<Test></Test>
		</div>
	)
}


const timeoutPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const Test = () => {
	const [stateA, setStateA] = useState(0)
	const [stateB, setStateB] = useState(0)
	const [stateC, setStateC] = useState(0)

	const setAllStates = () => {
		console.log("Setting all states...")
		setStateA(100)
		setStateB(200)
		setStateC(300)
		setStateA(1)
		setStateB(2)
		setStateA(1)
		setStateA(1)
		setStateA(1)
		setStateA(1)
		setStateA(1)
		setStateA(3)
	}

	useEffect(() => {
		console.log("In useEffect...")
		timeoutPromise(1000).then(() => {
			console.log("Timeout promise resolved.")
			setAllStates()
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])



	console.log("render", { state1: stateA, state2: stateB, state3: stateC })
	return (
		<div>
			<button onClick={() => setStateA(stateA + 1)}>+1</button>
			<button onClick={() => setStateA(5)}>5</button>
			<button onClick={() => {
				setStateA(10)
				setStateA(10)
				setStateA(10)
			}}>10-10-10</button>
			<button onClick={() => {
				setStateA(10)
				setStateA(20)
				setStateA(30)
			}}>10-20-30</button>
			<button onClick={() => {
				setStateA(10)
				setStateA(20)
				setStateA(10)
			}}>10-20-10</button>
			<br />
			<button onClick={() => {
				setStateA(10)
				setStateB(10)
				setStateC(10)
			}}>a-b-c</button>
			<button onClick={setAllStates}>setAllStates</button>

			<br />
			<dl>
				<dt>A</dt>
				<dd>{stateA}</dd>
				<dt>B</dt>
				<dd>{stateB}</dd>
				<dt>C</dt>
				<dd>{stateC}</dd>
			</dl>
		</div>
	)
}