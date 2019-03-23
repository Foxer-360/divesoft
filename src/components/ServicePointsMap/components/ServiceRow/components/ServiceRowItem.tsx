import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ServiceRowItemState {
  show: boolean;
}

interface ServiceRowItemProps {
  title: string;
  text?: string;
  address?: string;
  storeChief?: string;
  phone?: string;
  email?: string;
  web?: LooseObject;
}

class ServiceRowItem extends React.Component<ServiceRowItemProps, ServiceRowItemState> {
  constructor(props: ServiceRowItemProps) {
    super(props);

    this.state = {
      show: false
    };
  }

  public render () {
    const {
      title,
      text,
      address,
      storeChief,
      phone,
      email,
      web
    } = this.props;

    return (
      <div className="row">
        <div className="col-12">
          <div 
            onClick={() => this.setState({ show: !this.state.show })}
            className={`serviceRow__list__show ${this.state.show ? 'serviceRow__list__show--minus' : ''}`} 
          />
          <div className={'serviceRow__list__item'}>
            <h5 onClick={() => this.setState({ show: !this.state.show })}>{title}</h5>
            {this.state.show && text && <ReactMarkdown source={text} />}
          </div>
          <div className={'serviceRow__list__divider'} />
        </div>
      </div>
    ); 
  }
}

export default ServiceRowItem;