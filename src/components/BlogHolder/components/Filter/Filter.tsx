import * as React from 'react';

import TextSearch from '../../../TextSearch';

interface FilterProps {
  tags: any;
  type?: string;
  filter: string;
  languageCode: string;
  searchQuery?: string;
  onChangeFilter: Function;
  onTextSearchChange?: Function;
}

class Filter extends React.Component<FilterProps> {
  constructor(props: FilterProps) {
    super(props);
    this.onTextSearchChange = this.onTextSearchChange.bind(this);
  }

  setSelect(tagId: string) {
    this.props.onChangeFilter(tagId);
  }

  clearSelected() {
    this.props.onChangeFilter('');
  }

  onTextSearchChange(query: string) {
    this.props.onTextSearchChange(query);
  }

  render() {
    const { type, filter, searchQuery } = this.props;
    let tags = this.props.tags ? [...this.props.tags] : [];

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].tag) {
        for (let j = 0; j < tags[i].tag.length; j++) {
          tags[i].id = tags[i].tag[j].id;
          tags[i].name = tags[i].name ? tags[i].name : tags[i].tag[0].name;
        }
      }
    }

    return (
      <div
        className={`blogHolder__filters  ${
          type === 'secondary' ?
            'blogHolder__filters--sec ' :
            'blogHolder__filters--main'
          }`}
      >
        <ul>

          {type === 'primary' && (
            <li>
              <span
                onClick={() => this.clearSelected()}
                className={`listHover ${filter.length === 0 ? 'active' : ''}`}
              >
                {
                  this.props.languageCode === 'cs' ?
                    'Všechny články' :
                    'All articles'
                }
              </span>
            </li>
          )}

          {tags && tags.map((tag, index: number) => (
            <li key={index}>
              <span
                onClick={() => this.setSelect(tag.id)}
                className={`listHover ${filter === tag.id ? 'active' : ''}`}
              >
                {tag.name}
              </span>
            </li>
          ))}
        </ul>

        {type === 'primary' && (
          <TextSearch
            value={searchQuery}
            placeholder={
              this.props.languageCode === 'cs' ?
                'Vyhledávat v článcích' :
                'Search articles'
            }
            onTextSearchChange={this.onTextSearchChange}
          />
        )}
      </div>
    );

  }
}

export default Filter;