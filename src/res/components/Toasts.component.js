import React from 'react'

import locales from "../locale";

import Toast from 'react-bootstrap/Toast'

export default class Toasts extends React.Component {
    constructor(props) {
        super(props)

        var toastStatuses = { welcomeToast: true, cookieToast: true };
        if (localStorage.getItem("toastStatuses")) {
            toastStatuses = {
                ...toastStatuses,
                ...JSON.parse(localStorage.getItem("toastStatuses")),
            };
        }

        this.state = {
            toastStatuses
        }
    }
    render() {
        return (<div id="toastArea">
            <Toast
                show={this.state.toastStatuses.welcomeToast}
                onClose={() => {
                    var newStatuses = {
                        ...this.state.toastStatuses,
                        welcomeToast: false,
                    };
                    localStorage.setItem(
                        "toastStatuses",
                        JSON.stringify(newStatuses)
                    );
                    this.setState({ toastStatuses: newStatuses });
                }}
            >
                <Toast.Header>
                    <div style={{ width: "100%" }}>
                        {locales[this.props.lang].toasts.welcome.title}
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                            style={{ float: "right" }}
                        />
                    </div>
                </Toast.Header>
                <Toast.Body>
                    <p>
                        {
                            locales[this.props.lang].toasts.welcome
                                .paragraphs[0]
                        }
                    </p>
                    <p>
                        {
                            locales[this.props.lang].toasts.welcome
                                .paragraphs[1]
                        }
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        {
                            locales[this.props.lang].toasts.welcome
                                .paragraphs[2]
                        }
                    </p>
                </Toast.Body>
            </Toast>
            <Toast
                show={this.state.toastStatuses.cookieToast}
                onClose={() => {
                    var newStatuses = {
                        ...this.state.toastStatuses,
                        cookieToast: false,
                    };
                    localStorage.setItem(
                        "toastStatuses",
                        JSON.stringify(newStatuses)
                    );
                    this.setState({ toastStatuses: newStatuses });
                }}
            >
                <Toast.Header>
                    <div style={{ width: "100%" }}>
                        {locales[this.props.lang].toasts.cookie.title}
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded mr-2"
                            alt=""
                            style={{ float: "right" }}
                        />
                    </div>
                </Toast.Header>
                <Toast.Body>
                    <p>
                        {
                            locales[this.props.lang].toasts.cookie
                                .paragraphs[0]
                        }
                    </p>
                    <p>
                        {
                            locales[this.props.lang].toasts.cookie
                                .paragraphs[1]
                        }
                    </p>
                    <p style={{ marginBottom: 0 }}>
                        {
                            locales[this.props.lang].toasts.cookie
                                .paragraphs[2]
                        }
                    </p>
                </Toast.Body>
            </Toast>
        </div>)
    }
}