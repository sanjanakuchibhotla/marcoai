import json


def refreshRatings():
    with open("./data.json", "r") as f:
        data = json.load(f)
        for category in data:
            data[category]['overall_rating'] = 0
            data[category]['average_rating'] = 0
            data[category]['total_number'] = 0

    with open("./data.json", 'w') as file:
        json.dump(data, file)
    return
