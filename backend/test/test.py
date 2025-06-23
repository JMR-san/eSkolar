import pandas as pd

def load_scholarships(file_path): 
    df = pd.read_csv(file_path)
    return df.to_dict(orient='records')

def converted_gwa(value):
    try:
        value = float(value)
    except ValueError:
        return 5.0
    
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
    return value

def to_bool(value):
    return str(value).strip().lower() in ["yes", "y", "true", "1"]

def safe_str(value):
    return str(value if pd.notna(value) else "").strip().lower()

def get_user_input():
    print("Enter your Personal Information\n")
    user = {}
    
    user["age"] = int(input("Age: "))
    user["citizenship"] = input("What is your citizenship? ").strip()
    user["residence"] = input("Current Residence (City and Province): ").strip()
    user["is_physically_fit"] = input("Are you physically fit and of good health? ").lower() == 'y'

    user["incoming_year_level"] = input("Incoming year level: ").strip()
    user["graduation_year"] = input("Graduation Year: ").strip()
    user["curr_program"] = input("Program You're Enrolling In/Currently Enrolled In: ").strip()
    user["curr_gwa"] = converted_gwa(input("Latest General Weighted Average (GWA): "))
    user["is_good_moral"] = input("Are you of good moral character? ").lower() == 'y'
    user["has_other_scholarships"] = input("Are you a recipient of any other scholarships? ").lower() == 'y'

    user["current_shs_strand"] = input("Current SHS Strand: ").strip()
    user["top_graduating_class"] = input("If you are a Non-STEM student: Are you part of the top 5% of your graduating class? ").lower() == 'y'

    user["no_below_225_major"] = input("Do you have a grade lower than 2.25 in your major subjects? ").lower() == 'y'
    user["no_below_250_minor"] = input("Do you have a grade lower than 2.50 in your minor subjects? ").lower() == 'y'
    user["regular_student"] = input("Are you currently a regular student? ").lower() == 'y'
    user["no_failing_grade"] = input("Do you have any failed, INC, dropped, or withdrawn final grades? ").lower() == 'y'

    user["annual_household_income"] = int(input("Annual Joint Household Income: "))
    user["is_working"] = input("Are you a working student? ").lower() == 'y'
    
    return user

def filter_scholarships(user, scholarships):
    filtered = []

    for s in scholarships:
        try:
            scholarship_name = safe_str(s.get("scholarship_program", ""))
            if scholarship_name == "original pilipino performing arts scholarship" and user["age"] < 16:
                continue
            if scholarship_name == "nec foundation, inc." and user["age"] > 22:
                continue

            age_limit = safe_str(s.get("age", ""))
            if age_limit not in ["", "any", "n/a", "nan"]:
                try:
                    if user["age"] < float(age_limit):
                        continue
                except ValueError:
                    pass

            required_citizenship = safe_str(s.get("citizenship", "Filipino"))
            if required_citizenship != "any" and required_citizenship != user["citizenship"].lower():
                continue

            residence = safe_str(s.get("residence", ""))
            if residence not in ["", "any", "n/a", "nan"]:
                if residence not in user["residence"].lower() and user["residence"].lower() not in residence:
                    continue

            physically_fit = safe_str(s.get("physically_fit", ""))
            if physically_fit not in ["", "any", "n/a", "nan"]:
                if to_bool(physically_fit) and not user["is_physically_fit"]:
                    continue

            strand = safe_str(s.get("current_shs_strand", ""))
            if strand not in ["", "any", "n/a", "nan"]:
                if strand != user["current_shs_strand"].lower():
                    continue

            top_grad = safe_str(s.get("top_graduating_class", ""))
            if top_grad not in ["", "any", "n/a", "nan"]:
                if to_bool(top_grad) and not user["top_graduating_class"]:
                    continue

            year_levels = safe_str(s.get("incoming_year_level", ""))
            if year_levels not in ["", "any", "n/a", "nan"]:
                allowed_levels = [level.strip() for level in year_levels.split(",")]
                if user["incoming_year_level"].lower() not in allowed_levels:
                    continue

            grad_year = safe_str(s.get("graduation_year", ""))
            if grad_year not in ["", "any", "n/a", "nan"]:
                if str(user["graduation_year"]) != grad_year:
                    continue

            prio_programs = safe_str(s.get("priority_programs", ""))
            if prio_programs not in ["", "any", "n/a", "nan"]:
                programs = [p.strip().lower() for p in prio_programs.split(",")]
                if not any(prog in user["curr_program"].lower() or user["curr_program"].lower() in prog for prog in programs):
                    continue

            min_gwa = safe_str(s.get("gwa_numerical", ""))
            if min_gwa and min_gwa not in ["n/a", "any", "", "nan"]:
                if user["curr_gwa"] > float(min_gwa):
                    continue

            if to_bool(safe_str(s.get("good_moral", "Yes"))):
                if not user["is_good_moral"]:
                    continue

            if to_bool(safe_str(s.get("no_other_scholarships", "No"))):
                if user["has_other_scholarships"]:
                    continue

            major_grade = safe_str(s.get("no_below_225_major", ""))
            if major_grade not in ["", "any", "n/a", "nan"]:
                if to_bool(major_grade) and not user["no_below_225_major"]:
                    continue

            minor_grade = safe_str(s.get("no_below_250_minor", ""))
            if minor_grade not in ["", "any", "n/a", "nan"]:
                if to_bool(minor_grade) and not user["no_below_250_minor"]:
                    continue

            reg_student = safe_str(s.get("regular_student", ""))
            if reg_student not in ["", "any", "n/a", "nan"]:
                if to_bool(reg_student) and not user["regular_student"]:
                    continue

            failed = safe_str(s.get("no_failing_grade", ""))
            if failed not in ["", "any", "n/a", "nan"]:
                if to_bool(failed) and user["no_failing_grade"]:
                    continue

            max_income = safe_str(s.get("annual_household_income", "")).replace(",", "")
            if max_income and max_income not in ["", "any", "n/a", "nan"]:
                if user["annual_household_income"] > int(max_income):
                    continue

            not_working = safe_str(s.get("not_a_working_student", ""))
            if not_working not in ["", "any", "n/a", "nan"]:
                if to_bool(not_working) and user["is_working"]:
                    continue

            filtered.append(s)

        except (KeyError, ValueError, TypeError) as e:
            print(f"Error filtering scholarship: {e}")
            continue 

    return filtered

def heuristic_score(user, scholarship):
    score = 0

    age_limit = safe_str(scholarship.get("age", ""))
    if age_limit not in ["", "any", "n/a", "nan"]:
        try:
            if user["age"] >= float(age_limit):
                score += 10
        except ValueError:
            pass
    else:
        score += 10

    required_citizenship = safe_str(scholarship.get("citizenship", "Filipino"))
    if required_citizenship == "any" or required_citizenship == user["citizenship"].lower():
        score += 10

    residence = safe_str(scholarship.get("residence", ""))
    if residence in ["", "any", "n/a", "nan"] or residence in user["residence"].lower() or user["residence"].lower() in residence:
        score += 10

    min_gwa = safe_str(scholarship.get("gwa_numerical", ""))
    if min_gwa and min_gwa not in ["n/a", "any", "", "nan"]:
        try:
            min_gwa = float(min_gwa)
            if user["curr_gwa"] <= min_gwa:
                score += 10
            elif user["curr_gwa"] <= min_gwa + 0.25:
                score += 5
        except ValueError:
            score += 10
    else:
        score += 10

    prio_programs = safe_str(scholarship.get("priority_programs", ""))
    if prio_programs in ["", "any", "n/a", "nan"]:
        score += 10
    else:
        programs = [p.strip().lower() for p in prio_programs.split(",")]
        if any(prog in user["curr_program"].lower() or user["curr_program"].lower() in prog for prog in programs):
            score += 10

    max_income = safe_str(scholarship.get("annual_household_income", "")).replace(",", "")
    if max_income and max_income not in ["", "any", "n/a", "nan"]:
        try:
            if user["annual_household_income"] <= int(max_income):
                score += 10
        except ValueError:
            score += 10
    else:
        score += 10

    return score

def recommend_scholarships(user, scholarships):
    scored = []
    for s in scholarships:
        score = heuristic_score(user, s)
        scored.append((score, s))
    scored.sort(reverse=True, key=lambda x: x[0])
    return scored[:3]

def main():
    file_path = r"Datas/scholarships_data - 1NF.csv"
    scholarships = load_scholarships(file_path)

    user = get_user_input()
    matching = filter_scholarships(user, scholarships)

    if matching:
        print("\nExact Matching Scholarships:")
        for s in matching:
            print(f"{s['scholarship_program']} — Deadline: {s['application_deadline']}")
    else:
        print("\nNo exact matches found.")

    print("\nTop 3 Recommended Scholarships (Heuristic Scoring):")
    recommendations = recommend_scholarships(user, scholarships)
    for score, s in recommendations:
        print(f"{s['scholarship_program']} — Score: {score} — Deadline: {s['application_deadline']}")

if __name__ == "__main__":
    main()