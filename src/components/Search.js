import React, { useState, useEffect } from 'react';

const Search = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ results, setResults ] = useState([]);

	useEffect( () => {
		async function fetchData() {
			const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&utf8=1&srsearch=${encodeURIComponent(searchTerm)}`);
			const data =  await response.json();
			setResults(data.query.search);
		  }

		if (searchTerm && !results.length) {
			fetchData(); 
		} else {
			// Note: you can also use state to store the previous timeout id, but timeout id will need to be shared as a dependency witin useEffect, and you will need to add checks to prevent the code from running in an infinite loop.
			const timeoutId = setTimeout(() => {
				if (searchTerm) {
					fetchData()
				}
			}, 500);

			// Cleanup function. Called before next time useEffect is run.
			return(() => {
				clearTimeout(timeoutId)
			});
		}
	}, [searchTerm])
	// The 2nd parameter to useEffect configures when the callback should run. It can be empty(run on every render), [] (run only on 1st render), [data1, data2] (run on 1st render, and every rerender if the specified data changes)

	// As results.length is used inside the useEffect callback, if not provided within the dependency array (2nd parameter), you will see an es-lint warning. If you provide results as a dependency, it will cause an infinite loop (as results is set from within the useEffect callback, triggering a rerender and useEffect being called again) unless you provide some way of escaping the loop.

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