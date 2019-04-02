import React from 'react';
import SearchResults from '../SearchResults';

export interface SearchState {
  searchFocus: boolean;
  searchQuery: string;
  value: string;
}

export interface SearchProps {}

class Search extends React.Component<SearchProps, SearchState> {
  public searchInput: any;

  constructor(props: SearchProps) {
    super(props);
    this.searchInput = React.createRef();

    this.state = {
      searchFocus: false,
      searchQuery: '',
      value: ''
    };
  }

  handleChange = (value: string) => {
    this.setState({
      searchQuery: value,
    });
  }

  unFocusSearch = () => {
    this.setState({
      searchFocus: false,
    });
  }

  focusSearch = () => {
    this.searchInput.current.focus();

    this.setState({
      searchFocus: true,
    });
  }

  render() {
    const { searchFocus, value, searchQuery } = this.state;

    return (
      <>
        <div className={'search'}>
          <div className="container">
            <input 
              type="text" 
              placeholder={'search'} 
              ref={this.searchInput}
              onFocus={() => this.focusSearch()}
              onBlur={() => this.unFocusSearch()}
              onChange={e => this.handleChange(e.target.value)}
              defaultValue={''}
            />
          
            {value.length > 0 && (
              <div
                className={'textSearch__clear'}
                onClick={() => {
                  this.searchInput.current.value = '';
                  this.handleChange('');
                }}
              >
                X
              </div>
            )}
          </div>
        </div>

        <SearchResults
          searchQuery={this.state.searchQuery}
          active={this.state.searchQuery && this.state.searchQuery.length > 0}
          handleSearch={this.handleChange}
          languageCode={'en'} // fix
        />
      </>
    );
  }
}

export default Search;