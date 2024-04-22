import React from 'react';

const HomePage = () => {
    return (
        <>
            <div style={styles.container}>
                <video autoPlay loop muted style={styles.videoBackground}>
                    <source src="/videos/satellite-orbit.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <header style={styles.header}>
                    <img src="/images/helios-logo.png" alt="Helios Logo" style={styles.logo} />
                </header>

                <div style={styles.heroContent}>
                    <p style={styles.detailText}>
                        Unlock the potential of satellite technology and expand your business reach with Helios, the premier digital marketplace for commercial satellite services.
                    </p>
                    <button style={styles.ctaButton}>Launch Your Project</button>
                    <button style={styles.learnMoreButton}>Orbit More Info</button>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden'
    },
    videoBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px'
    },
    logo: {
        height: '80px'
    },
    heroContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        fontSize: '20px',
        marginBottom: '20px',
        maxWidth: '600px',
        lineHeight: '1.5',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px'
    },
    ctaButton: {
        fontSize: '18px',
        padding: '10px 20px',
        backgroundColor: 'teal',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
        marginRight: '10px'
    },
    learnMoreButton: {
        fontSize: '18px',
        padding: '10px 20px',
        backgroundColor: 'gray',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer'
    }
};

export default HomePage;
