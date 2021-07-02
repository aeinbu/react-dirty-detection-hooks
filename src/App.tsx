import React, { useState } from 'react';
import './App.css';
import { IsDirtyFrame } from './Lib/IsDirtyFrame';
import {MyForm} from './MyForm'

export const App = () => {
	return (
		<div>
			Here comes the app...
			<hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm />
			</IsDirtyFrame>
			<hr />
			<IsDirtyFrame>
				With dirty detection
				<MyForm />
			</IsDirtyFrame>
			<hr />
			Without dirty detection
			<MyForm />
			<hr />
		</div>
	);
}
