import React, { Component } from "react";

class Algo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalpairs: [],
      log: [],
    };
  }

  componentDidMount = () => {
    this.galeShapley();
  };

  removePair = (name, set) => {
    var newfinal = set.filter((a) => {
      if (a[0] === name) {
        return false;
      } else {
        return true;
      }
    });
    return newfinal;
  };

  findPerson = (id, set) => {
    return set.find((item) => item.id === id);
  };

  nextPossible = (person) => {
    person.next_possible = ++person.next_possible;
  };

  galeShapley = () => {
    var log = [];
    var set1 = Object.assign([], this.props.set1);
    var set2 = Object.assign([], this.props.set2);
    var person2;
    var finalpairs = [];
    while (set1.filter((e) => e.paired === false).length > 0) {
      for (const person1 of set1) {
        if (person1.paired === false) {
          var preferred_index = set2.findIndex(
            (x) => x.id === person1.preferences[person1.next_possible]
          );
          person2 = set2[preferred_index];
          log.push(person1.name + " checks if " + person2.name + " is free ");
          if (person2.paired === false) {
            log.push(
              person2.name +
                " is free so " +
                person1.name +
                " and " +
                person2.name +
                " pairs up "
            );
            finalpairs.push([person1.name, person2.name]);
            person1.setPairedValue(person1.next_possible);
            person2.setPairedValue(
              person2.preferences.findIndex((x) => x === person1.id)
            );
          } else {
            if (
              person2.preferences.findIndex((x) => x === person1.id) <
              person2.paired
            ) {
              log.push(
                person2.name +
                  " prefers " +
                  person1.name +
                  " over " +
                  this.findPerson(person2.preferences[person2.paired], set1)
                    .name
              );
              log.push(person2.name + " and " + person1.name + " pairs up ");
              this.findPerson(
                person2.preferences[person2.paired],
                set1
              ).setPairedValue(false);
              finalpairs = this.removePair(
                this.findPerson(person2.preferences[person2.paired], set1).name,
                finalpairs
              );
              person1.setPairedValue(person1.next_possible);
              person2.setPairedValue(
                person2.preferences.findIndex((x) => x === person1.id)
              );
              finalpairs.push([person1.name, person2.name]);
            } else {
              this.nextPossible(person1);
              log.push(
                person2.name +
                  " has a pair already and he/she prefers her current one so " +
                  person1.name +
                  " will find another pair "
              );
            }
          }
        }
      }
    }
    log.push("Finished");
    this.setState({ log: log, finalpairs: finalpairs });
  };
  render() {
    return (
      <div>
        <label className="ms-4 me-4 mt-3 mb-3 bg-primary text-white">
          The Resulting Pairings
        </label>
        <div className="ms-4 me-4">
          {this.state.finalpairs.map((b, index) => {
            return (
              <div key={index}>
                {b[0]} and {b[1]}
              </div>
            );
          })}
        </div>
        <label className="ms-4 me-4 mt-3 bg-primary text-white">
          Step-By-Step Explanation
        </label>
        <div className="m-4">
          {this.state.log.map((b, index) => {
            return <div key={index}>{b}</div>;
          })}
        </div>
      </div>
    );
  }
}

export default Algo;
