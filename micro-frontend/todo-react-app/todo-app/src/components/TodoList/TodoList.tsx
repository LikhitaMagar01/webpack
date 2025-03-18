import './TodoList.css';

interface ScheduleItemProps {
    time: string;
    title: string;
    description?: string;
    avatarUrls?: string[];
    isLoading?: boolean;
    stepNumber?: number; // Added to associate a step number with each item
}

const Stepper = ({ stepNumber }: { stepNumber: number }) => {
    return (
        <div className="stepper">
            <div className="step-circle">{stepNumber}</div>
        </div>
    );
};

const ScheduleItem = ({
    time,
    title,
    description,
    avatarUrls = [],
    isLoading = false,
    stepNumber,
}: ScheduleItemProps) => {
    return (
        <div className="schedule-item">
            <Stepper stepNumber={stepNumber as number} />
            <div className="schedule-line"></div>
            <div className="schedule-content">
                <div className="time">{time}</div>
                <div className="title">{title}</div>
                {description && <div className="description">{description}</div>}
                {(avatarUrls.length > 0 || isLoading) && (
                    <div className="avatar-section">
                        {isLoading ? (
                            <span className="loading-spinner">⏳</span>
                        ) : (
                            avatarUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Avatar ${index + 1}`}
                                    className="avatar"
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleItem;