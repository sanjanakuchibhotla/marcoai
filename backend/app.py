from flask import Flask, request, jsonify
from search import generateSearch

app = Flask(__name__)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    # user_message = request.json.get('message')
    response_message = generateSearch()
    return jsonify({'response': response_message})

if __name__ == '__main__':
    app.run(debug=True)
