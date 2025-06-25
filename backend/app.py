#flask: to handle requests from form (react)

from flask import Flask, request, jsonify #render_test (for testing -- can remove)
from .algorithms.matcher_main import ScholarshipMatcher
from flask_cors import CORS
import math
import os

app = Flask(__name__)
CORS(app,
     origins=["http://localhost:5173", "https://e-skolar.vercel.app"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "OPTIONS"])

# Use absolute path for the CSV file
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'scholarships_data - 1NF.csv')
matcher = ScholarshipMatcher(DATA_PATH)
matcher.load_scholarships() #loads when flask starts

#for testing -- can remove
#@app.route('/')
#def home():
#    return render_test ('index.html')

def clean_json(obj):
    if isinstance(obj, dict):
        return {k: clean_json(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_json(v) for v in obj]
    elif isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None
        return obj
    return obj

@app.route('/match', methods=['POST', 'OPTIONS'])
def match_scholarships():
    if request.method == "OPTIONS":
        return '', 204
    print('[DEBUG] Raw request data:', request.data)
    print('[DEBUG] Raw request json:', request.get_json(force=True, silent=True))
    user_data_nested = request.json  # receives user data from fe (form)
    # Flatten the nested user input
    user_data = {}
    user_data.update(user_data_nested.get('personal_information', {}))
    user_data.update(user_data_nested.get('academic_information', {}))
    user_data.update(user_data_nested.get('social_information', {}))
    # Set defaults for all required keys
    required_keys = [
        'age', 'citizenship', 'residence', 'is_physically_fit', 'incoming_year_level',
        'graduation_year', 'curr_program', 'curr_gwa', 'is_good_moral', 'current_shs_strand',
        'regular_student', 'annual_household_income', 'is_working', 'top_graduating_class',
        'no_below_225_major', 'no_below_250_minor', 'has_other_scholarships', 'no_failing_grade'
    ]
    for key in required_keys:
        if key not in user_data:
            if key.startswith('is_') or key.startswith('has_') or key.startswith('no_') or key == 'regular_student':
                user_data[key] = False
            elif key in ['curr_gwa', 'annual_household_income', 'age']:
                user_data[key] = 0
            else:
                user_data[key] = ""

    # Normalize boolean fields
    boolean_fields = [
        'is_physically_fit', 'is_good_moral', 'regular_student', 'is_working',
        'top_graduating_class', 'no_below_225_major', 'no_below_250_minor',
        'has_other_scholarships', 'no_failing_grade'
    ]
    for key in boolean_fields:
        val = user_data.get(key)
        if isinstance(val, str):
            user_data[key] = val.lower() == 'true'
        else:
            user_data[key] = bool(val)

    # Normalize string fields to lowercase for comparison
    if 'citizenship' in user_data and isinstance(user_data['citizenship'], str):
        user_data['citizenship'] = user_data['citizenship'].strip().lower()
    if 'residence' in user_data and isinstance(user_data['residence'], str):
        user_data['residence'] = user_data['residence'].strip().lower()

    # Type conversions for age and annual_household_income
    try:
        user_data['age'] = int(user_data.get('age', 0))
    except Exception:
        user_data['age'] = 0
    try:
        user_data['annual_household_income'] = float(user_data.get('annual_household_income', 0))
    except Exception:
        user_data['annual_household_income'] = 0
    # GWA conversion
    user_data['curr_gwa'] = matcher.converted_gwa(user_data.get('curr_gwa', 5.0))

    matcher.user_data = user_data
    matches = matcher.filter_scholarships()  # pass the fe data
    sorted_matches = matcher.sort_scholarships(matches)  # sort matches

    # Clean the data before returning
    return jsonify(clean_json(sorted_matches))  # return result/s back to fe as json

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)