import { Contact, GraduationCap, Users } from "lucide-react";
import { useState } from "react";

const PersonalInformation = ({ formData, onChange }) => {
    return (
        <div className="step-form">
            <h2>Personal Information</h2>
            <div className="form-group">
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.PersonalInformation.age}
                    onChange={onChange}
                    placeholder="Enter your age"
                />
            </div>
            <div className="form-group">
                <label>Citizenship:</label>
                <input
                    type="text"
                    name="citizenship"
                    value={formData.PersonalInformation.citizenship}
                    onChange={onChange}
                    placeholder="Enter your citizenship"
                />
            </div>
            <div className="form-group">
                <label>Current Residence (City and Province):</label>
                <input
                    type="text"
                    name="residence"
                    value={formData.PersonalInformation.residence}
                    onChange={onChange}
                    placeholder="Enter your current residence"
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isGoodHealth"
                        checked={formData.PersonalInformation.isGoodHealth}
                        onChange={onChange}
                    />
                    Are you physically fit and of good health?
                </label>
            </div>
        </div>
    );
};

const AcademicInformation = ({ formData, onChange }) => {
    return (
        <div className="step-form">
            <h2>Academic Information</h2>
            <div className="form-group">
                <label>Year Level:</label>
                <select
                    name="yearLevel"
                    value={formData.AcademicInformation.yearLevel}
                    onChange={onChange}
                >
                    <option value="">Select Year Level</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>
            </div>
            <div className="form-group">
                <label>Expected Graduation Year:</label>
                <input
                    type="number"
                    name="gradYear"
                    value={formData.AcademicInformation.gradYear}
                    onChange={onChange}
                    placeholder="e.g., 2025"
                />
            </div>
            <div className="form-group">
                <label>Program/Course:</label>
                <input
                    type="text"
                    name="program"
                    value={formData.AcademicInformation.program}
                    onChange={onChange}
                    placeholder="Enter your program/course"
                />
            </div>
            <div className="form-group">
                <label>GWA (General Weighted Average):</label>
                <input
                    type="number"
                    name="gwa"
                    value={formData.AcademicInformation.gwa}
                    onChange={onChange}
                    placeholder="e.g., 1.25"
                    step="0.01"
                    min="1.0"
                    max="5.0"
                />
            </div>
            <div className="form-group">
                <label>Current Strand (if applicable):</label>
                <input
                    type="text"
                    name="currStrand"
                    value={formData.AcademicInformation.currStrand}
                    onChange={onChange}
                    placeholder="Enter your current strand"
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isGoodMoral"
                        checked={formData.AcademicInformation.isGoodMoral}
                        onChange={onChange}
                    />
                    Do you have good moral character?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isOtherScholar"
                        checked={formData.AcademicInformation.isOtherScholar}
                        onChange={onChange}
                    />
                    Are you currently receiving other scholarships?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isTopStudent"
                        checked={formData.AcademicInformation.isTopStudent}
                        onChange={onChange}
                    />
                    Are you a top student in your class?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isLowMajorGrade"
                        checked={formData.AcademicInformation.isLowMajorGrade}
                        onChange={onChange}
                    />
                    Do you have low grades in major subjects?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isLowMinorGrade"
                        checked={formData.AcademicInformation.isLowMinorGrade}
                        onChange={onChange}
                    />
                    Do you have low grades in minor subjects?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isRegular"
                        checked={formData.AcademicInformation.isRegular}
                        onChange={onChange}
                    />
                    Are you a regular student?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isBadGrade"
                        checked={formData.AcademicInformation.isBadGrade}
                        onChange={onChange}
                    />
                    Do you have any failing grades?
                </label>
            </div>
        </div>
    );
};

const SocialInformation = ({ formData, onChange }) => {
    return (
        <div className="step-form">
            <h2>Social Information</h2>
            <div className="form-group">
                <label>Annual Household Income:</label>
                <input
                    type="number"
                    name="annualHouseIncome"
                    value={formData.SocialInformation.annualHouseIncome}
                    onChange={onChange}
                    placeholder="Enter annual household income"
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="isWorking"
                        checked={formData.SocialInformation.isWorking}
                        onChange={onChange}
                    />
                    Are you currently working?
                </label>
            </div>
        </div>
    );
};

export const MultiSteps = ({ onStepDataChange }) => {
    const [formData, setFormData] = useState({
        PersonalInformation: {
            age: '',
            citizenship: '',
            residence: '',
            isGoodHealth: false
        },
        AcademicInformation: {
            yearLevel: '',
            gradYear: '',
            program: '',
            gwa: '',
            isGoodMoral: false,
            isOtherScholar: false,
            currStrand: '',
            isTopStudent: false,
            isLowMajorGrade: false,
            isLowMinorGrade: false,
            isRegular: false,
            isBadGrade: false
        },
        SocialInformation: {
            annualHouseIncome: '',
            isWorking: false
        }
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setFormData(prevData => {
            let newData;
            
            if (currentStep === 1) {
                newData = {
                    ...prevData,
                    PersonalInformation: {
                        ...prevData.PersonalInformation,
                        [name]: fieldValue
                    }
                };
            } else if (currentStep === 2) {
                newData = {
                    ...prevData,
                    AcademicInformation: {
                        ...prevData.AcademicInformation,
                        [name]: fieldValue
                    }
                };
            } else if (currentStep === 3) {
                newData = {
                    ...prevData,
                    SocialInformation: {
                        ...prevData.SocialInformation,
                        [name]: fieldValue
                    }
                };
            }
            
            // Pass the updated data back to parent component
            if (onStepDataChange) {
                if (currentStep === 1) {
                    onStepDataChange(newData.PersonalInformation, currentStep);
                } else if (currentStep === 2) {
                    onStepDataChange(newData.AcademicInformation, currentStep);
                } else if (currentStep === 3) {
                    onStepDataChange(newData.SocialInformation, currentStep);
                }
            }
            
            return newData;
        });
    };

    const nextStep = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInformation formData={formData} onChange={handleInputChange} />;
            case 2:
                return <AcademicInformation formData={formData} onChange={handleInputChange} />;
            case 3:
                return <SocialInformation formData={formData} onChange={handleInputChange} />;
            default:
                return <PersonalInformation formData={formData} onChange={handleInputChange} />;
        }
    };

    return (
        <div className="multi-steps-container">
            <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}><Contact /> Personal</div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}><GraduationCap /> Academic</div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}><Users /> Social</div>
            </div>
            
            {renderStep()}
            
            <div className="step-navigation">
                {currentStep > 1 && (
                    <button onClick={prevStep} className="btn-prev">
                        Previous
                    </button>
                )}
                {currentStep < 3 && (
                    <button onClick={nextStep} className="btn-next">
                        Next
                    </button>
                )}
                {currentStep === 3 && (
                    <button onClick={() => console.log('Form submitted:', formData)} className="btn-submit">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};