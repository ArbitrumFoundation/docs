import React from 'react';

export const TrackedLink = ({href, children, trackedEvent}) => {
    function onClick() {
        if (trackedEvent) {
            // @ts-ignore - fathom is added by docusaurus config
            fathom.trackEvent(trackedEvent)
        }
    }
    return <a href={href} onClick={onClick}>{children}</a>;
};
