import { useEffect, useState } from "react"
import { Observable } from "rxjs"


export function useSubscription<T>(
    observable: Observable<T>,
    action: (root: any) => any
): void {
    useEffect(() => {
        const subscription = observable.subscribe(whatever => action(whatever))

        return () => {
            // unsubscribe to ensure no memory leaks
            subscription?.unsubscribe()
        }
    },
        // eslint-disable-next-line
        [])
}


export function useSubscribedState<TState, T>(
    observable: Observable<T>,
    action: () => TState
): TState {
    const [state, setState] = useState<TState>(action)
    useSubscription(observable, (whatever) => setState(action()))

    return state
}