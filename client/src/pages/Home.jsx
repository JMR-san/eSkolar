import { useState, useEffect } from "react";
import { ThemeToogle } from "../components/ThemeToogle"
import { SidePanel } from "../components/SidePanel"
import { MultiSteps } from "../components/MultiSteps"
import "./Home.css"
import { useNavigate } from "react-router-dom";

// connect the backend keys from the frontend key for the attributes
function mapToBackendKeys(formData) {
    return {
        // Personal Information
        age: formData.personal_information.age,
        citizenship: formData.personal_information.citizenship,
        residence: formData.personal_information.residence,
        is_physically_fit: formData.personal_information.is_physically_fit,
        // Academic Information
        incoming_year_level: formData.academic_information.incoming_year_level,
        graduation_year: formData.academic_information.graduation_year,
        curr_program: formData.academic_information.curr_program,
        curr_gwa: formData.academic_information.curr_gwa,
        is_good_moral: formData.academic_information.is_good_moral,
        has_other_scholarships: formData.academic_information.has_other_scholarships,
        current_shs_strand: formData.academic_information.current_shs_strand,
        top_graduating_class: formData.academic_information.top_graduating_class,
        no_below_225_major: formData.academic_information.no_below_225_major,
        no_below_250_minor: formData.academic_information.no_below_250_minor,
        regular_student: formData.academic_information.regular_student,
        no_failing_grade: formData.academic_information.no_failing_grade,
        // Social Information
        annual_household_income: formData.social_information.annual_household_income,
        is_working: formData.social_information.is_working,
    };
}

export const Home = () => {
    const [currentStepData, setCurrentStepData] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [allFormData, setAllFormData] = useState({
        personal_information: {},
        academic_information: {},
        social_information: {}
    });
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const navigate = useNavigate();

    const handleStepDataChange = (stepData, stepNumber, isFinalStep = false) => {
        setCurrentStepData(stepData);
        setCurrentStep(stepNumber);
        setAllFormData(prevData => {
            const newData = { ...prevData };
            if (stepNumber === 1) {
                newData.personal_information = stepData;
            } else if (stepNumber === 2) {
                newData.academic_information = stepData;
            } else if (stepNumber === 3) {
                newData.social_information = stepData;
            }
            return newData;
        });
        if (isFinalStep) {
            setShouldSubmit(true); // trigger submit in useEffect
        }
    };

    useEffect(() => {
        const BACKEND_URL =
            window.location.hostname === "localhost"
                ? "http://localhost:5000"
                : "https://eskolar.onrender.com";

        if (shouldSubmit) {
            fetch(`${BACKEND_URL}/match`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(allFormData)
            })
            .then(res => res.json())
            .then(results => {
                navigate("/results", { state: { results, userInputs: allFormData } });
            })
            .catch(err => {
                alert("Error connecting to backend: " + err);
            })
            .finally(() => setShouldSubmit(false));
        }
    }, [shouldSubmit, allFormData, navigate]);

    const sidePanelStyle = {
        width: '30%',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'hsl(var(--sidebar))',
        zIndex: 10,
        overflow: 'hidden',
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };
    const mainContentStyle = {
        marginLeft: '30%', // To prevent overlap with the fixed side panel
        flex: 1,
        padding: '2rem',
        position: 'relative',
        zIndex: 1,
    };

    return <div className="home-container">
        <div className="side-panel" style={sidePanelStyle}>
            <SidePanel />
        </div>
        <div className="main-content" style={mainContentStyle}>
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
                {/* <img src="/pylon.jpg" alt="Pylon" /> */}
            </div>
        </div>
    </div>
}