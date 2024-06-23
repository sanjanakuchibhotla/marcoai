import json


def updateRating(category, newRating):
    with open("./data.json", "r") as f:
        data = json.load('f')
        data[category]['overall_rating'] += newRating
        currAverage = data[category]['average_rating']
        totalNum = data[category]['total_number']
        data[category]['average_rating'] = (currAverage*totalNum + newRating)/(totalNum+1)
        data[category]['total_number'] += 1
    with open("./data.json", 'w') as file:
        json.dump(data, file)
    return

def __main__():
    updateRating("beaches",8)