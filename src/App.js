import React, { useState } from 'react';

import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
	{
		title: 'What is React?',
		content: 'React is a front end JS framework'
	},
	{
		title: 'Why use React?',
		content: 'React is a favourite among front end engineers'
	},
	{
		title: 'How do you use React?',
		content: 'You use React by creating components'
	},
]

const options = [
	{
		label: 'Red',
		value: 'red'
	},
	{
		label: 'Blue',
		value: 'blue'
	},
	{
		label: 'Green',
		value: 'green'
	}
]

const App = () => {
	const [selected, setSelected] = useState(options[0]);
	return (
		<div>
			<Header />
			<Route path='/'>
				<Accordion items={items} />
			</Route>
			<Route path='/list'>
				<Search />
			</Route>
			<Route path='/dropdown'>
				<Dropdown 
					label='Select a color'
					options={options}
					selected={selected}
					onSelectedChange={setSelected}
				/>
				<p style={{ color: selected.value }}>This text is {selected.value}</p>
			</Route>
			<Route path='/translate'>
				<Translate />
			</Route>
		</div>
	)
};

export default App;