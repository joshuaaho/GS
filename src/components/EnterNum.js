import React, { Component } from "react";

class EnterNum extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="m-3">Project of Ho Joshua, HKU</div>
          <div className="m-3">
            Gale–Shapley algorithm : It establishes a system by which everyone
            is able to find the person they most prefer from among those who
            prefer them. It takes as input equal numbers of two types of
            participants (n men and n women, or n medical students and n
            internships, for example), and an ordering for each participant
            giving their preference for whom to be matched to among the
            participants of the other type. A stable matching always exists, and
            the algorithmic problem solved by the Gale–Shapley algorithm is to
            find one. A matching is not stable if: There is an element A of the
            first matched set which prefers some given element B of the second
            matched set over the element to which A is already matched, and B
            also prefers A over the element to which B is already matched. In
            other words, a matching is stable when there is no pair (A, B) where
            both participants prefer each other to their matched partners.
          </div>
        </div>
        <form
          onSubmit={this.props.handleSubmit}
          className="col-lg-6 offset-lg-3 "
        >
          <label className="ms-2 me-3 border-dark rounded-pill bg-primary text-white">
            No. of players in each side{" "}
          </label>
          <input className="me-2" type="text" onChange={this.props.onChange} />
          <input type="submit" className="btn btn-primary" />
        </form>
        <label className="text-danger mt-3 ms-3 ">
          Note: I have made the max size to be 20 for simplicity
        </label>
      </div>
    );
  }
}

export default EnterNum;
