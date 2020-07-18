import React from 'react';
import { FooterBg, FooterContent } from './styled';

const Footer = () => {
    return (
        <footer>
            <FooterBg>
                <div className="content">
                    <h2>Tran Hoang Minh</h2>
                    <p className="mb-0">Project Xedike</p>
                </div>
            </FooterBg>
            <FooterContent>
                <div className="container">
                    <ul className="clearfix">
                        <li>
                            <a href="https://www.linkedin.com/in/minh-tr%E1%BA%A7n-481b62146/">
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/minhth-1529?tab=repositories">
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </FooterContent>
        </footer>
    );
};

export default Footer;
