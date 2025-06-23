import { useState } from "react";
import { ThemeToogle } from "../components/ThemeToogle"
import { SidePanel } from "../components/SidePanel"
import { MultiSteps } from "../components/MultiSteps"
import "./Home.css"

export const Home = () => {
    const [currentStepData, setCurrentStepData] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [allFormData, setAllFormData] = useState({
        PersonalInformation: {},
        AcademicInformation: {},
        SocialInformation: {}
    });

    const handleStepDataChange = (stepData, stepNumber) => {
        setCurrentStepData(stepData);
        setCurrentStep(stepNumber);
        
        // Store all form data
        setAllFormData(prevData => {
            const newData = { ...prevData };
            if (stepNumber === 1) {
                newData.PersonalInformation = stepData;
            } else if (stepNumber === 2) {
                newData.AcademicInformation = stepData;
            } else if (stepNumber === 3) {
                newData.SocialInformation = stepData;
            }
            return newData;
        });
        
        console.log('Step data received:', stepData);
        console.log('Current step:', stepNumber);
    };

    return <div className="home-container">
        <div className="side-panel">
            <SidePanel />
        </div>
        {/* Theme */}
        <div className="theme-toggle-container">
            <ThemeToogle />
        </div>
        
        {/* Test content to see dark mode */}
        <div className="test-content">
            
            <h1 className="test-title">Welcome to eSkolar</h1>
            <div>
                <MultiSteps onStepDataChange={handleStepDataChange} />
            </div>
            
            {/* Display current step data */}
            {currentStepData && (
                <div className="step-data-display">
                    <h3>Current Step {currentStep} Data:</h3>
                    <pre>{JSON.stringify(currentStepData, null, 2)}</pre>
                </div>
            )}
            
            {/* Display all form data */}
            <div className="all-form-data">
                <h3>All Form Data:</h3>
                <pre>{JSON.stringify(allFormData, null, 2)}</pre>
            </div>
        </div>

        {/* Background */}

        {/* Side Panel */}

        {/* Main Content */}

        {/* Footer */}
    </div>
}