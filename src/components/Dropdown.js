import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, onSelectedChange }) => {
	const [ isOpen, setIsOpen ] = useState(false);

	const dropdownRef = useRef(null);

	useEffect(() => {
		const onBodyClick = (event) => {
			// Ignore clicks originating within the dropdown component
			if (dropdownRef.current.contains(event.target)){
				return;
			}
			// can also use event.path.includes(dropdownRef.current)
			setIsOpen(false);
		};

		document.body.addEventListener('click', onBodyClick, { capture: true });

		return () => {
			document.body.removeEventListener('click', onBodyClick, { capture: true });
		};
	}, [])

	const renderedOptions = options.map( (option) => {
		if (option.value === selected.value) {
			return null;
		}
		return (
			<div 
				key={option.value} 
				className="item" 
				onClick={() => onSelectedChange(option)}
			>
				{option.label}
			</div>
		)
	})

	return (
		<div className="ui form" ref={dropdownRef}>
			<div className="field">
				<label className="label">Select a color</label>
				<div
					onClick={ () => setIsOpen(!isOpen) } 
					className={`ui selection dropdown ${isOpen ? 'visible active' : ''}`}
				>
					<i className="dropdown icon"/>
					<div className="text">{selected.label}</div>
					<div className={`menu ${isOpen ? 'visible transition': ''}`}>{renderedOptions}</div>
				</div>
			</div>
			<p style={{ color: selected.value }}>This text is {selected.value}</p>
		</div>
	)
}

export default Dropdown;