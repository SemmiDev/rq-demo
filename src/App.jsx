import { useQuery } from 'react-query';
import Login from './pages/new-user';
import { API_URL } from './env';

const getUsersHandler = async () => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

function App() {
    const { data, isError, isLoading, isFetching, isSuccess, error } = useQuery(
        'users',
        getUsersHandler,
        {
            // staleTime: 5000, // durasi data di cache (sampai dianggap usang)
        }
    );

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-200'>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-6'>
                    <Login />
                </div>
                <div className='col-span-6'>
                    <div className='flex flex-col gap-2'>
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>{error.message}</p>}
                        {isSuccess && (
                            <div>
                                <p>Users</p>
                                <ul>
                                    {data.map((user) => (
                                        <li key={user.id}>{user.email}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
