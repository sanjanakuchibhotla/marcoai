// import * as location from '../../backend/test.json'

const location = [{"ID": 1, "Place": "Chez Panisse", "City": "Berkeley", "Description": "A famous restaurant known for its organic, locally grown ingredients and innovative dishes.", "Distance": 1.2, "Price": "$$$$", "Resources/Links": "https://www.chezpanisse.com/", "Type": "food"}, {"ID": 2, "Place": "Comal", "City": "Berkeley", "Description": "A lively Mexican restaurant offering a seasonal menu and a great selection of cocktails.", "Distance": 0.5, "Price": "$$", "Resources/Links": "https://www.comalberkeley.com/", "Type": "food"}, {"ID": 3, "Place": "Gather", "City": "Berkeley", "Description": "A trendy spot offering farm-to-table New American cuisine with many vegan and vegetarian options.", "Distance": 0.3, "Price": "$$$", "Resources/Links": "https://www.gatherrestaurant.com/", "Type": "food"}, {"ID": 4, "Place": "Ippuku", "City": "Berkeley", "Description": "A Japanese izakaya featuring a wide range of yakitori, small plates, and an extensive sake list.", "Distance": 0.4, "Price": "$$", "Resources/Links": "https://www.ippukuberkeley.com/", "Type": "food"}, {"ID": 5, "Place": "Sliver Pizzeria", "City": "Berkeley", "Description": "A popular pizzeria known for its daily changing selection of fresh, locally sourced pizzas.", "Distance": 0.2, "Price": "$", "Resources/Links": "https://www.sliverpizzeria.com/", "Type": "food"}]

export interface Location {
    id: number;
    Place: string;
    City: string;
    Price: string;
    Distance: number;
    Description: string;
    Resources: string;
    Type: string;
}

export default function GenerateCards() {
    const locations: Location[] = location.map(item => ({
        id: item.ID,
        Place: item.Place,
        City: item.City,
        Price: item.Price,
        Distance: item.Distance,
        Description: item.Description,
        Resources: item["Resources/Links"],
        Type: item.Type
    }))
    return locations
};