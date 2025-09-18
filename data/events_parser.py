import csv
import json

# Define the input and output file names
input_csv_filename = './data/dataset_csv/events_with_coords.csv'
output_json_filename = './data/dataset_json/events.json'

# Read the CSV file and convert it to the desired structure
events_list = []
with open(input_csv_filename, mode='r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    
    for row in csv_reader:
        # Handle missing coordinates - use None if empty string
        try:
            lat = float(row['venue_lat']) if row['venue_lat'] else None
        except ValueError:
            lat = None
            
        try:
            lng = float(row['venue_long']) if row['venue_long'] else None
        except ValueError:
            lng = None
        
        # Create the event dictionary with the desired structure
        event_dict = {
            "event": row['event'],
            "tag": row['tag'],
            "sport": {
                "name": row['sport'],
                "code": row['sport_code'],
                "url": row['sport_url']
            },
            "discipline": row['sport'],
            "event_type": "Team" if "Team" in row['event'] else "Individual",
            "url_event": f"/events/{row['sport_code'].lower()}/{row['event'].lower().replace(' ', '-').replace('/', '-')}",
            "locations": [
                {
                    "venue": row['venue_name_clean'],
                    "lat": lat,
                    "lng": lng
                }
            ]
        }
        events_list.append(event_dict)

# Create the final dictionary with the top-level "events" key
final_structure = {"events": events_list}

# Write the data to a JSON file
with open(output_json_filename, mode='w', encoding='utf-8') as json_file:
    json.dump(final_structure, json_file, indent=2, ensure_ascii=False)

print(f"Successfully converted {input_csv_filename} to {output_json_filename}")
print(f"Processed {len(events_list)} events")