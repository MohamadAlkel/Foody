import React from 'react';
import ContentLoader from 'react-content-loader';
import { Card, CardColumns } from 'reactstrap';

const LoaderRecipe = () => 
  <div className="topSpace">
  <div className=" pt-0">
        <ContentLoader className=" profilePageLoaderMe m-auto">
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>

    
    </div>

   <CardColumns  className="cardStyleLoader">
        <Card  className="cardloader">
            <ContentLoader className="profilePageLoaderTwo">
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="8" rx="4" ry="4" width="300" height="16" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="12" />
            </ContentLoader>

            <ContentLoader className="imgLoader m-auto">
                <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
            </ContentLoader>
        </Card>

        <Card  className="cardloader">
            <ContentLoader className="profilePageLoaderTwo">
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="8" rx="4" ry="4" width="300" height="16" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="12" />
            </ContentLoader>
            <ContentLoader className=" imgLoader m-auto">
                <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
            </ContentLoader>
        </Card>

        <Card  className="cardloader">
            <ContentLoader className="profilePageLoaderTwo">
                <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                <rect x="80" y="8" rx="4" ry="4" width="300" height="16" />
                <rect x="80" y="40" rx="3" ry="3" width="250" height="12" />
            </ContentLoader>

            <ContentLoader className=" imgLoader m-auto">
                <rect x="0" y="0" rx="10" ry="10" width="100%" height="100%" />
            </ContentLoader>
        </Card>

   </CardColumns>

  </div>

export default LoaderRecipe;