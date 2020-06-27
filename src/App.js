import React from "react";
import "./App.css";
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
  accessKey: "W1KhacP9iCqREq87b8S213BNKVqRCIokJFAck0ZgZ-0",
  secret: "4Y_XejbSlq31ZHyYxFpCEN77D7tezLS486k6QwbeTbk",
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      results: [],
      images: [],
    };
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  formSubmitted(event) {
    event.preventDefault();

    this.setState({ images: [] });

    unsplash.search
      .photos(this.state.searchTerm, 1, 20)
      .then(toJson)
      .then((result) => {
        console.log(result);
        console.log(result.results[0].urls.regular);
        this.setState({ results: result.results });
      });
  }

  render() {
    return (
      <div>
        <h1>React Image Picker</h1>
        <form onSubmit={(event) => this.formSubmitted(event)}>
          <label htmlFor="searchTerm">Search Term</label>
          <input
            onChange={(event) => this.handleChange(event)}
            value={this.state.searchTerm}
            type="text"
            className="u-full-width"
            id="searchTerm"
            name="searchTerm"
          />
          <button type="submit">Search</button>
        </form>

        <section className="images">
          {this.state.results.map((image) => {
            return <img src={image.urls.regular} alt={image.alt_description} />;
          })}
        </section>
      </div>
    );
  }
}

export default App;
