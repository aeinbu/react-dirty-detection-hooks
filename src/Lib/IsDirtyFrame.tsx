import React, { useRef, useState, useContext } from 'react'
import { Observable, Subject } from 'rxjs'
import { Children } from './Children'
import { useSubscribedState } from './subscriptionHooks'


interface IDirtyContext {
	setDirtyState: (name: string, isDirty: boolean) => void
	observable: Observable<boolean>
	isDirty: boolean
}


export const IsDirtyContext = React.createContext<IDirtyContext>(undefined!)


class DirtyStateTracker implements IDirtyContext {
	private _dirtyInputs: Map<string, boolean>
	isDirty: boolean
	private _subject: Subject<boolean>
	public observable: Observable<boolean>

	constructor() {
		this._dirtyInputs = new Map<string, boolean>()
		this.isDirty = this.areAnyTrue(this._dirtyInputs)

		this._subject = new Subject<boolean>()
		this.observable = this._subject.asObservable()
	}

	private areAnyTrue(map: Map<string, boolean>) {
		return Array
			.from(map.values())
			.reduce((acc, curr) => acc || curr, false)
	}

	setDirtyState(name: string, isDirty: boolean) {
		this._dirtyInputs.set(name, isDirty)

		const t = this.areAnyTrue(this._dirtyInputs)
		if (t !== this.isDirty) {
			this.isDirty = t
			this._subject.next(t)
		}
	}
}


type IsDirtyFrameProps = {
	children: Children
}


export const IsDirtyFrame = ({ children }: IsDirtyFrameProps) => {
	const dirtyContextRef = useRef(new DirtyStateTracker())
	const dirtyContext = dirtyContextRef.current

	return (
		<IsDirtyContext.Provider value={dirtyContext}>
			{children}
		</IsDirtyContext.Provider>
	)
}


type SetFn = (val: string) => void

export const useStateWithIsDirtyTracking = (name: string, incomingValue: string): [string, SetFn] => {
	const [value, setValue] = useState(incomingValue)
	const [, setIsDirty] = useState(false)

	const dirtyContext = useContext(IsDirtyContext)

	const setFn = (value: string) => {
		setValue(value)
		setIsDirty(value !== incomingValue)

		dirtyContext.setDirtyState(name, value !== incomingValue)
	}

	return [value, setFn]
}


export const useIsDirtyStateConsumer = () => {
	const dirtyContext = useContext(IsDirtyContext)
	const isDirty = useSubscribedState(dirtyContext.observable, () => dirtyContext.isDirty)
	return isDirty
}
