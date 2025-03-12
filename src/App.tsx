import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchInput from './components/SearchInput';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        High-Performance Search
                    </h1>
                    <SearchInput/>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
