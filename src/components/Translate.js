import React, { useState } from "react";

import Convert from "./Convert";
import Dropdown from "./Dropdown";

const options = [
	{
		label: 'Afrikaans',
		value: 'af'
	},
	{
		label: 'Arabic',
		value: 'ar'
	},
	{
		label: 'Hindi',
		value: 'hi'
	},
	{
		label: 'French',
		value: 'fr'
	}
]

const Translate = () => {
	const [ language, setLanguage ] = useState(options[0]);
	const [ text, setText ] = useState('');
	
	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter text</label>
					<input 
						value={text} 
						onChange={(event) => setText(event.target.value)}
					/>
				</div>
			</div>
			<Dropdown 
				label='Select a language'
				options={options} 
				selected={language} 
				onSelectedChange={setLanguage}
			/>
			<Convert language={language} text={text}/>
		</div>
	)
}

export default Translate;