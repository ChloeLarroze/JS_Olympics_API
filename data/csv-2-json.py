#!/usr/bin/env python3
import pandas as pd
import json
from datetime import datetime

#FILEPATHs
csv_file_path = "/Users/chloelarroze/doc/S9/Projet_JS/data/dataset_csv" #only works w/ the freaking absolute path :( 
json_file_path =  "/Users/chloelarroze/doc/S9/Projet_JS/data/dataset_json" 

def csv_to_json():
    #csv 
    athletes_df = pd.read_csv(f'{csv_file_path}/athletes.csv')
    events_df = pd.read_csv(f'{csv_file_path}/events_with_coords.csv')
    medals_df = pd.read_csv(f'{csv_file_path}/medals.csv')

    #ATHLETES   
    athletes_list = []
    for _, row in athletes_df.iterrows():
        athlete = {
            "code": row.get('code', ''),
            "current": row.get('current', True),
            "name": row.get('name', ''),
            "name_short": row.get('name_short', ''),
            "name_tv": row.get('name_tv', ''),
            "gender": row.get('gender', ''),
            "function": row.get('function', ''),
            "country": {
                "code": row.get('country_code', ''),
                "name": row.get('country', ''),
                "long_name": row.get('country_long', '')
            },
            "nationality": {
                "code": row.get('nationality_code', ''),
                "name": row.get('nationality', ''),
                "long_name": row.get('nationality_long', '')
            },
            "physical_attributes": {
                "height": row.get('height'),
                "weight": row.get('weight')
            },
            "disciplines": row.get('disciplines', '').split(';') if pd.notna(row.get('disciplines')) else [],
            "events": row.get('events', '').split(';') if pd.notna(row.get('events')) else [],
            "personal_info": {
                "birth_date": row.get('birth_date'),
                "birth_place": row.get('birth_place', ''),
                "birth_country": row.get('birth_country', ''),
                "residence_place": row.get('residence_place', ''),
                "residence_country": row.get('residence_country', ''),
                "nickname": row.get('nickname', ''),
                "hobbies": row.get('hobbies', '').split(';') if pd.notna(row.get('hobbies')) else [],
                "occupation": row.get('occupation', ''),
                "education": row.get('education', ''),
                "family": row.get('family', ''),
                "languages": row.get('lang', '').split(';') if pd.notna(row.get('lang')) else []
            },
            "career_info": {
                "coach": row.get('coach', ''),
                "reason": row.get('reason', ''),
                "hero": row.get('hero', ''),
                "influence": row.get('influence', ''),
                "philosophy": row.get('philosophy', ''),
                "sporting_relatives": row.get('sporting_relatives', ''),
                "ritual": row.get('ritual', ''),
                "other_sports": row.get('other_sports', '').split(';') if pd.notna(row.get('other_sports')) else []
            }
        }
        athletes_list.append(athlete)
    

    #MEDALS
    medals_list = []
    for _, row in medals_df.iterrows():
        medal = {
            "medal": {
                "type": row.get('medal_type', ''),
                "code": row.get('medal_code', '')
            },
            "date": row.get('medal_date', ''),
            "athlete": {
                "name": row.get('name', ''),
                "gender": row.get('gender', ''),
                "code": row.get('code', '')
            },
            "event": {
                "name": row.get('event', ''),
                "discipline": row.get('discipline', ''),
                "type": row.get('event_type', ''),
                "url": row.get('url_event', '')
            },
            "country": {
                "code": row.get('country_code', ''),
                "name": row.get('country', ''),
                "long_name": row.get('country_long', '')
            }
        }
        medals_list.append(medal)
    
    #Json output
    with open(f'{json_file_path}/athletes.json', 'w', encoding='utf-8') as f:
        json.dump({"athletes": athletes_list}, f, indent=2, ensure_ascii=False)

    with open(f'{json_file_path}/medals.json', 'w', encoding='utf-8') as f:
        json.dump({"medals": medals_list}, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    csv_to_json()