# for user-input

import pandas as pd
import sys
from typing import Dict, List, Any, Optional
from datetime import datetime

class ScholarshipMatcher:
    def __init__(self, file_path: str): 
        self.file_path = file_path #access file location
        self.scholarships = [] #store scholarship data
        self.user_data = {} #store user input
    
    #read scholarship -> dict; error handling also here
    def load_scholarships(self) -> bool:
        try:
            print("Loading scholarship data...")
            df = pd.read_csv(self.file_path)
            
            if df.empty:
                print("Error: The scholarship data file is empty.")
                return False
            
            self.scholarships = df.to_dict(orient='records')
            print(f"Successfully loaded {len(self.scholarships)} scholarships.")
            return True
            
        except FileNotFoundError:
            print(f"Error: Could not find the file '{self.file_path}'.")
            print("Please make sure the file exists and the path is correct.")
            return False
        except pd.errors.EmptyDataError:
            print("Error: The CSV file is empty or corrupted.")
            return False
        except pd.errors.ParserError as e:
            print(f"Error parsing CSV file: {e}")
            return False
        except Exception as e:
            print(f"Unexpected error loading scholarships: {e}")
            return False

    #converts percentage -> numerical (e.g. user inputs 95 -> 1.25)
    def converted_gwa(self, value: Any) -> float:
        try:
            if pd.isna(value) or value == "":
                return 5.0
            
            value = float(value)
            
            if value > 5.0:
                if value >= 97: return 1.0
                elif value >= 94: return 1.25
                elif value >= 91: return 1.50
                elif value >= 88: return 1.75
                elif value >= 85: return 2.0
                elif value >= 82: return 2.25
                elif value >= 79: return 2.50
                elif value >= 76: return 2.75
                elif value >= 75: return 3.0
                elif value >= 65: return 4.0
                else: return 5.0
            
            return max(1.0, min(5.0, value))
            
        except (ValueError, TypeError):
            print(f"Warning: Invalid GWA value '{value}', using 5.0 as default.")
            return 5.0

    #convert inputs such as "yes", "y", "true", "1" -> boolean (t/f)
    def to_bool(self, value: Any) -> bool:
        if pd.isna(value):
            return False
        return str(value).strip().lower() in ["yes", "y", "true", "1"]

    #convert values to lowercase (NaN included); to analyze errors early
    def safe_str(self, value: Any) -> str:
        """Safely convert value to lowercase string."""
        if pd.isna(value) or value is None:
            return ""
        return str(value).strip().lower()

    #checks the validity of user input
    def get_valid_input(self, prompt: str, input_type: type, validation_func=None) -> Any:
        while True:
            try:
                user_input = input(prompt).strip()
                
                if input_type == int:
                    value = int(user_input)
                    if validation_func and not validation_func(value):
                        continue
                    return value
                elif input_type == float:
                    value = float(user_input)
                    if validation_func and not validation_func(value):
                        continue
                    return value
                elif input_type == bool:
                    return user_input.lower() in ['y', 'yes', 'true', '1']
                else:
                    if validation_func and not validation_func(user_input):
                        continue
                    return user_input
                    
            except ValueError:
                print(f"Invalid input. Please enter a valid {input_type.__name__}.")
            except KeyboardInterrupt:
                print("\nOperation cancelled by user.")
                sys.exit(0)

    #insert user input and uses get_valid_input
    def get_user_input(self) -> bool:
        try:
            print("=" * 50)
            print("SCHOLARSHIP ELIGIBILITY CHECKER")
            print("=" * 50)
            print("Please enter your personal information:\n")
            
            self.user_data["age"] = self.get_valid_input(
                "Age: ", 
                int, 
                lambda x: 15 <= x <= 30 or print("Age should be between 15-30 years.")
            )
            
            self.user_data["citizenship"] = self.get_valid_input(
                "Citizenship: ", 
                str,
                lambda x: len(x) > 0 or print("Citizenship cannot be empty.")
            )
            
            self.user_data["residence"] = self.get_valid_input(
                "Current Residence (City and Province): ", 
                str,
                lambda x: len(x) > 0 or print("Residence cannot be empty.")
            )
            
            self.user_data["is_physically_fit"] = self.get_valid_input(
                "Are you physically fit and of good health? (y/n): ", 
                bool
            )

            year_levels = ["1st year", "2nd year", "3rd year", "4th year", "5th year", "graduate"]
            print(f"Available year levels: {', '.join(year_levels)}")
            self.user_data["incoming_year_level"] = self.get_valid_input(
                "Incoming year level: ", 
                str,
                lambda x: x.lower() in year_levels or print(f"Please enter one of: {', '.join(year_levels)}")
            )
            
            current_year = datetime.now().year
            self.user_data["graduation_year"] = self.get_valid_input(
                "Graduation Year: ", 
                str,
                lambda x: x.isdigit() and current_year <= int(x) <= current_year + 10 or print(f"Year should be between {current_year} and {current_year + 10}")
            )
            
            self.user_data["curr_program"] = self.get_valid_input(
                "Program You're Enrolling In/Currently Enrolled In: ", 
                str,
                lambda x: len(x) > 0 or print("Program cannot be empty.")
            )
            
            gwa_input = input("Latest General Weighted Average (GWA) or percentage: ")
            self.user_data["curr_gwa"] = self.converted_gwa(gwa_input)
            
            self.user_data["is_good_moral"] = self.get_valid_input(
                "Are you of good moral character? (y/n): ", 
                bool
            )
            
            self.user_data["has_other_scholarships"] = self.get_valid_input(
                "Are you a recipient of any other scholarships? (y/n): ", 
                bool
            )

            self.user_data["current_shs_strand"] = input("Current SHS Strand (if applicable): ").strip()
            
            self.user_data["top_graduating_class"] = self.get_valid_input(
                "If you are a Non-STEM student: Are you part of the top 5% of your graduating class? (y/n): ", 
                bool
            )

            self.user_data["no_below_225_major"] = not self.get_valid_input(
                "Do you have a grade lower than 2.25 in your major subjects? (y/n): ", 
                bool
            )
            
            self.user_data["no_below_250_minor"] = not self.get_valid_input(
                "Do you have a grade lower than 2.50 in your minor subjects? (y/n): ", 
                bool
            )
            
            self.user_data["regular_student"] = self.get_valid_input(
                "Are you currently a regular student? (y/n): ", 
                bool
            )
            
            self.user_data["no_failing_grade"] = not self.get_valid_input(
                "Do you have any failed, INC, dropped, or withdrawn final grades? (y/n): ", 
                bool
            )

            self.user_data["annual_household_income"] = self.get_valid_input(
                "Annual Joint Household Income (PHP): ", 
                int,
                lambda x: x >= 0 or print("Income cannot be negative.")
            )
            
            self.user_data["is_working"] = self.get_valid_input(
                "Are you a working student? (y/n): ", 
                bool
            )
            
            print("\nUser information collected successfully!")
            return True
            
        except Exception as e:
            print(f"Error collecting user input: {e}")
            return False

    #filters scholarships using linear search
    #how it works:
    #   goes through each scholarship from csv file
    #   checks user's input if it meets the requirements
    #   keeps scholarships that meet that match and skip that doesnt
    def filter_scholarships(self) -> List[Dict[str, Any]]:
        if not self.scholarships:
            print("No scholarships loaded.")
            return []
        
        filtered = []
        errors_count = 0

        print(f"\nFiltering {len(self.scholarships)} scholarships...")
        
        for i, scholarship in enumerate(self.scholarships):
            try:
                scholarship_name = self.safe_str(scholarship.get("scholarship_program", ""))
                #some scholarships has certain condition like sa age, since there's only 2 lang from th data, i specified it nalang.
                if scholarship_name == "original pilipino performing arts scholarship" and self.user_data["age"] < 16:
                    continue
                if scholarship_name == "nec foundation, inc." and self.user_data["age"] > 22:
                    continue

                age_limit = self.safe_str(scholarship.get("age", ""))
                if age_limit and age_limit not in ["", "any", "n/a", "nan"]:
                    try:
                        if self.user_data["age"] < float(age_limit):
                            continue
                    except ValueError:
                        pass

                required_citizenship = self.safe_str(scholarship.get("citizenship", "filipino"))
                if required_citizenship != "any" and required_citizenship != self.user_data["citizenship"].lower():
                    continue

                residence = self.safe_str(scholarship.get("residence", ""))
                if residence and residence not in ["", "any", "n/a", "nan"]:
                    user_residence = self.user_data["residence"].lower()
                    if residence not in user_residence and user_residence not in residence:
                        continue

                physically_fit = self.safe_str(scholarship.get("physically_fit", ""))
                if physically_fit and physically_fit not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(physically_fit) and not self.user_data["is_physically_fit"]:
                        continue

                strand = self.safe_str(scholarship.get("current_shs_strand", ""))
                if strand and strand not in ["", "any", "n/a", "nan"]:
                    if strand != self.user_data["current_shs_strand"].lower():
                        continue

                top_grad = self.safe_str(scholarship.get("top_graduating_class", ""))
                if top_grad and top_grad not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(top_grad) and not self.user_data["top_graduating_class"]:
                        continue

                year_levels = self.safe_str(scholarship.get("incoming_year_level", ""))
                if year_levels and year_levels not in ["", "any", "n/a", "nan"]:
                    allowed_levels = [level.strip().lower() for level in year_levels.split(",")]
                    if self.user_data["incoming_year_level"].lower() not in allowed_levels:
                        continue

                grad_year = self.safe_str(scholarship.get("graduation_year", ""))
                if grad_year and grad_year not in ["", "any", "n/a", "nan"]:
                    if str(self.user_data["graduation_year"]) != grad_year:
                        continue

                prio_programs = self.safe_str(scholarship.get("priority_programs", ""))
                if prio_programs and prio_programs not in ["", "any", "n/a", "nan"]:
                    programs = [p.strip().lower() for p in prio_programs.split(",")]
                    user_program = self.user_data["curr_program"].lower()
                    if not any(prog in user_program or user_program in prog for prog in programs):
                        continue

                min_gwa = self.safe_str(scholarship.get("gwa_numerical", ""))
                if min_gwa and min_gwa not in ["n/a", "any", "", "nan"]:
                    try:
                        if self.user_data["curr_gwa"] > float(min_gwa):
                            continue
                    except ValueError:
                        pass

                if self.to_bool(self.safe_str(scholarship.get("good_moral", "yes"))):
                    if not self.user_data["is_good_moral"]:
                        continue

                if self.to_bool(self.safe_str(scholarship.get("no_other_scholarships", "no"))):
                    if self.user_data["has_other_scholarships"]:
                        continue

                major_grade = self.safe_str(scholarship.get("no_below_225_major", ""))
                if major_grade and major_grade not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(major_grade) and not self.user_data["no_below_225_major"]:
                        continue

                minor_grade = self.safe_str(scholarship.get("no_below_250_minor", ""))
                if minor_grade and minor_grade not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(minor_grade) and not self.user_data["no_below_250_minor"]:
                        continue

                reg_student = self.safe_str(scholarship.get("regular_student", ""))
                if reg_student and reg_student not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(reg_student) and not self.user_data["regular_student"]:
                        continue

                failed = self.safe_str(scholarship.get("no_failing_grade", ""))
                if failed and failed not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(failed) and not self.user_data["no_failing_grade"]:
                        continue

                max_income = self.safe_str(scholarship.get("annual_household_income", "")).replace(",", "")
                if max_income and max_income not in ["", "any", "n/a", "nan"]:
                    try:
                        if self.user_data["annual_household_income"] > int(max_income):
                            continue
                    except ValueError:
                        pass

                not_working = self.safe_str(scholarship.get("not_a_working_student", ""))
                if not_working and not_working not in ["", "any", "n/a", "nan"]:
                    if self.to_bool(not_working) and self.user_data["is_working"]:
                        continue

                filtered.append(scholarship)

            except Exception as e:
                errors_count += 1
                print(f"Error processing scholarship {i+1}: {e}")
                continue

        if errors_count > 0:
            print(f"Warning: {errors_count} scholarships had processing errors.")
        
        print(f"Found {len(filtered)} matching scholarships.")
        return filtered

    #sorts scholarships by name and lists it alphabetically (automatic) since naka-1NF na
    def sort_scholarships(self, scholarships: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        def binary_insert(sorted_list, item):
            """Insert item into sorted_list using binary search to find the correct position."""
            left, right = 0, len(sorted_list) - 1
            key = self.safe_str(item.get('scholarship_program', ''))

            while left <= right:
                mid = (left + right) // 2
                mid_key = self.safe_str(sorted_list[mid].get('scholarship_program', ''))

                if key < mid_key:
                    right = mid - 1
                else:
                    left = mid + 1

            sorted_list.insert(left, item)

        sorted_scholarships = []
        for scholarship in scholarships:
            binary_insert(sorted_scholarships, scholarship)
        
        return sorted_scholarships

    #format: scholarship name, dl date of scholarship, gwa (if meron), and income requirement (if meron)
    def display_results(self, scholarships: List[Dict[str, Any]]) -> None:
        if not scholarships:
            print("\n" + "=" * 50)
            print("NO MATCHING SCHOLARSHIPS FOUND")
            print("=" * 50)
            print("Unfortunately, no scholarships match your current criteria.")
            print("Consider:")
            print("- Improving your GWA")
            print("- Checking if you meet all requirements")
            print("- Looking for scholarships with different criteria")
            return

        print("\n" + "=" * 80)
        print(f"MATCHING SCHOLARSHIPS ({len(scholarships)} found)")
        print("=" * 80)
        
        for i, scholarship in enumerate(scholarships, 1):
            name = scholarship.get('scholarship_program', 'Unknown')
            deadline = scholarship.get('application_deadline', 'Not specified')
            
            print(f"{i:2d}. {name}")
            print(f"    Deadline: {deadline}")
            
            gwa_req = scholarship.get('gwa_numerical', '')
            if pd.notna(gwa_req) and str(gwa_req).lower() not in ['n/a', 'any', '', 'nan']:
                print(f"    GWA Requirement: {gwa_req} or better")

            income_req = scholarship.get('annual_household_income', '')
            if pd.notna(income_req) and str(income_req).lower() not in ['n/a', 'any', '', 'nan']:
                print(f"    Max Household Income: PHP {income_req}")

            print()

    #will ask again if sort w/ new info or exit program
    def ask_continue(self) -> bool:
        print("\n" + "=" * 50)
        print("What would you like to do next?")
        print("1. Search again with new information")
        print("2. Exit Program")
        
        choice = self.get_valid_input(
            "Enter your choice (1-2): ", 
            str,
            lambda x: x in ['1', '2'] or print("Please enter 1 or 2")
        )
        
        if choice == '1':
            self.user_data = {}
            return True
        else:
            return False

    #main loop of the system (loads data, collects data of user, filter/sort scholarships,
    # shows results and asks user what to do after)
    def run(self) -> None:
        try:
            print("Starting Scholarship Matching System...")
            
            if not self.load_scholarships():
                return
            
            while True:
                if not self.user_data:
                    if not self.get_user_input():
                        return
                
                matching_scholarships = self.filter_scholarships()
                
                if matching_scholarships:
                    sorted_scholarships = self.sort_scholarships(matching_scholarships)
                    self.display_results(sorted_scholarships)
                else:
                    self.display_results([])
                
                if not self.ask_continue():
                    print("\nThank you for using the Scholarship Matching System!")
                    print("Good luck with your scholarship applications!")
                    break
                    
        except KeyboardInterrupt:
            print("\n\nProgram interrupted by user. Goodbye!")
        except Exception as e:
            print(f"\nUnexpected error: {e}")
            print("Please try running the program again.")

#loads file and run
def main():
    file_path = "Backend/Data/scholarships_data - 1NF.csv"
    matcher = ScholarshipMatcher(file_path)
    matcher.run()

if __name__ == "__main__":
    main()