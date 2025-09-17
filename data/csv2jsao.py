import pandas as pd
import json
import os

# -------------------------------
# FILE PATHS
# -------------------------------
csv_file_path = "/Users/chloelarroze/doc/S9/JS_Olympics_API/data/dataset_csv"
json_file_path = "/Users/chloelarroze/doc/S9/JS_Olympics_API/data/dataset_json"

events_csv = os.path.join(csv_file_path, "events.csv")
venues_csv = os.path.join(csv_file_path, "venues.csv")
schedule_csv = os.path.join(csv_file_path, "schedules.csv")
output_json = os.path.join(json_file_path, "events.json")

# -------------------------------
# LOAD CSVs
# -------------------------------
events_df = pd.read_csv(events_csv)
venues_df = pd.read_csv(venues_csv, on_bad_lines="skip")
schedule_df = pd.read_csv(schedule_csv, on_bad_lines="skip")

# Normalize column names
events_df.columns = [c.strip().lower() for c in events_df.columns]
venues_df.columns = [c.strip().lower() for c in venues_df.columns]
schedule_df.columns = [c.strip().lower() for c in schedule_df.columns]

# -------------------------------
# Build venue lookup (by name)
# -------------------------------
venue_lookup = {
    row["venue"].strip().lower(): {
        "venue": row["venue"],
        "lat": float(row["lat"]),
        "lng": float(row["lng"]),
        "url": row["url"],
    }
    for _, row in venues_df.iterrows()
}

# -------------------------------
# Enrich events with schedule + venue info
# -------------------------------
enriched_events = []

for _, event in events_df.iterrows():
    event_name = event["event"].strip().lower()

    # find all schedule rows that match this event
    matched_schedule = schedule_df[
        schedule_df["event"].str.strip().str.lower() == event_name
    ]

    # keep only unique venues
    unique_venues = set(matched_schedule["venue"].dropna().str.strip().str.lower())

    locations = []
    for venue_name in unique_venues:
        loc = venue_lookup.get(venue_name)
        if loc:
            locations.append(loc)

    enriched_event = {
        "event": event["event"],
        "tag": event["tag"],
        "sport": {
            "name": event["sport"],
            "code": event["sport_code"],
            "url": event["sport_url"],
        },
        "discipline": event["sport"],
        "event_type": (
            "Individual" if "Individual" in event["event"] else "Team"
        ),
        "url_event": f"/events/{event['sport_code'].lower()}/{event['event'].lower().replace(' ', '-')}",
        "locations": locations if locations else None,
    }

    enriched_events.append(enriched_event)

# -------------------------------
# Write JSON
# -------------------------------
with open(output_json, "w", encoding="utf-8") as f:
    json.dump({"events": enriched_events}, f, indent=2, ensure_ascii=False)

print(f"✅ events.json created at {output_json}")
