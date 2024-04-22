import Head from "next/head";
import React from "react";

const SiteLayout = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Head>
                <title>Helios - Your Gateway to Satellite Services</title>
            </Head>
            {children}
        </>
    );
}

export default SiteLayout;
