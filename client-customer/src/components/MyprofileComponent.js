import axios from "axios";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Myprofile extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: "",
      txtPassword: "",
      txtName: "",
      txtPhone: "",
      txtEmail: "",
    };
  }
  render() {
    if (this.context.token === "") return <Navigate replace to="/login" />;
    return (
      <div className="product-form">
        <h2 className="page-title">MY PROFILE</h2>
        <form className="product">
          <table className="login-form">
            <tbody className="login-cont">
              <tr className="login-fiel">
                <td className="login-title">Username</td>
                <td>
                  <input
                    className="login-input"
                    type="text"
                    value={this.state.txtUsername}
                    onChange={(e) => {
                      this.setState({ txtUsername: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr className="login-fiel">
                <td className="login-title">Password</td>
                <td>
                  <input
                    className="login-input"
                    type="password"
                    value={this.state.txtPassword}
                    onChange={(e) => {
                      this.setState({ txtPassword: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr className="login-fiel">
                <td className="login-title">Name</td>
                <td>
                  <input
                    className="login-input"
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr className="login-fiel">
                <td className="login-title">Phone</td>
                <td>
                  <input
                    className="login-input"
                    type="tel"
                    value={this.state.txtPhone}
                    onChange={(e) => {
                      this.setState({ txtPhone: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr className="login-fiel">
                <td className="login-title">Email</td>
                <td>
                  <input
                    className="login-input"
                    type="email"
                    value={this.state.txtEmail}
                    onChange={(e) => {
                      this.setState({ txtEmail: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="login-submit-btn"
                    onClick={(e) => this.btnUpdateClick(e)}
                  >
                    UPDATE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
  componentDidMount() {
    if (this.context.customer) {
      this.setState({
        txtUsername: this.context.customer.username,
        txtPassword: this.context.customer.password,
        txtName: this.context.customer.name,
        txtPhone: this.context.customer.phone,
        txtEmail: this.context.customer.email,
      });
    }
  }
  // event-handlers
  btnUpdateClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const customer = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
      };
      this.apiPutCustomer(this.context.customer._id, customer);
    } else {
      alert("Please input username and password and name and phone and email");
    }
  }
  // apis
  apiPutCustomer(id, customer) {
    const config = { headers: { "x-access-token": this.context.token } };
    axios.put("/api/customer/customers/" + id, customer, config).then((res) => {
      const result = res.data;
      if (result) {
        alert("CHANGES APPROVED!");
        this.context.setCustomer(result);
      } else {
        alert("CHANGES ARE NOT APPROVED!");
      }
    });
  }
}
export default Myprofile;
