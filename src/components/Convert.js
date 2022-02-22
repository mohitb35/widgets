import React, { useState, useEffect } from "react";
import axios from 'axios';

const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';

const Convert = ({ language, text }) => {
	const [ translated, setTranslated ] = useState('');
	const [ debouncedText, setDebouncedText ] = useState(text);

	useEffect( () => {
		const timeoutId = setTimeout(() => {
			setDebouncedText(text)
		}, 500);

		// Cleanup function. Called before next time useEffect is run.
		return(() => {
			clearTimeout(timeoutId)
		});
	}, [text])

	useEffect(() => {
		const fetchTranslation = async () => {
			const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2',
				{},
				{
					params: {
						q: debouncedText,
						target: language.value,
						key: API_KEY
					}
				}
			)
			setTranslated(data.data.translations[0].translatedText);
		};

		if (debouncedText) {
			fetchTranslation();
		}
	}, [language, debouncedText])

	return (
		<div>
			<h2>Output</h2>
			<h3>{translated}</h3>
		</div>
	)
}

export default Convert;