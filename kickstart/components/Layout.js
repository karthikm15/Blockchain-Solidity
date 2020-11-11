// If put this inside pages, then it will assume that it is another page that the user needs to go to
// Use this so that can add headers to every single page at the top

import React from 'react';
import {Container} from 'semantic-ui-react'; // in order to add whitespace to left and right of website
import Head from 'next/head'; 
import Header from './Header';

// Want Campaign List to be a child of Layout along with header and footer
// Adding the link so that will get CSS styling using semantic-ui
// No <Head Component> in new.js so have to import it
export default props => {
    return (
        <Container>
            <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossOrigin="anonymous" />
            <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha256-t8GepnyPmw9t+foMh3mKNvcorqNHamSKtKRxxpUEgFI=" crossOrigin="anonymous"></script>
            <script src="/assets/application.js" ></script>
            </Head>
            
            <Header />
            {props.children}
        </Container>
    )
};