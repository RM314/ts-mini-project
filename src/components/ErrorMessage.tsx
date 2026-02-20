type Props = {
  error: string;
  onExit: () => void;
};

const ErrorMessage = ({ error, onExit } : Props) => {
    return (
        <div className="w-full h-16 from-red-50 to-red-100 border-l-4 border-red-500 rounded-md p-4 flex items-center shadow-sm">
            <span className="text-xl mr-3">❌</span>
            <p className="text-sm font-semibold text-red-800">{error}</p>
            <button
                className="ml-auto border border-red-500 text-red-500 px-3 py-1 rounded-md cursor-grabbing"
                onClick={onExit}
            >
                Dismiss
            </button>
        </div>
    )
}

export default ErrorMessage;