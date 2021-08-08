import React, { Component } from "react";

import SwapiService from "../../services/swapiService";

import PersonItem from "./PersonItem";

import "./PersonDetails.css";
import Spinner from "../Spinner";
import ErrorIndicator from "../ErrorIndicator";
import ErrorButton from "../ErrorButton";

export default class PersonDetails extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    error: false,
    loading: true,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId).then((person) => {
      this.setState({ person, loading: false });
    });
  }

  render() {
    const { loading, error } = this.state;

    const hasData = !(loading || error);

    const errorIndicator = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonItem person={this.state.person} /> : null;

    if (!this.state.person) {
      return <span>Select a person from a list!</span>;
    }

    return (
      <div className="person-details card">
        {spinner}
        {errorIndicator}
        {content}
        <ErrorButton />
      </div>
    );
  }
}
