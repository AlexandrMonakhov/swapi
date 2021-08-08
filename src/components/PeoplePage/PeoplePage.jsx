import React, { Component } from "react";
import ErrorIndicator from "../ErrorIndicator";

import { ItemList, PersonDetails } from "../index";

import Row from "../Row";

import "./PeoplePage.css";

export class PeoplePage extends Component {
  state = {
    selectedPerson: 1,
    hasError: false,
  };

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id,
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
        renderItem={({ name, gender, birthYear }) =>
          `${name} (${gender}, ${birthYear})`
        }
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return <Row left={itemList} right={personDetails} />;
  }
}

export default PeoplePage;
