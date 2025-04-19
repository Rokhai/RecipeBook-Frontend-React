import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import api from '../../util/api'; // Import the API utility
function Home() {
    const [profile, setProfile] = React.useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/auth/profile');
                setProfile(response.data.user); // Set the user object from the response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1>Welcome to the Home Page</h1>
                <p>This is a protected route. You should be logged in to see this.</p>
                {profile ? (
                    <div>
                        <h2>User Profile</h2>
                        <p><strong>ID:</strong> {profile.id}</p>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Created At:</strong> {new Date(profile.createdAt).toLocaleString()}</p>
                        <p><strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}</p>
                        <p><strong>Active:</strong> {profile.isActive ? 'Yes' : 'No'}</p>
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </div>
        </div>
    );
}

export default Home;