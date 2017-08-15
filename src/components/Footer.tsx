import * as React from 'react';

export default function () {
    let year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container">
                <div className="content has-text-centered">
                    <p>
                        © {year} Copyright lxzxl
                        <a className="icon" href="https://github.com/lxzxl/bookmars-react">
                        <i className="fa fa-github"/>
                    </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
