import React from 'react';
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to e-Shop',
    description: 'Top quality at a reasonable price',
    keywords: 'electronics, buy electronics, top quality',
}

export default Meta;