import React from "react";
interface HTMLComponentProps {
    htmlString: string;
}

class HTMLComponent extends React.Component<HTMLComponentProps> {
    render() {
      return (
        <div dangerouslySetInnerHTML={{ __html: this.props.htmlString }} />
      );
    }
  }

export {HTMLComponent}