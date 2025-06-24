#flask: to handle requests from form (react)

from flask import Flask, request, jsonify #render_test (for testing -- can remove)
from backend.algorithms.matcher_main import ScholarshipMatcher
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

#csv loads here w/ matcher obj
matcher = ScholarshipMatcher('backend/data/scholarships_data - 1NF.csv')
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

@app.route('/match', methods=['POST'])
def match_scholarships():
    user_data = request.json  #receives user data from fe (form)
    user_data['curr_gwa'] = matcher.converted_gwa(user_data.get('curr_gwa', 5.0)) #gwa conversion

    matcher.user_data = user_data
    matches = matcher.filter_scholarships()  #pass the fe data
    sorted_matches = matcher.sort_scholarships(matches)  #sort matches

    # Clean the data before returning
    return jsonify(clean_json(sorted_matches))  #return result/s back to fe as json
