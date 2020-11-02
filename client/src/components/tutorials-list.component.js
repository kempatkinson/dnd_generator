import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import Tutorial from "./tutorial.component";

export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retriveMonsters() {
        const apiUrl = 'https://www.dnd5eapi.co/api/monsters'
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                for (var i = 0; i < data.results.length; i++) {

                    this.getMonster(data.results[i].url)
                }

                // console.log('this is your data', data)

            });
    }

    getMonster(url) {
        const apiUrl = 'https://www.dnd5eapi.co' + url
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                TutorialDataService.create({
                    name: data.name,
                    xp: data.xp,
                        armor_class: data.armor_class,
                        dexterity: data.dexterity,
                        strength: data.strength,
                        constitution: data.constitution,
                        wisdom: data.wisdom,
                        intelligence: data.intelligence,

                    
                })

            });

    }
    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });


                if (response.data.length === 0) {
                    console.log('im hit from retrive tutorials getting blank array')
                    this.retriveMonsters()

                }
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        // ...
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
              </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>

                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.name}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
          </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div id="current">
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>name:</strong>
                                </label>{" "}
                                {currentTutorial.name}
                            </div>
                            <div>
                                <label>
                                    <strong>xp:</strong>
                                </label>{" "}
                                {currentTutorial.xp}
                            </div>
                            <div>
                                <label>
                                    <strong>armor class:</strong>
                                </label>{" "}
                                {currentTutorial.armor_class}
                            </div>
                            <div>
                                <label>
                                    <strong>dexterity:</strong>
                                </label>{" "}
                                {currentTutorial.dexterity}
                            </div>
                            <div>
                                <label>
                                    <strong>strength:</strong>
                                </label>{" "}
                                {currentTutorial.strength}
                            </div>
                            <div>
                                <label>
                                    <strong>constitution:</strong>
                                </label>{" "}
                                {currentTutorial.constitution}
                            </div>
                            <div>
                                <label>
                                    <strong>intelligence:</strong>
                                </label>{" "}
                                {currentTutorial.intelligence}
                            </div>
                            <div>
                                <label>
                                    <strong>wisdom:</strong>
                                </label>{" "}
                                {currentTutorial.wisdom}
                            </div>

                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Tutorial...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }



}