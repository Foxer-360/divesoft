import React from 'react';

export interface SearchState {

}

export interface SearchProps {
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className={'search'}>
        <div className="container">
          <input type="email" placeholder={'search'} />
        </div>
      </div>
    );
  }
}

export default Search;