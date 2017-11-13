import * as React from 'react';
import * as Icons from 'react-feather';

export default function() {
    let year = new Date().getFullYear();
    return (
        <footer className="Footer footer">
            <div className="container">
                <div className="content ">
                    <p className="flex-center">
                        © {year} Copyright lxzxl
                        <a className="icon" href="https://github.com/lxzxl/bookmarks-react" target="_blank">
                            <Icons.Github size={16}/>
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
