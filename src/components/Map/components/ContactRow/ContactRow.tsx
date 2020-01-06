import * as React from 'react';

export interface ContactRowState {
  numberOfPage: number;
}

interface Contact {
  name: string;
  position?: string;
  email?: string;
  phone?: string;
  web?: LooseObject;
}

interface ContactRowProps {
  title: string;
  rows: Contact[];
}

class ContactRow extends React.Component<ContactRowProps, ContactRowState> {
  constructor(props: ContactRowProps) {
    super(props);

    this.state = {
      numberOfPage: 1
    };
  }

  public render() {
    const { title, rows } = this.props;

    console.log('rows >', rows);

    return (
      <div className={'contactRow'}>
        <div className={'container'}>
          <div className="row contactRow__divider">

            <div className="col-12 col-md-3">
              <h3>{title}</h3>
            </div>

            <div className="col-12 col-md-9">
              <div className={'row'}>
                {rows && rows.map((item, i) => (
                  <div key={i} className={'contactRow__item col-12 col-md-4'}>
                    {item.name && <h5>{item.name}</h5>}
                    {item.position && <span>{item.position}</span>}
                    {item.web && item.web.url && item.web.url.trim()
                      && <p>W: <a href={item.web.url} target="_blank">{item.web.url}</a></p>
                    }
                    {item.email && <p>M: <a href={`mailto:${item.email}`}>{item.email}</a></p>}
                    {item.phone && <p>P: <a href={`tel:${item.phone}`}>{item.phone}</a></p>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ContactRow;
