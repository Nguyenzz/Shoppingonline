import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";
import Menu from "./MenuComponent";

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    return (
      <div className="navbar-home">
        <img
          className="navbar-logo"
          src="https://tse1.mm.bing.net/th?id=OIP.aW24P7nIKX_E_WXJzrlR9gHaCU&pid=Api&P=0&h=180"
          alt=""
        ></img>
        <Menu></Menu>
        <div className="navbar-right">
          {this.context.token === "" ? (
            <>
              <Link className="navbar-right-item" to="/login">
                Login
              </Link>
              <Link className="navbar-right-item" to="/signup">
                Sign-up
              </Link>
              <Link className="navbar-right-item" to="/active">
                Active
              </Link>
            </>
          ) : (
            <div className="infor-user">
              <div className="user-items">
                <Link className="user-item" to="/myprofile">
                  My profile
                </Link>
                <Link className="user-item" to="/myorders">
                  My orders
                </Link>
              </div>
              <div className="user-items">
                <Link className="user-item" to="/mycart">
                  My cart
                </Link>
              </div>
              <div className="user-items">
                <p className="user-name">Hello {this.context.customer.name}</p>
                <Link
                  className="user-item"
                  to="/home"
                  onClick={() => this.lnkLogoutClick()}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}
export default Inform;
