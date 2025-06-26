import { Contact, GraduationCap, Users } from "lucide-react";
import { useState } from "react";

const PROGRAM_OPTIONS = [
    "Bachelor in Advertising and Public Relations (BADPR)",
    "Bachelor of Arts in Broadcasting (BABR or BA Broadcasting)",
    "Bachelor of Arts in Communication Research (BACR)",
    "Bachelor of Arts in English Language Studies (ABELS)",
    "Bachelor of Arts in Filipinology (ABF)",
    "Bachelor of Arts in History (BAH)",
    "Bachelor of Arts in International Studies (BAIS)",
    "Bachelor of Arts in Literary and Cultural Studies (ABLCS)",
    "Bachelor of Arts in Philosophy (AB-PHILO)",
    "Bachelor of Arts in Political Economy (BAPE)",
    "Bachelor of Arts in Political Science (BAPS)",
    "Bachelor of Arts in Sociology (BAS)",
    "Bachelor of Performing Arts major in Theater Arts (BPEA)",
    "Bachelor of Physical Education (BPE)",
    "Bachelor of Public Administration (BPA)",
    "Bachelor of Science in Accountancy (BSA)",
    "Bachelor of Science in Applied Mathematics (BSAPMATH)",
    "Bachelor of Science in Architecture (BS-ARCH)",
    "Bachelor of Science in Biology (BSBIO)",
    "Bachelor of Science in Business Administration major in Financial Management (BSBAFM)",
    "Bachelor of Science in Business Administration major in Human Resource Management (BSBAHRM)",
    "Bachelor of Science in Business Administration major in Marketing Management (BSBAMM)",
    "Bachelor of Science in Chemistry (BSCHEM)",
    "Bachelor of Science in Civil Engineering (BSCE)",
    "Bachelor of Science in Computer Engineering (BSCpE)",
    "Bachelor of Science in Computer Science (BSCS)",
    "Bachelor of Science in Cooperatives (BSC)",
    "Bachelor of Science in Economics (BSE)",
    "Bachelor of Science in Electrical Engineering (BSEE)",
    "Bachelor of Science in Electronics Engineering (BSECE)",
    "Bachelor of Science in Environmental Planning (BSEP)",
    "Bachelor of Science in Exercises and Sports Sciences (BSESS)",
    "Bachelor of Science in Food Technology (BSFT)",
    "Bachelor of Science in Hospitality Management (BSHM)",
    "Bachelor of Science in Industrial Engineering (BSIE)",
    "Bachelor of Science in Information Technology (BSIT)",
    "Bachelor of Science in Interior Design (BSID)",
    "Bachelor of Science in Management Accounting (BSMA)",
    "Bachelor of Science in Mathematics (BSMATH)",
    "Bachelor of Science in Mechanical Engineering (BSME)",
    "Bachelor of Science in Nutrition and Dietetics (BSND)",
    "Bachelor of Science in Office Administration (BSOA)",
    "Bachelor of Science in Physics (BSPHY)",
    "Bachelor of Science in Psychology (BSPSY)",
    "Bachelor of Science in Railway Engineering (BSRE)",
    "Bachelor of Science in Statistics (BSSTAT)",
    "Bachelor of Science in Tourism Management (BSTM)",
    "Bachelor of Science in Transportation Management (BSTRM)",
    "Bachelor of Secondary Education (BSEd) major in English",
    "Bachelor of Secondary Education (BSEd) major in Mathematics",
    "Bachelor of Secondary Education (BSEd) major in Science",
    "Bachelor of Secondary Education (BSEd) major in Filipino",
    "Bachelor of Secondary Education (BSEd) major in Social Studies",
    "Bachelor of Elementary Education (BEEd)",
    "Bachelor of Early Childhood Education (BECEd)",
    "Bachelor of Library and Information Science (BLIS)",
    "Bachelor of Technology and Livelihood Education (BTLEd) major in Home Economics",
    "Bachelor of Technology and Livelihood Education (BTLEd) major in Industrial Arts",
    "Bachelor of Technology and Livelihood Education (BTLEd) major in Information and Communication Technology",
    "Bachelor of Science in Entrepreneurship (BSENTREP)"
];

const GWA_OPTIONS = [
    "1.00", "1.25", "1.5", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00"
];

const STRAND_OPTIONS = [
    "Science, Technology, Engineering, and Mathematics (STEM)",
    "Accountancy, Business and Management (ABM)",
    "Humanities and Social Sciences (HUMSS)",
    "General Academic Strand (GAS)",
    "Others",
    "n/a"
];

// const ANNUAL_INCOME_OPTIONS = [
//     "Below ₱200,000",
//     "₱200,001 – ₱250,000",
//     "₱250,001 – ₱300,000",
//     "₱300,001 – ₱350,000",
//     "₱350,001 – ₱400,000",
//     "₱400,001 – ₱600,000",
//     "Above ₱600,000"
// ];

const PersonalInformation = ({ formData, onChange }) => {
    return (
        <div className="step-form">
            <h2>Personal Information</h2>
            <div className="form-group">
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.personal_information.age}
                    onChange={onChange}
                    placeholder="Enter your age"
                />
            </div>
            <div className="form-group">
                <label>Citizenship:</label>
                <input
                    type="text"
                    name="citizenship"
                    value={formData.personal_information.citizenship}
                    onChange={onChange}
                    placeholder="Enter your citizenship"
                />
            </div>
            <div className="form-group">
                <label>Current Residence (City, Province):</label>
                <input
                    type="text"
                    name="residence"
                    value={formData.personal_information.residence}
                    onChange={onChange}
                    placeholder="Enter your current residence"
                />
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="is_physically_fit"
                        checked={formData.personal_information.is_physically_fit}
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
                    name="incoming_year_level"
                    value={formData.academic_information.incoming_year_level}
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
                    name="graduation_year"
                    value={formData.academic_information.graduation_year}
                    onChange={onChange}
                    placeholder="e.g., 2025"
                />
            </div>
            <div className="form-group">
                <label>Program/Course:</label>
                <select
                    name="curr_program"
                    value={formData.academic_information.curr_program}
                    onChange={onChange}
                >
                    <option value="">Select Program/Course</option>
                    {PROGRAM_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>GWA (General Weighted Average):</label>
                <input
                    list="gwa-options"
                    // type="number"
                    name="curr_gwa"
                    value={formData.academic_information.curr_gwa}
                    onChange={onChange}
                    placeholder="e.g., 1.25 or text"
                />
                <datalist id="gwa-options">
                    {GWA_OPTIONS.map(option => (
                        <option key={option} value={option} />
                    ))}
                </datalist>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="is_good_moral"
                        checked={formData.academic_information.is_good_moral}
                        onChange={onChange}
                    />
                    Do you have good moral character?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="has_other_scholarships"
                        checked={formData.academic_information.has_other_scholarships}
                        onChange={onChange}
                    />
                    Are you currenlty receiving other scholarships?
                </label>
            </div>
            <h3>If currently a Senior High School Student:</h3>
            <div className="form-group">
                <label>Current Strand (if applicable):</label>
                <select
                    name="current_shs_strand"
                    value={formData.academic_information.current_shs_strand}
                    onChange={onChange}
                >
                    <option value="">Select Current Strand</option>
                    {STRAND_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="top_graduating_class"
                        checked={formData.academic_information.top_graduating_class}
                        onChange={onChange}
                    />
                    If you are a Non-STEM student: Are you part of the top 5% of your graduating class?
                </label>
            </div>
            <h3>If currently a College Student:</h3>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="no_below_225_major"
                        checked={formData.academic_information.no_below_225_major}
                        onChange={onChange}
                    />
                    Do not have a grade lower than 2.25 in your major subjects?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="no_below_250_minor"
                        checked={formData.academic_information.no_below_250_minor}
                        onChange={onChange}
                    />
                    Do not have a grade lower than 2.50 in your minor subjects?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="regular_student"
                        checked={formData.academic_information.regular_student}
                        onChange={onChange}
                    />
                    Are you currently a regular student?
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="no_failing_grade"
                        checked={formData.academic_information.no_failing_grade}
                        onChange={onChange}
                    />
                    Do not have any failed, INC, dropped, or withdrawn final grades?
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
                type="text"
                name="annual_household_income"
                value={formData.social_information.annual_household_income}
                onChange={onChange}
                placeholder="Household Income"/>
                {/* <select
                    name="annual_household_income"
                    value={formData.social_information.annual_household_income}
                    onChange={onChange}
                >
                    <option value="">Select Annual Household Income</option>
                    {ANNUAL_INCOME_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select> */}
            </div>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="is_working"
                        checked={formData.social_information.is_working}
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
        personal_information: {
            age: '',
            citizenship: '',
            residence: '',
            is_physically_fit: false
        },
        academic_information: {
            incoming_year_level: '',
            graduation_year: '',
            curr_program: '',
            curr_gwa: '',
            is_good_moral: false,
            has_other_scholarships: false,
            current_shs_strand: '',
            top_graduating_class: false,
            no_below_225_major: false,
            no_below_250_minor: false,
            regular_student: false,
            no_failing_grade: false
        },
        social_information: {
            annual_household_income: '',
            is_working: false
        }
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        let newData;
        if (currentStep === 1) {
            newData = {
                ...formData,
                personal_information: {
                    ...formData.personal_information,
                    [name]: fieldValue
                }
            };
        } else if (currentStep === 2) {
            newData = {
                ...formData,
                academic_information: {
                    ...formData.academic_information,
                    [name]: fieldValue
                }
            };
        } else if (currentStep === 3) {
            newData = {
                ...formData,
                social_information: {
                    ...formData.social_information,
                    [name]: fieldValue
                }
            };
        }
        setFormData(newData);
        // Call the callback after state update
        if (onStepDataChange) {
            if (currentStep === 1) {
                onStepDataChange(newData.personal_information, currentStep);
            } else if (currentStep === 2) {
                onStepDataChange(newData.academic_information, currentStep);
            } else if (currentStep === 3) {
                onStepDataChange(newData.social_information, currentStep);
            }
        }
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

    const handleSubmit = () => {
        // Implement form submission logic
        console.log('Form submitted:', formData);
        onStepDataChange(formData.social_information, currentStep, true);
    };

    return (
        <div className="multi-steps-container">
            <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <Contact size={24}  className="icon-color"/>
                  <span>Personal</span>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <GraduationCap size={24} className="icon-color"/>
                  <span>Academic</span>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <Users size={24} className="icon-color"/>
                  <span>Social</span>
                </div>
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
                    <button onClick={handleSubmit} className="btn-submit">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};