import * as location from '../../backend/test.json'
import { useState } from 'react';

export interface Location {
    id: number;
    Place: string;
    City: string;
    Price: string;
    Distance: number;
    Description: string;
    Resources: string;
}

export default function GenerateCards() {
    const locations: Location[] = location.map(item => ({
        id: item.ID,
        Place: item.Place,
        City: item.City,
        Price: item.Price,
        Distance: item.Distance,
        Description: item.Description,
        Resources: item["Resources/Links"]
    }))
    return locations
};