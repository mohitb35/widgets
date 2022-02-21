import React, { useState, useEffect } from 'react';

const Search = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ debouncedTerm, setDebouncedTerm ] = useState('');
	const [ results, setResults ] = useState([]);

	useEffect( () => {
		const timeoutId = setTimeout(() => {
			setDebouncedTerm(searchTerm)
		}, 500);

		// Cleanup function. Called before next time useEffect is run.
		return(() => {
			clearTimeout(timeoutId)
		});
	}, [searchTerm])
	// The 2nd parameter to useEffect configures when the callback should run. It can be empty(run on every render), [] (run only on 1st render), [data1, data2] (run on 1st render, and every rerender if the specified data changes)

	// As results.length was used inside the useEffect callback previously and not provided within the dependency array (2nd parameter), we saw an es-lint warning. If you provide results as a dependency, it will cause an infinite loop (as results is set from within the useEffect callback, triggering a rerender and useEffect being called again) unless you provide some way of escaping the loop.

	// We use a second useEffect function to call the API, whenever debouncedTerm changes. 

	useEffect( () => {
		async function fetchData() {
			const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&utf8=1&srsearch=${encodeURIComponent(debouncedTerm)}`);
			const data =  await response.json();
			setResults(data.query.search);
		  }
		if (debouncedTerm) {
			fetchData();
		}
	},[debouncedTerm])

	const renderedResults = results.map( result => {
		return (
			<div className="item" key={result.pageid}>
				<div className="right floated content">
					<a 
						className="ui button"
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
						target="_blank" rel="noreferrer"
					>Go</a>
				</div>
				 <div className="content">
					 <div className="header">
						 {result.title}
					 </div>
					 {/* {result.snippet} */}
					 <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
					 {/* dangerouslySetInnerHTML introduces risk of XSS. Don't do this in an actual app */}
				 </div>
			</div>
		)
	})

	return (
		<div>
			<div className="ui form">
				<div className="field">
					<label>Enter search term</label>
					<input 
						type="text" 
						className="input" 
						value={searchTerm} 
						onChange={(event) => setSearchTerm(event.target.value)}
					/>
				</div>
			</div>
			<div className="ui celled list">{renderedResults}</div>
		</div>
	)
}

export default Search;