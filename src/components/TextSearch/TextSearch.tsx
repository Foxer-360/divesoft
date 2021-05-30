import * as React from 'react';

import CloseIcon from '../../partials/SvgIcon/CloseIcon';
import SearchIcon from '../../partials/SvgIcon/SearchIcon';

export interface TextSearchProps {
  placeholder: string;
  value?: string;
  onTextSearchChange?: (searchText: string) => void;
}

export default class TextSearch extends React.Component<TextSearchProps, any> {
  public searchInput: any;

  constructor(props: TextSearchProps) {
    super(props);
    this.searchInput = React.createRef();

    this.state = {
      searchFocus: false,
    };
  }

  handleChange = (value: string) => {
    this.props.onTextSearchChange(value);
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

  public render() {
    const { placeholder, value } = this.props;
    const { searchFocus } = this.state;

    return (
      <div className={`textSearch ${value.length !== 0 || searchFocus ? 'textSearch--focused' : ''} `}>
        <input
          type={'text'}
          placeholder={placeholder}
          ref={this.searchInput}
          onFocus={() => this.focusSearch()}
          onBlur={() => this.unFocusSearch()}
          onChange={e => this.handleChange(e.target.value)}
          defaultValue={value}
        />

        {value.length > 0 && (
          <div
            className={'textSearch__clear'}
            onClick={() => {
              this.searchInput.current.value = '';
              this.handleChange('');
            }}
          >
            <CloseIcon name={'gray'} />
          </div>
        )}
        <div className={`textSearch__icon`} onClick={() => this.focusSearch()}>
          <SearchIcon name={value.length !== 0 || searchFocus ? 'red' : 'gray'} />
        </div>
      </div>
    );
  }
}
